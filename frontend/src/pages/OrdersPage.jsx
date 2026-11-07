import React from 'react';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  FileText,
  MessageCircle,
  Package
} from 'lucide-react';

export default function OrdersPage({ onGoToHome, onGoToCheckout }) {
  const {
    items,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    resetToSample,
    subtotalVES,
    subtotalREF
  } = useCart();

  const getUSDPriceNumber = (priceRef) => {
    if (!priceRef) return 0;
    const clean = priceRef.replace(/[^\d.,]/g, '').replace(',', '.');
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val;
  };

  const formatUSD = (priceRef) => {
    return getUSDPriceNumber(priceRef).toFixed(2);
  };

  const totalProductsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-6 max-w-[1280px] mx-auto min-h-screen">
      {/* Top Nav actions & Breadcrumbs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onGoToHome}
          className="inline-flex items-center gap-2 text-xs font-headline font-bold text-primary hover:text-secondary bg-surface-container-lowest px-3.5 py-2 rounded-lg border border-surface-border transition-colors shadow-xs w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        {/* Stepper Progress */}
        <div className="flex items-center gap-2 text-xs font-headline font-bold">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-white rounded-full shadow-xs">
            <span className="w-4 h-4 rounded-full bg-white text-secondary text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Revisión de Productos</span>
          </span>
          <span className="text-gray-300">→</span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-container text-on-surface-variant rounded-full">
            <span className="w-4 h-4 rounded-full bg-surface-border text-on-surface-variant text-[10px] flex items-center justify-center font-bold">2</span>
            <span>Facturación y Pago</span>
          </span>
        </div>

        {items.length > 0 && (
          <button
            onClick={resetToSample}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-on-surface-variant hover:text-primary transition-colors w-fit"
            title="Recargar pedido de ejemplo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cargar muestra</span>
          </button>
        )}
      </div>

      {/* Main Header */}
      <div className="mb-8 pb-4 border-b border-surface-border flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>Paso 1 de 2 · Tu Carrito de Compra</span>
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Resumen de tu Pedido
          </h1>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
            Revisa las presentaciones y cantidades antes de ingresar tus datos de facturación y despacho.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-headline font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1.5 w-fit"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Vaciar Carrito</span>
          </button>
        )}
      </div>

      {/* Cart Content or Empty State */}
      {items.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-12 sm:p-16 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-20 h-20 bg-surface-subtle text-on-surface-variant rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="font-headline text-2xl font-bold text-primary mb-2">
            Tu carrito de pedido está vacío
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
            Explora nuestro catálogo de pinturas de caucho lavable y esmaltes semi-industriales para agregar productos a tu orden.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onGoToHome}
              className="bg-primary hover:bg-primary-container text-white font-headline font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Explorar Catálogo</span>
            </button>
            <button
              onClick={resetToSample}
              className="bg-surface-subtle hover:bg-surface-container text-primary font-headline font-bold px-5 py-3 rounded-xl text-xs sm:text-sm border border-surface-border transition-all"
            >
              Cargar Muestra de Ejemplo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Products List & Delivery Note */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border">
                <span className="font-headline font-bold text-sm text-primary">
                  Productos Seleccionados ({totalProductsCount})
                </span>
                <span className="font-mono text-xs text-on-surface-variant">
                  Moneda: USD / VES (BCV)
                </span>
              </div>

              <div className="space-y-4 divide-y divide-surface-border">
                {items.map((item, index) => (
                  <article key={item.id || index} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Product Details */}
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-surface-subtle border border-surface-border p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                        {(item.image || item.local_image || item.image_url) ? (
                          <img
                            src={item.image || item.local_image || item.image_url}
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/brand/logo-construy.png';
                            }}
                          />
                        ) : (
                          <Package className="w-7 h-7 text-secondary" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-wider block">
                          {item.finish || item.category || 'Pintura Premium'}
                        </span>
                        <h3 className="font-headline font-bold text-sm text-primary leading-tight truncate">
                          {item.name}
                        </h3>
                        <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                          Presentación: <strong className="text-primary">{item.presentation || item.category || 'Estándar'}</strong>
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="font-mono font-bold text-xs text-primary">
                            ${formatUSD(item.price_ref)} USD
                          </span>
                          <span className="font-mono text-[11px] text-gray-500">
                            ({Number(item.price_ves || 0).toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls and Item Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-border">
                      <div className="flex items-center border border-surface-border rounded-xl bg-surface-subtle p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => decrementQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          disabled={item.quantity <= 1}
                          aria-label={`Disminuir cantidad de ${item.name}`}
                          title="Disminuir cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="999"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            updateQuantity(item.id, isNaN(val) ? 1 : Math.max(1, val));
                          }}
                          className="w-11 text-center font-mono font-bold text-xs text-primary bg-transparent focus:outline-none focus:bg-white rounded py-1 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label={`Cantidad de unidades de ${item.name}`}
                          title="Cantidad de unidades"
                        />
                        <button
                          type="button"
                          onClick={() => incrementQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface text-primary transition-colors cursor-pointer"
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          title="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for this line */}
                      <div className="text-right min-w-[90px]">
                        <span className="font-mono font-extrabold text-sm text-primary block">
                          ${(getUSDPriceNumber(item.price_ref) * item.quantity).toFixed(2)} USD
                        </span>
                        <span className="font-mono text-[11px] text-gray-500 block">
                          {(Number(item.price_ves || 0) * item.quantity).toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Delivery Note Box */}
            <div className="bg-surface-container-low border border-surface-border rounded-2xl p-5 text-xs text-primary space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 font-headline font-bold text-primary">
                <Truck className="w-4 h-4 text-orange-vibrant" />
                <span>Condiciones de Entrega y Facturación</span>
              </div>
              <p className="font-body text-on-surface-variant leading-relaxed">
                • <strong>Envío a Caracas sin costo adicional:</strong> cubrimos el área metropolitana de Caracas directamente desde fábrica en Macaracuay.<br />
                • <strong>Para facturación legal:</strong> emitimos factura con RIF o cédula en el siguiente paso.<br />
                • <strong>Validación inmediata:</strong> una vez confirmados los datos en el checkout, el pedido se procesa y valida por WhatsApp con nuestro equipo.
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 shadow-xs sticky top-24">
              <h2 className="font-headline font-bold text-base text-primary mb-4 pb-3 border-b border-surface-border flex items-center justify-between">
                <span>Resumen Financiero</span>
                <span className="text-xs font-mono font-normal text-on-surface-variant">
                  {totalProductsCount} {totalProductsCount === 1 ? 'producto' : 'productos'}
                </span>
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-baseline text-on-surface-variant">
                  <span>Subtotal Productos</span>
                  <div className="text-right font-mono">
                    <span className="font-extrabold text-primary text-base block">
                      ${subtotalREF.toFixed(2)} USD
                    </span>
                    <span className="text-xs text-gray-500 block mt-0.5">
                      {subtotalVES.toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-on-surface-variant pt-2 border-t border-surface-border">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Envío a Caracas</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                    Sin costo adicional
                  </span>
                </div>

                <div className="pt-4 border-t-2 border-surface-border flex justify-between items-baseline">
                  <span className="font-headline font-extrabold text-base text-primary">Total Final</span>
                  <div className="text-right">
                    <span className="font-mono font-extrabold text-2xl text-secondary block leading-none">
                      ${subtotalREF.toFixed(2)} USD
                    </span>
                    <span className="font-mono font-bold text-xs text-primary mt-1.5 inline-block">
                      {subtotalVES.toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Confirm and proceed to Checkout */}
              <div className="mt-6 pt-2 space-y-3">
                <button
                  type="button"
                  onClick={onGoToCheckout}
                  disabled={items.length === 0}
                  className="w-full bg-secondary hover:bg-secondary-container text-white font-headline font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  <span>Confirmar Productos y Continuar al Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={onGoToHome}
                  className="w-full bg-surface-subtle hover:bg-surface-container text-primary font-headline font-bold py-2.5 px-4 rounded-xl text-xs border border-surface-border transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Seguir Comprando en el Catálogo</span>
                </button>
              </div>

              {/* Security & Guarantee Pills */}
              <div className="mt-6 pt-5 border-t border-surface-border space-y-2.5 text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Precios oficiales de fábrica con garantía de calidad ConstruY.</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span>Facturación legal con RIF o Cédula en el siguiente paso.</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-secondary shrink-0" />
                  <span>Atención y asesoría directa por WhatsApp disponible.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
