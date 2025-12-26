'use client';
import React from 'react';
import { NewsCard } from './NewsCard';
import { useFavorites } from '@/shared/hooks/useFavorites';

export function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) return <div className="text-center p-4">No favorite articles yet.</div>;

  return (
    <div className="grid gap-4">
      {favorites.map((article, i) => (
        <NewsCard key={article.url + i} item={article} isFavorite toggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}
