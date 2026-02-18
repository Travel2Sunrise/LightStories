import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/mdx";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfoSidebar } from "@/components/ContactInfoSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getPage(locale, "kontakt");

  return {
    title: page?.frontmatter.metaTitle || page?.frontmatter.title || "Kontakt",
    description: page?.frontmatter.metaDescription || page?.frontmatter.subtitle,
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getPage(locale, "kontakt");
  if (!page) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "contact.info" });

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">
            {page.frontmatter.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {page.frontmatter.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            {page.frontmatter.showContactForm && <ContactForm />}
          </div>

          <div className="lg:pl-8">
            {page.frontmatter.contactInfo && (
              <ContactInfoSidebar
                contactInfo={page.frontmatter.contactInfo}
                labels={{
                  title: t("title"),
                  email: t("email"),
                  phone: t("phone"),
                  location: t("location"),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
