import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navigation/Navbar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
// Assume these exist based on requirements
import { ProductPage } from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { AdminProvider } from './context/AdminContext';
import { LoginPage } from './pages/Admin/LoginPage';
import { DashboardPage } from './pages/Admin/DashboardPage';

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<LoginPage />} />
              <Route path="/admin/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
