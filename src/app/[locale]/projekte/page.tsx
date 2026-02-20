import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProjects, getPage } from "@/lib/mdx";
import type { FaqItem, PageFrontmatter } from "@/lib/mdx";
import { FaqPreview } from "@/components/FaqPreview";
import { ProjectsGrid } from "./ProjectsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getPage(locale, "projekte");

  return {
    title: page?.frontmatter.title ?? "Projekte",
    description:
      page?.frontmatter.metaDescription ?? page?.frontmatter.subtitle,
  };
}

export default async function ProjektePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getProjects(locale);
  const page = getPage(locale, "projekte");
  const faqPage = getPage(locale, "faq");
  const faqItems: FaqItem[] = faqPage?.frontmatter.faq ?? [];
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <ProjektePageInner
      projects={projects}
      frontmatter={page?.frontmatter ?? { title: "Projekte" }}
      faqItems={faqItems}
      faqTitle={t("previewTitle")}
      faqLinkText={t("allQuestions")}
    />
  );
}

function ProjectsGridSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-24 bg-muted rounded" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[4/3] bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-6 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjektePageInner({
  projects,
  frontmatter,
  faqItems,
  faqTitle,
  faqLinkText,
}: {
  projects: ReturnType<typeof getProjects>;
  frontmatter: PageFrontmatter;
  faqItems: FaqItem[];
  faqTitle: string;
  faqLinkText: string;
}) {
  return (
    <>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">
              {frontmatter.title}
            </h1>
            {frontmatter.subtitle && (
              <p className="text-lg text-muted-foreground">
                {frontmatter.subtitle}
              </p>
            )}
          </div>

          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsGrid projects={projects} />
          </Suspense>
        </div>
      </section>

      {/* Process Steps */}
      {frontmatter.process && frontmatter.process.length > 0 && (
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-5xl mx-auto">
            {frontmatter.processTitle && (
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-center mb-16">
                {frontmatter.processTitle}
              </h2>
            )}
            <div className="space-y-12">
              {frontmatter.process.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-light">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-light tracking-wide mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Preview */}
      {faqItems.length > 0 && (
        <FaqPreview
          title={faqTitle}
          items={faqItems}
          maxItems={3}
          linkText={faqLinkText}
        />
      )}
    </>
  );
}
