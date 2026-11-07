import React from 'react';
import { Truck, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';

export default function PaymentMethodsSection({ onGoToOrders }) {
  const paymentLogos = [
    {
      id: 'zelle',
      name: 'Zelle',
      type: 'Dólares (USD)',
      desc: 'Transferencias directas en USD',
      badge: 'USD',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-[#7414CA]/10 text-[#7414CA] flex items-center justify-center font-bold text-xl font-headline tracking-tighter">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 3h-15C3.12 3 2 4.12 2 5.5v13C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-13C22 4.12 20.88 3 19.5 3zm-6 13.5h-5v-2l4-5h-4V7.5h5v2l-4 5h4v2z" />
          </svg>
        </div>
      )
    },
    {
      id: 'pagomovil',
      name: 'Pago Móvil',
      type: 'Bolívares (VES)',
      desc: 'Banesco, BDT y Banco del Tesoro',
      badge: 'Inmediato',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
            <path d="M12 18h.01"/>
            <path d="M9 6h6"/>
            <path d="M16 10a4 4 0 0 1 0 4"/>
            <path d="M18 8a7 7 0 0 1 0 8"/>
          </svg>
        </div>
      )
    },
    {
      id: 'cards',
      name: 'Tarjetas de Débito y Crédito',
      type: 'Nacionales e Internacionales',
      desc: 'Visa, Mastercard y Débito Bancario',
      badge: 'Punto de Venta',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
          <div className="flex -space-x-2">
            <span className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90 inline-block shadow-xs"></span>
            <span className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90 inline-block shadow-xs"></span>
          </div>
        </div>
      )
    },
    {
      id: 'transfer',
      name: 'Transferencias Bancarias',
      type: 'Cuentas Corrientes (VES)',
      desc: 'Banesco Banco Universal y BDT',
      badge: 'Banca Nacional',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18"/>
            <path d="M3 10h18"/>
            <path d="M5 6l7-3 7 3"/>
            <path d="M4 10v11"/>
            <path d="M20 10v11"/>
            <path d="M8 14v4"/>
            <path d="M12 14v4"/>
            <path d="M16 14v4"/>
          </svg>
        </div>
      )
    },
    {
      id: 'cash',
      name: 'Efectivo en Tienda',
      type: 'Divisas y Moneda Local',
      desc: 'Dólares en efectivo (USD), EUR o VES',
      badge: 'Presencial',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="12" x="2" y="6" rx="2"/>
            <circle cx="12" cy="12" r="2"/>
            <path d="M6 12h.01M18 12h.01"/>
          </svg>
        </div>
      )
    }
  ];

  return (
    <section id="pagos" className="w-full py-16 sm:py-20 bg-surface scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-2 bg-secondary/10 px-3.5 py-1 rounded-full border border-secondary/20">
            <CreditCard className="w-4 h-4 text-orange-vibrant" />
            <span>Facilidades de Pago</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Métodos de Pago Aceptados
          </h2>
          <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 leading-relaxed">
            Aceptamos las modalidades más cómodas y seguras para particulares y empresas, tanto en Bolívares como en divisas extranjeras.
          </p>
        </div>

        {/* Logos & Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {paymentLogos.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl border-2 border-surface-border p-5 shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {item.icon}
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-base text-primary mb-1">
                  {item.name}
                </h3>
                <span className="text-xs font-mono font-semibold text-secondary block mb-2">
                  {item.type}
                </span>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sin comisiones</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Assurance Banner */}
        <div className="mt-10 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-950">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-headline font-extrabold text-sm sm:text-base block">
                Envío a Caracas sin costo adicional · Retiro personal en tienda
              </span>
              <span className="font-body text-xs sm:text-sm text-emerald-800">
                Elige tu método de pago preferido al armar tu pedido. Nuestro equipo te confirma el total y disponibilidad antes de cobrar.
              </span>
            </div>
          </div>

          <button
            onClick={onGoToOrders}
            className="shrink-0 bg-emerald-700 hover:bg-emerald-800 text-white font-headline font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-all hover:shadow hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Hacer un Pedido</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
