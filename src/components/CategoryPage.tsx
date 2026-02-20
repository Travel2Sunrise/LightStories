import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Link } from "@/i18n/routing";
import { getCategoryImages } from "@/lib/images";
import { getProjectsByCategory } from "@/lib/mdx";
import type { Page } from "@/lib/mdx";

interface CategoryPageProps {
  page: Page;
  locale: string;
  categoryKey: string;
  viewProjectsLabel: string;
  bookNowLabel: string;
}

export function CategoryPageRenderer({
  page,
  locale,
  categoryKey,
  viewProjectsLabel,
  bookNowLabel,
}: CategoryPageProps) {
  const { frontmatter } = page;

  // Resolve gallery images
  let images: { src: string }[] = [];
  if (
    frontmatter.gallery?.source === "category" &&
    frontmatter.gallery.categoryDir
  ) {
    const categoryImages = getCategoryImages(frontmatter.gallery.categoryDir);
    if (categoryImages.length > 0) {
      images = categoryImages.map((src) => ({ src }));
    } else {
      // Fallback to project gallery images
      const projects = getProjectsByCategory(locale, categoryKey);
      images = projects.flatMap((p) =>
        p.frontmatter.gallery.slice(0, 2).map((src) => ({ src }))
      );
    }
  } else if (
    frontmatter.gallery?.source === "manual" &&
    frontmatter.gallery.images
  ) {
    images = frontmatter.gallery.images.map((src) => ({ src }));
  }

  return (
    <>
      {frontmatter.hero && (
        <Hero
          title={frontmatter.title}
          subtitle=""
          imageSrc={frontmatter.hero.image}
          showCta={frontmatter.hero.showCta ?? false}
          height={frontmatter.hero.height ?? "large"}
        />
      )}

      <section className="py-20 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16 text-lg text-muted-foreground leading-relaxed space-y-4">
            {frontmatter.description?.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {images.length > 0 && (
            <Gallery
              images={images}
              columns={frontmatter.gallery?.columns ?? 3}
            />
          )}

          {frontmatter.cta && (
            <div className="mt-16 text-center space-x-4">
              {frontmatter.cta.projectsLink && (
                <Link
                  href={frontmatter.cta.projectsLink}
                  className="inline-block px-8 py-3 border-2 border-primary text-primary font-medium tracking-wider text-sm uppercase hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {viewProjectsLabel}
                </Link>
              )}
              {frontmatter.cta.contactLink && (
                <Link
                  href={frontmatter.cta.contactLink}
                  className="inline-block px-8 py-3 bg-primary text-white font-medium tracking-wider text-sm uppercase hover:bg-primary-dark transition-all duration-300"
                >
                  {bookNowLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
