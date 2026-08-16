import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "dark" | "light";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        if (typeof document !== "undefined") {
          if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
          }
        }
        set({ theme });
      },
      toggleTheme: () => {
        set((state) => {
          const next = state.theme === "dark" ? "light" : "dark";
          if (typeof document !== "undefined") {
            if (next === "dark") {
              document.documentElement.classList.add("dark");
              document.documentElement.classList.remove("light");
            } else {
              document.documentElement.classList.add("light");
              document.documentElement.classList.remove("dark");
            }
          }
          return { theme: next };
        });
      },
    }),
    {
      name: "asimptot_theme_preference",
    }
  )
);
