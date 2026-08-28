// Shop Page
import { ProductGrid } from '../components/Product/ProductGrid';
import { Footer } from '../components/Footer/Footer';
import { SEOHead } from '../components/UI/SEOHead';

export function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      <SEOHead title="Shop | Zen Arohanc Collection" />
      
      {/* Hero Banner */}
      <div className="bg-slate-100 py-24 px-4 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6">Our Collection</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Discover our full range of premium, natural body care products designed for your wellbeing.
        </p>
      </div>

      <div className="flex-grow py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
