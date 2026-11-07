import React from 'react';
import { Building2, Phone, CreditCard, Truck, ShieldCheck, Mail, MapPin, Instagram } from 'lucide-react';

export default function CompanyInfoSection({ company }) {
  return (
    <section id="informacion" className="w-full py-16 sm:py-20 bg-surface scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Información General & Legal</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Datos del Comercio y Métodos de Pago
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
            Materiales ConstruY, C.A. Fabricantes directos de pinturas arquitectónicas e industriales. Facturación fiscal y múltiples canales de pago.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Identificación */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-extrabold text-lg text-primary mb-4">
                Identificación Fiscal
              </h3>
              <dl className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">Razón Social:</dt>
                  <dd className="font-headline font-bold text-primary text-right">Materiales ConstruY, C.A.</dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">RIF:</dt>
                  <dd className="font-mono font-extrabold text-primary">J-504842850</dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">Marca Comercial:</dt>
                  <dd className="font-headline font-bold text-primary">Pinturas ConstruY</dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">Moneda Oficial:</dt>
                  <dd className="font-mono font-extrabold text-secondary">VES (Bolívares)</dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-on-surface-variant font-headline font-semibold">Horario:</dt>
                  <dd className="text-primary font-mono text-xs font-semibold text-right">Lun a Vie: 8:00 a 17:00</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Card 2: Contacto & Ubicación */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-extrabold text-lg text-primary mb-4">
                Contacto y Despacho
              </h3>
              <dl className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">Teléfono Directo:</dt>
                  <dd>
                    <a href="tel:+584242803167" className="text-primary font-mono font-bold hover:text-secondary transition-colors">
                      0424 280 3167
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">WhatsApp:</dt>
                  <dd>
                    <a
                      href="https://wa.me/584242803167"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-mono font-bold hover:underline"
                    >
                      +58 424 280 3167
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold">Correo:</dt>
                  <dd>
                    <a href="mailto:materialesconstruy@gmail.com" className="text-primary font-medium hover:underline text-xs">
                      materialesconstruy@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="border-b border-surface-border pb-2.5">
                  <dt className="text-on-surface-variant font-headline font-semibold mb-1">Dirección de Retiro / Tienda:</dt>
                  <dd className="text-xs text-primary font-medium leading-relaxed">
                    Avenida Principal de Macaracuay, Caracas 1071, Estado Miranda.
                  </dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-on-surface-variant font-headline font-semibold">Instagram:</dt>
                  <dd>
                    <a href="https://instagram.com/materialesconstruy" target="_blank" className="text-xs text-primary font-semibold hover:text-secondary">
                      @materialesconstruy
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Card 3: Formas de Pago */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold-warm/20 text-primary flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-headline font-extrabold text-lg text-primary mb-4">
                Cuentas y Formas de Pago
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
                  <span className="font-headline font-bold text-primary block mb-0.5">📲 Pago Móvil</span>
                  <span className="font-mono text-primary font-semibold block">J-504842850 · 0424 280 3167</span>
                  <span className="text-on-surface-variant block text-[11px] font-mono">Banesco (0134) · BDT (0175) · Tesoro (0163)</span>
                </div>

                <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
                  <span className="font-headline font-bold text-primary block mb-0.5">💵 Zelle (USD)</span>
                  <span className="font-mono text-primary font-semibold block">Adrianvignolo@gmail.com</span>
                  <span className="text-on-surface-variant block text-[11px]">Titular: Adrian Meneses</span>
                </div>

                <div className="p-3 bg-surface-subtle rounded-xl border border-surface-border">
                  <span className="font-headline font-bold text-primary block mb-0.5">🏦 Transferencias Bancarias (VES)</span>
                  <span className="text-primary font-mono block text-[11px]">Banesco: 0134-1202-20-0001004193</span>
                  <span className="text-primary font-mono block text-[11px]">BDT: 0175-0473-80-0077771890</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-border flex items-center gap-2 text-xs text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <Truck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-semibold">Envío a Caracas sin costo adicional o retiro directo en tienda.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
