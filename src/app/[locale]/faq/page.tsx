import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/mdx";
import type { FaqItem } from "@/lib/mdx";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getPage(locale, "faq");

  return {
    title: page?.frontmatter.title || "FAQ",
    description: page?.frontmatter.metaDescription,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getPage(locale, "faq");
  if (!page) {
    notFound();
  }

  const { frontmatter } = page;
  const faqItems: FaqItem[] = frontmatter.faq ?? [];

  return (
    <>
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
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

          <div className="space-y-10">
            {faqItems.map((item, i) => (
              <div key={i}>
                <h2 className="text-xl font-light tracking-wide mb-3">
                  {item.question}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
