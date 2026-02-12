import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PuriAir - 스마트 욕실 환기 시스템",
  description: "AI 기반 자동 환기로 쾌적한 욕실 환경을 24시간 유지합니다",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
