import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByProduct = query({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        const inquiries = await ctx.db
            .query("inquiries")
            .withIndex("by_productId", (q) => q.eq("productId", args.productId))
            .order("desc")
            .collect();

        // Enrich with user names if needed, but for now we might just show "Customer" or look up user
        // Ideally we would join with users table or store user name.
        // Let's fetch user details for each inquiry to show name (masked)
        const inquiriesWithUser = await Promise.all(
            inquiries.map(async (inquiry) => {
                // We can't easily join on clerkId if we only stored userId (which is clerkId)
                // Let's just return the inquiry for now. Frontend can handle basic display.
                // If we want names, we should probably store user name in inquiry or look it up.
                // For simplicity, let's look up the user.
                const user = await ctx.db
                    .query("users")
                    .withIndex("by_clerkId", (q) => q.eq("clerkId", inquiry.userId))
                    .unique();

                return {
                    ...inquiry,
                    userName: user?.name ?? "알 수 없음",
                };
            })
        );

        return inquiriesWithUser;
    },
});

export const create = mutation({
    args: {
        productId: v.id("products"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const { subject } = identity;

        const inquiryId = await ctx.db.insert("inquiries", {
            userId: subject,
            productId: args.productId,
            content: args.content,
            createdAt: Date.now(),
        });

        return inquiryId;
    },
});

export const answer = mutation({
    args: {
        inquiryId: v.id("inquiries"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!user || user.role !== "admin") {
            throw new Error("Only admins can answer inquiries");
        }

        await ctx.db.patch(args.inquiryId, {
            answer: args.content,
            answeredAt: Date.now(),
        });
    },
});
