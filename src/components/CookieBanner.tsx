"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const STORAGE_KEY = "cookie-banner-dismissed";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-3xl mx-auto bg-background border border-secondary rounded-lg shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          {t("message")}{" "}
          <Link
            href="/datenschutz"
            className="underline hover:text-foreground transition-colors"
          >
            {t("link")}
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="px-6 py-2 text-sm font-medium bg-foreground text-background rounded hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
