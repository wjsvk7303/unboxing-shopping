
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function OrderHistoryPage() {
    const { user } = useUser();
    const orders = useQuery(
        api.orders.listByUser,
        user ? { userId: user.id } : "skip"
    );

    if (orders === undefined) {
        return <div className="py-20 text-center text-gray-500">주문 내역을 불러오는 중...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center">
                <Package className="mb-4 h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">주문 내역이 없습니다</h3>
                <p className="mt-1 text-gray-500">원하는 상품을 찾아보세요!</p>
                <Link
                    href="/"
                    className="mt-6 rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    쇼핑하러 가기
                </Link>
            </div>
        );
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending": return { label: "결제 대기", icon: Clock, color: "text-orange-500 bg-orange-50" };
            case "paid": return { label: "결제 완료", icon: CheckCircle, color: "text-green-500 bg-green-50" };
            case "shipping": return { label: "배송 중", icon: Truck, color: "text-blue-500 bg-blue-50" };
            case "delivered": return { label: "배송 완료", icon: Package, color: "text-gray-500 bg-gray-50" };
            default: return { label: status, icon: Package, color: "text-gray-500 bg-gray-50" };
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">주문/배송 내역</h2>

            <div className="space-y-4">
                {orders.map((order) => {
                    const status = getStatusLabel(order.status);
                    const date = new Date(order._creationTime).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    return (
                        <div key={order._id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-gray-900">{date} 주문</span>
                                    <span className="text-sm text-gray-500">주문번호 {order.orderId}</span>
                                </div>
                                <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${status.color}`}>
                                    <status.icon className="h-4 w-4" />
                                    {status.label}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            {/* Product Image Placeholder - ideally we fetch product image */}
                                            <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 object-cover" />

                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                                <p className="text-sm text-gray-500">
                                                    {item.price.toLocaleString()}원 × {item.quantity}개
                                                </p>
                                            </div>
                                            <div className="text-right font-medium text-gray-900">
                                                {(item.price * item.quantity).toLocaleString()}원
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="text-sm text-gray-500">
                                        받는 분: {order.recipientName || user?.fullName}
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">
                                        총 결제금액: {order.totalAmount.toLocaleString()}원
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
