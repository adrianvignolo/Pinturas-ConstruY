import React, { useState, useEffect } from 'react';
import TopBar from './components/layout/TopBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import { fetchProducts, fetchColors, fetchCompany } from './services/api';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    if (window.location.hash === '#pedidos' || window.location.hash === '#pedido') return 'pedidos';
    if (window.location.hash === '#checkout') return 'checkout';
    if (window.location.hash === '#contacto') return 'contacto';
    return 'home';
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const [colors, setColors] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#pedidos' || window.location.hash === '#pedido') {
        setActivePage('pedidos');
      } else if (window.location.hash === '#checkout') {
        setActivePage('checkout');
      } else if (window.location.hash === '#contacto') {
        setActivePage('contacto');
      } else {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash =
      page === 'pedidos'
        ? 'pedidos'
        : page === 'checkout'
        ? 'checkout'
        : page === 'contacto'
        ? 'contacto'
        : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadProducts = async (searchTerm = '') => {
    try {
      setLoadingProducts(true);
      const data = await fetchProducts('', searchTerm);
      setProducts(data);
      setProductsError(null);
    } catch (err) {
      setProductsError(err.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();

    fetchColors()
      .then((data) => setColors(data))
      .catch((err) => console.error('Error fetching colors:', err));

    fetchCompany()
      .then((data) => setCompany(data))
      .catch((err) => console.error('Error fetching company:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* 1. TopBar con datos fiscales legales y contacto */}
      <TopBar company={company} />

      {/* 2. Header Principal con enlaces de navegación */}
      <Header
        onSearch={(term) => loadProducts(term)}
        activePage={activePage}
        setActivePage={handlePageChange}
      />

      {/* 3. Contenido Dinámico según la página activa */}
      <div className="flex-1">
        {activePage === 'home' && (
          <HomePage
            products={products}
            loadingProducts={loadingProducts}
            productsError={productsError}
            colors={colors}
            company={company}
            onGoToOrders={() => handlePageChange('pedidos')}
          />
        )}

        {activePage === 'pedidos' && (
          <OrdersPage
            onGoToHome={() => handlePageChange('home')}
            onGoToCheckout={() => handlePageChange('checkout')}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            onGoToHome={() => handlePageChange('home')}
            onBackToOrders={() => handlePageChange('pedidos')}
          />
        )}

        {activePage === 'contacto' && (
          <ContactPage
            onGoToHome={() => handlePageChange('home')}
          />
        )}
      </div>

      {/* 4. Footer Corporativo */}
      <Footer
        company={company}
        setActivePage={handlePageChange}
      />
    </div>
  );
}
