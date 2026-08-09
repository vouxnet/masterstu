"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-[#0f0f1a] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="text-6xl">⚠️</div>
          <h2 className="font-bold text-2xl">Bir Hata Oluştu</h2>
          <p className="text-gray-400 text-sm max-w-md">
            Beklenmeyen bir hata meydana geldi. Lütfen tekrar deneyin.
          </p>
          <button
            onClick={() => reset()}
            className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </body>
    </html>
  );
}
