import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Link } from "@/i18n/routing";
import { getProjectsByCategory } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.family" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FamiliePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getProjectsByCategory(locale, "familie");
  const galleryImages = projects.flatMap((p) =>
    p.frontmatter.gallery.slice(0, 2).map((src) => ({ src }))
  );

  return <FamiliePageInner galleryImages={galleryImages} />;
}

function FamiliePageInner({
  galleryImages,
}: {
  galleryImages: { src: string }[];
}) {
  const t = useTranslations("home.family");
  const tCategory = useTranslations("category");

  const images =
    galleryImages.length > 0
      ? galleryImages
      : [
          { src: "/images/familie/1.jpg" },
          { src: "/images/familie/2.jpg" },
          { src: "/images/familie/3.jpg" },
          { src: "/images/familie/4.jpg" },
          { src: "/images/familie/5.jpg" },
          { src: "/images/familie/6.jpg" },
        ];

  return (
    <>
      <Hero
        title={t("title")}
        subtitle={t("description")}
        imageSrc="/images/familie/hero.jpg"
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
              href="/projekte?category=familie"
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
