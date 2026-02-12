
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WishlistPage() {
    const products = useQuery(api.likes.getByUser);
    const toggleLike = useMutation(api.likes.toggle);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    if (products === undefined) {
        return <div className="py-20 text-center text-gray-500">찜한 상품을 불러오는 중...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                <Heart className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">찜한 상품이 없습니다</h3>
                <p className="mt-1 text-gray-500">마음에 드는 상품을 찜해보세요!</p>
                <Link
                    href="/"
                    className="mt-6 rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    쇼핑하러 가기
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">찜한 상품</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg"
                        onMouseEnter={() => setHoveredId(product._id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="aspect-square w-full overflow-hidden bg-gray-100">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleLike({ productId: product._id });
                                }}
                                className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-lg-red backdrop-blur-sm transition hover:bg-white"
                            >
                                <Heart className="h-5 w-5 fill-current" />
                            </button>
                        </div>

                        <div className="p-4">
                            <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <p className="mb-3 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {product.price.toLocaleString()}원
                                </span>
                            </div>

                            <Link
                                href={`/products/${product._id}`}
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                자세히 보기
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
