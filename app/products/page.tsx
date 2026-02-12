"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const categoryLabels: Record<string, string> = {
  smartphones: "스마트폰",
  laptops: "노트북",
  tablets: "태블릿",
  audio: "이어폰/헤드폰",
  smartwatches: "스마트워치",
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const q = searchParams.get("q") ?? undefined;

  const products = useQuery(api.products.list, { category });
  const searchResults = useQuery(api.products.search, q ? { query: q } : "skip");
  const categories = useQuery(api.categories.list);

  const displayProducts = q ? searchResults : products;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {q
              ? `"${q}" 검색 결과`
              : category
                ? categoryLabels[category] ?? category
                : "전체 상품"}
          </h1>
          <p className="mt-2 text-gray-500">
            UNBOXING에서 제공하는 다양한 제품을 만나보세요.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-gray-900">카테고리</h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/products"
                    className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${!category ? "bg-lg-red/5 font-bold text-lg-red" : "text-gray-600 hover:bg-gray-50 hover:text-lg-red"}`}
                  >
                    전체 보기
                  </Link>
                </li>
                {categories?.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${category === cat.slug ? "bg-lg-red/5 font-bold text-lg-red" : "text-gray-600 hover:bg-gray-50 hover:text-lg-red"}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {displayProducts === undefined ? (
              <div className="py-32 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-lg-red border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="mt-4 text-gray-500">상품을 불러오는 중입니다...</p>
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="flex h-96 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-4 text-6xl text-gray-300">🔍</div>
                <h3 className="text-xl font-bold text-gray-900">검색 결과가 없습니다</h3>
                <p className="mt-2 text-gray-500">다른 키워드로 검색하거나 카테고리를 변경해보세요.</p>
                <Link href="/products" className="mt-6 rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800">
                  전체 상품 보기
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    category={categoryLabels[product.category] ?? product.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">로딩 중...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
