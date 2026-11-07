import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import {
  ShoppingBag,
  ArrowLeft,
  Truck,
  CreditCard,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Smartphone,
  DollarSign,
  Building,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  Package,
  User,
  MapPin
} from 'lucide-react';

export default function CheckoutPage({ onGoToHome, onBackToOrders }) {
  const {
    items,
    clearCart,
    subtotalVES,
    subtotalREF
  } = useCart();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerDocument, setCustomerDocument] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('Envío a Caracas (Sin costo)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pago Móvil');
  const [notes, setNotes] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getUSDPriceNumber = (priceRef) => {
    if (!priceRef) return 0;
    const clean = priceRef.replace(/[^\d.,]/g, '').replace(',', '.');
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val;
  };

  const totalProductsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError('El pedido no tiene ningún producto agregado.');
      return;
    }

    if (!customerName.trim() || !customerDocument.trim() || !customerPhone.trim()) {
      setSubmitError('Por favor completa los campos obligatorios: Nombre o Razón Social, Cédula/RIF y Teléfono celular.');
      return;
    }

    if (deliveryMethod.includes('Envío') && !deliveryAddress.trim()) {
      setSubmitError('Por favor ingresa la dirección de entrega para coordinar el despacho.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer_name: customerName.trim(),
        customer_document: customerDocument.trim(),
        customer_phone: customerPhone.trim(),
        customer_email: customerEmail.trim(),
        delivery_method: deliveryMethod,
        delivery_address: deliveryAddress.trim() || 'Retiro en tienda',
        payment_method: paymentMethod,
        subtotal_ves: subtotalVES,
        total_ves: subtotalVES,
        total_ref: subtotalREF,
        notes: notes.trim(),
        items: items.map((i) => ({
          product_id: i.id || null,
          product_name: i.name,
          unit_price_ves: i.price_ves,
          quantity: i.quantity,
          total_price_ves: i.price_ves * i.quantity
        }))
      };

      const res = await createOrder(payload);
      setSubmittedOrder(res);
      clearCart();
    } catch (err) {
      setSubmitError(err.message || 'Error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pantalla de Éxito al Confirmar Pedido
  if (submittedOrder) {
    return (
      <div className="py-12 sm:py-16 px-4 sm:px-6 max-w-2xl mx-auto min-h-screen">
        <div className="bg-surface-container-lowest rounded-3xl border border-emerald-300 p-8 sm:p-12 shadow-xl text-center animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle className="w-12 h-12" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block mb-3">
            ¡Pedido Confirmado con Éxito!
          </span>

          <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary mb-2">
            Orden #{submittedOrder.order_number}
          </h1>

          <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-6 max-w-lg mx-auto leading-relaxed">
            Tu orden ha sido registrada en nuestro sistema central. Para coordinar el despacho inmediato o validar existencias de colores específicos, pulsa en el botón de WhatsApp:
          </p>

          <div className="p-5 bg-surface-subtle rounded-2xl mb-6 text-left max-w-md mx-auto text-xs space-y-2 font-mono border border-surface-border">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Monto Total:</span>
              <span className="font-bold text-secondary text-sm sm:text-base">
                ${submittedOrder.total_ref?.toFixed(2)} USD
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
              <span>Equivalente VES:</span>
              <span className="font-bold text-primary">
                {submittedOrder.total_ves?.toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
              </span>
            </div>
            <div className="pt-2 border-t border-surface-border flex justify-between">
              <span className="text-gray-500">Estado:</span>
              <span className="text-amber-600 font-bold">Pendiente de confirmación</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Forma de Pago:</span>
              <span className="text-gray-700 font-bold">{submittedOrder.payment_method || paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Despacho:</span>
              <span className="text-gray-700 font-bold">{submittedOrder.delivery_method || deliveryMethod}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={submittedOrder.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-headline font-bold py-3.5 px-7 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continuar y Validar por WhatsApp</span>
            </a>

            <button
              onClick={onGoToHome}
              className="inline-flex items-center justify-center gap-2 bg-surface-subtle hover:bg-surface-container text-primary font-headline font-bold py-3 px-5 rounded-xl text-xs border border-surface-border transition-colors"
            >
              <span>Volver al Catálogo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay productos y el usuario llega directo a /checkout
  if (items.length === 0) {
    return (
      <div className="py-14 px-4 sm:px-6 max-w-xl mx-auto min-h-screen text-center">
        <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-10 shadow-xs">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="font-headline text-2xl font-bold text-primary mb-2">
            No hay productos en tu pedido
          </h2>
          <p className="font-body text-xs sm:text-sm text-on-surface-variant mb-6">
            Para realizar el checkout, primero agrega los productos y presentaciones deseadas desde el catálogo.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onGoToHome}
              className="bg-primary hover:bg-primary-container text-white font-headline font-bold px-5 py-2.5 rounded-xl text-xs"
            >
              Ir al Catálogo
            </button>
            <button
              onClick={onBackToOrders}
              className="bg-surface-subtle hover:bg-surface-container text-primary font-headline font-bold px-5 py-2.5 rounded-xl text-xs border border-surface-border"
            >
              Ver Carrito
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-6 max-w-[1280px] mx-auto min-h-screen">
      {/* Top Nav actions & Breadcrumbs */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToOrders}
          className="inline-flex items-center gap-2 text-xs font-headline font-bold text-primary hover:text-secondary bg-surface-container-lowest px-3.5 py-2 rounded-lg border border-surface-border transition-colors shadow-xs w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Revisar Productos</span>
        </button>

        {/* Stepper Progress */}
        <div className="flex items-center gap-2 text-xs font-headline font-bold">
          <button
            onClick={onBackToOrders}
            className="flex items-center gap-1.5 px-3 py-1 bg-surface-container text-on-surface-variant hover:text-primary rounded-full transition-colors"
          >
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">✓</span>
            <span>1. Productos Confirmados</span>
          </button>
          <span className="text-gray-300">→</span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary text-white rounded-full shadow-xs">
            <span className="w-4 h-4 rounded-full bg-white text-secondary text-[10px] flex items-center justify-center font-bold">2</span>
            <span>Facturación, Envío y Pago</span>
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-8 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-1.5">
          <Lock className="w-4 h-4" />
          <span>Paso 2 de 2 · Finalizar Pedido</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          Datos de Facturación, Envío y Pago
        </h1>
        <p className="font-body text-xs sm:text-sm text-on-surface-variant mt-1">
          Completa tus datos fiscales para emitir la factura legal y coordinar el despacho directo de tus pinturas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            {/* Error Message if validation fails */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-xs animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                <span className="font-medium leading-relaxed">{submitError}</span>
              </div>
            )}

            {/* Section 1: Billing & Customer Information */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-headline font-bold text-sm text-primary pb-3 border-b border-surface-border">
                <User className="w-4 h-4 text-secondary" />
                <span>1. Datos del Comprador y Facturación Legal</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-headline font-semibold text-primary mb-1">
                    Nombre Completo o Razón Social <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Inversiones Los Andes, C.A. o Carlos Pérez"
                    className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-headline font-semibold text-primary mb-1">
                      Cédula de Identidad o RIF <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerDocument}
                      onChange={(e) => setCustomerDocument(e.target.value)}
                      placeholder="Ej: J-12345678-9 o V-14234567"
                      className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-headline font-semibold text-primary mb-1">
                      Teléfono Celular / WhatsApp <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Ej: 0414 123 4567"
                      className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-headline font-semibold text-primary mb-1">
                    Correo Electrónico (Opcional para comprobante digital)
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Method and Address */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-headline font-bold text-sm text-primary pb-3 border-b border-surface-border">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>2. Método y Dirección de Despacho</span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-headline font-semibold text-primary mb-1">
                    Selecciona el Método de Entrega
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white font-headline font-bold text-primary cursor-pointer"
                  >
                    <option value="Envío a Caracas (Sin costo)">Envío a Caracas (Sin costo adicional directamente de fábrica)</option>
                    <option value="Retiro en Tienda (Macaracuay)">Retiro personal en Tienda (Macaracuay, Caracas)</option>
                    <option value="Envío Nacional (Cobro a destino)">Envío Nacional por Encomienda (Cobro a destino / Zoom, MRW, Tealca)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-headline font-semibold text-primary mb-1">
                    Dirección de Entrega Exacta {deliveryMethod.includes('Envío') && <span className="text-secondary">*</span>}
                  </label>
                  <textarea
                    rows="2"
                    required={deliveryMethod.includes('Envío')}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Urbanización, calle, edificio o casa, punto de referencia claro..."
                    className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-body"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Payment Method and Account Details */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 font-headline font-bold text-sm text-primary pb-3 border-b border-surface-border">
                <CreditCard className="w-4 h-4 text-secondary" />
                <span>3. Forma de Pago Aceptada</span>
              </div>

              <div>
                <label className="block text-xs font-headline font-semibold text-primary mb-2">
                  Selecciona la opción con la que deseas pagar:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3.5">
                  {[
                    { id: 'Pago Móvil', label: 'Pago Móvil (VES)', icon: Smartphone },
                    { id: 'Zelle', label: 'Zelle (USD)', icon: DollarSign },
                    { id: 'Transferencia Banesco', label: 'Banesco (VES)', icon: Building },
                    { id: 'Transferencia BDT', label: 'BDT (VES)', icon: Building },
                    { id: 'Efectivo Divisas', label: 'Efectivo al Recibir', icon: DollarSign },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-left text-xs font-headline font-bold flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'border-secondary bg-secondary/10 text-secondary ring-2 ring-secondary/30'
                            : 'border-surface-border bg-surface-subtle text-primary hover:bg-surface-container'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-secondary" />
                        <span className="truncate">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Account Details Box with 1-click copy */}
                <div className="p-4 bg-surface-subtle rounded-xl border border-surface-border text-xs font-mono space-y-2.5">
                  {paymentMethod === 'Pago Móvil' && (
                    <div>
                      <span className="font-headline font-bold text-primary block mb-1 text-xs">
                        Datos para Pago Móvil (VES):
                      </span>
                      <div className="flex items-center justify-between text-primary py-0.5">
                        <span>Teléfono: <strong>0424 280 3167</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy('04242803167', 'pm-t')}
                          className="text-gray-500 hover:text-primary flex items-center gap-1 text-[11px]"
                          title="Copiar teléfono"
                        >
                          {copiedKey === 'pm-t' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">Copiar</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-primary py-0.5">
                        <span>RIF: <strong>J-504842850</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy('J504842850', 'pm-r')}
                          className="text-gray-500 hover:text-primary flex items-center gap-1 text-[11px]"
                          title="Copiar RIF"
                        >
                          {copiedKey === 'pm-r' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">Copiar</span>
                        </button>
                      </div>
                      <div className="text-on-surface-variant text-[11px] pt-1 border-t border-surface-border/60">
                        Bancos disponibles: Banesco (0134) · BDT (0175) · Tesoro (0163)
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Zelle' && (
                    <div>
                      <span className="font-headline font-bold text-primary block mb-1 text-xs">
                        Datos para Pago Zelle (USD):
                      </span>
                      <div className="flex items-center justify-between text-primary py-0.5">
                        <span className="truncate">Correo: <strong>Adrianvignolo@gmail.com</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy('Adrianvignolo@gmail.com', 'zl-m')}
                          className="text-gray-500 hover:text-primary shrink-0 ml-1 flex items-center gap-1 text-[11px]"
                          title="Copiar correo"
                        >
                          {copiedKey === 'zl-m' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">Copiar</span>
                        </button>
                      </div>
                      <div className="text-on-surface-variant text-[11px] pt-0.5">
                        Titular: Adrian Meneses
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Transferencia Banesco' && (
                    <div>
                      <span className="font-headline font-bold text-primary block mb-1 text-xs">
                        Transferencia Banesco (0134):
                      </span>
                      <div className="flex items-center justify-between text-primary py-0.5">
                        <span className="break-all font-bold">0134-1202-20-0001004193</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('01341202200001004193', 'tr-b')}
                          className="text-gray-500 hover:text-primary shrink-0 ml-1 flex items-center gap-1 text-[11px]"
                          title="Copiar cuenta"
                        >
                          {copiedKey === 'tr-b' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">Copiar</span>
                        </button>
                      </div>
                      <div className="text-on-surface-variant text-[11px] pt-0.5">
                        Materiales ConstruY, C.A. (RIF J-504842850)
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Transferencia BDT' && (
                    <div>
                      <span className="font-headline font-bold text-primary block mb-1 text-xs">
                        Transferencia BDT Banco Digital de los Trabajadores (0175):
                      </span>
                      <div className="flex items-center justify-between text-primary py-0.5">
                        <span className="break-all font-bold">0175-0473-80-0077771890</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('01750473800077771890', 'tr-d')}
                          className="text-gray-500 hover:text-primary shrink-0 ml-1 flex items-center gap-1 text-[11px]"
                          title="Copiar cuenta"
                        >
                          {copiedKey === 'tr-d' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="hidden sm:inline">Copiar</span>
                        </button>
                      </div>
                      <div className="text-on-surface-variant text-[11px] pt-0.5">
                        Materiales ConstruY, C.A. (RIF J-504842850)
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Efectivo Divisas' && (
                    <div>
                      <span className="font-headline font-bold text-primary block mb-1 text-xs">
                        Pago en Efectivo contra Entrega:
                      </span>
                      <p className="text-on-surface-variant text-xs leading-relaxed font-body">
                        Puedes abonar en efectivo en dólares (USD) o euros en billetes en buen estado al momento de recibir tus pinturas en Caracas o al retirar en tienda.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4: Specific Colors or Notes */}
            <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 shadow-xs space-y-3">
              <label className="block text-xs font-headline font-semibold text-primary">
                Colores específicos de la Carta ConstruY o notas del pedido
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej: Colores M9010 Blanco Nieve, RAL5010 Azul Industrial, acabado mate"
                className="w-full px-3.5 py-2.5 text-xs border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-body"
              />
              <p className="text-[11px] text-on-surface-variant">
                Si seleccionaste pinturas con color personalizado, indícanos aquí el código de tono o fórmula.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full bg-secondary hover:bg-secondary-container text-white font-headline font-bold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isSubmitting ? 'Procesando Pedido...' : 'Confirmar Pedido y Abrir WhatsApp'}</span>
            </button>

            <p className="text-[11px] font-mono text-on-surface-variant text-center leading-relaxed">
              Al confirmar, tu pedido se registra de forma segura y se genera el enlace oficial de WhatsApp para validación inmediata con el equipo de fábrica.
            </p>
          </form>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-border">
              <h2 className="font-headline font-bold text-base text-primary">
                Resumen de Compra
              </h2>
              <button
                type="button"
                onClick={onBackToOrders}
                className="text-xs font-headline font-bold text-secondary hover:underline flex items-center gap-1"
              >
                <span>Editar Carrito</span>
              </button>
            </div>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-surface-border/60">
              {items.map((item, idx) => (
                <div key={idx} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="font-bold text-primary block truncate">{item.name}</span>
                    <span className="text-[11px] text-gray-500 font-mono">
                      {item.quantity}x {item.presentation}
                    </span>
                  </div>
                  <div className="text-right font-mono font-bold text-primary shrink-0">
                    ${(getUSDPriceNumber(item.price_ref) * item.quantity).toFixed(2)} USD
                  </div>
                </div>
              ))}
            </div>

            {/* Financial breakdown */}
            <div className="mt-4 pt-4 border-t border-surface-border space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline text-on-surface-variant">
                <span>Subtotal ({totalProductsCount} productos)</span>
                <span className="font-mono font-bold text-primary">
                  ${subtotalREF.toFixed(2)} USD
                </span>
              </div>

              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Despacho</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">
                  {deliveryMethod.includes('Caracas') ? 'Sin costo adicional' : 'A coordinar'}
                </span>
              </div>

              <div className="pt-3 border-t-2 border-surface-border flex justify-between items-baseline">
                <span className="font-headline font-extrabold text-base text-primary">Total a Pagar</span>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-2xl text-secondary block leading-none">
                    ${subtotalREF.toFixed(2)} USD
                  </span>
                  <span className="font-mono font-bold text-xs text-primary mt-1 inline-block">
                    {subtotalVES.toLocaleString('es-VE', { minimumFractionDigits: 2 })} VES
                  </span>
                </div>
              </div>
            </div>

            {/* Trust box */}
            <div className="mt-6 pt-5 border-t border-surface-border space-y-2 text-[11px] text-on-surface-variant">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Factura emitida bajo RIF J-504842850.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Despacho directo desde fábrica en Macaracuay, Caracas.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
