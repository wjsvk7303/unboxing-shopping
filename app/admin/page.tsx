"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useUser();
  const dbUser = useQuery(
    api.users.getByClerkId,
    user ? { clerkId: user.id } : "skip"
  );
  const products = useQuery(api.products.list, {});
  const orders = useQuery(api.orders.listAll);

  if (dbUser === undefined) {
    return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  }

  if (dbUser?.role !== "admin") {
    return (
      <div className="py-20 text-center text-gray-500">
        관리자 권한이 필요합니다.
      </div>
    );
  }

  const pendingOrders = orders?.filter((o) => o.status === "paid").length ?? 0;
  const totalRevenue =
    orders
      ?.filter((o) => o.status !== "cancelled" && o.status !== "pending")
      .reduce((sum, o) => sum + o.totalAmount, 0) ?? 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold text-foreground">관리자 대시보드</h1>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border-color/50 bg-surface p-6">
          <p className="text-sm text-gray-500">총 상품 수</p>
          <p className="text-3xl font-bold text-neon-cyan">{products?.length ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-border-color/50 bg-surface p-6">
          <p className="text-sm text-gray-500">처리 대기 주문</p>
          <p className="text-3xl font-bold text-neon-purple">{pendingOrders}</p>
        </div>
        <div className="rounded-2xl border border-border-color/50 bg-surface p-6">
          <p className="text-sm text-gray-500">총 매출</p>
          <p className="text-3xl font-bold text-neon-blue">{formatPrice(totalRevenue)}원</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/products"
          className="rounded-2xl border border-border-color/50 bg-surface p-6 transition hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
        >
          <h2 className="mb-2 text-lg font-semibold text-foreground">상품 관리</h2>
          <p className="text-sm text-gray-500">상품 추가, 수정, 삭제</p>
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-2xl border border-border-color/50 bg-surface p-6 transition hover:border-neon-purple/30 hover:shadow-[0_0_20px_rgba(179,71,255,0.1)]"
        >
          <h2 className="mb-2 text-lg font-semibold text-foreground">주문 관리</h2>
          <p className="text-sm text-gray-500">주문 상태 관리</p>
        </Link>
      </div>
    </div>
  );
}
