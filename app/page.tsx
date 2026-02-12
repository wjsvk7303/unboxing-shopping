"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Laptop, Tablet, Headphones, Watch, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categoryLabels: Record<string, string> = {
  smartphones: "스마트폰",
  laptops: "노트북",
  tablets: "태블릿",
  audio: "이어폰/헤드폰",
  smartwatches: "스마트워치",
};

// Updated icons to be Lucide React components
// Updated icons to be Lucide React components
// Mapping multiple variations of slugs to ensure icons always appear
const categoryIconComponents: Record<string, React.ReactNode> = {
  // Smartphones
  smartphone: <Smartphone size={24} />,
  smartphones: <Smartphone size={24} />,
  phone: <Smartphone size={24} />,

  // Laptops
  laptop: <Laptop size={24} />,
  laptops: <Laptop size={24} />,
  computer: <Laptop size={24} />,

  // Tablets
  tablet: <Tablet size={24} />,
  tablets: <Tablet size={24} />,
  ipad: <Tablet size={24} />,

  // Audio
  audio: <Headphones size={24} />,
  headphone: <Headphones size={24} />,
  headphones: <Headphones size={24} />,
  earbuds: <Headphones size={24} />,

  // Smartwatches
  smartwatch: <Watch size={24} />,
  smartwatches: <Watch size={24} />,
  watch: <Watch size={24} />,
};

export default function Home() {
  const { isSignedIn, user } = useUser();
  const categories = useQuery(api.categories.list);
  const products = useQuery(api.products.list, {});
  const createOrUpdateUser = useMutation(api.users.createOrUpdate);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSignedIn && user) {
      createOrUpdateUser({
        clerkId: user.id,
        name: user.fullName ?? user.firstName ?? "사용자",
        email: user.primaryEmailAddress?.emailAddress ?? "",
      });
    }
  }, [isSignedIn, user, createOrUpdateUser]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Product cards
      gsap.from(".product-card-anim", {
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [categories, products]);

  const featuredProducts = products?.slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Categories */}
      <section ref={categoriesRef} className="mx-auto max-w-7xl px-4 py-8">
        {/* Heading removed to save space */}
        <div className="grid grid-cols-5 gap-3 md:gap-6">
          {[
            { _id: "1", name: "스마트폰", slug: "smartphones" },
            { _id: "2", name: "노트북", slug: "laptops" },
            { _id: "3", name: "태블릿", slug: "tablets" },
            { _id: "4", name: "오디오", slug: "audio" },
            { _id: "5", name: "워치", slug: "smartwatches" },
          ].map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${cat.slug}`}
              className="category-card group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lg-red/30 hover:shadow-md"
            >
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors group-hover:bg-lg-red/10 group-hover:text-lg-red">
                {categoryIconComponents[cat.slug?.toLowerCase()] ?? <Package size={24} />}
              </div>
              <span className="text-sm font-medium text-gray-600 transition group-hover:text-lg-red">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">베스트 추천 상품</h2>
              <p className="mt-2 text-gray-600">지금 가장 인기 있는 제품들을 놓치지 마세요.</p>
            </div>
            <Link href="/products" className="group flex items-center text-sm font-medium text-lg-red hover:text-lg-red-dark">
              전체보기
              <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featuredProducts?.map((product) => (
              <div key={product._id} className="product-card-anim h-full">
                <ProductCard
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  category={categoryLabels[product.category] ?? product.category}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
