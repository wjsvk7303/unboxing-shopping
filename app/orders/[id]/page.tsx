"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

const statusLabels: Record<string, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

export default function OrderDetailPage() {
  const params = useParams();
  const order = useQuery(api.orders.getById, {
    id: params.id as Id<"orders">,
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  if (order === undefined) {
    return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  }

  if (order === null) {
    return <div className="py-20 text-center text-gray-500">주문을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-foreground">주문 상세</h1>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border-color/50 bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">주문 정보</h2>
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
          <div className="space-y-2 text-sm text-gray-400">
            <p>주문번호: {order.orderId}</p>
            <p>배송지: {order.shippingAddress}</p>
            {order.recipientName && <p>수령인: {order.recipientName}</p>}
            {order.shippingPhone && <p>연락처: {order.shippingPhone}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-border-color/50 bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">주문 상품</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}원
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border-color/50 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">총 결제금액</span>
              <span className="text-neon-cyan">{formatPrice(order.totalAmount)}원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
