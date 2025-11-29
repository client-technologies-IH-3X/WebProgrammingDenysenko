export interface Article {
  id: number;
  title: string;
  description: string | null;
  url: string;
  published_at: string;
  positive_reactions_count: number;
  readable_publish_date: string;
  tags: string[];
}

export type ArticlesState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Article[] }
  | { status: "error"; message: string };
