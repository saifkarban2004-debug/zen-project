import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/Hero/HeroSection';
import { ProductGrid } from '../components/Product/ProductGrid';
import { Footer } from '../components/Footer/Footer';
import { SEOHead } from '../components/UI/SEOHead';

function FadeInSection({ children }: { children: React.ReactNode }) {
  const domRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={domRef} 
      className="opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      {children}
    </div>
  );
}

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead />
      <HeroSection />

      <FadeInSection>
        <div id="products" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-center text-slate-900 mb-16">Featured Collection</h2>
            <ProductGrid />
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="font-display text-4xl font-bold text-slate-900 mb-6">Crafted with Nature</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Our brand philosophy is rooted in the healing power of nature. We meticulously source the finest natural ingredients and pure essential oils to create premium, sustainable hand and body care products that nourish both skin and soul.
                </p>
                <Link 
                  to="/shop" 
                  className="inline-block bg-slate-900 text-white px-8 py-4 font-semibold hover:bg-slate-800 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
              <div className="flex-1 w-full h-[500px] bg-gradient-to-tr from-slate-200 to-slate-100 rounded-lg shadow-inner">
                {/* Decorative element or image placeholder */}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Experience the Zen Difference</h2>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto">
            Free shipping on orders over EGP 50. Natural ingredients. Cruelty-free.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-white text-blue-900 px-10 py-4 font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Shop Collection
          </Link>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
