import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  ArrowRight,
  Menu,
  X,
  PhoneCall,
  Loader2,
  Tag,
  Package,
  Compass,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { fetchSearch } from '../../services/api';

export default function Header({ onSearch, activePage, setActivePage }) {
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ products: [], categories: [], pages: [], total: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const fullScreenInputRef = useRef(null);
  const { totalItemsCount } = useCart();

  // Búsqueda AJAX en vivo cuando hay al menos 3 caracteres
  useEffect(() => {
    const trimmed = searchValue.trim();
    if (trimmed.length < 3) {
      setSearchResults({ products: [], categories: [], pages: [], total: 0 });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        const data = await fetchSearch(trimmed);
        setSearchResults({
          products: data.products || [],
          categories: data.categories || [],
          pages: data.pages || [],
          total: (data.products?.length || 0) + (data.categories?.length || 0) + (data.pages?.length || 0)
        });
      } catch (err) {
        console.error('Error al realizar búsqueda AJAX:', err);
      } finally {
        setIsSearching(false);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Si escribe mínimo 3 caracteres desde el input del header, abrir automáticamente pantalla completa
  const handleHeaderInputChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    if (val.trim().length >= 3) {
      setIsFullScreenOpen(true);
    }
  };

  // Bloquear scroll de fondo cuando la búsqueda en pantalla completa está activa
  useEffect(() => {
    if (isFullScreenOpen) {
      document.body.style.overflow = 'hidden';
      // Enfocar input en pantalla completa
      setTimeout(() => {
        if (fullScreenInputRef.current) {
          fullScreenInputRef.current.focus();
        }
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullScreenOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullScreenOpen]);

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim().length >= 3) {
      setIsFullScreenOpen(true);
    } else {
      if (activePage !== 'home') setActivePage('home');
      onSearch(searchValue);
      const catElem = document.querySelector('#catalogo');
      if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Acciones al hacer clic en un resultado desde la pantalla completa
  const handleSelectProduct = (prod) => {
    setIsFullScreenOpen(false);
    setMobileMenuOpen(false);
    if (activePage !== 'home') setActivePage('home');
    onSearch(prod.name);
    setTimeout(() => {
      const catElem = document.querySelector('#catalogo');
      if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSelectCategory = (cat) => {
    setIsFullScreenOpen(false);
    setMobileMenuOpen(false);
    if (activePage !== 'home') setActivePage('home');
    onSearch(cat.name);
    setTimeout(() => {
      const catElem = document.querySelector('#catalogo');
      if (catElem) catElem.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleSelectPage = (pageItem) => {
    setIsFullScreenOpen(false);
    setMobileMenuOpen(false);

    if (pageItem.anchor || pageItem.href) {
      const targetAnchor = pageItem.anchor || pageItem.href;
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.querySelector(targetAnchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(targetAnchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (pageItem.page) {
      setActivePage(pageItem.page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Presentaciones', href: '#catalogo', type: 'anchor' },
    { label: 'Carta de Color', href: '#carta', type: 'anchor' },
    { label: 'Partner ConstruY', href: '#partner', type: 'anchor' },
    { label: 'Formas de Pago', href: '#pagos', type: 'anchor' },
    { label: 'Contacto y Ubicación', page: 'contacto', type: 'page' },
  ];

  const handleLinkClick = (item) => {
    setMobileMenuOpen(false);
    if (item.type === 'page') {
      setActivePage(item.page);
    } else {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.querySelector(item.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const suggestions = [
    'Pinturas de caucho',
    'Esmalte semi-industrial',
    'Cuñete Clase A',
    'Taza ConstruY',
    'Carta de color',
    'Calculadora',
    'Formas de pago',
    'Contacto'
  ];

  const hasResults = searchResults.total > 0;

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-container-lowest border-b border-surface-border shadow-xs">
        {/* Main Header Bar */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center text-left group"
              title="Ir al inicio"
            >
              <div className="h-14 sm:h-16 w-auto flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src="./brand/logo-construy.png"
                  alt="Materiales ConstruY"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
            </button>
          </div>

          {/* Search Bar - Center (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <form onSubmit={handleHeaderSubmit} className="relative w-full flex items-center">
              <input
                type="text"
                value={searchValue}
                onChange={handleHeaderInputChange}
                onClick={() => {
                  if (searchValue.trim().length >= 3) setIsFullScreenOpen(true);
                }}
                placeholder="Buscar productos, categorías o páginas (mín 3 caracteres)..."
                className="w-full pl-9 pr-24 py-2 text-xs bg-surface-subtle hover:bg-white focus:bg-white border border-surface-border rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setIsFullScreenOpen(true)}
                className="absolute right-1 px-2.5 py-1 bg-primary text-white text-[11px] font-semibold rounded hover:bg-primary-container transition-colors"
                title="Abrir buscador en pantalla completa"
              >
                Buscar
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Contact Button */}
            <button
              onClick={() => setActivePage('contacto')}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-headline font-bold transition-colors ${
                activePage === 'contacto'
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-surface-subtle border border-surface-border'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-secondary" />
              <span>Contacto</span>
            </button>

            {/* Cart / Orders Button */}
            <button
              onClick={() => setActivePage('pedidos')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                activePage === 'pedidos' || activePage === 'checkout'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-surface-subtle hover:bg-surface-container text-primary border border-surface-border'
              }`}
              title="Ir a la página de Pedidos"
            >
              <ShoppingBag className="w-4 h-4 text-orange-vibrant" />
              <span className="hidden sm:inline">Mi Pedido</span>
              {totalItemsCount > 0 && (
                <span className="bg-primary text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/584242803167?text=Hola%20Pinturas%20ConstruY%2C%20quiero%20cotizar%20mi%20proyecto."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-container text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
            >
              <span>Cotizar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-primary hover:bg-surface-subtle border border-surface-border"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Sub-bar */}
        <div className="hidden md:block bg-surface-container-lowest border-t border-surface-border/60">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between h-10 text-xs font-headline font-semibold text-on-surface-variant">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActivePage('home')}
                className={`hover:text-secondary transition-colors ${activePage === 'home' ? 'text-secondary font-bold' : ''}`}
              >
                Inicio
              </button>
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item)}
                  className={`hover:text-secondary transition-colors ${
                    item.type === 'page' && activePage === item.page ? 'text-secondary font-bold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActivePage('pedidos')}
                className={`hover:text-secondary transition-colors flex items-center gap-1 font-bold ${
                  activePage === 'pedidos' || activePage === 'checkout' ? 'text-secondary' : 'text-primary'
                }`}
              >
                <span>Gestión de Pedidos en Línea</span>
                <span className="text-secondary">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface-container-lowest border-t border-surface-border px-4 py-4 space-y-3 shadow-xl">
            <div className="relative w-full mb-3">
              <form onSubmit={handleHeaderSubmit} className="relative w-full flex items-center">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleHeaderInputChange}
                  onClick={() => {
                    if (searchValue.trim().length >= 3) setIsFullScreenOpen(true);
                  }}
                  placeholder="Buscar productos, categorías o páginas..."
                  className="w-full pl-8 pr-16 py-2 text-xs bg-surface-subtle border border-surface-border rounded-lg text-on-surface"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setIsFullScreenOpen(true)}
                  className="absolute right-1 px-2 py-1 bg-primary text-white text-[10px] rounded font-semibold"
                >
                  Buscar
                </button>
              </form>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 px-3 text-xs font-bold text-primary hover:bg-surface-subtle rounded"
              >
                Inicio
              </button>
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item)}
                  className="w-full text-left py-2 px-3 text-xs font-medium text-on-surface-variant hover:bg-surface-subtle rounded"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-surface-border space-y-2">
              <button
                onClick={() => { setActivePage('pedidos'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between py-2.5 px-3 bg-primary text-white text-xs font-semibold rounded-lg"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange-vibrant" />
                  <span>Página de Pedidos</span>
                </span>
                <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {totalItemsCount} productos
                </span>
              </button>
              <button
                onClick={() => { setActivePage('contacto'); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 px-3 bg-surface-subtle border border-surface-border text-primary text-xs font-bold rounded-lg"
              >
                Ver Contacto y Ubicación de Fábrica
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 🌟 BUSCADOR AJAX EN PANTALLA COMPLETA (FULLSCREEN OVERLAY) */}
      {/* ======================================================== */}
      {isFullScreenOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#07172B]/95 backdrop-blur-2xl flex flex-col text-white animate-fadeIn overflow-hidden"
        >
          {/* Barra Superior con Logo, Info y Botón Cerrar */}
          <div className="w-full border-b border-white/10 bg-black/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="h-10 w-auto px-2.5 py-1 rounded-xl bg-white flex items-center justify-center shadow-xs">
                  <img
                    src="./brand/logo-construy.png"
                    alt="Logo Pinturas ConstruY"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Botón Cerrar / ESC */}
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-mono text-gray-400 bg-white/10 px-2 py-1 rounded border border-white/15">
                  ESC para salir
                </span>
                <button
                  type="button"
                  onClick={() => setIsFullScreenOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                  aria-label="Cerrar búsqueda en pantalla completa"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Gran Input de Búsqueda Centrado */}
          <div className="w-full bg-black/10 border-b border-white/5 py-5 sm:py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="relative flex items-center">
                <Search className="w-6 h-6 text-orange-400 absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
                <input
                  ref={fullScreenInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Escribe al menos 3 caracteres (ej: caucho, esmalte, taza, pagos, carta)..."
                  className="w-full pl-14 sm:pl-16 pr-14 py-4 text-base sm:text-xl font-headline font-bold text-white placeholder-gray-400 bg-white/10 border-2 border-white/20 rounded-2xl focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/30 transition-all shadow-2xl"
                />
                {isSearching ? (
                  <Loader2 className="w-5 h-5 text-secondary animate-spin absolute right-4 top-1/2 -translate-y-1/2" />
                ) : searchValue ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchValue('');
                      if (fullScreenInputRef.current) fullScreenInputRef.current.focus();
                    }}
                    className="p-1 rounded-full hover:bg-white/20 text-gray-300 hover:text-white absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-5 h-5" />
                  </button>
                ) : null}
              </div>

              {/* Badges de sugerencias rápidas */}
              <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
                <span className="text-gray-400 flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-gold-warm" />
                  <span>Sugerencias:</span>
                </span>
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setSearchValue(sug)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white shrink-0 transition-all text-[11px]"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Área Desplazable de Resultados */}
          <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
            {/* Mensaje de inicio cuando hay menos de 3 caracteres */}
            {searchValue.trim().length < 3 && (
              <div className="py-16 text-center max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-orange-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-headline font-bold text-xl text-white">
                  Búsqueda Instantánea en Pantalla Completa
                </h3>
                <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Escribe al menos <strong>3 caracteres</strong> para consultar productos en inventario, categorías oficiales de fábrica y páginas de navegación directa.
                </p>
              </div>
            )}

            {/* Spinner de carga AJAX */}
            {isSearching && searchValue.trim().length >= 3 && (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                <span className="font-mono text-xs text-gray-300">
                  Consultando en MariaDB en tiempo real...
                </span>
              </div>
            )}

            {/* Sin Resultados */}
            {!isSearching && searchValue.trim().length >= 3 && !hasResults && (
              <div className="py-16 text-center max-w-md mx-auto space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                  <X className="w-7 h-7" />
                </div>
                <h3 className="font-headline font-bold text-lg text-white">
                  No se encontraron coincidencias para "{searchValue}"
                </h3>
                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  Verifica la ortografía o intenta buscar por términos generales como <em>caucho</em>, <em>esmalte</em>, <em>taza</em> o <em>carta</em>.
                </p>
              </div>
            )}

            {/* Resultados Encontrados: Grilla de Pantalla Completa */}
            {!isSearching && searchValue.trim().length >= 3 && hasResults && (
              <div className="space-y-8 pb-10">
                {/* Contador General */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-gray-300">
                  <span>
                    Se encontraron <strong className="text-white">{searchResults.total}</strong> resultados para{' '}
                    <strong className="text-orange-400">"{searchValue}"</strong>
                  </span>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span>{searchResults.products.length} productos</span>
                    <span>·</span>
                    <span>{searchResults.categories.length} categorías</span>
                    <span>·</span>
                    <span>{searchResults.pages.length} páginas</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Columna Izquierda (lg:col-span-5): Categorías y Páginas del Sitio */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* 1. Categorías Coincidentes */}
                    {searchResults.categories.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="font-headline font-bold text-xs uppercase tracking-wider text-secondary flex items-center gap-2">
                            <Tag className="w-4 h-4" />
                            <span>Categorías ({searchResults.categories.length})</span>
                          </span>
                        </div>
                        <div className="space-y-2">
                          {searchResults.categories.map((cat, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectCategory(cat)}
                              className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
                            >
                              <div>
                                <h4 className="font-headline font-bold text-sm text-white group-hover:text-orange-400 transition-colors">
                                  {cat.name}
                                </h4>
                                <p className="font-body text-xs text-gray-400 line-clamp-1 mt-0.5">
                                  {cat.description}
                                </p>
                              </div>
                              <span className="text-xs font-mono text-secondary group-hover:text-orange-400 flex items-center gap-1 shrink-0 font-bold ml-2">
                                <span>Ver</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. Páginas y Secciones del Sitio */}
                    {searchResults.pages.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="font-headline font-bold text-xs uppercase tracking-wider text-orange-400 flex items-center gap-2">
                            <Compass className="w-4 h-4" />
                            <span>Páginas y Secciones ({searchResults.pages.length})</span>
                          </span>
                        </div>
                        <div className="space-y-2">
                          {searchResults.pages.map((p, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSelectPage(p)}
                              className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group"
                            >
                              <div className="min-w-0 flex-1 pr-3">
                                <h4 className="font-headline font-bold text-sm text-white group-hover:text-secondary transition-colors truncate">
                                  {p.title}
                                </h4>
                                <p className="font-body text-xs text-gray-400 line-clamp-1 mt-0.5">
                                  {p.description || p.subtitle}
                                </p>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-white bg-secondary/80 group-hover:bg-secondary px-2.5 py-1 rounded-lg shrink-0 flex items-center gap-1 transition-colors">
                                <span>Ir</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Columna Derecha (lg:col-span-7): Productos Encontrados */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-headline font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
                        <Package className="w-4 h-4 text-secondary" />
                        <span>Productos en Inventario ({searchResults.products.length})</span>
                      </span>
                    </div>

                    {searchResults.products.length === 0 ? (
                      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-gray-400">
                        No hay productos que coincidan directamente con este término.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {searchResults.products.map((prod) => (
                          <article
                            key={prod.id}
                            onClick={() => handleSelectProduct(prod)}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/50 rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between group shadow-md hover:shadow-xl"
                          >
                            <div className="space-y-3">
                              {/* Imagen del producto compacta en tarjeta blanca para contraste */}
                              <div className="h-24 sm:h-28 w-full bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden shadow-xs">
                                <img
                                  src={prod.local_image || prod.image_url || './brand/logo-construy.png'}
                                  alt={prod.name}
                                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              <div>
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                                    {prod.category}
                                  </span>
                                  <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                    {prod.stock_status || 'Disponible'}
                                  </span>
                                </div>
                                <h4 className="font-headline font-bold text-sm text-white group-hover:text-secondary transition-colors line-clamp-1">
                                  {prod.name}
                                </h4>
                                <p className="font-body text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                                  {prod.description}
                                </p>
                              </div>
                            </div>

                            {/* Precios y Acción */}
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                              <div>
                                <span className="font-mono font-extrabold text-sm text-white block">
                                  ${prod.price_ref ? prod.price_ref.replace(/[^\d.,]/g, '') : '0'} USD
                                </span>
                                <span className="font-mono text-[10px] text-gray-400 block">
                                  {Number(prod.price_ves).toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                                </span>
                              </div>
                              <span className="text-xs font-headline font-bold text-secondary group-hover:text-white flex items-center gap-1">
                                <span>Ver producto</span>
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
