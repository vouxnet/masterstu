import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <div className="text-6xl">🔍</div>
        <h2 className="font-display font-bold text-2xl text-white">
          Sayfa Bulunamadı
        </h2>
        <p className="text-gray-400 text-sm max-w-md">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
