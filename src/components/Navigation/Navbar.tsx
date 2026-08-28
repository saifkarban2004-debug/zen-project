import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from '../Cart/CartIcon';
import { TOTAL_FRAMES } from '../../utils/frameUtils';
import { SearchModal } from '../Search/SearchModal';

export function Navbar() {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // If we are on the homepage, the hero section is exactly TOTAL_FRAMES * 40 pixels tall
      // Or 100vh if reduced motion is on. We'll use the larger one as a safe threshold, 
      // or we can just calculate it dynamically if we want.
      // But simple math:
      let threshold = 50; // default for non-home pages
      
      if (isHomePage) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        threshold = prefersReducedMotion ? window.innerHeight : (TOTAL_FRAMES * 40);
      }

      // We trigger the solid navbar slightly before the hero completely leaves the screen
      // so it transitions smoothly as the white section comes up.
      if (window.scrollY > threshold - 100) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // On non-homepage, navbar is always solid unless at very top (threshold 50)
  const showSolidBackground = !isHomePage ? isScrolledPastHero : isScrolledPastHero;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 text-slate-900 ${
          showSolidBackground 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' 
            : 'bg-gradient-to-b from-white/90 via-white/50 to-transparent py-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <svg className="w-6 h-6 mr-2 text-slate-800 group-hover:text-slate-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <ellipse cx="12" cy="19" rx="9" ry="4" />
                <ellipse cx="12" cy="13" rx="6" ry="3" />
                <ellipse cx="12" cy="8" rx="4" ry="2" />
              </svg>
              <span className="font-display text-2xl font-bold tracking-wider">Zen</span>
            </Link>

            <div className="hidden md:flex flex-1 justify-center space-x-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`text-sm font-bold tracking-wide transition-colors hover:text-slate-500 drop-shadow-sm ${
                      isActive ? 'border-b-2 border-slate-800 pb-1' : 'pb-1'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-6">
              <button 
                aria-label="Search" 
                className="hover:opacity-75 transition-opacity"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <CartIcon />

              <button 
                className="md:hidden flex items-center p-2 rounded-md hover:bg-black/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Mobile Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-[80vw] max-w-sm bg-white text-slate-900 z-[60] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="12" cy="19" rx="9" ry="4" />
              <ellipse cx="12" cy="13" rx="6" ry="3" />
              <ellipse cx="12" cy="8" rx="4" ry="2" />
            </svg>
            <span className="font-display text-2xl font-bold tracking-wider">Zen</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -mr-2 rounded-md hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
            aria-label="Close Mobile Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-lg font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
