import React, { useState } from 'react';
import { Palette, Copy, Check, MessageSquare } from 'lucide-react';

export default function ColorChartSection({ colors }) {
  const [activeTab, setActiveTab] = useState('Pinturas de caucho');
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const cauchoColors = colors.filter(c => c.paint_type === 'Pinturas de caucho');
  const esmalteColors = colors.filter(c => c.paint_type === 'Esmalte semi-industrial');

  const currentColors = activeTab === 'Pinturas de caucho' ? cauchoColors : esmalteColors;

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="carta" className="w-full py-16 sm:py-20 bg-surface-container-low/40 border-y border-surface-border scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-secondary mb-2">
              <Palette className="w-4 h-4" />
              <span>02 / Carta Técnica de Color</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              23 Colores de Fórmula Original
            </h2>
            <p className="font-body text-sm sm:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
              Fórmulas normalizadas bajo código técnico para garantizar la exacta repetibilidad de tonos entre lotes de producción.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-surface-container-lowest p-1 rounded-xl self-start md:self-auto border border-surface-border shadow-xs">
            <button
              onClick={() => setActiveTab('Pinturas de caucho')}
              className={`px-4 py-2 rounded-lg text-xs font-headline font-semibold transition-all ${
                activeTab === 'Pinturas de caucho'
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Pinturas de Caucho ({cauchoColors.length})
            </button>
            <button
              onClick={() => setActiveTab('Esmalte semi-industrial')}
              className={`px-4 py-2 rounded-lg text-xs font-headline font-semibold transition-all ${
                activeTab === 'Esmalte semi-industrial'
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Esmalte Semi-industrial ({esmalteColors.length})
            </button>
          </div>
        </div>

        {/* Selected Color Showcase Preview */}
        {selectedColor && (
          <div className="mb-8 p-5 sm:p-6 bg-surface-container-lowest rounded-2xl border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs animate-fadeIn">
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-inner border border-black/10 shrink-0"
                style={{ backgroundColor: selectedColor.hex_code }}
              />
              <div>
                <span className="text-[11px] font-mono text-secondary uppercase font-bold tracking-wider">
                  {selectedColor.paint_type}
                </span>
                <h3 className="font-headline text-2xl font-bold text-primary mt-0.5">
                  {selectedColor.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 font-mono text-xs">
                  <span className="bg-surface-subtle px-2.5 py-1 rounded border border-surface-border font-bold text-primary">
                    Cód: {selectedColor.code}
                  </span>
                  <span className="text-on-surface-variant">
                    Hex: {selectedColor.hex_code}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleCopyCode(selectedColor.code)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-surface-subtle hover:bg-surface-container text-primary border border-surface-border rounded-lg text-xs font-headline font-semibold shadow-xs"
              >
                {copiedCode === selectedColor.code ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-500" />
                    <span>Copiar fórmula</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/584242803167?text=${encodeURIComponent(
                  `Hola ConstruY, me interesa cotizar el color ${selectedColor.name} (Código: ${selectedColor.code}) en ${selectedColor.paint_type}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-headline font-semibold shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Pedir este color</span>
              </a>
            </div>
          </div>
        )}

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {currentColors.map((color) => {
            const isSelected = selectedColor?.id === color.id;
            const isCopied = copiedCode === color.code;

            return (
              <div
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`group relative p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-secondary bg-secondary/5 shadow-xs ring-2 ring-secondary/20'
                    : 'border-surface-border bg-surface-container-lowest hover:border-primary/40 hover:shadow-xs'
                }`}
              >
                {/* Swatch square */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg border border-black/15 shadow-inner group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: color.hex_code }}
                  />
                  <span className="text-[10px] font-mono text-gray-400 uppercase">
                    {color.hex_code}
                  </span>
                </div>

                <div>
                  <h4 className="font-headline font-bold text-xs text-primary truncate">
                    {color.name}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-on-surface-variant">
                    <span className="font-semibold text-primary">{color.code}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(color.code);
                      }}
                      className="text-gray-400 hover:text-secondary p-0.5"
                      title="Copiar código"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Custom color card */}
          <a
            href="https://wa.me/584242803167?text=Hola%20ConstruY%2C%20quiero%20consultar%20un%20tono%20personalizado."
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-dashed border-secondary/50 bg-secondary/5 hover:bg-secondary/10 transition-colors flex flex-col justify-center items-center text-center group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Palette className="w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-xs text-secondary">
              ¿No ves tu color?
            </span>
            <span className="text-[10px] text-on-surface-variant mt-0.5 font-mono">
              Consúltanos vía WhatsApp →
            </span>
          </a>
        </div>

        {/* Footer Technical Note */}
        <p className="mt-8 text-center text-xs font-mono text-on-surface-variant">
          Nota de producción: Los 7 primeros colores de caucho están formulados y disponibles también en cuñete de 4 galones.
        </p>
      </div>
    </section>
  );
}
