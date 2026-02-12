"use client";

import Link from "next/link";
import { useUser, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";

export default function Header() {
  const { isSignedIn, user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const cartItems = useQuery(
    api.cart.getItems,
    isSignedIn && user ? { userId: user.id } : "skip"
  );
  const dbUser = useQuery(
    api.users.getByClerkId,
    isSignedIn && user ? { clerkId: user.id } : "skip"
  );

  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchIconClick = (e: React.MouseEvent) => {
    if (!isSearchVisible) {
      e.preventDefault(); // Prevent form submit if it's a submit button
      setIsSearchVisible(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else if (!searchQuery.trim()) {
      e.preventDefault();
      setIsSearchVisible(false);
    }
    // If visible and has query, let the form submit naturally
  };

  return (
    <header className="sticky top-0 z-50 flex flex-col border-b border-gray-200 bg-white shadow-sm">
      {/* Top Row: Logo & Utilities */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <img
              src="/UNBOXING.png"
              alt="UNBOXING Logo"
              className="h-9 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-bold text-gray-600 ml-1">스토어</span>
          </Link>

          {/* Desktop Utilities */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchVisible(false)}
                placeholder="검색"
                className={`border-b border-gray-300 bg-transparent py-1 text-sm text-gray-900 transition-all duration-300 focus:border-lg-red focus:outline-none placeholder-transparent focus:placeholder-gray-400 ${isSearchVisible ? "w-48 opacity-100 px-2" : "w-0 opacity-0 px-0"
                  }`}
              />
              <button
                type="submit"
                onClick={handleSearchIconClick}
                className={`text-gray-900 hover:text-lg-red transition-colors ${isSearchVisible ? "text-lg-red" : ""}`}
              >
                <Search size={24} strokeWidth={2} />
              </button>
            </form>

            <div
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <button
                className="flex items-center text-gray-900 hover:text-lg-red focus:outline-none py-2"
              >
                <div className="relative">
                  <User size={24} strokeWidth={2} />
                  {isSignedIn && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lg-red ring-2 ring-white" />
                  )}
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute left-1/2 top-full mt-1 w-40 -translate-x-1/2 origin-top rounded-lg border border-gray-100 bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="p-1">
                    {isSignedIn ? (
                      <>
                        <Link
                          href="/mypage"
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-lg-red"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          마이페이지
                        </Link>
                        <div className="h-px bg-gray-100 my-1" />
                        <div
                          className="block w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-lg-red"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <SignOutButton>
                            <button className="w-full text-left">로그아웃</button>
                          </SignOutButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/sign-in"
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-lg-red"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          로그인
                        </Link>
                        <Link
                          href="/sign-up"
                          className="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-lg-red"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          회원가입
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" className="relative text-gray-900 hover:text-lg-red">
              <ShoppingCart size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-lg-red text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="h-4 w-px bg-gray-300 mx-2"></div>

            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <Link href="#" className="hover:text-lg-red">회사소개</Link>
              <span className="text-gray-300">|</span>
              <Link href="#" className="hover:text-lg-red">사업자몰</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Navigation & Brand Pill */}
      <div className="hidden border-b border-gray-100 bg-white md:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-3">
          {/* Main Navigation */}
          <nav className="flex items-center gap-8 text-[15px] font-bold text-gray-900">
            <Link href="/products" className="hover:text-lg-red">전체 상품</Link>
            <Link href="/products?category=smartphones" className="hover:text-lg-red">스마트폰</Link>
            <Link href="/products?category=laptops" className="hover:text-lg-red">노트북</Link>
            <Link href="/products?category=tablets" className="hover:text-lg-red">태블릿</Link>
            <Link href="/products?category=audio" className="hover:text-lg-red">오디오</Link>
            <Link href="/products?category=smartwatches" className="hover:text-lg-red">스마트워치</Link>
          </nav>

          {/* Brand Collection Pill */}

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white p-4">
          <nav className="flex flex-col gap-4 text-sm font-medium text-gray-900">
            <Link href="/products" onClick={() => setIsMenuOpen(false)}>전체 상품</Link>
            <Link href="/products?category=smartphones" onClick={() => setIsMenuOpen(false)}>스마트폰</Link>
            <Link href="/products?category=laptops" onClick={() => setIsMenuOpen(false)}>노트북</Link>
            <Link href="/products?category=tablets" onClick={() => setIsMenuOpen(false)}>태블릿</Link>
            <Link href="/products?category=audio" onClick={() => setIsMenuOpen(false)}>오디오</Link>
            <Link href="/products?category=smartwatches" onClick={() => setIsMenuOpen(false)}>스마트워치</Link>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)}>장바구니 ({cartCount})</Link>
            {isSignedIn ? (
              <div className="flex items-center justify-between">
                <Link href="/mypage" onClick={() => setIsMenuOpen(false)}>마이페이지</Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="text-left">로그인</button>
              </SignInButton>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
