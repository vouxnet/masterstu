"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <div className="text-5xl">😵</div>
        <h2 className="font-display font-bold text-xl text-white">
          Bu Sayfada Bir Sorun Var
        </h2>
        <p className="text-gray-400 text-sm max-w-md">
          {error.message || "Beklenmeyen bir hata meydana geldi."}
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
