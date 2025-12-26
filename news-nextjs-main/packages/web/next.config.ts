import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Отключаем Turbopack, чтобы Webpack конфиг работал
  turbopack: {},

  // Настройка изображений
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.cnn.com', pathname: '/api/**' },
      { protocol: 'https', hostname: '**' }, // любые другие хосты
    ],
  },

  // Настройка Webpack алиасов
  webpack(config) {
    // '@' → папка src
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
