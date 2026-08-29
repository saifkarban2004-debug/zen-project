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

const trustBadges = [
  { icon: '🌿', title: '100% Natural', desc: 'Pure botanical ingredients' },
  { icon: '🐰', title: 'Cruelty-Free', desc: 'Never tested on animals' },
  { icon: '♻️', title: 'Recyclable', desc: 'Eco-friendly packaging' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Nationwide shipping' },
];

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead />
      <HeroSection />

      {/* Trust Badges */}
      <FadeInSection>
        <div className="py-16 bg-ivory border-b border-linen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {trustBadges.map((badge) => (
                <div key={badge.title} className="text-center">
                  <span className="text-3xl mb-3 block">{badge.icon}</span>
                  <h3 className="text-sm font-semibold text-charcoal tracking-wide uppercase">{badge.title}</h3>
                  <p className="text-xs text-olive-grey mt-1">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Featured Collection */}
      <FadeInSection>
        <div id="products" className="py-24 bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-sage font-semibold">Curated Selection</span>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal mt-3">Featured Collection</h2>
              <div className="w-16 h-px bg-terracotta mx-auto mt-6"></div>
            </div>
            <ProductGrid />
          </div>
        </div>
      </FadeInSection>

      {/* Crafted with Nature */}
      <FadeInSection>
        <section className="py-24 bg-linen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <span className="text-xs tracking-[0.3em] uppercase text-sage font-semibold">Our Philosophy</span>
                <h2 className="font-display text-4xl font-bold text-charcoal mt-3 mb-6">Crafted with Nature</h2>
                <p className="text-lg text-olive-grey mb-8 leading-relaxed">
                  Our brand philosophy is rooted in the healing power of nature. We meticulously source the finest natural ingredients and pure essential oils to create premium, sustainable hand and body care products that nourish both skin and soul.
                </p>
                <Link 
                  to="/shop" 
                  className="inline-block bg-sage text-white px-8 py-4 font-semibold hover:bg-sage-dark transition-colors rounded-sm"
                >
                  Shop Now
                </Link>
              </div>
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <img src="/products/shea-coconut.png" alt="Shea & Coconut Body Wash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mt-8">
                    <img src="/products/lavender.png" alt="Lavender Fields Body Wash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg -mt-8">
                    <img src="/products/oud.png" alt="Oud Body Wash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <img src="/products/blueberries.png" alt="Blueberries Body Wash" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Banner */}
      <FadeInSection>
        <section className="py-24 bg-forest text-white text-center px-4">
          <span className="text-xs tracking-[0.3em] uppercase text-terracotta font-semibold">The Zen Promise</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">Experience the Zen Difference</h2>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto text-white/80">
            Free shipping on orders over 500 EGP. Natural ingredients. Cruelty-free.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-sage text-white px-10 py-4 font-bold text-lg rounded-full shadow-lg hover:bg-sage-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Shop Collection
          </Link>
        </section>
      </FadeInSection>

      <Footer />
    </div>
  );
}
