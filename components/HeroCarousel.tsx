"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const slides = [
    {
        id: 1,
        title: "Galaxy S25 Ultra",
        subtitle: "AI가 당신의 일상을 혁신합니다",
        description: "티타늄 프레임과 2억 화소 카메라로 완성된 압도적인 성능. Galaxy AI와 함께 새로운 모바일 경험을 시작하세요.",
        image: "https://images.unsplash.com/photo-1738830251513-a7bfef4b53c6?q=80&w=1200&auto=format&fit=crop",
        bgColor: "bg-gradient-to-br from-indigo-900 to-slate-900",
        accentColor: "text-indigo-300",
        titleColor: "text-white",
        descColor: "text-gray-200",
        buttonColor: "bg-white text-indigo-900 hover:bg-indigo-50",
        link: "/products?category=smartphones",
    },
    {
        id: 2,
        title: "MacBook Pro 16",
        subtitle: "전문가를 위한 궁극의 도구",
        description: "M4 Pro 칩셋의 강력한 퍼포먼스. Liquid Retina XDR 디스플레이가 선사하는 경이로운 화질을 경험해보세요.",
        image: "https://images.unsplash.com/photo-1639087595550-e9770a85f8c0?q=80&w=1200&auto=format&fit=crop",
        bgColor: "bg-gradient-to-br from-gray-200 to-slate-300",
        accentColor: "text-gray-900",
        titleColor: "text-gray-900",
        descColor: "text-gray-600",
        buttonColor: "bg-gray-900 text-white hover:bg-black",
        link: "/products?category=laptops",
    },
    {
        id: 3,
        title: "Sony WH-1000XM5",
        subtitle: "소음은 사라지고, 음악만 남습니다",
        description: "업계 최고 수준의 노이즈 캔슬링. 하루 종일 편안한 착용감과 30시간 지속되는 배터리로 몰입의 즐거움을 느껴보세요.",
        image: "/images/sony-wh1000xm5.jpg",
        bgColor: "bg-gradient-to-br from-rose-50 to-pink-100",
        accentColor: "text-slate-600",
        titleColor: "text-gray-900",
        descColor: "text-gray-600",
        buttonColor: "bg-slate-800 text-white hover:bg-slate-900",
        link: "/products?category=audio",
    },
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Auto-play styles
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    // Animation effect on slide change
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Reset positions
            gsap.set(textRef.current, { opacity: 0, x: -50 });
            gsap.set(imageRef.current, { opacity: 0, x: 50, scale: 0.98 });

            // Animate in
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(textRef.current, { opacity: 1, x: 0, duration: 0.8 })
                .to(imageRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.8 }, "-=0.6");
        }, slideRef);

        return () => ctx.revert();
    }, [currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const currentSlide = slides[currentIndex];

    return (
        <div ref={slideRef} className={`relative overflow-hidden transition-colors duration-700 ${currentSlide.bgColor}`}>
            <div className="mx-auto flex min-h-[500px] max-w-7xl flex-col-reverse items-center justify-between px-6 py-20 md:flex-row md:gap-12 md:py-24">

                {/* Text Content */}
                <div ref={textRef} className="flex flex-1 flex-col items-start gap-6 opacity-0 md:max-w-xl z-10">
                    <span className={`text-sm font-bold tracking-wider uppercase ${currentSlide.accentColor}`}>
                        {currentSlide.subtitle}
                    </span>
                    <h1 className={`text-4xl font-bold leading-tight md:text-5xl lg:text-6xl ${currentSlide.titleColor}`}>
                        {currentSlide.title}
                    </h1>
                    <p className={`text-lg leading-relaxed md:text-xl ${currentSlide.descColor}`}>
                        {currentSlide.description}
                    </p>
                    <div className="mt-4 flex gap-4">
                        <Link
                            href={currentSlide.link}
                            className={`rounded-full px-8 py-4 text-base font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 ${currentSlide.buttonColor}`}
                        >
                            자세히 보기
                        </Link>
                        <Link
                            href="/products"
                            className={`rounded-full border px-8 py-4 text-base font-semibold transition-all hover:bg-white/10 ${currentSlide.id === 1 ? 'border-indigo-400 text-indigo-100' : 'border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            전체 카테고리
                        </Link>
                    </div>
                </div>

                {/* Image Content - Lifestyle/Product Shot */}
                <div ref={imageRef} className="relative flex flex-1 items-center justify-center w-full h-[400px] md:h-[500px]">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/800x800/e0e0e0/999999?text=Image+Unavailable";
                            }}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-gray-800" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Arrow Controls */}
            <div className="absolute bottom-8 right-8 hidden items-center gap-4 md:flex z-20">
                <button
                    onClick={handlePrev}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition hover:bg-white hover:shadow-md"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={handleNext}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition hover:bg-white hover:shadow-md"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}
