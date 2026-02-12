
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const toggle = mutation({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }
        const userId = identity.subject;

        const existing = await ctx.db
            .query("likes")
            .withIndex("by_userId_productId", (q) =>
                q.eq("userId", userId).eq("productId", args.productId)
            )
            .first();

        if (existing) {
            await ctx.db.delete(existing._id);
            return false; // unliked
        } else {
            await ctx.db.insert("likes", {
                userId,
                productId: args.productId,
            });
            return true; // liked
        }
    },
});

export const getMmStatus = query({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return false;
        }
        const userId = identity.subject;

        const existing = await ctx.db
            .query("likes")
            .withIndex("by_userId_productId", (q) =>
                q.eq("userId", userId).eq("productId", args.productId)
            )
            .first();

        return !!existing;
    },
});

export const getByUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return [];
        }
        const userId = identity.subject;

        const likes = await ctx.db
            .query("likes")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .collect();

        const products = await Promise.all(
            likes.map(async (like) => {
                return await ctx.db.get(like.productId);
            })
        );

        return products.filter((p) => p !== null);
    },
});
