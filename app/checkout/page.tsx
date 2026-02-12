"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useRouter } from "next/navigation";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function CheckoutPage() {
  // MOCK DATA FOR PREVIEW
  const user = {
    id: "test_user_id",
    primaryEmailAddress: { emailAddress: "test@example.com" },
    fullName: "테스트 유저"
  };
  const router = useRouter();

  // Mock cart items
  const cartItems = [
    {
      _id: "item1",
      productId: "prod1",
      product: { name: "프리미엄 기계식 키보드", price: 189000 },
      quantity: 1
    },
    {
      _id: "item2",
      productId: "prod2",
      product: { name: "게이밍 마우스", price: 59000 },
      quantity: 1
    }
  ];

  // Mock DB User
  const dbUser = {
    name: "테스트 유저",
    phone: "010-1234-5678",
    address: "서울특별시 강남구 테헤란로 123"
  };

  const createOrder = useMutation(api.orders.create);

  const [addressOverride, setAddressOverride] = useState<string | null>(null);
  const [phoneOverride, setPhoneOverride] = useState<string | null>(null);
  const [recipientNameOverride, setRecipientNameOverride] = useState<string | null>(null);
  const [widgetsReady, setWidgetsReady] = useState(false);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const widgetsRef = useRef<any>(null);
  const initRef = useRef(false);

  const address = addressOverride ?? dbUser?.address ?? "";
  const phone = phoneOverride ?? dbUser?.phone ?? "";
  const recipientName = recipientNameOverride ?? dbUser?.name ?? "";

  const totalAmount =
    cartItems?.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
      0
    ) ?? 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  // Initialize TossPayments widget - only once
  useEffect(() => {
    if (initRef.current) return;

    initRef.current = true;

    async function initWidgets() {
      try {
        console.log("[TossPayments] Loading SDK with clientKey:", clientKey);
        const tossPayments = await loadTossPayments(clientKey);
        console.log("[TossPayments] SDK loaded");

        const customerKey = user!.id.replace(/[^a-zA-Z0-9\-_=.@]/g, "_");
        console.log("[TossPayments] Using customerKey:", customerKey);

        const widgets = tossPayments.widgets({ customerKey });
        widgetsRef.current = widgets;

        await widgets.setAmount({
          currency: "KRW",
          value: totalAmount,
        });
        console.log("[TossPayments] Amount set:", totalAmount);

        await Promise.all([
          widgets.renderPaymentMethods({
            selector: "#payment-method",
            variantKey: "DEFAULT",
          }),
          widgets.renderAgreement({
            selector: "#agreement",
            variantKey: "AGREEMENT",
          }),
        ]);

        console.log("[TossPayments] Widgets rendered successfully");
        setWidgetsReady(true);
      } catch (error) {
        console.error("[TossPayments] Widget init error:", error);
        setWidgetError(
          error instanceof Error ? error.message : "결제 위젯 초기화 실패"
        );
        initRef.current = false;
      }
    }

    initWidgets();
  }, [totalAmount]);

  // Update amount when totalAmount changes (after initial render)
  useEffect(() => {
    if (widgetsRef.current && widgetsReady && totalAmount > 0) {
      widgetsRef.current.setAmount({
        currency: "KRW",
        value: totalAmount,
      });
    }
  }, [totalAmount, widgetsReady]);

  const handlePayment = async () => {
    if (!widgetsRef.current) return;
    if (!address.trim()) {
      alert("배송지 주소를 입력해주세요.");
      return;
    }

    const orderId = `order-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const orderName =
      cartItems.length === 1
        ? cartItems[0].product?.name ?? "상품"
        : `${cartItems[0].product?.name ?? "상품"} 외 ${cartItems.length - 1}건`;

    try {
      await widgetsRef.current.requestPayment({
        orderId,
        orderName,
        successUrl: `${window.location.origin}/checkout/success`,
        failUrl: `${window.location.origin}/checkout/fail`,
        customerEmail: user.primaryEmailAddress?.emailAddress,
        customerName: user.fullName ?? undefined,
      });
    } catch (error: any) {
      console.error("[TossPayments] Payment request error:", error);
      if (error?.message?.includes("카드 결제 정보를 선택해주세요") || String(error).includes("카드 결제 정보를 선택해주세요")) {
        alert("결제 수단을 선택해주세요.");
      } else {
        alert("결제 요청 중 오류가 발생했습니다: " + (error?.message ?? "알 수 없는 오류"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4">주문/결제</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping Info */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">배송 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">수령인</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientNameOverride(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-lg-red focus:outline-none focus:ring-1 focus:ring-lg-red"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">연락처</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhoneOverride(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-lg-red focus:outline-none focus:ring-1 focus:ring-lg-red"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">배송지 주소 <span className="text-lg-red">*</span></label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddressOverride(e.target.value)}
                    required
                    placeholder="주소를 입력하세요"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-lg-red focus:outline-none focus:ring-1 focus:ring-lg-red"
                  />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">주문 상품</h2>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between py-4 text-sm first:pt-0 last:pb-0">
                    <span className="text-gray-700 font-medium">
                      {item.product?.name} <span className="text-gray-400 text-xs ml-1">x {item.quantity}</span>
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatPrice((item.product?.price ?? 0) * item.quantity)}원
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Widget */}
            {widgetError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                결제 위젯 로딩 실패: {widgetError}
              </div>
            )}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div id="payment-method"></div>
              <div id="agreement"></div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">결제 금액</h2>
              <div className="mb-4 space-y-3 text-sm border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalAmount)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">배송비</span>
                  <span className="font-medium text-gray-900">무료</span>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">총 결제금액</span>
                  <span className="text-2xl font-bold text-lg-red">{formatPrice(totalAmount)}원</span>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={!widgetsReady}
                className="w-full rounded-lg bg-lg-red py-4 font-bold text-white transition hover:bg-lg-red-dark hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {widgetsReady ? `${formatPrice(totalAmount)}원 결제하기` : "결제 준비 중..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
