
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function RecentProductsPage() {
    const [recentIds, setRecentIds] = useState<Id<"products">[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("recent_products");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    // Filter to ensure they are valid ID strings if possible, 
                    // but for now just trust generic parsing and cast
                    setRecentIds(parsed as Id<"products">[]);
                }
            } catch (e) {
                console.error("Failed to parse recent products", e);
            }
        }
    }, []);

    const products = useQuery(api.products.getByIds, { ids: recentIds });

    if (products === undefined) {
        return <div className="py-20 text-center text-gray-500">최근 본 상품을 불러오는 중...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                <Clock className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">최근 본 상품이 없습니다</h3>
                <p className="mt-1 text-gray-500">다양한 상품을 구경해보세요!</p>
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
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">최근 본 상품</h2>
                <button
                    onClick={() => {
                        localStorage.removeItem("recent_products");
                        setRecentIds([]);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-900 underline"
                >
                    전체 삭제
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <Link
                        key={product._id}
                        href={`/products/${product._id}`}
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
                        </div>

                        <div className="p-4">
                            <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <p className="mb-3 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    {product.price.toLocaleString()}원
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
