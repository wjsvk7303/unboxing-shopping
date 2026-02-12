"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const statusLabels: Record<string, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  shipping: "배송 중",
  delivered: "배송 완료",
  cancelled: "취소됨",
};

const statusOptions = ["pending", "paid", "shipping", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const { user } = useUser();
  const dbUser = useQuery(
    api.users.getByClerkId,
    user ? { clerkId: user.id } : "skip"
  );
  const orders = useQuery(api.orders.listAll);
  const updateStatus = useMutation(api.orders.updateStatus);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  if (dbUser?.role !== "admin") {
    return <div className="py-20 text-center text-gray-500">관리자 권한이 필요합니다.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-foreground">주문 관리</h1>

      {orders === undefined ? (
        <div className="py-20 text-center text-gray-500">로딩 중...</div>
      ) : orders.length === 0 ? (
        <div className="py-20 text-center text-gray-500">주문이 없습니다.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border-color/50 bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-color/50 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">주문번호</th>
                <th className="px-4 py-3 font-medium">상품</th>
                <th className="px-4 py-3 font-medium">금액</th>
                <th className="px-4 py-3 font-medium">배송지</th>
                <th className="px-4 py-3 font-medium">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color/30">
              {orders.map((order) => (
                <tr key={order._id} className="transition hover:bg-surface-light">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{order.orderId}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {order.items.map((i) => i.name).join(", ")}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {formatPrice(order.totalAmount)}원
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-gray-500">
                    {order.shippingAddress}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus({
                          orderId: order.orderId,
                          status: e.target.value,
                        })
                      }
                      className="rounded-lg border border-border-color/50 bg-surface-light px-2 py-1 text-xs text-foreground focus:border-neon-cyan/50 focus:outline-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {statusLabels[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
