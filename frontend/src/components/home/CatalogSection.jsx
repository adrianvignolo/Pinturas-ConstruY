import React, { useState } from 'react';
import { ShoppingBag, Check, Plus, AlertCircle, Eye, ShieldCheck, Droplets, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CatalogSection({ products, loading, error, onGoToOrders }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [addedIds, setAddedIds] = useState({});
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState({});
  const { addToCart } = useCart();

  const categories = ['Todos', 'Pinturas de caucho', 'Esmalte semi-industrial', 'Taza'];

  const getProductImages = (prod) => {
    if (!prod) return [];
    if (prod.category?.toLowerCase() === 'taza' || prod.name?.toLowerCase().includes('taza')) {
      return [
        '/products/krkbyxq4n9/taza_construy2.png',
        '/products/ahj9m1443p/taza_construy.png'
      ];
    }
    const list = [];
    if (prod.local_image) list.push(prod.local_image);
    if (prod.image_url && prod.image_url !== prod.local_image) list.push(prod.image_url);
    return list.length > 0 ? list : ['/brand/logo-construy.png'];
  };

  const getUSDPrice = (priceRef) => {
    if (!priceRef) return '0.00';
    const clean = priceRef.replace(/[^\d.,]/g, '').replace(',', '.');
    const val = parseFloat(clean);
    return isNaN(val) ? '0.00' : val.toFixed(2);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'Todos') return true;
    return p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
  });

  const handleAddProduct = (prod) => {
    addToCart(prod, 1);
    setAddedIds((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  return (
    <section id="catalogo" className="w-full py-16 sm:py-20 bg-surface scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-2">
              <span>01 / Catálogo de Presentaciones</span>
              <span>·</span>
              <span className="text-on-surface-variant font-medium">{products.length} Productos</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Presentaciones Oficiales
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
              Pinturas de caucho lavable de alta viscosidad y esmalte sintético semi-industrial directo de fábrica. Precios en Bolívares (VES) y referencia en divisas.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-headline font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-subtle border border-surface-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-surface-container-lowest rounded-xl p-5 border border-surface-border animate-pulse h-96">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-200 rounded mt-6"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-5 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-3 my-6">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-xs sm:text-sm">
              Error al consultar el catálogo desde MariaDB 3307: {error}
            </p>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((prod) => {
              const isAdded = addedIds[prod.id];
              const prodImages = getProductImages(prod);
              const activeIdx = cardImageIndex[prod.id] || 0;
              const displayImage = prodImages[activeIdx] || prod.local_image || prod.image_url;

              return (
                <article
                  key={prod.id}
                  className="bg-surface-container-lowest rounded-2xl border border-surface-border hover:border-primary/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Image Viewport */}
                  <div className="relative aspect-4/3 bg-surface-subtle overflow-hidden flex items-center justify-center p-6">
                    <img
                      src={displayImage}
                      alt={prod.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/brand/logo-construy.png';
                      }}
                    />

                    {/* Multi-image thumbnail dots */}
                    {prodImages.length > 1 && (
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full z-10 shadow-xs">
                        {prodImages.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardImageIndex((prev) => ({ ...prev, [prod.id]: i }));
                            }}
                            className={`rounded-full transition-all ${
                              activeIdx === i ? 'bg-secondary w-4 h-2' : 'bg-white/70 hover:bg-white w-2 h-2'
                            }`}
                            title={`Ver foto ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-primary text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-surface-border">
                        {prod.category}
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {prod.stock_status}
                      </span>
                    </div>

                    {/* Quick view button */}
                    <button
                      onClick={() => {
                        setSelectedProductModal(prod);
                        setModalImageIndex(activeIdx);
                      }}
                      className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-primary rounded-lg shadow-xs border border-surface-border opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      title="Vista técnica detallada"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline font-bold text-lg text-primary mb-1.5 group-hover:text-secondary transition-colors">
                        {prod.name}
                      </h3>
                      <p className="font-body text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                        {prod.description}
                      </p>

                      {/* Technical Specs Tags */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-500 py-2.5 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-3 h-3 text-secondary" />
                          <span>Alta densidad</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Lavable</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Add to Cart: Primero USD y luego VES */}
                    <div className="pt-3 border-t border-surface-border">
                      <div className="flex items-baseline justify-between mb-3.5">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-gray-400 block">Precio Oficial</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-mono font-extrabold text-xl sm:text-2xl text-primary">
                              ${getUSDPrice(prod.price_ref)}
                            </span>
                            <span className="text-xs font-mono font-bold text-secondary">
                              USD
                            </span>
                          </div>
                          <span className="font-mono text-xs text-on-surface-variant block mt-0.5">
                            {Number(prod.price_ves).toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="bg-secondary/10 text-secondary text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-secondary/20">
                            Fábrica
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddProduct(prod)}
                          className={`flex-1 py-2.5 px-3.5 rounded-lg text-xs font-headline font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-primary hover:bg-primary-container text-white'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>¡Agregado al Pedido!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Agregar al Pedido</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={onGoToOrders}
                          className="p-2.5 bg-surface-subtle hover:bg-surface-container text-primary rounded-lg transition-colors border border-surface-border"
                          title="Ver Pedido Completo"
                        >
                          <ShoppingBag className="w-4 h-4 text-orange-vibrant" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Modal View */}
        {selectedProductModal && (() => {
          const modalImages = getProductImages(selectedProductModal);
          const currentImg = modalImages[modalImageIndex] || selectedProductModal.local_image || selectedProductModal.image_url;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-border relative">
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 bg-surface-subtle rounded-full z-10"
                >
                  ✕
                </button>

                {/* Main image viewer with optional arrows */}
                <div className="aspect-video bg-surface-subtle rounded-xl p-4 mb-3 flex items-center justify-center relative group overflow-hidden">
                  <img
                    src={currentImg}
                    alt={selectedProductModal.name}
                    className="max-h-full object-contain mix-blend-multiply transition-all"
                  />
                  {modalImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setModalImageIndex((prev) => (prev > 0 ? prev - 1 : modalImages.length - 1))}
                        className="absolute left-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-primary shadow-xs border border-surface-border transition-colors"
                        title="Foto anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalImageIndex((prev) => (prev < modalImages.length - 1 ? prev + 1 : 0))}
                        className="absolute right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-primary shadow-xs border border-surface-border transition-colors"
                        title="Siguiente foto"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip if multiple images */}
                {modalImages.length > 1 && (
                  <div className="flex gap-2 mb-4 justify-center">
                    {modalImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setModalImageIndex(i)}
                        className={`w-14 h-14 rounded-xl p-1 border-2 transition-all flex items-center justify-center bg-surface-subtle overflow-hidden ${
                          modalImageIndex === i
                            ? 'border-secondary ring-2 ring-secondary/20 shadow-xs'
                            : 'border-surface-border hover:border-gray-400 opacity-70 hover:opacity-100'
                        }`}
                        title={`Vista ${i + 1}`}
                      >
                        <img src={img} alt={`Vista ${i + 1}`} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider">
                  {selectedProductModal.category}
                </span>
                <h3 className="font-headline font-extrabold text-2xl text-primary mt-1 mb-2">
                  {selectedProductModal.name}
                </h3>
                <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                  {selectedProductModal.description}
                </p>
                <div className="flex items-center justify-between p-3.5 bg-surface-subtle rounded-xl mb-6 border border-surface-border">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Precio Oficial de Fábrica:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono font-extrabold text-2xl text-primary">
                        ${getUSDPrice(selectedProductModal.price_ref)} USD
                      </span>
                    </div>
                    <span className="font-mono text-xs text-on-surface-variant block mt-0.5">
                      {Number(selectedProductModal.price_ves).toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20">
                    Stock Disponible
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleAddProduct({ ...selectedProductModal, image: currentImg, local_image: currentImg });
                      setSelectedProductModal(null);
                    }}
                    className="flex-1 bg-primary hover:bg-primary-container text-white font-headline font-bold py-2.5 px-4 rounded-lg text-xs flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar al Pedido</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProductModal(null);
                      onGoToOrders();
                    }}
                    className="bg-secondary hover:bg-secondary-container text-white font-headline font-bold py-2.5 px-4 rounded-lg text-xs"
                  >
                    Ir al Pedido
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
