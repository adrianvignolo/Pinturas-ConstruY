import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Award } from 'lucide-react';

const BANNERS = [
  {
    image: '/hero/banner-01-ya-llego-2560.webp',
    badge: 'Fábrica Oficial · Hecho en Venezuela',
    title: 'Pinturas ConstruY',
    subtitle: 'Materiales ConstruY, C.A. Fabricantes de pintura de caucho lavable y esmalte semi-industrial para interiores y exteriores. Ventas al mayor y al detal.'
  },
  {
    image: '/hero/banner-02-delivery-2560.webp',
    badge: 'Despacho Directo en Obra',
    title: 'Envíos sin Costo en Caracas',
    subtitle: 'Recibe tus cuñetes y galones directamente en tu obra o domicilio sin costo adicional. Atendemos proyectos residenciales e industriales.'
  },
  {
    image: '/hero/banner-03-llegada-2560.webp',
    badge: 'Máxima Carga de Resina',
    title: 'Pinturas de Calidad Clase A',
    subtitle: 'Fórmulas con alta resistencia al lavado y a la intemperie. Cubrimiento total en menos manos con acabados mate y brillante duraderos.'
  }
];

export default function Hero({ onExploreClick, onOrderClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = BANNERS[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-primary text-white">
      {/* Background Slides */}
      {BANNERS.map((b, idx) => (
        <div
          key={b.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={b.image}
            alt={b.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      ))}

      {/* Dark Architectural Veil Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/60 z-10" />

      {/* Hero Body Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-secondary/25 border border-secondary/50 text-orange-200 text-xs px-3.5 py-1 rounded-full font-mono font-medium mb-4 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-vibrant" />
            <span>{slide.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 mb-8 leading-relaxed font-body max-w-xl">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary-container text-white font-headline font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-lg shadow-secondary/30 transition-all hover:-translate-y-0.5"
            >
              <span>Explorar el catálogo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-headline font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-lg backdrop-blur-xs transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-orange-vibrant" />
              <span>Hacer un Pedido</span>
            </button>
          </div>

          {/* Key Specs Pills */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-300 font-mono">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Lavable y resistente a la intemperie</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-gold-warm" />
              <span>Fórmulas normalizadas (23 colores)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-xs transition-colors border border-white/10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 px-2">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-6 bg-secondary' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % BANNERS.length)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-xs transition-colors border border-white/10"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
