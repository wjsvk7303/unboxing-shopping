export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-1">
              <img
                src="/UNBOXING.png"
                alt="UNBOXING Logo"
                className="h-7 object-contain"
              />
              <span className="text-xl font-bold text-gray-600">스토어</span>
            </div>
            <p className="max-w-xs text-sm text-gray-600">
              혁신적인 기술과 최고의 품질로 새로운 일상을 경험하세요.
              UNBOXING은 최신 전자제품을 가장 합리적인 가격으로 제공합니다.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold text-gray-900">고객 지원</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">전화: 1544-7777</p>
              <p className="text-sm text-gray-600">이메일: help@unboxing.store</p>
              <p className="text-sm text-gray-600">평일: 09:00 - 18:00</p>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold text-gray-900">About</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">회사 소개</p>
              <p className="text-sm text-gray-600">인재 채용</p>
              <p className="text-sm text-gray-600">이용 약관</p>
              <p className="text-sm text-gray-600">개인정보처리방침</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row">
          <p>&copy; 2026 UNBOXING. All rights reserved.</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <span>사업자등록번호: 123-45-67890</span>
            <span>대표: 홍길동</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
