// Cart Page
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/UI/QuantitySelector';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal } = useCart();

  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      <h1 className="text-3xl font-light text-gray-900 mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-lg text-gray-600 mb-6">Your cart is empty.</p>
          <Link 
            to="/shop" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {items.map((item) => (
                <li key={item.productId} className="flex py-6 sm:py-8 transition-opacity duration-300">
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-gray-100">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    )}
                  </div>

                  <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm sm:text-base font-medium text-gray-900">
                            <Link to={`/products/${item.slug}`} className="hover:text-blue-600">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">EGP {item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center sm:justify-center">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(val) => updateQuantity(item.productId, val)}
                          max={99}
                        />
                        
                        <div className="absolute top-0 right-0 sm:static sm:ml-auto">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                            aria-label="Remove item"
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                      <span className="font-medium text-gray-900">Total: EGP {(item.price * item.quantity).toFixed(2)}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order summary</h2>
            
            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">EGP {subtotal.toFixed(2)}</dd>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {subtotal >= 50 ? 'Free' : 'Calculated at checkout'}
                </dd>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">EGP {total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to="/checkout"
                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500 flex justify-center transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-500">
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
