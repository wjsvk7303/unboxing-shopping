"use client";

import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

interface ProductCardProps {
  id: Id<"products">;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ProductCard({ id, name, price, imageUrl, category }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <Link href={`/products/${id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-lg-red/30 hover:shadow-lg">
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x600/f3f4f6/9ca3af?text=Image+Unavailable";
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-1 text-xs font-medium text-gray-500">{category}</p>
          <h3 className="mb-3 text-base font-medium text-gray-900 line-clamp-2 md:text-lg">
            {name}
          </h3>
          <div className="mt-auto pt-2">
            <p className="text-xl font-bold text-lg-red">
              {formatPrice(price)}원
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
