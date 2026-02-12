
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Heart, Clock } from "lucide-react";

export default function MyPageSidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            label: "내 정보",
            href: "/mypage",
            icon: User,
            exact: true,
        },
        {
            label: "주문/배송 내역",
            href: "/mypage/orders",
            icon: Package,
        },
        {
            label: "찜한 상품",
            href: "/mypage/wishlist",
            icon: Heart,
        },
        {
            label: "최근 본 상품",
            href: "/mypage/recent",
            icon: Clock,
        },
    ];

    return (
        <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">마이페이지</h2>
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${isActive
                                        ? "bg-lg-red text-white shadow-md shadow-lg-red/20"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
