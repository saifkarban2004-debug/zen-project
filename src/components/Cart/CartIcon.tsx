import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className = '' }) => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link 
      to="/cart" 
      className={`relative p-2 transition-colors ${className}`}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.076.721-.506 1.393-1.233 1.393H4.364c-.727 0-1.309-.672-1.233-1.393l1.263-12C4.47 9.279 5.176 8.607 5.894 8.607h12.212c.718 0 1.424.672 1.5 1.393z" 
        />
      </svg>
      
      {itemCount > 0 && (
        <span 
          className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-sage rounded-full transition-transform"
          style={{ animation: 'scaleIn 0.2s ease-out' }}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
