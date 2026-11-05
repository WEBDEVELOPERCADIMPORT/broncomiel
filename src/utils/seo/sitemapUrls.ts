import { LANGUAGES, type Lang } from '../../i18n/config.i18n';
import productsData from '../../data/products/products.data.json';

const BASE_URL = 'https://broncomiel.com';
const langs = Object.keys(LANGUAGES) as Lang[];

/**
 * Generate Home URLs for all supported languages
 */
export const getHomeUrls = (): string[] => {
  return langs.map((lang) => `${BASE_URL}/${lang}/`);
};

/**
 * Generate Product URLs for all supported languages
 */
export const getProductUrls = (): string[] => {
  return langs.flatMap((lang) => {
    const products = productsData.products[lang] || [];
    return products.map((product) => `${BASE_URL}/${lang}/${product.slug}`);
  });
};

/**
 * Combine all URLs for the Astro sitemap configuration.
 */
export const getAllSitemapUrls = (): string[] => {
  return [
    ...getHomeUrls(),
    ...getProductUrls(),
  ];
};
