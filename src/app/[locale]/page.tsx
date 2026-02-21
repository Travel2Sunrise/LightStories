import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/mdx";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { FaqPreview } from "@/components/FaqPreview";
import { getBlurDataURL } from "@/lib/blur";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getPage(locale, "home");

  return {
    title: page?.frontmatter.metaTitle || page?.frontmatter.title,
    description: page?.frontmatter.metaDescription || page?.frontmatter.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getPage(locale, "home");
  if (!page) {
    notFound();
  }

  const { frontmatter } = page;
  const faqPage = getPage(locale, "faq");
  const faqItems = faqPage?.frontmatter.faq ?? [];
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={frontmatter.hero?.title}
        subtitle={frontmatter.hero?.subtitle}
        videoSrc={frontmatter.hero?.videoSrc}
        imageSrc={frontmatter.hero?.image}
        blurDataURL={frontmatter.hero?.image ? getBlurDataURL(frontmatter.hero.image) : undefined}
        showCta={frontmatter.hero?.showCta ?? true}
        ctaText={frontmatter.hero?.ctaText}
        ctaHref={frontmatter.hero?.ctaHref}
        height={frontmatter.hero?.height ?? "full"}
      />

      {/* Categories Section */}
      {frontmatter.categories && (
        <section className="py-14 lg:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-light text-center mb-16 tracking-wide">
              {frontmatter.categoriesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {frontmatter.categories.map((category, index) => (
                <CategoryCard
                  key={category.href}
                  title={category.title}
                  description={category.description}
                  imageSrc={category.imageSrc}
                  blurDataURL={getBlurDataURL(category.imageSrc)}
                  href={category.href}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {frontmatter.about && (
        <section className="py-14 lg:py-24 px-4 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-light mb-8 tracking-wide">
              {frontmatter.about.title}
            </h2>
            <div className="text-lg text-muted-foreground leading-relaxed mb-8 space-y-4">
              {frontmatter.about.text.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Preview */}
      {faqItems.length > 0 && (
        <FaqPreview
          title={t("previewTitle")}
          items={faqItems}
          maxItems={3}
          linkText={t("allQuestions")}
        />
      )}

      {/* CTA Section */}
      {frontmatter.cta && (
        <section className="py-14 lg:py-24 px-4 bg-primary dark:bg-[#1f1e1c] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-light mb-8 tracking-wide">
              {frontmatter.cta.title}
            </h2>
            <Link
              href={frontmatter.cta.href || "/kontakt"}
              className="inline-block px-10 py-4 border-2 border-white text-white font-medium tracking-wider text-sm uppercase hover:bg-white hover:text-primary transition-all duration-300"
            >
              {frontmatter.cta.text}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
