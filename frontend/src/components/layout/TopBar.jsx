import React from 'react';
import { Phone, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function TopBar({ company }) {
  const phone = company?.phone || '+58 424 280 3167';
  const rif = company?.rif || 'J-504842850';
  const schedule = company?.schedule || 'Lunes a viernes de 8:00 a 17:00';

  return (
    <div className="bg-primary text-on-primary text-[11px] sm:text-xs py-2 px-4 border-b border-white/10 font-mono tracking-tight">
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-vibrant" />
          <span className="font-semibold text-white">Materiales ConstruY, C.A.</span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-300">RIF {rif}</span>
          <span className="hidden md:inline text-gray-400">·</span>
          <span className="hidden md:inline text-gray-300">Caracas, Macaracuay</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-gray-300">
          <Clock className="w-3.5 h-3.5 text-gold-warm" />
          <span>{schedule}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-secondary/25 text-orange-200 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-secondary/40">
            Ventas al mayor y al detal
          </span>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 text-white hover:text-orange-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-orange-vibrant" />
            <span className="font-semibold">{phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
