import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import productsData from '../../data/products/products.data.json';
import type { ProductItem } from './getFeaturedProducts.action';

export interface GetProductBySlugResult {
  message: string;
  data: ProductItem;
}

export const getProductBySlug = defineAction({
  input: z.object({
    slug: z.string().min(1, 'Product slug is required'),
    lang: z.enum(['es', 'en']).default('es'),
  }),
  handler: async ({ slug, lang }): Promise<GetProductBySlugResult> => {
    const allProducts = (productsData.products[lang] || productsData.products.es) as ProductItem[];
    const product = allProducts.find((p) => p.slug === slug);

    if (!product) {
      throw new ActionError({
        code: 'NOT_FOUND',
        message: `Product with slug "${slug}" not found`,
      });
    }

    return {
      message: 'Product retrieved successfully',
      data: product,
    };
  },
});
