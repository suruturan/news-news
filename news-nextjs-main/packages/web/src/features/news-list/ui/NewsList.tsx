'use client';
import React, { useState, useEffect } from 'react';
import { useTopHeadlinesQuery } from '../../../shared/newsApi';
import { NewsCard } from './NewsCard';
import { NewsSkeleton } from './NewsSkeleton';
import { Favorites } from './Favorites';
import { useFavorites } from '@/shared/hooks/useFavorites';
import type { NewsItem } from '../../../entities/news/types';

export default function NewsList() {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [allArticles, setAllArticles] = useState<NewsItem[]>([]);
  const [newArticleUrls, setNewArticleUrls] = useState<Set<string>>(new Set());
  const articlesPerPage = 10;

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { data, error, isLoading, isFetching, refetch } = useTopHeadlinesQuery({ page, q });

  const totalPages = data?.totalResults
    ? Math.ceil(data.totalResults / articlesPerPage)
    : 1;

  // Собираем статьи и отмечаем новые
  useEffect(() => {
    if (!data?.articles?.length) return;

    setAllArticles((prev) => {
      const prevUrls = new Set(prev.map((a) => a.url));
      const newOnes = data.articles.filter((a) => !prevUrls.has(a.url));
      if (!newOnes.length) return prev;

      setNewArticleUrls((curr) => {
        const next = new Set(curr);
        newOnes.forEach((a) => next.add(a.url));
        return next;
      });

      setTimeout(() => {
        setNewArticleUrls((curr) => {
          const next = new Set(curr);
          newOnes.forEach((a) => next.delete(a.url));
          return next;
        });
      }, 3500);

      return [...prev, ...newOnes];
    });
  }, [data]);

  const handleSearch = () => {
    setPage(1);
    setAllArticles([]);
    setNewArticleUrls(new Set());
    refetch();
  };

  const handleCardClick = (url?: string) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setAllArticles([]);
  };

  // Генерация кнопок страниц с ограничением, чтобы не было сотни кнопок
  const getPageButtons = () => {
    const maxButtons = 7; // максимум отображаемых кнопок
    const pages: number[] = [];

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, page - 3);
      let end = Math.min(totalPages, page + 3);

      if (start === 1) end = start + maxButtons - 1;
      if (end === totalPages) start = end - maxButtons + 1;

      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <section className="space-y-6">
      {/* controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border p-2 rounded flex-1"
            placeholder="Search..."
            aria-label="Search news"
          />
          <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
            Search
          </button>
        </div>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${!showFavorites ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowFavorites(false)}
          >
            All News
          </button>
          <button
            className={`px-4 py-2 rounded ${showFavorites ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowFavorites(true)}
          >
            Favorites ({favorites.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="text-red-600">
          Ошибка загрузки. <button onClick={() => refetch()} className="underline">Повторить</button>
        </div>
      )}

      {isLoading && <NewsSkeleton columns={2} count={8} />}

      {showFavorites ? (
        <Favorites />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {allArticles.map((a) => (
              <div
                key={a.url}
                onClick={() => handleCardClick(a.url)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(a.url); }}
              >
                <NewsCard
                  item={a}
                  isFavorite={isFavorite(a.url)}
                  toggleFavorite={toggleFavorite}
                  isNew={newArticleUrls.has(a.url)}
                />
              </div>
            ))}
          </div>

          {isFetching && !isLoading && <NewsSkeleton columns={2} count={2} small />}

          {/* кнопки навигации */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              ← Prev
            </button>

            {getPageButtons().map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded ${page === num ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </section>
  );
}
