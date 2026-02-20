import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/mdx";
import { CategoryPageRenderer } from "@/components/CategoryPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getPage(locale, "familie");

  return {
    title: page?.frontmatter.metaTitle || page?.frontmatter.title || "Familienfotografie",
    description: page?.frontmatter.metaDescription || page?.frontmatter.description,
  };
}

export default async function FamiliePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getPage(locale, "familie");
  if (!page) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "category" });

  return (
    <CategoryPageRenderer
      page={page}
      locale={locale}
      categoryKey="familie"
      viewProjectsLabel={t("viewProjects")}
      bookNowLabel={t("bookNow")}
    />
  );
}
