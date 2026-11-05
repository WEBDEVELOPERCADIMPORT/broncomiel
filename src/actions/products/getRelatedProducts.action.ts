import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import productsData from '../../data/products/products.data.json';
import type { ProductItem } from './getFeaturedProducts.action';

export interface GetRelatedProductsResult {
  message: string;
  data: ProductItem[];
}

export const getRelatedProducts = defineAction({
  input: z.object({
    currentSlug: z.string().optional(),
    limit: z.number().default(3),
    lang: z.enum(['es', 'en']).default('es'),
  }),
  handler: async ({ currentSlug, limit, lang }): Promise<GetRelatedProductsResult> => {
    const allProducts = (productsData.products[lang] || productsData.products.es) as ProductItem[];
    const filtered = currentSlug
      ? allProducts.filter((p) => p.slug !== currentSlug)
      : allProducts;

    const related = filtered.slice(0, limit);

    return {
      message: 'Related products retrieved successfully',
      data: related,
    };
  },
});
