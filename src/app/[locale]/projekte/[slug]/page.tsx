import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getProject, getProjectSlugs, getProjects } from "@/lib/mdx";
import { Gallery } from "@/components/Gallery";
import { PlaceholderBadge } from "@/components/PlaceholderBadge";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const slugs = getProjectSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(locale, slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.excerpt,
    openGraph: {
      images: [project.frontmatter.heroImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(locale, slug);

  if (!project) {
    notFound();
  }

  // Get next project for navigation
  const allProjects = getProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <ProjectPageInner
      project={project}
      nextProject={nextProject?.slug !== slug ? nextProject : null}
    />
  );
}

function ProjectPageInner({
  project,
  nextProject,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  nextProject: ReturnType<typeof getProject>;
}) {
  const t = useTranslations("project");
  const tCategories = useTranslations("categories");
  const { frontmatter } = project;

  const galleryImages = frontmatter.gallery.map((src) => ({ src }));

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px]">
        <PlaceholderBadge src={frontmatter.heroImage} />
        <Image
          src={frontmatter.heroImage}
          alt={frontmatter.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <p className="text-white/80 text-sm uppercase tracking-wider mb-2">
              {tCategories(frontmatter.category)}
            </p>
            <h1 className="text-4xl lg:text-6xl font-light text-white tracking-wide">
              {frontmatter.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {frontmatter.date && (
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  {t("date")}
                </p>
                <p className="text-foreground">
                  {new Date(frontmatter.date).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}
            {frontmatter.location && (
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  {t("location")}
                </p>
                <p className="text-foreground">{frontmatter.location}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                {t("category")}
              </p>
              <p className="text-foreground">
                {tCategories(frontmatter.category)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-lg text-muted-foreground leading-relaxed space-y-4">
          {frontmatter.excerpt.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Gallery images={galleryImages} columns={3} />
        </div>
      </section>

      {/* Testimonial */}
      {frontmatter.testimonial && (
        <section className="py-16 px-4 bg-muted">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
              {t("testimonial")}
            </p>
            <blockquote className="text-xl lg:text-2xl font-light text-foreground italic leading-relaxed">
              &ldquo;{frontmatter.testimonial}&rdquo;
            </blockquote>
            {frontmatter.client && (
              <p className="mt-4 text-primary">&mdash; {frontmatter.client}</p>
            )}
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-16 px-4 border-t border-secondary/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link
            href="/projekte"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("backToProjects")}
          </Link>

          {nextProject && (
            <Link
              href={`/projekte/${nextProject.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              {t("nextProject")}: {nextProject.frontmatter.title}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
