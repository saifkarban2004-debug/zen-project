// About Page
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';
import { SEOHead } from '../components/UI/SEOHead';

export function AboutPage() {
  const values = [
    { 
      title: 'Natural Ingredients', 
      desc: 'Sourced directly from the earth, free from harsh synthetic chemicals.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Leaf Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21.5c-4.5 0-7-2-8-6 1.5-1.5 4-2.5 8-2.5 4 0 6.5 1 8 2.5-1 4-3.5 6-8 6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21.5V13" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4C7.5 4 5 6 4 10c1.5 1.5 4 2.5 8 2.5 4 0 6.5-1 8-2.5-1-4-3.5-6-8-6z" />
        </svg>
      )
    },
    { 
      title: 'Cruelty Free', 
      desc: 'We never test on animals. Beauty without compromise.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Paw / Heart combined icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    { 
      title: 'Sustainable', 
      desc: 'Eco-friendly packaging and responsible sourcing practices.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Recycle Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    { 
      title: 'Premium Quality', 
      desc: 'Crafted in small batches to ensure the highest standards.',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {/* Badge Icon */}
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <SEOHead title="About | Zen Arohanc Collection" />
      
      {/* Hero Section */}
      <section className="bg-slate-100 py-24 px-4 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 mb-6">About Zen</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Elevating everyday rituals with nature's purest elements.
        </p>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Our Mission</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Zen Arohanc was born from a simple desire: to create self-care products that are as good for the earth as they are for the soul. We believe that true luxury lies in simplicity and the restorative power of nature.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Every product in our collection is a testament to our dedication to wellness, formulated with meticulously chosen botanical extracts and pure essential oils.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-slate-900 text-white px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-slate-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-4 bg-slate-50">
        <h2 className="font-display text-4xl font-bold text-slate-900 mb-8">Ready to experience Zen?</h2>
        <Link 
          to="/shop" 
          className="inline-block bg-slate-900 text-white px-10 py-4 font-semibold hover:bg-slate-800 transition-colors rounded-sm"
        >
          Explore Our Collection
        </Link>
      </section>

      <Footer />
    </div>
  );
}
