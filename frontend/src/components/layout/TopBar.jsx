import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Truck, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const PROMOTIONS = [
  {
    icon: Sparkles,
    badge: 'OFERTA DE FÁBRICA',
    badgeColor: 'bg-secondary text-white',
    text: 'Precios especiales en Cuñetes de Caucho Clase A — Máxima lavabilidad y rendimiento',
    link: '#catalogo',
    linkLabel: 'Ver oferta'
  },
  {
    icon: Truck,
    badge: 'DESPACHO DIRECTO',
    badgeColor: 'bg-orange-500 text-white',
    text: 'Envíos en Gran Caracas y despacho a nivel nacional para mayoristas y constructoras',
    link: '#partner',
    linkLabel: 'Conocer más'
  },
  {
    icon: Star,
    badge: 'PROGRAMA DE ESTRELLAS',
    badgeColor: 'bg-amber-400 text-slate-950 font-bold',
    text: 'Acumula 0.30★ por cada $1 gastado y canjea galones y cuñetes sin costo',
    link: '#catalogo',
    linkLabel: 'Canjear'
  },
  {
    icon: Tag,
    badge: 'PRECIOS AL MAYOR',
    badgeColor: 'bg-emerald-500 text-white',
    text: 'Atención personalizada para ferreterías, contratistas y proyectos arquitectónicos',
    link: '#contacto',
    linkLabel: 'Cotizar'
  }
];

export default function TopBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMOTIONS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PROMOTIONS.length) % PROMOTIONS.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMOTIONS.length);
  };

  const currentPromo = PROMOTIONS[currentIndex];
  const IconComponent = currentPromo.icon;

  return (
    <div
      className="bg-primary text-white py-2 px-3 sm:px-6 border-b border-white/10 font-sans tracking-tight relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Botón previo */}
        <button
          onClick={prevSlide}
          aria-label="Promoción anterior"
          className="text-gray-400 hover:text-white p-1 rounded transition-colors shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Contenido animado del slide */}
        <div className="flex-1 flex items-center justify-center text-center overflow-hidden">
          <div
            key={currentIndex}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-fadeIn"
          >
            {/* Badge */}
            <span
              className={`text-[10px] font-mono tracking-wider font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${currentPromo.badgeColor}`}
            >
              {currentPromo.badge}
            </span>

            {/* Texto del promocional */}
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-200 font-medium">
              <IconComponent className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
              <span>{currentPromo.text}</span>
            </span>

            {/* Link de acción */}
            <a
              href={currentPromo.link}
              className="text-[11px] sm:text-xs font-semibold text-orange-400 hover:text-orange-300 underline underline-offset-2 shrink-0 transition-colors"
            >
              {currentPromo.linkLabel} →
            </a>
          </div>
        </div>

        {/* Botón siguiente e indicador */}
        <div className="flex items-center gap-1 shrink-0">
          <div className="hidden md:flex items-center gap-1 mr-2">
            {PROMOTIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir a promoción ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-orange-400' : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Siguiente promoción"
            className="text-gray-400 hover:text-white p-1 rounded transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
