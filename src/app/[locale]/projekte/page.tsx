import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProjects } from "@/lib/mdx";
import { ProjectsGrid } from "./ProjectsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return {
    title: t("title"),
    description: t("subtitle"),
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

  return <ProjektePageInner projects={projects} />;
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
}: {
  projects: ReturnType<typeof getProjects>;
}) {
  const t = useTranslations("projects");

  return (
    <>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>

          <Suspense fallback={<ProjectsGridSkeleton />}>
            <ProjectsGrid projects={projects} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
