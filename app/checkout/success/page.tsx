"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams } from "next/navigation";
import { use, Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const updateOrderStatus = useMutation(api.orders.updateStatus);
  const clearCart = useMutation(api.cart.clear);

  if (!paymentKey || !orderId || !amount) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl text-neon-pink">!</div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">결제 정보 오류</h1>
          <p className="mb-6 text-gray-500">결제 정보가 올바르지 않습니다.</p>
          <Link href="/cart" className="rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            장바구니로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ConfirmPayment
      paymentKey={paymentKey}
      orderId={orderId}
      amount={Number(amount)}
      userId={user?.id}
      updateOrderStatus={updateOrderStatus}
      clearCart={clearCart}
    />
  );
}

function ConfirmPayment({
  paymentKey,
  orderId,
  amount,
  userId,
  updateOrderStatus,
  clearCart,
}: {
  paymentKey: string;
  orderId: string;
  amount: number;
  userId?: string;
  updateOrderStatus: (args: { orderId: string; status: string; paymentKey?: string }) => Promise<unknown>;
  clearCart: (args: { userId: string }) => Promise<unknown>;
}) {
  const result = use(
    confirmPaymentPromise(paymentKey, orderId, amount, userId, updateOrderStatus, clearCart)
  );

  if (result.success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl text-green-400">&#10003;</div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">결제가 완료되었습니다</h1>
          <p className="mb-2 text-gray-500">주문번호: {orderId}</p>
          <p className="mb-8 text-gray-500">주문하신 상품은 빠르게 배송해 드리겠습니다.</p>
          <div className="flex justify-center gap-4">
            <Link href="/orders" className="rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              주문 내역 보기
            </Link>
            <Link href="/products" className="rounded-2xl border border-border-color/50 px-6 py-3 text-gray-300 transition hover:border-neon-cyan/50 hover:text-neon-cyan">
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-6xl text-neon-pink">!</div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">결제 승인 실패</h1>
        <p className="mb-6 text-gray-500">{result.message}</p>
        <Link href="/cart" className="rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          장바구니로 돌아가기
        </Link>
      </div>
    </div>
  );
}

// Cache the promise so React.use() doesn't re-create on re-render
const cache = new Map<string, Promise<{ success: boolean; message?: string }>>();

function confirmPaymentPromise(
  paymentKey: string,
  orderId: string,
  amount: number,
  userId: string | undefined,
  updateOrderStatus: (args: { orderId: string; status: string; paymentKey?: string }) => Promise<unknown>,
  clearCart: (args: { userId: string }) => Promise<unknown>,
) {
  const key = `${paymentKey}-${orderId}-${amount}`;
  if (cache.has(key)) return cache.get(key)!;

  const promise = (async () => {
    try {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentKey, orderId, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || "결제 승인에 실패했습니다." };
      }

      await updateOrderStatus({ orderId, status: "paid", paymentKey });
      if (userId) {
        await clearCart({ userId });
      }

      return { success: true };
    } catch {
      return { success: false, message: "결제 승인 중 오류가 발생했습니다." };
    }
  })();

  cache.set(key, promise);
  return promise;
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">결제를 확인하고 있습니다...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
