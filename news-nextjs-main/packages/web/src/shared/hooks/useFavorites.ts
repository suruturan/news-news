import { useState, useEffect } from 'react';
import type { NewsItem } from '../../entities/news/types';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<NewsItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (article: NewsItem) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.url === article.url);
      const updated = exists
        ? prev.filter((f) => f.url !== article.url)
        : [...prev, article];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (url: string) => {
    return favorites.some((f) => f.url === url);
  };

  return { favorites, toggleFavorite, isFavorite };
}
