import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../utils/productStore';
import { ProductGallery } from '../components/Product/ProductGallery';
import { StarRating } from '../components/Product/StarRating';
import { ProductGrid } from '../components/Product/ProductGrid';
import { useCart } from '../context/CartContext';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');

  const product = slug ? getProductBySlug(slug) : undefined;
  
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Zen Arohanc Collection`;
    }
    // Scroll to top on mount/slug change
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 3);

  const { addItem } = useCart();

  const handleDecreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncreaseQuantity = () => setQuantity(prev => Math.min(10, prev + 1));

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addItem(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-gray-900">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <Link to="/shop" className="hover:text-gray-900">Shop</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-500 mb-4">{product.tagline}</p>
            
            <div className="mb-6 flex items-center justify-between">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="lg" />
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">EGP {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">EGP {product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-gray-200 py-6 mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-700 font-medium mr-4">Size:</span>
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-md">{product.size}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    onClick={handleDecreaseQuantity}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={handleIncreaseQuantity}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full py-3 px-6 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              <span className="text-sm text-gray-600">Free shipping on orders over EGP 50</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {(['benefits', 'ingredients', 'howToUse'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab === 'howToUse' ? 'How to Use' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'benefits' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'ingredients' && (
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-medium text-gray-900">Key Ingredients:</span> {product.ingredients.join(', ')}.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Note: Ingredients are subject to change. For the most complete and up-to-date list of ingredients, refer to the product packaging.
                </p>
              </div>
            )}
            
            {activeTab === 'howToUse' && (
              <p className="text-gray-700 leading-relaxed">
                {product.howToUse}
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <ProductGrid 
              products={relatedProducts} 
              title="You May Also Like" 
              subtitle="Discover other favorites from the Zen Arohanc Collection"
            />
          </div>
        )}
      </div>
    </div>
  );
};
