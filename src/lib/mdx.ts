import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { __contentVersion } from "./content-trigger";

const contentDirectory = path.join(process.cwd(), "src/content");
const isDev = process.env.NODE_ENV === "development";

// Prevent tree-shaking so Turbopack tracks the dependency
void __contentVersion;

export interface ProjectFrontmatter {
  title: string;
  date: string;
  category: "hochzeit" | "portrait" | "familie";
  heroImage: string;
  heroBg?: string;
  gallery?: string[];
  excerpt: string;
  description?: string;
  client?: string;
  location?: string;
  testimonial?: string;
  draft?: boolean;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface CategoryContent {
  title: string;
  description: string;
  heroImage: string;
  gallery: string[];
}

export interface HeroConfig {
  image?: string;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  height?: "full" | "large" | "medium";
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export interface GalleryConfig {
  source: "category" | "manual";
  categoryDir?: string;
  columns?: 2 | 3 | 4;
  images?: string[];
}

export interface CtaConfig {
  title?: string;
  projectsLink?: string;
  contactLink?: string;
  text?: string;
  href?: string;
}

export interface CategoryItem {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

export interface AboutConfig {
  title: string;
  text: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactInfoConfig {
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  location?: string;
  social?: SocialLink[];
}

export interface PageFrontmatter {
  title: string;
  description?: string;
  subtitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  layout?: "prose" | "default";
  hero?: HeroConfig;
  gallery?: GalleryConfig;
  cta?: CtaConfig;
  contactInfo?: ContactInfoConfig;
  showContactForm?: boolean;
  categoriesTitle?: string;
  categories?: CategoryItem[];
  about?: AboutConfig;
  processTitle?: string;
  process?: ProcessStep[];
  faqTitle?: string;
  faq?: FaqItem[];
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Page {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

/**
 * Get all projects for a specific locale
 */
export function getProjects(locale: string): Project[] {
  const projectsDirectory = path.join(contentDirectory, locale, "projekte");

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const projects = mdxFiles.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  });

  // Filter out drafts in production
  const visible = isDev
    ? projects
    : projects.filter((p) => !p.frontmatter.draft);

  // Sort by date, newest first
  return visible.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get projects filtered by category
 */
export function getProjectsByCategory(
  locale: string,
  category: string
): Project[] {
  const projects = getProjects(locale);
  return projects.filter((project) => project.frontmatter.category === category);
}

/**
 * Get a single project by slug
 */
export function getProject(locale: string, slug: string): Project | null {
  const fullPath = path.join(contentDirectory, locale, "projekte", `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as ProjectFrontmatter;

  if (!isDev && frontmatter.draft) {
    return null;
  }

  return {
    slug,
    frontmatter,
    content,
  };
}

/**
 * Get all project slugs for static generation
 */
export function getProjectSlugs(locale: string): string[] {
  return getProjects(locale).map((p) => p.slug);
}

/**
 * Get category content (for category landing pages)
 */
export function getCategoryContent(
  locale: string,
  category: string
): CategoryContent | null {
  const fullPath = path.join(contentDirectory, locale, `${category}.mdx`);

  if (!fs.existsSync(fullPath)) {
    // Return default content if file doesn't exist
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return data as CategoryContent;
}

/**
 * Get a generic page by slug for a specific locale.
 * Looks for src/content/{locale}/{slug}.mdx
 */
export function getPage(locale: string, slug: string): Page | null {
  const fullPath = path.join(contentDirectory, locale, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as PageFrontmatter,
    content,
  };
}
