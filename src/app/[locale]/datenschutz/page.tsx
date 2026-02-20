import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/mdx";
import { MdxContent } from "@/lib/markdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getPage(locale, "datenschutz");

  return {
    title: page?.frontmatter.metaTitle || page?.frontmatter.title || "Datenschutz",
    description: page?.frontmatter.metaDescription || "Datenschutzerklärung",
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getPage(locale, "datenschutz");
  if (!page) {
    notFound();
  }

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <h1>{page.frontmatter.title}</h1>
        <MdxContent source={page.content} />
      </div>
    </section>
  );
}
