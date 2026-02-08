import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { Link } from "@/i18n/routing";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <HomePageContent params={params} />;
}

async function HomePageContent({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageInner />;
}

function HomePageInner() {
  const t = useTranslations("home");

  const categories = [
    {
      title: t("wedding.title"),
      description: t("wedding.description"),
      imageSrc: "/images/hochzeit/hero.png",
      href: "/hochzeit",
    },
    {
      title: t("portrait.title"),
      description: t("portrait.description"),
      imageSrc: "/images/portrait/hero.png",
      href: "/portrait",
    },
    {
      title: t("family.title"),
      description: t("family.description"),
      imageSrc: "/images/familie/hero.png",
      href: "/familie",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-20 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-16 tracking-wide">
            {t("categoriesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.href}
                title={category.title}
                description={category.description}
                imageSrc={category.imageSrc}
                href={category.href}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-8 tracking-wide">
            {t("aboutTitle")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {t("aboutText")}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-light mb-8 tracking-wide">
            {t("ctaTitle")}
          </h2>
          <Link
            href="/kontakt"
            className="inline-block px-10 py-4 border-2 border-white text-white font-medium tracking-wider text-sm uppercase hover:bg-white hover:text-primary transition-all duration-300"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
