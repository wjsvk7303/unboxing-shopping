"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function CartPage() {
  const { user } = useUser();
  const cartItems = useQuery(
    api.cart.getItems,
    user ? { userId: user.id } : "skip"
  );
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeItem = useMutation(api.cart.remove);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  const totalAmount =
    cartItems?.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
      0
    ) ?? 0;

  if (cartItems === undefined) {
    return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-foreground">장바구니</h1>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-4 text-gray-500">장바구니가 비어있습니다.</p>
          <Link
            href="/products"
            className="text-neon-cyan hover:text-neon-cyan/80"
          >
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 rounded-2xl border border-border-color/50 bg-surface p-4 transition hover:border-neon-cyan/20"
              >
                <img
                  src={item.product?.imageUrl}
                  alt={item.product?.name}
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {item.product?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.product?.price ?? 0)}원
                  </p>
                </div>
                <div className="flex items-center rounded-xl border border-border-color/50">
                  <button
                    onClick={() =>
                      updateQuantity({
                        id: item._id,
                        quantity: item.quantity - 1,
                      })
                    }
                    className="px-3 py-1 text-gray-400 hover:text-neon-cyan"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm text-foreground">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity({
                        id: item._id,
                        quantity: item.quantity + 1,
                      })
                    }
                    className="px-3 py-1 text-gray-400 hover:text-neon-cyan"
                  >
                    +
                  </button>
                </div>
                <p className="w-28 text-right font-medium text-foreground">
                  {formatPrice((item.product?.price ?? 0) * item.quantity)}원
                </p>
                <button
                  onClick={() => removeItem({ id: item._id })}
                  className="text-gray-500 hover:text-neon-pink"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border-color/50 bg-surface p-6">
            <div className="mb-4 flex justify-between text-lg font-bold text-foreground">
              <span>총 결제금액</span>
              <span className="text-neon-cyan">{formatPrice(totalAmount)}원</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full rounded-lg bg-lg-red py-4 text-center font-bold text-white transition hover:bg-red-700 hover:shadow-lg"
            >
              {formatPrice(totalAmount)}원 주문하기
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
