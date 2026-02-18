import type { FaqItem } from "@/lib/mdx";
import { Link } from "@/i18n/routing";

interface FaqPreviewProps {
  title: string;
  items: FaqItem[];
  maxItems?: number;
  linkText: string;
}

export function FaqPreview({
  title,
  items,
  maxItems = 3,
  linkText,
}: FaqPreviewProps) {
  const previewItems = items.slice(0, maxItems);

  return (
    <section className="py-20 lg:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-light text-center mb-16 tracking-wide">
          {title}
        </h2>
        <div className="space-y-10">
          {previewItems.map((item, i) => (
            <div key={i}>
              <h3 className="text-xl font-light tracking-wide mb-3">
                {item.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/faq"
            className="inline-block px-8 py-3 border border-foreground/20 text-foreground text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
