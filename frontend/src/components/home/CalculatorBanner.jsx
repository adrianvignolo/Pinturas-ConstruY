import React, { useState } from 'react';
import { Calculator, ArrowRight, Paintbrush, Layers, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CalculatorBanner({ onGoToOrders }) {
  const [areaM2, setAreaM2] = useState(60);
  const [paintType, setPaintType] = useState('caucho'); // 'caucho' or 'esmalte'
  const [hands, setHands] = useState(2);
  const { addToCart } = useCart();

  // Rendimiento teórico:
  // Caucho: ~10 m2 por litro por mano -> 1 galón (3.785 L) cubre ~38 m2 a 1 mano (~19 m2 a 2 manos)
  // Cuñete (4 galones = 15.14 L) cubre ~150 m2 a 1 mano (~75 m2 a 2 manos)
  // Esmalte: ~12 m2 por litro por mano -> 1 galón cubre ~45 m2 a 1 mano (~22 m2 a 2 manos)
  const totalM2WithHands = (parseFloat(areaM2) || 0) * hands;
  const litersNeeded = paintType === 'caucho' ? totalM2WithHands / 10 : totalM2WithHands / 12;
  const gallonsNeeded = Math.ceil(litersNeeded / 3.785) || 1;
  const cunetesNeeded = Math.floor(gallonsNeeded / 4);
  const remainderGallons = gallonsNeeded % 4;

  const handleAddCalculatedToCart = () => {
    if (paintType === 'caucho') {
      if (cunetesNeeded > 0) {
        addToCart({
          id: 2,
          name: 'Cuñete Caucho Clase A',
          category: 'Pinturas de caucho',
          price_ves: 97182.83,
          price_ref: '110,20 REF',
          local_image: '/products/producto_cunete_pintura_caucho_materiales_construy-25.png'
        }, cunetesNeeded);
      }
      if (remainderGallons > 0) {
        addToCart({
          id: 5,
          name: 'Galón Caucho Clase A',
          category: 'Pinturas de caucho',
          price_ves: 31968.04,
          price_ref: '36,25 REF',
          local_image: '/products/producto_pintura_caucho_materiales_construy-9.png'
        }, remainderGallons);
      }
    } else {
      addToCart({
        id: 1,
        name: 'Galón de Esmalte',
        category: 'Esmalte semi-industrial',
        price_ves: 35804.20,
        price_ref: '40,60 REF',
        local_image: '/products/producto_pintura_esmalte_materiales_construy.png'
      }, gallonsNeeded);
    }
    onGoToOrders();
  };

  return (
    <section id="calculadora" className="w-full py-16 sm:py-20 bg-surface-container-low/40 scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-primary-container text-white rounded-3xl p-8 sm:p-12 border-2 border-surface-border shadow-xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Area - High Contrast Text */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 bg-secondary/25 border border-secondary/40 text-orange-200 text-xs px-3.5 py-1.5 rounded-full font-mono font-bold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-orange-vibrant" />
                <span>Vínculo Industrial & Asesoría Técnica</span>
              </div>

              <h3 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Calcula cuánta pintura necesitas para tu proyecto
              </h3>

              <p className="font-body text-sm sm:text-base text-gray-100 leading-relaxed max-w-xl">
                Ingresa los metros cuadrados y el tipo de superficie. Nuestro motor de dosificación calcula el volumen exacto en cuñetes y galones para evitar compras excesivas y optimizar el rendimiento en obra.
              </p>

              <div className="pt-2">
                <a
                  href={`https://wa.me/584242803167?text=${encodeURIComponent(
                    `Hola ConstruY, necesito asesoría técnica para pintar ${areaM2} m² con ${paintType === 'caucho' ? 'Pintura de caucho' : 'Esmalte'}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary-container text-white font-headline font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Hablar con un Asesor Técnico</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Interactive Box - Solid High-Contrast White Background */}
            <div className="lg:col-span-6 bg-surface-container-lowest text-primary rounded-2xl p-6 sm:p-8 border border-surface-border shadow-xl">
              <div className="flex items-center gap-2.5 font-headline font-bold text-base text-primary mb-5 pb-3 border-b border-surface-border">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <Calculator className="w-4 h-4" />
                </div>
                <span>Calculadora de Rendimiento en Obra</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Area Input */}
                <div>
                  <label className="block text-xs font-headline font-bold text-primary mb-1.5">
                    Superficie total a pintar (m²):
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="10000"
                    value={areaM2}
                    onChange={(e) => setAreaM2(e.target.value)}
                    className="w-full bg-surface-subtle border-2 border-surface-border rounded-xl px-3.5 py-2.5 text-primary font-mono font-bold text-sm focus:outline-none focus:border-secondary focus:bg-white transition-colors"
                  />
                </div>

                {/* Paint Type Select */}
                <div>
                  <label className="block text-xs font-headline font-bold text-primary mb-1.5">
                    Tipo de Pintura / Acabado:
                  </label>
                  <select
                    value={paintType}
                    onChange={(e) => setPaintType(e.target.value)}
                    className="w-full bg-surface-subtle border-2 border-surface-border rounded-xl px-3.5 py-2.5 text-primary font-headline font-semibold text-xs sm:text-sm focus:outline-none focus:border-secondary focus:bg-white transition-colors"
                  >
                    <option value="caucho">Pintura de Caucho (Paredes)</option>
                    <option value="esmalte">Esmalte Semi-industrial (Metal/Madera)</option>
                  </select>
                </div>
              </div>

              {/* Hands Selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-headline font-bold text-primary">Manos recomendadas:</span>
                  <span className="font-mono font-bold text-secondary">{hands} manos de acabado</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setHands(num)}
                      className={`py-2 text-xs font-headline font-bold rounded-lg border-2 transition-all ${
                        hands === num
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-surface-subtle text-on-surface-variant border-surface-border hover:bg-surface-container'
                      }`}
                    >
                      {num} {num === 1 ? 'Mano' : 'Manos'}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Result Banner */}
              <div className="bg-primary text-white rounded-xl p-4 sm:p-5 border border-primary-container mb-5 shadow-inner">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-300 block mb-1">
                  Dosificación estimada de producto:
                </span>
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <span className="font-headline text-2xl sm:text-3xl font-extrabold text-gold-warm">
                    {paintType === 'caucho' && cunetesNeeded > 0 ? (
                      <>
                        {cunetesNeeded} {cunetesNeeded === 1 ? 'Cuñete' : 'Cuñetes'}
                        {remainderGallons > 0 && ` + ${remainderGallons} Gal.`}
                      </>
                    ) : (
                      <>
                        {gallonsNeeded} {gallonsNeeded === 1 ? 'Galón' : 'Galones'}
                      </>
                    )}
                  </span>
                  <span className="font-mono text-xs text-gray-300 bg-white/10 px-2.5 py-1 rounded">
                    ~{litersNeeded.toFixed(1)} Litros requeridos
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddCalculatedToCart}
                className="w-full bg-secondary hover:bg-secondary-container text-white font-headline font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Cargar esta dosificación a mi Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
