import React, { useState, useRef } from 'react';
import { ShoppingBag, Check, Plus, AlertCircle, Eye, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Hook reutilizable para soportar dragging / swipe tanto con mouse como táctil
function useDragSlide(length, activeIndex, onIndexChange) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const isDownRef = useRef(false);

  const handlePointerDown = (e) => {
    if (length <= 1) return;
    // Evitar interceptar si se hace click en un botón hijo
    if (e.target.closest('button')) return;

    isDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDownRef.current || length <= 1) return;
    const currentX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const diff = currentX - startXRef.current;
    // Limitar el arrastre para una resistencia suave
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDragging(false);

    const threshold = 40; // píxeles necesarios para disparar el cambio
    if (dragOffset < -threshold) {
      // Arrastre hacia la izquierda -> siguiente
      onIndexChange((activeIndex + 1) % length);
    } else if (dragOffset > threshold) {
      // Arrastre hacia la derecha -> anterior
      onIndexChange((activeIndex - 1 + length) % length);
    }
    setDragOffset(0);
  };

  return {
    dragOffset,
    isDragging,
    listeners: {
      onMouseDown: handlePointerDown,
      onMouseMove: handlePointerMove,
      onMouseUp: handlePointerUp,
      onMouseLeave: handlePointerUp,
      onTouchStart: handlePointerDown,
      onTouchMove: handlePointerMove,
      onTouchEnd: handlePointerUp,
      onTouchCancel: handlePointerUp
    }
  };
}

