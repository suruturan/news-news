'use client';
import React, { forwardRef } from 'react';
import { SafeImage } from '../../../shared/ui/SafeImage'; // Правильный путь
import type { NewsItem } from '../../../entities/news/types';

interface NewsCardProps {
  item: NewsItem;
  isFavorite?: boolean;
  toggleFavorite?: (article: NewsItem) => void;
  isNew?: boolean;
}

export const NewsCard = forwardRef<HTMLDivElement, NewsCardProps>(
  ({ item, isFavorite = false, toggleFavorite, isNew = false }, ref) => {
    return (
      <article
        ref={ref}
        className={`
          flex gap-4 p-4 items-start rounded-lg overflow-hidden border 
          bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-200 cursor-pointer
          ${isNew ? 'ring-2 ring-blue-500' : ''}
        `}
      >
        <div className="w-[120px] h-[84px] sm:h-[100px] overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
          <SafeImage
            src={item.urlToImage || ''}
            alt={item.title || 'News image'}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold line-clamp-2 mb-1">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-gray-400">
              {item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : ''}
            </div>

            {toggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                className={`px-2 py-1 rounded text-sm transition-colors ${
                  isFavorite
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }
);

NewsCard.displayName = 'NewsCard';
