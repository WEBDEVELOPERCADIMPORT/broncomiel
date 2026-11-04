import { defineAction } from 'astro:actions';
import productsData from '../../data/products/products.data.json';

export interface ProductBadge {
  id: string;
  label: Record<string, string>;
  icon: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  sku: string;
  category: string;
  price: number;
  amazonUrl: string;
  presentation: Record<string, string>;
  image: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  description: Record<string, string>;
  badges: ProductBadge[];
  isFeatured: boolean;
}

export interface GetFeaturedProductsResult {
  message: string;
  data: ProductItem[];
}

export const getFeaturedProducts = defineAction({
  handler: async (): Promise<GetFeaturedProductsResult> => {
    const allProducts = (productsData.products || []) as ProductItem[];
    const featured = allProducts.filter((product) => product.isFeatured);

    return {
      message: 'Featured products retrieved successfully',
      data: featured,
    };
  },
});
