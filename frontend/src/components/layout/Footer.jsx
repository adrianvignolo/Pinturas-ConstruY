import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, ShieldCheck, FileText, X } from 'lucide-react';

export default function Footer({ company, setActivePage }) {
  const currentYear = 2026;
  const [modalType, setModalType] = useState(null);

  return (
    <footer className="w-full bg-primary-container text-white border-t border-white/10 mt-20">
      {/* Top Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-auto px-2 py-1 rounded-xl bg-white flex items-center justify-center shadow-xs border border-white/20">
                <img
                  src="/brand/logo-construy.png"
                  alt="Pinturas ConstruY"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-headline font-extrabold text-lg text-white block leading-tight">
                  Pinturas ConstruY
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  Materiales ConstruY, C.A.
                </span>
              </div>
            </div>

            <p className="font-body text-xs text-gray-300 leading-relaxed pt-1">
              Fabricantes directos de pinturas de caucho lavable y esmalte semi-industrial para interiores y exteriores.
            </p>

            <div className="text-xs font-mono text-gray-400 space-y-1 pt-2">
              <p>RIF: J-504842850</p>
              <button
                onClick={() => { setActivePage('contacto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-start gap-1.5 text-gray-300 hover:text-white text-left transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-vibrant shrink-0 mt-0.5" />
                <span>Macaracuay, Caracas, Miranda (Ver mapa)</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-orange-vibrant mb-4 border-l-2 border-secondary pl-2">
              Navegación & Catálogo
            </h4>
            <ul className="space-y-2 text-xs font-body text-gray-300">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Presentaciones (Galones y Cuñetes)
                </a>
              </li>
              <li>
                <a href="#carta" className="hover:text-white transition-colors">
                  Carta de Color (23 Fórmulas)
                </a>
              </li>
              <li>
                <a href="#partner" className="hover:text-white transition-colors">
                  Programa Partner (Puntos y Mayoristas)
                </a>
              </li>
              <li>
                <a href="#pagos" className="hover:text-white transition-colors">
                  Formas de Pago y Cuentas Aceptadas
                </a>
              </li>
              <li>
                <button
                  onClick={() => { setActivePage('pedidos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-orange-vibrant transition-colors text-left font-semibold"
                >
                  Página de Pedidos en Línea →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-orange-vibrant mb-4 border-l-2 border-secondary pl-2">
              Contacto y Fábrica
            </h4>
            <ul className="space-y-2.5 text-xs font-body text-gray-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+584242803167" className="hover:text-white transition-colors font-mono">
                  +58 424 280 3167
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:materialesconstruy@gmail.com" className="hover:text-white transition-colors">
                  materialesconstruy@gmail.com
                </a>
              </li>
              <li className="text-[11px] font-mono text-gray-400 pt-1">
                Lunes a viernes de 8:00 AM a 5:00 PM
              </li>
              <li className="pt-2">
                <button
                  onClick={() => { setActivePage('contacto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-1.5 text-xs font-headline font-bold bg-white/10 text-white border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <span>Página de Contacto y Ubicación</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Assurance & Social */}
          <div>
            <h4 className="font-headline font-bold text-xs uppercase tracking-wider text-orange-vibrant mb-4 border-l-2 border-secondary pl-2">
              Garantía y Despacho
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Envío a Caracas sin costo adicional. Despachos directos desde fábrica para contratistas y particulares.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/materialesconstruy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-pink-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@materialesconstruy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white font-mono text-xs font-bold"
                aria-label="TikTok"
              >
                TK
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 px-4 sm:px-6 text-center text-xs font-mono text-gray-400">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {currentYear} Pinturas ConstruY (Materiales ConstruY, C.A.). RIF J-504842850.</span>
          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setModalType('privacidad')}
              className="text-gray-300 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Privacidad
            </button>
            <span className="text-gray-600">·</span>
            <button
              type="button"
              onClick={() => setModalType('terminos')}
              className="text-gray-300 hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Términos
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Privacidad / Términos */}
      {modalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-surface-container-lowest text-on-surface rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-surface-border relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-surface-subtle transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === 'privacidad' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-secondary uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Aviso Legal</span>
                </div>
                <h3 className="font-headline text-2xl font-extrabold text-primary">
                  Política de Privacidad
                </h3>
                <p className="font-mono text-xs text-gray-500">
                  Materiales ConstruY, C.A. · RIF J-504842850 · Macaracuay, Caracas
                </p>

                <div className="space-y-3 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-2">
                  <div>
                    <h4 className="font-bold text-primary mb-1">1. Tratamiento de Datos Personales</h4>
                    <p>
                      La información suministrada en nuestro portal (nombre, documento de identidad/RIF, número de teléfono, dirección de despacho y correo electrónico) es recopilada exclusivamente con fines de facturación legal, cotización de volumen y coordinación logística de entrega.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary mb-1">2. Confidencialidad y Seguridad</h4>
                    <p>
                      Materiales ConstruY, C.A. no vende, cede ni comparte los datos de sus clientes con terceros. Toda información referente a comprobantes de pago (Pago Móvil, transferencias y Zelle) es tratada con estricta confidencialidad operativa y fiscal.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary mb-1">3. Canales de Comunicación Oficial</h4>
                    <p>
                      Nuestra interacción se canaliza únicamente a través de líneas verificadas: WhatsApp (+58 424 280 3167) y correo institucional (materialesconstruy@gmail.com).
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-border flex justify-end">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="bg-primary hover:bg-primary-container text-white font-headline font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-secondary uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-secondary" />
                  <span>Condiciones Comerciales</span>
                </div>
                <h3 className="font-headline text-2xl font-extrabold text-primary">
                  Términos y Condiciones
                </h3>
                <p className="font-mono text-xs text-gray-500">
                  Materiales ConstruY, C.A. · RIF J-504842850 · Macaracuay, Caracas
                </p>

                <div className="space-y-3 font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-2">
                  <div>
                    <h4 className="font-bold text-primary mb-1">1. Precios y Monedas</h4>
                    <p>
                      Los precios oficiales se publican prioritariamente en Dólares Estadounidenses (USD) de referencia y en Bolívares (VES), calculados según la tasa oficial publicada por el Banco Central de Venezuela (BCV) para el día de la transacción.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary mb-1">2. Pedidos y Confirmación de Existencias</h4>
                    <p>
                      El registro de un pedido a través de la web constituye una solicitud preliminar. Nuestro equipo de atención valida la disponibilidad de fórmulas de color y presentaciones antes de solicitar el pago definitivo.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary mb-1">3. Condiciones de Entrega</h4>
                    <p>
                      • <strong>Envío a Caracas:</strong> Sin costo adicional para el área metropolitana de Caracas.<br />
                      • <strong>Retiro personal en tienda:</strong> Disponible en nuestra sede de Macaracuay, Caracas, en horario laboral de lunes a viernes de 8:00 AM a 5:00 PM.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-primary mb-1">4. Garantía de Calidad</h4>
                    <p>
                      Todos los productos ConstruY cuentan con garantía de fábrica en viscosidad, adherencia y lavabilidad según ficha técnica oficial.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-border flex justify-end">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="bg-primary hover:bg-primary-container text-white font-headline font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
