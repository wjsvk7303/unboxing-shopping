"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser, useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";

const categoryLabels: Record<string, string> = {
  smartphones: "스마트폰",
  laptops: "노트북",
  tablets: "태블릿",
  audio: "이어폰/헤드폰",
  smartwatches: "스마트워치",
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  // Removed quantity state as per new design request
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "qa">("details");

  const product = useQuery(api.products.getById, {
    id: params.id as Id<"products">,
  });
  const addToCart = useMutation(api.cart.add);

  // Inquiry Logic
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryContent, setInquiryContent] = useState("");

  const inquiries = useQuery(api.inquiries.listByProduct, product ? { productId: product._id } : "skip");
  const createInquiry = useMutation(api.inquiries.create);
  const answerInquiry = useMutation(api.inquiries.answer);

  // Admin logic
  const convexUser = useQuery(api.users.getByClerkId, user ? { clerkId: user.id } : "skip");
  const [replyingTo, setReplyingTo] = useState<Id<"inquiries"> | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAnswerSubmit = async (inquiryId: Id<"inquiries">) => {
    if (!replyContent.trim()) return;
    try {
      await answerInquiry({ inquiryId, content: replyContent });
      setReplyingTo(null);
      setReplyContent("");
      alert("답변이 등록되었습니다.");
    } catch (e) {
      console.error(e);
      alert("답변 등록 실패");
    }
  };

  const handleSubmitInquiry = async () => {
    if (!isSignedIn || !user || !product) {
      alert("로그인이 필요하거나 상품 정보를 불러올 수 없습니다.");
      return;
    }

    if (inquiryContent.trim().length < 5) {
      alert("문의 내용을 5자 이상 입력해주세요.");
      return;
    }

    try {
      const token = await getToken({ template: "convex" });
      console.log("Auth Debug:", {
        isSignedIn,
        userId: user.id,
        hasToken: !!token,
        tokenPreview: token ? token.substring(0, 20) + "..." : "none"
      });

      if (!token) {
        alert("인증 토큰을 가져올 수 없습니다. 다시 로그인해주세요.");
        return;
      }

      console.log("Submitting inquiry:", { productId: product._id, content: inquiryContent });
      await createInquiry({
        productId: product._id,
        content: inquiryContent,
      });

      setInquiryContent("");
      setIsInquiryModalOpen(false);
      alert("문의가 등록되었습니다.");
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      alert("문의 등록에 실패했습니다. 다시 시도해주세요.\n" + error);
    }
  };

  if (product === undefined) {
    return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  }

  if (product === null) {
    return <div className="py-20 text-center text-gray-500">상품을 찾을 수 없습니다.</div>;
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  const handleAddToCart = async () => {
    if (!isSignedIn || !user) {
      router.push("/sign-in");
      return;
    }
    await addToCart({
      userId: user.id,
      productId: product._id,
      quantity: 1,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = async () => {
    if (!isSignedIn || !user) {
      router.push("/sign-in");
      return;
    }
    await addToCart({
      userId: user.id,
      productId: product._id,
      quantity: 1,
    });
    router.push("/cart");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Product Summary Section */}
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-2xl bg-surface-light border border-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm font-medium text-lg-red">
            {categoryLabels[product.category] ?? product.category}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {product.name}
          </h1>
          <p className="mb-6 text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}<span className="text-xl font-normal text-gray-500 ml-1">원</span>
          </p>
          <p className="mb-8 text-lg text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <div className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            재고: <span className="font-medium text-gray-900">{product.stock > 0 ? `${product.stock}개` : "품절"}</span>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all ${isLiked
                  ? "border-lg-red bg-lg-red text-white shadow-lg shadow-red-200"
                  : "border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-600"
                  }`}
              >
                <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-xl border border-gray-200 bg-white text-lg font-semibold text-gray-900 transition-all hover:bg-gray-50 hover:border-gray-300"
              >
                {addedToCart ? "담기 완료!" : "장바구니 담기"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 h-14 rounded-xl bg-gray-900 text-lg font-bold text-white shadow-lg transition-all hover:bg-black hover:shadow-xl active:scale-95"
              >
                구매하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mt-20 border-b border-gray-200">
        <nav className="flex gap-8">
          {(["details", "reviews", "qa"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-lg font-medium transition-all ${activeTab === tab
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab === "details" && "상세정보"}
              {tab === "reviews" && "리뷰 (12)"}
              {tab === "qa" && `문의 (${inquiries ? inquiries.length : 0})`}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-12">
        {activeTab === "details" && (
          <div className="mx-auto max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Long Description */}
            {product.longDescription && (
              <div
                className="prose prose-lg max-w-none text-gray-700 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>p]:mb-6 [&>p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            )}

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="rounded-2xl bg-gray-50 p-8">
                <h3 className="mb-6 text-xl font-bold text-gray-900">주요 특징</h3>
                <ul className="space-y-3">
                  {product.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-lg-red shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs Table */}
            {product.specs && (
              <div>
                <h3 className="mb-6 text-xl font-bold text-gray-900">제품 사양</h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <tbody className="divide-y divide-gray-200">
                      {product.specs.map((spec: any) => (
                        <tr key={spec.label} className="bg-white hover:bg-gray-50/50">
                          <th className="w-1/3 bg-gray-50/50 px-6 py-4 font-medium text-gray-500">{spec.label}</th>
                          <td className="px-6 py-4 text-gray-900">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mock Reviews */}
        {activeTab === "reviews" && (
          <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">구매자 리뷰</h3>
                <p className="text-gray-500">12개의 소중한 후기가 있습니다.</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-900">4.8</div>
                <div className="flex text-yellow-400">★★★★★</div>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div>
                        <div className="font-medium text-gray-900">김*수</div>
                        <div className="text-xs text-gray-400">2024.02.1{i}</div>
                      </div>
                    </div>
                    <div className="flex text-sm text-yellow-400">★★★★★</div>
                  </div>
                  <p className="text-gray-600">
                    배송도 빠르고 제품 상태도 너무 좋습니다. 고민했는데 사길 잘한 것 같아요!
                    패키징도 꼼꼼하고 설명서도 잘 되어있어서 만족합니다.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Q&A Section */}
        {activeTab === "qa" && (
          <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">상품 문의</h3>
              <button
                onClick={() => {
                  if (!isSignedIn) {
                    router.push("/sign-in");
                    return;
                  }
                  setIsInquiryModalOpen(true);
                }}
                className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-black transition-colors"
              >
                문의하기
              </button>
            </div>

            <div className="space-y-4">
              {inquiries === undefined ? (
                <div className="text-center py-8 text-gray-500">문의 내역을 불러오는 중...</div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl text-gray-500">
                  아직 등록된 문의가 없습니다. 첫 번째 문의를 남겨보세요!
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <div key={inquiry._id} className="rounded-xl border border-gray-100 bg-white p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`rounded px-2 py-0.5 text-xs font-medium ${inquiry.answer ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                          }`}>
                          {inquiry.answer ? "답변완료" : "답변대기"}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {inquiry.userName ? inquiry.userName.slice(0, 1) + "**" : "익명"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{inquiry.content}</p>
                    {inquiry.answer && (
                      <div className="mt-4 rounded-lg bg-gray-50 p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg-red text-sm">판매자 답변</span>
                          {inquiry.answeredAt && (
                            <span className="text-xs text-gray-400">
                              {new Date(inquiry.answeredAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{inquiry.answer}</p>
                      </div>
                    )}

                    {/* Admin Reply UI */}
                    {convexUser?.role === "admin" && (
                      <div className="mt-4">
                        {replyingTo === inquiry._id ? (
                          <div className="space-y-2">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                              placeholder="답변을 입력하세요"
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAnswerSubmit(inquiry._id as Id<"inquiries">)}
                                className="rounded bg-gray-900 px-3 py-1 text-xs text-white"
                              >
                                저장
                              </button>
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyContent("");
                                }}
                                className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-600"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setReplyingTo(inquiry._id as Id<"inquiries">);
                              setReplyContent(inquiry.answer || "");
                            }}
                            className="text-xs font-medium text-blue-600 hover:text-blue-800"
                          >
                            {inquiry.answer ? "답변 수정" : "답변 작성"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Inquiry Modal */}
            {isInquiryModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">상품 문의 작성</h3>
                  <textarea
                    value={inquiryContent}
                    onChange={(e) => setInquiryContent(e.target.value)}
                    placeholder="문의하실 내용을 입력해주세요. (최소 10자 이상)"
                    className="w-full h-40 rounded-xl border border-gray-200 p-4 text-sm resize-none focus:border-gray-900 focus:outline-none"
                  />
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setIsInquiryModalOpen(false)}
                      className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSubmitInquiry}
                      disabled={!inquiryContent.trim() || inquiryContent.length < 5}
                      className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      등록하기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
