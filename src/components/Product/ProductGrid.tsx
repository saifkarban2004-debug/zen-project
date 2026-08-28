import { useEffect, useRef, useState, useMemo } from 'react';
import type { Product } from '../../data/products';
import { getAllProducts } from '../../utils/productStore';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
  limit?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  title, 
  subtitle,
  limit
}) => {
  const allProducts = useMemo(() => getAllProducts(), []);
  const displayProducts = limit ? (products || allProducts).slice(0, limit) : (products || allProducts);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = new Set(prev);
                next.add(index);
                return next;
              });
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = gridRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, [displayProducts.length]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-xl text-gray-500 sm:mt-4">{subtitle}</p>}
        </div>
      )}
      
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {displayProducts.map((product, index) => (
          <div 
            key={product.id}
            data-index={index}
            className={`transition-all duration-700 ease-out transform ${
              visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
