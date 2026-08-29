import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, removeItem, getSubtotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[65] transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#1A1A1A]">Your Bag ({items.length})</h2>
          <button 
            onClick={closeDrawer}
            className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#6E7772]">
              <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg mb-6">Your bag is empty</p>
              <button 
                onClick={closeDrawer}
                className="text-[#4A6B5D] hover:text-[#3A5549] underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4">
                  <Link to={`/product/${item.slug}`} onClick={closeDrawer} className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-md overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link to={`/product/${item.slug}`} onClick={closeDrawer}>
                          <h3 className="text-[#1A1A1A] font-medium">{item.name}</h3>
                        </Link>
                        <p className="text-[#6E7772] text-sm mt-1">{item.size}</p>
                      </div>
                      <p className="text-[#1A1A1A] font-medium">{item.price} EGP</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-3 py-1 text-[#6E7772] hover:bg-gray-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-[#1A1A1A] min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-3 py-1 text-[#6E7772] hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId)}
                        className="text-sm text-[#6E7772] hover:text-red-500 transition-colors underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex justify-between text-[#1A1A1A] font-semibold text-lg mb-4">
              <span>Subtotal</span>
              <span>{getSubtotal()} EGP</span>
            </div>
            <p className="text-[#6E7772] text-sm mb-6">Shipping, taxes, and discounts calculated at checkout.</p>
            <div className="flex flex-col gap-3">
              <Link 
                to="/cart"
                onClick={closeDrawer}
                className="w-full py-3 px-4 border border-[#1A1A1A] text-[#1A1A1A] text-center font-medium hover:bg-gray-50 transition-colors rounded-md"
              >
                View Cart
              </Link>
              <Link 
                to="/checkout"
                onClick={closeDrawer}
                className="w-full py-3 px-4 bg-[#4A6B5D] text-white text-center font-medium hover:bg-[#3A5549] transition-colors rounded-md"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
