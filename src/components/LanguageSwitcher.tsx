"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: "de" | "en") => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => switchLocale("de")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          locale === "de"
            ? "text-primary font-medium"
            : "text-foreground/50 hover:text-foreground"
        } ${isPending ? "opacity-50" : ""}`}
      >
        DE
      </button>
      <span className="text-foreground/30">|</span>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-colors duration-200 ${
          locale === "en"
            ? "text-primary font-medium"
            : "text-foreground/50 hover:text-foreground"
        } ${isPending ? "opacity-50" : ""}`}
      >
        EN
      </button>
    </div>
  );
}
