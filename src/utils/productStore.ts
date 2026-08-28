import { products as initialProducts, type Product } from '../data/products';

const CUSTOM_PRODUCTS_KEY = 'zen_custom_products';
const DELETED_PRODUCTS_KEY = 'zen_deleted_products';

export function getCustomProducts(): Product[] {
  const stored = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse custom products', e);
      return [];
    }
  }
  return [];
}

export function getDeletedProductIds(): string[] {
  const stored = localStorage.getItem(DELETED_PRODUCTS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export function saveCustomProduct(product: Product) {
  const customProducts = getCustomProducts();
  const updated = [...customProducts, product];
  localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(updated));
}

export function deleteProduct(productId: string) {
  // First, try to remove from custom products
  const customProducts = getCustomProducts();
  const initialCustomCount = customProducts.length;
  const filteredCustom = customProducts.filter(p => p.id !== productId);
  
  if (filteredCustom.length !== initialCustomCount) {
    // It was a custom product
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(filteredCustom));
  } else {
    // It must be a hardcoded product, add to deleted list
    const deletedIds = getDeletedProductIds();
    if (!deletedIds.includes(productId)) {
      localStorage.setItem(DELETED_PRODUCTS_KEY, JSON.stringify([...deletedIds, productId]));
    }
  }
}

export function getAllProducts(): Product[] {
  const customProducts = getCustomProducts();
  const deletedIds = getDeletedProductIds();
  
  const all = [...initialProducts, ...customProducts];
  return all.filter(p => !deletedIds.includes(p.id));
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find(p => p.slug === slug);
}

export function getRelatedProducts(productId: string, limit: number = 3): Product[] {
  return getAllProducts().filter(p => p.id !== productId).slice(0, limit);
}
