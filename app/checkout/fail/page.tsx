"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function FailContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-6xl text-neon-pink">&#10007;</div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">결제에 실패했습니다</h1>
        {code && <p className="mb-1 text-sm text-gray-400">오류 코드: {code}</p>}
        {message && <p className="mb-6 text-gray-500">{message}</p>}
        <div className="flex justify-center gap-4">
          <Link href="/checkout" className="rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            다시 시도하기
          </Link>
          <Link href="/cart" className="rounded-2xl border border-border-color/50 px-6 py-3 text-gray-300 transition hover:border-neon-cyan/50 hover:text-neon-cyan">
            장바구니로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutFailPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-500">로딩 중...</div>}>
      <FailContent />
    </Suspense>
  );
}
