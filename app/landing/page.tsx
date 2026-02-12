"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ───────────── Icon Components ───────────── */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L3 7v5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 6-6" />
    </svg>
  );
}

function AirflowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
      <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
      <path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

/* ───────────── Main Landing Page ───────────── */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Nav ── */
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      /* ── Hero ── */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-badge", { y: 30, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 60, opacity: 0, duration: 1 }, "-=0.4")
        .from(".hero-subtitle", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-product", { scale: 0.8, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.8")
        .from(".hero-stat", { y: 30, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.5");

      /* ── Floating animation for hero product ── */
      gsap.to(".hero-product", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* ── Problem Section ── */
      gsap.from(".problem-title", {
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".problem-card", {
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });

      /* ── Solution Section ── */
      gsap.from(".solution-title", {
        scrollTrigger: {
          trigger: solutionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".solution-item", {
        scrollTrigger: {
          trigger: solutionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        x: -80,
        opacity: 0,
        stagger: 0.25,
        duration: 0.9,
        ease: "power2.out",
      });

      gsap.from(".solution-visual", {
        scrollTrigger: {
          trigger: solutionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      /* ── Features Grid ── */
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      });

      /* ── CTA Section ── */
      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      /* ── Parallax background elements ── */
      gsap.utils.toArray<HTMLElement>(".parallax-orb").forEach((orb) => {
        gsap.to(orb, {
          scrollTrigger: {
            trigger: orb,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -150,
          ease: "none",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-background">
      {/* ===== Navigation ===== */}
      <nav
        ref={navRef}
        className="fixed top-0 z-50 w-full border-b border-border-color/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple">
              <AirflowIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Puri<span className="text-neon-cyan">Air</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#problem" className="text-sm text-gray-400 transition hover:text-neon-cyan">문제점</a>
            <a href="#solution" className="text-sm text-gray-400 transition hover:text-neon-cyan">솔루션</a>
            <a href="#features" className="text-sm text-gray-400 transition hover:text-neon-cyan">기능</a>
            <a href="#cta" className="text-sm text-gray-400 transition hover:text-neon-cyan">구매</a>
          </div>
          <Link
            href="/products"
            className="rounded-full border border-neon-cyan/50 px-5 py-2 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            제품 보기
          </Link>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section
        ref={heroRef}
        className="relative grid-bg flex min-h-screen items-center pt-20"
      >
        {/* Background orbs */}
        <div className="parallax-orb absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="parallax-orb absolute right-[-5%] top-[40%] h-[400px] w-[400px] rounded-full bg-neon-cyan/10 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          {/* Left content */}
          <div className="relative z-10">
            <div className="hero-badge mb-6 inline-block rounded-full border border-neon-pink/30 bg-neon-pink/10 px-4 py-1.5">
              <span className="text-sm font-medium text-neon-pink">출시 기념 특별가</span>
            </div>
            <h1 className="hero-title mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              스마트 욕실 환기
              <br />
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                바스에어시스템
              </span>
            </h1>
            <p className="hero-subtitle mb-8 max-w-lg text-lg leading-relaxed text-gray-400">
              환기 걱정 없는 욕실 관리의 시작. AI 기반 자동 환기로 쾌적한 욕실 환경을
              24시간 유지합니다.
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-8 py-3.5 font-medium text-black transition hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              >
                지금 구매하기
                <svg className="h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#solution"
                className="inline-flex items-center gap-2 rounded-full border border-border-color px-8 py-3.5 font-medium text-gray-300 transition hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                자세히 보기
              </a>
            </div>
          </div>

          {/* Right — Product visual */}
          <div className="hero-product relative flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-cyan/20 via-transparent to-neon-purple/20 blur-2xl" />
              {/* Product placeholder */}
              <div className="absolute inset-6 flex flex-col items-center justify-center rounded-3xl border border-border-color/60 bg-surface-light/80 backdrop-blur-sm">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-6">
                  <AirflowIcon className="h-20 w-20 text-neon-cyan" />
                </div>
                <span className="text-sm font-medium text-gray-400">PuriCare</span>
                <span className="text-xl font-bold text-white">Bath Air System</span>
                <div className="mt-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-neon-cyan" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-400">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="absolute bottom-12 left-0 right-0">
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-6">
            {[
              { value: "99.9%", label: "공기질 개선율" },
              { value: "24dB", label: "초저소음 운전" },
              { value: "IoT", label: "스마트 연동" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="hero-stat rounded-2xl border border-border-color/50 bg-surface/80 px-6 py-4 text-center backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-neon-cyan neon-text-cyan md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-500 md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Problem Section ===== */}
      <section id="problem" ref={problemRef} className="relative py-28">
        <div className="parallax-orb absolute right-[-15%] top-[30%] h-[400px] w-[400px] rounded-full bg-neon-pink/5 blur-[100px]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="problem-title mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-neon-pink">
              Problem
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              당신의 욕실, 정말 <span className="text-neon-pink neon-text-pink">안전</span>한가요?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              대부분의 욕실은 적절한 환기 시스템 없이 습기와 곰팡이에 노출되어 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: "💧",
                title: "습기 & 곰팡이",
                desc: "평균 욕실 습도 85% 이상. 곰팡이 발생 위험이 일반 공간의 3배에 달합니다.",
                color: "from-red-500/20 to-orange-500/20",
                borderColor: "border-red-500/20",
              },
              {
                icon: "🫁",
                title: "호흡기 건강 위협",
                desc: "밀폐된 욕실의 유해가스와 미세먼지가 호흡기 질환의 원인이 됩니다.",
                color: "from-orange-500/20 to-yellow-500/20",
                borderColor: "border-orange-500/20",
              },
              {
                icon: "⚡",
                title: "비효율적 환기",
                desc: "기존 환풍기의 소음과 낮은 효율. 에너지 낭비와 불편함이 동시에 발생합니다.",
                color: "from-yellow-500/20 to-red-500/20",
                borderColor: "border-yellow-500/20",
              },
            ].map((problem) => (
              <div
                key={problem.title}
                className={`problem-card group rounded-2xl border ${problem.borderColor} bg-surface p-8 transition-all duration-300 hover:-translate-y-2 hover:border-neon-pink/40 hover:shadow-[0_0_30px_rgba(255,45,149,0.1)]`}
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${problem.color} text-2xl`}
                >
                  {problem.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{problem.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Solution Section ===== */}
      <section id="solution" ref={solutionRef} className="relative py-28">
        <div className="parallax-orb absolute left-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-neon-cyan/5 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="solution-title mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-neon-cyan">
              Solution
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                PuriAir
              </span>
              가 해결합니다
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              AI 기반 스마트 환기 시스템으로 욕실 환경을 자동으로 최적화합니다
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Solution items */}
            <div className="space-y-8">
              {[
                {
                  icon: <ShieldIcon className="h-6 w-6" />,
                  title: "99.9% 유해물질 제거",
                  desc: "HEPA 필터와 UV-C 살균으로 공기 중 세균, 곰팡이 포자를 완벽 차단합니다.",
                  color: "text-neon-cyan",
                  bgColor: "bg-neon-cyan/10",
                  borderColor: "border-neon-cyan/20",
                },
                {
                  icon: <BoltIcon className="h-6 w-6" />,
                  title: "AI 자동 환기 제어",
                  desc: "온습도 센서가 실시간으로 욕실 상태를 감지하고 최적의 환기를 자동 실행합니다.",
                  color: "text-neon-purple",
                  bgColor: "bg-neon-purple/10",
                  borderColor: "border-neon-purple/20",
                },
                {
                  icon: <ChartIcon className="h-6 w-6" />,
                  title: "에너지 효율 극대화",
                  desc: "인버터 BLDC 모터로 기존 대비 40% 에너지 절감. 초저소음 24dB 운전.",
                  color: "text-neon-blue",
                  bgColor: "bg-neon-blue/10",
                  borderColor: "border-neon-blue/20",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`solution-item group flex gap-5 rounded-2xl border ${item.borderColor} bg-surface p-6 transition-all duration-300 hover:-translate-x-1 hover:border-opacity-60 hover:shadow-lg`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bgColor} ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Solution visual */}
            <div className="solution-visual relative flex items-center justify-center">
              <div className="relative h-[400px] w-full max-w-[450px]">
                {/* Ambient glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 blur-3xl" />
                {/* Main card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-border-color/50 bg-surface-light/50 backdrop-blur-sm">
                  {/* Dashboard mockup */}
                  <div className="w-full max-w-[320px] space-y-4 px-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">실시간 욕실 모니터</span>
                      <span className="flex items-center gap-1 text-xs text-green-400">
                        <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                        정상
                      </span>
                    </div>
                    {/* Metrics */}
                    {[
                      { label: "온도", value: "24°C", percent: 60, color: "bg-neon-cyan" },
                      { label: "습도", value: "45%", percent: 45, color: "bg-neon-purple" },
                      { label: "공기질", value: "좋음", percent: 90, color: "bg-green-400" },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-gray-500">{m.label}</span>
                          <span className="text-white">{m.value}</span>
                        </div>
                        <div className="h-2 rounded-full bg-border-color/50">
                          <div
                            className={`h-2 rounded-full ${m.color}`}
                            style={{ width: `${m.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    {/* Mode buttons */}
                    <div className="flex gap-2 pt-2">
                      {["자동", "수동", "절전"].map((mode, i) => (
                        <button
                          key={mode}
                          className={`flex-1 rounded-lg py-2 text-xs font-medium transition ${
                            i === 0
                              ? "bg-neon-cyan/20 text-neon-cyan neon-glow-cyan"
                              : "bg-border-color/30 text-gray-500 hover:text-gray-300"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Grid ===== */}
      <section id="features" ref={featuresRef} className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-neon-purple">
              Features
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              핵심 기능
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: <AirflowIcon className="h-8 w-8" />, label: "스마트 환기", color: "text-neon-cyan", border: "hover:border-neon-cyan/40" },
              { icon: <ShieldIcon className="h-8 w-8" />, label: "UV-C 살균", color: "text-neon-purple", border: "hover:border-neon-purple/40" },
              { icon: <LeafIcon className="h-8 w-8" />, label: "에코 모드", color: "text-green-400", border: "hover:border-green-400/40" },
              { icon: <WifiIcon className="h-8 w-8" />, label: "IoT 연동", color: "text-neon-blue", border: "hover:border-neon-blue/40" },
              { icon: <BoltIcon className="h-8 w-8" />, label: "인버터 모터", color: "text-yellow-400", border: "hover:border-yellow-400/40" },
              { icon: <ChartIcon className="h-8 w-8" />, label: "실시간 모니터", color: "text-neon-pink", border: "hover:border-neon-pink/40" },
              {
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v1m0 16v1m8.66-13.5l-.87.5M4.21 16.5l-.87.5M20.66 16.5l-.87-.5M4.21 7.5l-.87-.5M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                label: "건조 모드",
                color: "text-orange-400",
                border: "hover:border-orange-400/40",
              },
              {
                icon: (
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zM12 8v4l3 3" />
                  </svg>
                ),
                label: "예약 운전",
                color: "text-teal-400",
                border: "hover:border-teal-400/40",
              },
            ].map((feat) => (
              <div
                key={feat.label}
                className={`feature-card group flex flex-col items-center gap-3 rounded-2xl border border-border-color/40 bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 ${feat.border} hover:shadow-lg`}
              >
                <div className={`${feat.color} transition group-hover:scale-110`}>{feat.icon}</div>
                <span className="text-sm font-medium text-gray-300">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section id="cta" ref={ctaRef} className="relative py-28">
        <div className="parallax-orb absolute left-[30%] top-[10%] h-[500px] w-[500px] rounded-full bg-neon-cyan/5 blur-[120px]" />
        <div className="parallax-orb absolute right-[20%] top-[50%] h-[400px] w-[400px] rounded-full bg-neon-purple/5 blur-[100px]" />

        <div className="mx-auto max-w-4xl px-6">
          <div className="cta-content relative overflow-hidden rounded-3xl border border-border-color/50 bg-surface p-12 text-center md:p-20">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5" />
            <div className="relative z-10">
              <span className="mb-6 inline-block rounded-full bg-neon-cyan/10 px-4 py-1.5 text-sm font-medium text-neon-cyan">
                출시 기념 30% 할인
              </span>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                지금 시작하세요
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-gray-400">
                스마트한 욕실 환기의 새로운 기준. 지금 구매하시면 무료 설치와 함께
                1년 필터 교체 서비스를 제공합니다.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-10 py-4 text-lg font-bold text-black transition hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
                >
                  구매하기
                  <svg className="h-5 w-5 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-border-color px-10 py-4 text-lg font-medium text-gray-300 transition hover:border-neon-purple/50 hover:text-neon-purple"
                >
                  상담 신청
                </a>
              </div>
              <p className="mt-6 text-xs text-gray-600">
                * 설치비 무료 | 2년 보증 | 30일 이내 전액 환불 가능
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border-color/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple">
                <AirflowIcon className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">
                Puri<span className="text-neon-cyan">Air</span>
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="transition hover:text-neon-cyan">이용약관</a>
              <a href="#" className="transition hover:text-neon-cyan">개인정보처리방침</a>
              <a href="#" className="transition hover:text-neon-cyan">고객센터</a>
            </div>
            <span className="text-xs text-gray-600">&copy; 2026 PuriAir. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
