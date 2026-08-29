import { ProductGrid } from '../components/Product/ProductGrid';
import { Footer } from '../components/Footer/Footer';
import { SEOHead } from '../components/UI/SEOHead';

export function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <SEOHead title="Shop | Zen Aromatic Collection" />
      
      <div className="bg-linen py-24 px-4 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-sage font-semibold">Browse Our Products</span>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-charcoal mt-3 mb-6">Our Collection</h1>
        <p className="text-xl text-olive-grey max-w-2xl mx-auto">
          Discover our full range of premium, natural body care products designed for your wellbeing.
        </p>
        <div className="w-16 h-px bg-terracotta mx-auto mt-8"></div>
      </div>

      <div className="flex-grow py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
