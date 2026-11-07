import React from 'react';
import { Award } from 'lucide-react';

export default function LoyaltyStarsBanner() {
  const rewards = [
    { stars: '150★', item: 'Taza ConstruY' },
    { stars: '350★', item: 'Galón de Esmalte' },
    { stars: '350★', item: 'Galón Caucho Clase A' },
    { stars: '885★', item: 'Cuñete Clase A Blanco' },
    { stars: '885★', item: 'Cuñete Hecho en Venezuela' }
  ];

  return (
    <section className="w-full bg-surface-container-lowest border-b border-surface-border py-2 sm:py-2.5 shadow-2xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-2.5 sm:gap-4">
        {/* Primary Incentive Callout - Compact */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-md bg-gold-warm/20 flex items-center justify-center text-gold-warm shrink-0">
            <Award className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-headline font-bold text-xs sm:text-sm text-primary leading-none">
              Gana estrellas en cada compra
            </span>
            <span className="px-1.5 py-0.5 rounded bg-secondary/15 text-secondary font-mono text-[10px] font-bold">
              0.30★ / 1 USD
            </span>
            <span className="hidden sm:inline text-on-surface-variant text-[11px] font-body">
              · Canje directo en tu pedido
            </span>
          </div>
        </div>

        {/* Exchange Chips Scroll - Low Height */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-0.5 scrollbar-none">
          {rewards.map((r, idx) => (
            <div
              key={idx}
              className="shrink-0 flex items-center gap-1.5 bg-surface-subtle px-2.5 py-1 rounded-md border border-surface-border text-[11px]"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-gold-warm text-primary font-mono text-[8px] flex items-center justify-center font-bold">
                ★
              </span>
              <span className="font-headline font-bold text-primary text-[11px] leading-none">
                {r.stars}
              </span>
              <span className="text-on-surface-variant text-[11px] font-mono">
                {r.item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
