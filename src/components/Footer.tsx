"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light tracking-wider text-white mb-4">
              LIGHTSTORIES
            </h3>
            <p className="text-sm text-white/60">
              Hochzeits-, Portrait- und Familienfotografie
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/hochzeit"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Hochzeit
                </Link>
              </li>
              <li>
                <Link
                  href="/portrait"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Portrait
                </Link>
              </li>
              <li>
                <Link
                  href="/familie"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Familie
                </Link>
              </li>
              <li>
                <Link
                  href="/projekte"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Projekte
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">
              Rechtliches
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t("imprint")}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            &copy; {currentYear} Lightstories. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
