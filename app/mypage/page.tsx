"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function MyPage() {
  const { user } = useUser();
  const dbUser = useQuery(
    api.users.getByClerkId,
    user ? { clerkId: user.id } : "skip"
  );
  const updateProfile = useMutation(api.users.updateProfile);

  const [nameOverride, setNameOverride] = useState<string | null>(null);
  const [phoneOverride, setPhoneOverride] = useState<string | null>(null);
  const [addressOverride, setAddressOverride] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const name = nameOverride ?? dbUser?.name ?? "";
  const phone = phoneOverride ?? dbUser?.phone ?? "";
  const address = addressOverride ?? dbUser?.address ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await updateProfile({
      clerkId: user.id,
      name,
      phone,
      address,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (dbUser === undefined) {
    return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">내 정보 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">
            이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setNameOverride(e.target.value)}
            className="w-full rounded-xl border border-border-color/50 bg-surface-light px-4 py-2 text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">
            이메일
          </label>
          <input
            type="email"
            value={dbUser?.email ?? ""}
            disabled
            className="w-full rounded-xl border border-border-color/50 bg-surface px-4 py-2 text-gray-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">
            전화번호
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhoneOverride(e.target.value)}
            placeholder="010-0000-0000"
            className="w-full rounded-xl border border-border-color/50 bg-surface-light px-4 py-2 text-foreground placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-400">
            배송지 주소
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddressOverride(e.target.value)}
            placeholder="주소를 입력하세요"
            className="w-full rounded-xl border border-border-color/50 bg-surface-light px-4 py-2 text-foreground placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-blue py-3 font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        >
          {saved ? "저장되었습니다!" : "저장하기"}
        </button>
      </form>
    </div>
  );
}
