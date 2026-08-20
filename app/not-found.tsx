import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-4xl">🌿</p>
      <h1 className="mt-4 text-3xl font-bold text-leaf-dark">الصفحة دي مش موجودة</h1>
      <p className="mt-3 leading-8 text-muted">
        ممكن الرابط غلط، أو النبات لسه متضافش للدليل.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-leaf px-6 font-bold text-white"
      >
        الرجوع للرئيسية
      </Link>
    </div>
  );
}
