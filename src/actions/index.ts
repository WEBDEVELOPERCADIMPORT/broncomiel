import { getFeaturedProducts } from './products/getFeaturedProducts.action';
import { getProductBySlug } from './products/getProductBySlug.action';
import { getRelatedProducts } from './products/getRelatedProducts.action';
import { getPlaces } from './places/getPlaces.action';

export const server = {
  getFeaturedProducts,
  getProductBySlug,
  getRelatedProducts,
  getPlaces,
};
