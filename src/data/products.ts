export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: string;
  images: string[];
  thumbnail: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'shea-coconut-body-wash',
    name: 'Shea & Coconut',
    tagline: 'Nourish & Soften',
    description: 'Immerse yourself in the rich, tropical blend of Shea and Coconut. This premium body wash is enriched with natural essential oils to deeply nourish and soften your skin while gently cleansing.',
    price: 200,
    size: '1L',
    images: ['/products/shea-coconut.png'],
    thumbnail: '/products/shea-coconut.png',
    benefits: ['Deeply nourishes and softens skin', 'Tropical shea and coconut aroma', 'Gentle natural cleansing agents'],
    ingredients: ['Aqua', 'Shea Butter', 'Coconut Extract', 'Essential Oils', 'Glycerin', 'Vitamin E'],
    howToUse: 'Apply a generous amount to a loofah or washcloth. Lather over body and rinse thoroughly. For best results, use daily.',
    category: 'Body Wash',
    rating: 4.8,
    reviewCount: 842,
    inStock: true,
    featured: true
  },
  {
    id: 'p2',
    slug: 'oud-body-wash',
    name: 'Oud',
    tagline: 'Rich & Warm',
    description: 'Experience the luxurious and exotic scent of Oud. This rich, warm body wash features natural essential oils that leave your skin deeply cleansed and beautifully fragranced.',
    price: 200,
    size: '1L',
    images: ['/products/oud.png'],
    thumbnail: '/products/oud.png',
    benefits: ['Luxurious, exotic aroma', 'Rich and warm sensory experience', 'Gentle natural cleansing agents'],
    ingredients: ['Aqua', 'Oud Extract', 'Essential Oils', 'Glycerin', 'Aloe Vera'],
    howToUse: 'Apply a generous amount to a loofah or washcloth. Lather over body and rinse thoroughly. For best results, use daily.',
    category: 'Body Wash',
    rating: 4.9,
    reviewCount: 1245,
    inStock: true,
    featured: true
  },
  {
    id: 'p3',
    slug: 'lavender-fields-body-wash',
    name: 'Lavender Fields',
    tagline: 'Calm & Soothe',
    description: 'Drift away with the soothing aroma of Lavender Fields. Perfect for your daily shower routine to calm the mind and soothe the skin with natural essential oils.',
    price: 200,
    size: '1L',
    images: ['/products/lavender.png'],
    thumbnail: '/products/lavender.png',
    benefits: ['Promotes relaxation and calmness', 'Soothes the skin', 'Gentle on all skin types'],
    ingredients: ['Aqua', 'Lavender Essential Oil', 'Chamomile Extract', 'Glycerin'],
    howToUse: 'Lather onto wet skin and rinse. Breathe in deeply to enjoy the aromatherapeutic benefits.',
    category: 'Body Wash',
    rating: 4.7,
    reviewCount: 983,
    inStock: true,
    featured: true
  },
  {
    id: 'p4',
    slug: 'red-berries-body-wash',
    name: 'Red Berries',
    tagline: 'Berry Blush',
    description: 'Energize your senses with the sweet and vibrant scent of Red Berries. This body wash combines natural essential oils and antioxidant-rich berry extracts to refresh and revitalize your skin.',
    price: 200,
    size: '1L',
    images: ['/products/red-berries.png'],
    thumbnail: '/products/red-berries.png',
    benefits: ['Antioxidant-rich cleansing', 'Vibrant and energizing aroma', 'Revitalizes skin'],
    ingredients: ['Aqua', 'Red Berry Extract', 'Essential Oils', 'Glycerin', 'Vitamin C'],
    howToUse: 'Apply a generous amount to a loofah or washcloth. Lather over body and rinse thoroughly. For best results, use daily.',
    category: 'Body Wash',
    rating: 4.6,
    reviewCount: 654,
    inStock: true,
    featured: true
  },
  {
    id: 'p5',
    slug: 'blueberries-body-wash',
    name: 'Blueberries',
    tagline: 'Blue Harvest',
    description: 'Immerse yourself in the sweet, refreshing scent of ripe blueberries. This premium body wash is enriched with natural essential oils and antioxidants to gently cleanse while leaving your skin feeling soft, hydrated, and revitalized.',
    price: 200,
    size: '1L',
    images: ['/products/blueberries.png'],
    thumbnail: '/products/blueberries.png',
    benefits: ['Rich in antioxidants to protect skin', 'Deeply hydrates and nourishes', 'Refreshing lingering scent'],
    ingredients: ['Aqua', 'Blueberry Extract', 'Essential Oils', 'Glycerin', 'Vitamin E'],
    howToUse: 'Apply a generous amount to a loofah or washcloth. Lather over body and rinse thoroughly. For best results, use daily.',
    category: 'Body Wash',
    rating: 4.8,
    reviewCount: 1102,
    inStock: true,
    featured: true
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getRelatedProducts = (productId: string, limit: number = 3): Product[] => {
  return products.filter(p => p.id !== productId).slice(0, limit);
};
