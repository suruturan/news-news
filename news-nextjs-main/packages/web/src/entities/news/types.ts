export type NewsItem = {
  source?: { id?: string | null; name?: string | null };
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string | null;
};

export type NewsResponse = {
  status: string;
  totalResults: number;
  articles: NewsItem[];
};
