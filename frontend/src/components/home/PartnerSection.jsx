import React from 'react';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PartnerSection() {
  return (
    <section id="partner" className="w-full py-16 sm:py-20 bg-primary text-white scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-gold-warm mb-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            <Award className="w-4 h-4" />
            <span>03 / Fidelidad & Mayoristas</span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vuélvete un Partner ConstruY
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-300 mt-2 leading-relaxed">
            Cada compra suma puntos acumulables en tu cuenta que podrás canjear directamente por cuñetes de pintura para tus proyectos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tier 1: Auyantepuy */}
          <div className="bg-surface-container-lowest text-on-surface rounded-2xl p-7 sm:p-8 shadow-sm flex flex-col justify-between border border-surface-border">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                  Nivel 1
                </span>
                <span className="font-mono text-xs text-on-surface-variant font-medium">Para compras al detal</span>
              </div>

              <h3 className="font-headline text-2xl font-bold text-primary mb-2">
                Auyantepuy
              </h3>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                El nivel de entrada del programa. Acumulas puntos desde tu primera compra en la tienda y los canjeas directamente contra el carrito cuando quieras.
              </p>

              <ul className="space-y-3 font-body text-xs sm:text-sm text-on-surface mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Puntos por cada compra, sin monto mínimo de ingreso</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Canje directo en tus pedidos de tienda</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Acceso anticipado a lanzamientos de colores nuevos</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-surface-border flex items-center justify-between">
              <span className="font-mono text-xs text-on-surface-variant">
                Registro abierto · Te inscribes al comprar
              </span>
              <a
                href="https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20conocer%20mis%20puntos%20Auyantepuy."
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline text-xs font-bold text-primary hover:text-secondary flex items-center gap-1"
              >
                <span>Consultar</span>
                <ArrowRight className="w-3.5 h-3.5 text-secondary" />
              </a>
            </div>
          </div>

          {/* Tier 2: Roraima */}
          <div className="bg-primary-container text-white rounded-2xl p-7 sm:p-8 shadow-md flex flex-col justify-between border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-bl-full pointer-events-none -mr-8 -mt-8" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-gold-warm uppercase tracking-wider bg-gold-warm/15 px-3 py-1 rounded-full border border-gold-warm/30">
                  Nivel 2 · Aliados
                </span>
                <span className="font-mono text-xs text-gray-300 font-medium">Ventas al mayor</span>
              </div>

              <h3 className="font-headline text-2xl font-bold text-white mb-2">
                Roraima
              </h3>
              <p className="font-body text-xs text-gray-300 leading-relaxed mb-6">
                El nivel de los aliados comerciales, constructoras y ferreterías. Precios por volumen, condiciones de despacho especiales y acompañamiento técnico directo.
              </p>

              <ul className="space-y-3 font-body text-xs sm:text-sm text-gray-200 mb-8">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-vibrant shrink-0 mt-0.5" />
                  <span>Precios por volumen sobre toda la carta de colores</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-vibrant shrink-0 mt-0.5" />
                  <span>Acumulación acelerada de puntos corporativos</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-vibrant shrink-0 mt-0.5" />
                  <span>Atención directa y prioritaria con gerencia</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-xs text-gray-400">
                Registro comercial exclusivo
              </span>
              <a
                href="https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20postularme%20al%20plan%20Roraima%20para%20mayoristas."
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline text-xs font-bold text-gold-warm hover:text-white flex items-center gap-1"
              >
                <span>Postular mi empresa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
