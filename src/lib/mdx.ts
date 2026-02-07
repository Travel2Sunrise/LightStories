import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ProjectFrontmatter {
  title: string;
  date: string;
  category: "hochzeit" | "portrait" | "familie";
  heroImage: string;
  gallery: string[];
  excerpt: string;
  client?: string;
  location?: string;
  testimonial?: string;
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

  // Sort by date, newest first
  return projects.sort(
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

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

/**
 * Get all project slugs for static generation
 */
export function getProjectSlugs(locale: string): string[] {
  const projectsDirectory = path.join(contentDirectory, locale, "projekte");

  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(projectsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
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
