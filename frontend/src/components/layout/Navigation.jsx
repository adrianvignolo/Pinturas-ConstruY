import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Navigation({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();

  const navLinks = [
    { label: 'Presentaciones', href: '#catalogo', isPage: false },
    { label: 'Carta de color', href: '#carta', isPage: false },
    { label: 'Partner ConstruY', href: '#partner', isPage: false },
    { label: 'Calculadora de pintura', href: '#calculadora', isPage: false },
    { label: 'Datos del comercio', href: '#informacion', isPage: false },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(link.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white border-b border-brand-border/80 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-13">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-7 text-sm font-medium text-brand-text">
            <button
              onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-brand-accent transition-colors ${activePage === 'home' ? 'text-brand-accent font-semibold' : 'text-gray-700'}`}
            >
              Inicio
            </button>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-gray-600 hover:text-brand-accent transition-colors font-medium text-sm cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={() => { setActivePage('pedidos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                activePage === 'pedidos'
                  ? 'bg-brand-navy text-white font-semibold'
                  : 'text-brand-navy hover:bg-gray-100 font-semibold'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-brand-accent" />
              <span>Hacer Pedido</span>
              {totalItemsCount > 0 && (
                <span className="bg-brand-accent text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20cotizar%20mi%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-light text-white text-xs font-semibold px-4 py-2 rounded shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <span>Cotiza tu proyecto con ConstruY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center justify-between w-full lg:hidden py-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="font-bold text-brand-navy text-sm flex items-center gap-1.5"
              >
                <span>Pinturas ConstruY</span>
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => { setActivePage('pedidos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded font-medium ${
                  activePage === 'pedidos' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-brand-navy'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-accent" />
                <span>Pedidos ({totalItemsCount})</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-brand-navy hover:bg-gray-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-2 pb-5 space-y-2 shadow-lg animate-fadeIn">
          <button
            onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 px-3 text-sm font-semibold text-brand-navy hover:bg-gray-50 rounded"
          >
            Inicio
          </button>
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className="block w-full text-left py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => { setActivePage('pedidos'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between py-2 px-3 bg-brand-navy/5 text-brand-navy font-semibold text-sm rounded hover:bg-brand-navy/10"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-brand-accent" />
                <span>Página de Pedidos</span>
              </span>
              <span className="bg-brand-accent text-white text-xs px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            </button>
            <a
              href="https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20cotizar%20mi%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-brand-accent hover:bg-brand-accent-light text-white text-xs font-semibold py-2.5 px-4 rounded shadow-sm"
            >
              Cotiza tu proyecto con ConstruY →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
