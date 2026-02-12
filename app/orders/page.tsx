"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

export default function OrdersPage() {
  const { user } = useUser();
  const orders = useQuery(
    api.orders.listByUser,
    user ? { userId: user.id } : "skip"
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  if (orders === undefined) {
    return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-foreground">주문 내역</h1>

      {orders.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-4 text-gray-500">주문 내역이 없습니다.</p>
          <Link href="/products" className="text-neon-cyan hover:text-neon-cyan/80">
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="block rounded-2xl border border-border-color/50 bg-surface p-6 transition hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  주문번호: {order.orderId}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    order.status === "paid"
                      ? "bg-green-900/30 text-green-400"
                      : order.status === "shipping"
                        ? "bg-neon-blue/20 text-neon-blue"
                        : order.status === "cancelled"
                          ? "bg-neon-pink/20 text-neon-pink"
                          : "bg-surface-light text-gray-400"
                  }`}
                >
                  {statusLabels[order.status] ?? order.status}
                </span>
              </div>
              <div className="mb-2 text-sm text-gray-400">
                {order.items.map((item) => item.name).join(", ")}
              </div>
              <div className="text-lg font-bold text-foreground">
                {formatPrice(order.totalAmount)}원
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
