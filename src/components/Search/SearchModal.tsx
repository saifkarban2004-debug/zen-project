import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../utils/productStore';
import type { Product } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<{name: string, slug: string}[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('zen_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const allProducts = getAllProducts();
      const lowercaseQuery = query.toLowerCase();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(lowercaseQuery) || 
        p.description.toLowerCase().includes(lowercaseQuery)
      );
      setResults(filtered.slice(0, 5)); // Limit to 5 results for sleekness
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleSelect = (product: {name: string, slug: string}) => {
    // Only save name and slug to avoid storing massive base64 thumbnails in localStorage
    const minimalProduct = { name: product.name, slug: product.slug };
    const newRecent = [minimalProduct, ...recentSearches.filter(s => s.slug !== product.slug)].slice(0, 3);
    setRecentSearches(newRecent);
    
    try {
      localStorage.setItem('zen_recent_searches', JSON.stringify(newRecent));
    } catch (e) {
      console.warn('Could not save recent search', e);
    }
    
    navigate(`/products/${product.slug}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    
    // Which list are we navigating?
    const list = query.trim().length > 1 ? results : recentSearches;
    if (list.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < list.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < list.length) {
        handleSelect(list[selectedIndex]);
      } else if (list.length > 0) {
        // Default to first item if nothing explicitly selected
        handleSelect(list[0]);
      }
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex justify-center items-start pt-[12vh] bg-slate-950/60 backdrop-blur-sm px-4 transition-opacity duration-200"
      style={{ animation: 'slideDownFade 0.2s ease-out' }}
    >
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl flex flex-col gap-3" style={{ animation: 'slideDownFade 0.3s ease-out' }}>
        {/* Sleek Dark Search Pill */}
        <div className="relative flex items-center w-full bg-[#111113] border border-slate-700/80 rounded-full shadow-2xl overflow-hidden">
          <svg className="absolute left-6 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-slate-100 pl-14 pr-24 py-4 outline-none text-lg md:text-xl placeholder:text-slate-500 font-light"
            onKeyDown={handleKeyDown}
          />
          <div className="absolute right-4 flex items-center gap-2">
            <kbd className="hidden md:inline-block px-2 py-1 bg-slate-800/80 rounded-md border border-slate-700 text-xs text-slate-400 font-medium">ESC</kbd>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700 rounded-full"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results Dropdown */}
        {(query.trim().length > 1 || recentSearches.length > 0) && (
          <div className="w-full bg-[#111113] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh]">
            
            {/* Show Recent Searches if no query */}
            {query.trim().length <= 1 && recentSearches.length > 0 && (
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Recent Searches</p>
                <div className="space-y-1">
                  {recentSearches.map((item, idx) => (
                    <div 
                      key={item.slug}
                      onClick={() => handleSelect(item)}
                      className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${selectedIndex === idx ? 'bg-slate-800' : 'hover:bg-slate-800/60'}`}
                    >
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-300">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show Search Results */}
            {query.trim().length > 1 && results.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No results found for "{query}"
              </div>
            ) : query.trim().length > 1 && (
              <div className="overflow-y-auto p-2 space-y-1">
                {results.map((product, idx) => (
                  <div 
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-colors group ${selectedIndex === idx ? 'bg-slate-800' : 'hover:bg-slate-800/60'}`}
                  >
                    <div className="w-14 h-14 bg-slate-800 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-slate-200 truncate group-hover:text-blue-400 transition-colors">{product.name}</h3>
                      <p className="text-slate-500 text-sm truncate">{product.description}</p>
                    </div>
                    <div className="pr-4 hidden sm:block">
                      <p className="text-slate-300 font-medium whitespace-nowrap">EGP {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
