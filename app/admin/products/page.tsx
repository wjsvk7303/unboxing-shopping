"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminProductsPage() {
  const { user } = useUser();
  const dbUser = useQuery(
    api.users.getByClerkId,
    user ? { clerkId: user.id } : "skip"
  );
  const products = useQuery(api.products.list, {});
  const categories = useQuery(api.categories.list);
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const deleteProduct = useMutation(api.products.remove);
  const seedData = useMutation(api.seed.seedData);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<Id<"products"> | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "smartphones",
    imageUrl: "",
    stock: 0,
  });

  if (dbUser?.role !== "admin") {
    return <div className="py-20 text-center text-gray-500">관리자 권한이 필요합니다.</div>;
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("ko-KR").format(price);

  const resetForm = () => {
    setForm({ name: "", description: "", price: 0, category: "smartphones", imageUrl: "", stock: 0 });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateProduct({ id: editId, ...form });
    } else {
      await createProduct(form);
    }
    resetForm();
  };

  const handleEdit = (product: NonNullable<typeof products>[number]) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock,
    });
    setEditId(product._id);
    setShowForm(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">상품 관리</h1>
        <div className="flex gap-2">
          <button
            onClick={() => seedData()}
            className="rounded-xl border border-border-color/50 px-4 py-2 text-sm text-gray-300 transition hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            샘플 데이터 추가
          </button>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-4 py-2 text-sm font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            상품 추가
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-border-color/50 bg-surface p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {editId ? "상품 수정" : "새 상품 추가"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">상품명</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-xl border border-border-color/50 bg-surface-light px-3 py-2 text-sm text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">카테고리</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-border-color/50 bg-surface-light px-3 py-2 text-sm text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
              >
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">가격</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
                className="w-full rounded-xl border border-border-color/50 bg-surface-light px-3 py-2 text-sm text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-400">재고</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                required
                className="w-full rounded-xl border border-border-color/50 bg-surface-light px-3 py-2 text-sm text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-400">이미지 URL</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                required
                className="w-full rounded-xl border border-border-color/50 bg-surface-light px-3 py-2 text-sm text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-400">설명</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full rounded-xl border border-border-color/50 bg-surface-light px-3 py-2 text-sm text-foreground focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-4 py-2 text-sm font-medium text-black transition hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              {editId ? "수정" : "추가"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-xl border border-border-color/50 px-4 py-2 text-sm text-gray-300 transition hover:border-neon-cyan/50 hover:text-neon-cyan">
              취소
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border-color/50 bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border-color/50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">상품명</th>
              <th className="px-4 py-3 font-medium">카테고리</th>
              <th className="px-4 py-3 font-medium">가격</th>
              <th className="px-4 py-3 font-medium">재고</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/30">
            {products?.map((product) => (
              <tr key={product._id} className="transition hover:bg-surface-light">
                <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                <td className="px-4 py-3 text-gray-500">{product.category}</td>
                <td className="px-4 py-3 text-foreground">{formatPrice(product.price)}원</td>
                <td className="px-4 py-3 text-foreground">{product.stock}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="mr-2 text-neon-cyan hover:text-neon-cyan/80"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteProduct({ id: product._id })}
                    className="text-neon-pink hover:text-neon-pink/80"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
