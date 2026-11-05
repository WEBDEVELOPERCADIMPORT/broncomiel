import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import productsData from '../../data/products/products.data.json';

export interface ProductBadge {
  id: string;
  label: string;
  icon: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  sku: string;
  category: string;
  amazonUrl: string;
  image: string;
  name: string;
  description: string;
  badges: ProductBadge[];
}

export interface GetFeaturedProductsResult {
  message: string;
  data: ProductItem[];
}

export const getFeaturedProducts = defineAction({
  input: z
    .object({
      lang: z.enum(['es', 'en']).default('es'),
    })
    .optional(),
  handler: async (input): Promise<GetFeaturedProductsResult> => {
    const lang = input?.lang ?? 'es';
    const allProducts = (productsData.products[lang] || productsData.products.es) as ProductItem[];

    return {
      message: 'Featured products retrieved successfully',
      data: allProducts,
    };
  },
});
