export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  cover_path: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string | null;
};

export type BlogPostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  cover_url?: string | null;
  cover_path?: string | null;
  status?: BlogPostStatus;
};