// Subcomponente de carrusel interactivo con Drag / Swipe para cada tarjeta
function ProductCardImage({ prod, prodImages, activeIdx, onIndexChange, onQuickView }) {
  const { dragOffset, isDragging, listeners } = useDragSlide(
    prodImages.length,
    activeIdx,
    onIndexChange
  );

  const displayImage = prodImages[activeIdx] || prod.local_image || prod.image_url;

  return (
    <div
      {...listeners}
      className={`relative aspect-4/3 bg-surface-subtle overflow-hidden flex items-center justify-center p-6 select-none ${
        prodImages.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-transform"
        style={{
          transform: isDragging
            ? `translateX(${dragOffset}px)`
            : 'translateX(0px)',
          transition: isDragging ? 'none' : 'transform 0.25s ease-out'
        }}
      >
        <img
          src={displayImage}
          alt={prod.name}
          draggable="false"
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 pointer-events-none"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = './brand/logo-construy.png';
          }}
        />
      </div>

      {/* Flechas táctiles sutiles si hay varias imágenes */}
      {prodImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((activeIdx - 1 + prodImages.length) % prodImages.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white text-primary shadow-xs border border-surface-border opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Foto anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((activeIdx + 1) % prodImages.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 hover:bg-white text-primary shadow-xs border border-surface-border opacity-0 group-hover:opacity-100 transition-opacity z-10"
            title="Siguiente foto"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </>
      )}

      {/* Multi-image thumbnail dots */}
      {prodImages.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-full z-10 shadow-xs">
          {prodImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIndexChange(i);
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
      <div className="absolute top-3.5 left-3.5 flex items-center gap-2 pointer-events-none">
        <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-primary text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-surface-border">
          {prod.category}
        </span>
      </div>

      <div className="absolute top-3.5 right-3.5 pointer-events-none">
        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {prod.stock_status}
        </span>
      </div>

      {/* Quick view button */}
      <button
        onClick={onQuickView}
        className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-primary rounded-lg shadow-xs border border-surface-border opacity-0 group-hover:opacity-100 transition-opacity z-10"
        title="Vista técnica detallada"
      >
        <Eye className="w-4 h-4" />
      </button>
    </div>
  );
}

// Subcomponente de visor Modal con Drag / Swipe
function ModalImageViewer({ modalImages, modalImageIndex, onIndexChange, prodName }) {
  const { dragOffset, isDragging, listeners } = useDragSlide(
    modalImages.length,
    modalImageIndex,
    onIndexChange
  );

  const currentImg = modalImages[modalImageIndex];

  return (
    <div
      {...listeners}
      className={`aspect-video bg-surface-subtle rounded-xl p-4 mb-3 flex items-center justify-center relative group overflow-hidden select-none ${
        modalImages.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-transform"
        style={{
          transform: isDragging
            ? `translateX(${dragOffset}px)`
            : 'translateX(0px)',
          transition: isDragging ? 'none' : 'transform 0.25s ease-out'
        }}
      >
        <img
          src={currentImg}
          alt={prodName}
          draggable="false"
          className="max-h-full object-contain mix-blend-multiply pointer-events-none"
        />
      </div>

      {modalImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((modalImageIndex > 0 ? modalImageIndex - 1 : modalImages.length - 1));
            }}
            className="absolute left-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-primary shadow-xs border border-surface-border transition-colors z-10"
            title="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((modalImageIndex < modalImages.length - 1 ? modalImageIndex + 1 : 0));
            }}
            className="absolute right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-primary shadow-xs border border-surface-border transition-colors z-10"
            title="Siguiente foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}

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
    const cat = prod.category?.toLowerCase() || '';
    const name = prod.name?.toLowerCase() || '';

    if (cat === 'taza' || name.includes('taza')) {
      return [
        './products/krkbyxq4n9/taza_construy2.png',
        './products/ahj9m1443p/taza_construy.png'
      ];
    }
    if (cat.includes('esmalte') || name.includes('esmalte')) {
      return [
        './products/galon-esmalte/portada-v2.webp',
        './products/galon-esmalte/portada-montaje.webp',
        './products/galon-esmalte/0.webp',
        './products/producto_pintura_esmalte_materiales_construy.png'
      ];
    }
    if (name.includes('clase b')) {
      return [
        './products/cunete-caucho-b/portada-v2.webp',
        './products/cunete-caucho-b/portada-montaje.webp',
        './products/cunete-caucho-b/0.webp',
        './products/producto_cunete_pintura_caucho_materiales_construy-27.png'
      ];
    }
    if (name.includes('galón') || name.includes('galon')) {
      return [
        './products/galon-caucho-a/portada-v2.webp',
        './products/galon-caucho-a/portada-montaje.webp',
        './products/galon-caucho-a/0.webp',
        './products/producto_pintura_caucho_materiales_construy-9.png'
      ];
    }
    // Cuñete Clase A estándar o Venezuela
    return [
      './products/cunete-caucho-a/portada-v2.webp',
      './products/cunete-caucho-a/portada-montaje.webp',
      './products/cunete-caucho-a/0.webp',
      prod.local_image || './products/producto_cunete_pintura_caucho_materiales_construy-25.png'
    ];
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
              Pinturas y Artículos de Estudio
            </h2>
            <p className="font-body text-xs sm:text-sm text-gray-500 mt-1">
              Desliza sobre la imagen para ver los diferentes ángulos y presentaciones de cada producto.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-surface-subtle p-1.5 rounded-xl border border-surface-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-primary hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="font-mono text-xs text-gray-500 mt-4">Consultando inventario de fábrica...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-xs font-body">{error}</p>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((prod) => {
              const isAdded = addedIds[prod.id];
              const prodImages = getProductImages(prod);
              const activeIdx = cardImageIndex[prod.id] || 0;

              return (
                <article
                  key={prod.id}
                  className="bg-surface-container-lowest rounded-2xl border border-surface-border hover:border-primary/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Image Viewport con Swipe/Drag */}
                  <ProductCardImage
                    prod={prod}
                    prodImages={prodImages}
                    activeIdx={activeIdx}
                    onIndexChange={(newIdx) =>
                      setCardImageIndex((prev) => ({ ...prev, [prod.id]: newIdx }))
                    }
                    onQuickView={() => {
                      setSelectedProductModal(prod);
                      setModalImageIndex(activeIdx);
                    }}
                  />

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
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Fórmula lavable</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="pt-4 border-t border-surface-border flex items-center justify-between gap-3 mt-4">
                      <div>
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Precio</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-mono font-extrabold text-xl text-primary">
                            ${getUSDPrice(prod.price_ref)}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">USD</span>
                        </div>
                        {prod.price_ves && (
                          <span className="text-[10px] font-mono text-gray-400 block">
                            Bs. {prod.price_ves.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddProduct(prod)}
                        className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-primary hover:bg-secondary text-white active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Agregado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Al carrito</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Modal View con Drag / Swipe */}
        {selectedProductModal && (() => {
          const modalImages = getProductImages(selectedProductModal);

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
              <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-border relative">
                <button
                  onClick={() => setSelectedProductModal(null)}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 bg-surface-subtle rounded-full z-10"
                >
                  ✕
                </button>

                {/* Main image viewer with Dragging / Swipe */}
                <ModalImageViewer
                  modalImages={modalImages}
                  modalImageIndex={modalImageIndex}
                  onIndexChange={setModalImageIndex}
                  prodName={selectedProductModal.name}
                />

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
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddProduct(selectedProductModal);
                      setSelectedProductModal(null);
                    }}
                    className="px-5 py-2.5 bg-secondary text-white font-sans text-xs font-bold rounded-xl shadow-xs hover:bg-secondary/90 transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Añadir al Pedido</span>
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
