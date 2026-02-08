import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Link } from "@/i18n/routing";
import { getProjectsByCategory } from "@/lib/mdx";
import { getCategoryImages } from "@/lib/images";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.wedding" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HochzeitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getProjectsByCategory(locale, "hochzeit");
  const galleryImages = projects.flatMap((p) =>
    p.frontmatter.gallery.slice(0, 2).map((src) => ({ src }))
  );

  // Get all numbered image files from the hochzeit directory
  const categoryImages = getCategoryImages("hochzeit");

  return (
    <HochzeitPageInner
      galleryImages={galleryImages}
      categoryImages={categoryImages}
    />
  );
}

function HochzeitPageInner({
  galleryImages,
  categoryImages,
}: {
  galleryImages: { src: string }[];
  categoryImages: string[];
}) {
  const t = useTranslations("home.wedding");
  const tCategory = useTranslations("category");

  // Use category images if available, otherwise fall back to project gallery images
  const images =
    categoryImages.length > 0
      ? categoryImages.map((src) => ({ src }))
      : galleryImages;

  return (
    <>
      <Hero
        title={t("title")}
        subtitle={t("description")}
        imageSrc="/images/hochzeit/hero-bg.png"
        showCta={false}
        height="large"
      />

      <section className="py-20 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          <Gallery images={images} columns={3} />

          <div className="mt-16 text-center space-x-4">
            <Link
              href="/projekte?category=hochzeit"
              className="inline-block px-8 py-3 border-2 border-primary text-primary font-medium tracking-wider text-sm uppercase hover:bg-primary hover:text-white transition-all duration-300"
            >
              {tCategory("viewProjects")}
            </Link>
            <Link
              href="/kontakt"
              className="inline-block px-8 py-3 bg-primary text-white font-medium tracking-wider text-sm uppercase hover:bg-primary-dark transition-all duration-300"
            >
              {tCategory("bookNow")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
