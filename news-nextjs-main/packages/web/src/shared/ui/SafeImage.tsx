'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const allowedHosts = [
  'www.washingtonpost.com',
  'arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com',
  'dims.apnews.com',
  'assets.apnews.com',
  'media.cnn.com',
  'ichef.bbci.co.uk',
  'static01.nyt.com',
  'cdn.cnn.com',
];

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SafeImage({ src, alt, className = '' }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверяем, можно ли использовать Next.js Image
  const canUseNextImage = (() => {
    try {
      const url = new URL(src);
      return allowedHosts.includes(url.hostname);
    } catch {
      return false;
    }
  })();

  if (!src || error) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-xs">No image</span>
      </div>
    );
  }

  // Используем Next.js Image для оптимизации
  if (canUseNextImage) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 120px, 150px"
          className="object-cover"
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          onLoad={() => setLoading(false)}
        />
      </div>
    );
  }

  // Fallback на обычный <img>
  return (
    <>
      {loading && <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'hidden' : ''}`}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
        loading="lazy"
      />
    </>
  );
}
