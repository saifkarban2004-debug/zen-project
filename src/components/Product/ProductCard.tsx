import { Link, useNavigate } from 'react-router-dom';
import { type Product } from '../../data/products';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyNow }) => {
  const navigate = useNavigate();

  const getGradient = (slug: string) => {
    switch (slug) {
      case 'blueberries-body-wash': return 'bg-gradient-to-br from-blue-500 to-indigo-700';
      case 'lavender-body-wash': return 'bg-gradient-to-br from-purple-400 to-pink-500';
      case 'eucalyptus-body-wash': return 'bg-gradient-to-br from-teal-400 to-emerald-600';
      case 'citrus-body-wash': return 'bg-gradient-to-br from-yellow-400 to-orange-500';
      case 'rose-body-wash': return 'bg-gradient-to-br from-rose-400 to-pink-600';
      case 'green-tea-body-wash': return 'bg-gradient-to-br from-green-400 to-emerald-500';
      default: return 'bg-gradient-to-br from-gray-200 to-gray-400';
    }
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      navigate(`/products/${product.slug}`);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
      <Link to={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
        {product.thumbnail ? (
          <img 
            src={product.thumbnail} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full ${getGradient(product.slug)} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
            <span className="text-white text-xl font-serif text-center px-4 shadow-sm font-medium">{product.name}</span>
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.tagline}</p>
        <p className="text-xs text-gray-400 mt-1">{product.size}</p>
        
        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>
        
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">EGP {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">EGP {product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        <div className="mt-auto pt-4 flex gap-2">
          <Link 
            to={`/products/${product.slug}`}
            className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            View Details
          </Link>
          <button 
            onClick={handleBuyNow}
            className="flex-1 py-2 px-4 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
