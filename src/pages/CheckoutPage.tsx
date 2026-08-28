import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { items, getSubtotal, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'EG',
    cardNumber: '',
    expDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const subtotal = getSubtotal();
  const total = getTotal();

  // Redirect if cart is empty and not showing success
  if (items.length === 0 && !showSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-light mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-blue-600 hover:underline">
          Return to shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Stripe or another payment provider
    setShowSuccess(true);
    clearCart();
  };

  if (showSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-light text-gray-900 mb-4">Thank you for your order!</h1>
        <p className="text-lg text-gray-600 mb-8">This is a demo checkout. Your order has been placed successfully.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light text-gray-900 mb-8">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-white px-4 py-6 sm:p-6 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white px-4 py-6 sm:p-6 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address line 1</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      required
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address line 2 (optional)</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:grid sm:grid-cols-3 sm:gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal code</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    >
                      <option value="EG">Egypt</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white px-4 py-6 sm:p-6 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-1">Payment Method</h2>
              <p className="text-sm text-gray-500 mb-4">Payment processing will be integrated soon.</p>
              
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="expDate"
                      name="expDate"
                      placeholder="MM/YY"
                      required
                      value={formData.expDate}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">Name on card</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      required
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2 border"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link to="/cart" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                &larr; Back to cart
              </Link>
              <button
                type="submit"
                className="bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm sticky top-8">
            <div className="px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.productId} className="flex py-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col justify-center">
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3 className="line-clamp-1">{item.name}</h3>
                        <p className="ml-4">EGP {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.size} <span className="mx-1">•</span> Qty: {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">EGP {subtotal.toFixed(2)}</dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {subtotal >= 50 ? 'Free' : 'Calculated next step'}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tax</dt>
                  <dd className="text-sm font-medium text-gray-900">Calculated at next step</dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-xl font-medium text-gray-900">EGP {total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
