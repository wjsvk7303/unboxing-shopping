import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    role: v.union(v.literal("admin"), v.literal("user")),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
  }).index("by_clerkId", ["clerkId"]),

  categories: defineTable({
    name: v.string(),
    slug: v.string(),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    imageUrl: v.string(),
    stock: v.number(),
    longDescription: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    specs: v.optional(v.array(v.object({ label: v.string(), value: v.string() }))),
  }).index("by_category", ["category"]),
  likes: defineTable({
    userId: v.string(),
    productId: v.id("products"),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_productId", ["userId", "productId"]),

  cartItems: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    quantity: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_productId", ["userId", "productId"]),

  orders: defineTable({
    userId: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    totalAmount: v.number(),
    status: v.string(),
    orderId: v.string(),
    paymentKey: v.optional(v.string()),
    shippingAddress: v.string(),
    shippingPhone: v.optional(v.string()),
    recipientName: v.optional(v.string()),
  })
    .index("by_userId", ["userId"])
    .index("by_orderId", ["orderId"]),

  inquiries: defineTable({
    userId: v.string(),
    productId: v.id("products"),
    content: v.string(),
    createdAt: v.number(),
    answer: v.optional(v.string()),
    answeredAt: v.optional(v.number()),
  })
    .index("by_productId", ["productId"])
    .index("by_userId", ["userId"]),
});
