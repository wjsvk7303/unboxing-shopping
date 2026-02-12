
import MyPageSidebar from "@/components/MyPageSidebar";

export default function MyPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:flex-row lg:gap-12">
            <MyPageSidebar />
            <main className="flex-1 min-w-0">{children}</main>
        </div>
    );
}
