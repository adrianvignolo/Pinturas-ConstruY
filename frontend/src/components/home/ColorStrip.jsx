import React, { useState } from 'react';

const DEFAULT_STRIP_COLORS = [
  { name: 'Blanco', hex: '#FFFFFF', code: 'M9010' },
  { name: 'Blanco Ostra', hex: '#F1EBE3', code: 'M9010-BOW1' },
  { name: 'Verde', hex: '#BBCBA8', code: 'M9010-7494C' },
  { name: 'Verde Oscuro', hex: '#393E38', code: 'M9010-445C' },
  { name: 'Azul Oscuro', hex: '#1A4686', code: 'M9010-281A' },
  { name: 'Madera', hex: '#543F28', code: 'M9010-M3082' },
  { name: 'Rojo', hex: '#C22F1F', code: 'M9010-185C' },
  { name: 'Amarillo', hex: '#E9C323', code: 'M9010-252A' },
  { name: 'Púrpura', hex: '#340D19', code: 'M9010-262C' },
  { name: 'Gris Troyano', hex: '#656B6E', code: 'M9010-4233D' },
  { name: 'Gris Libertad', hex: '#9B9C9F', code: 'M9010-4222T' },
  { name: 'Gris Místico', hex: '#BBBBB8', code: 'M9010-4225P' },
  { name: 'Azul Claro', hex: '#458FBC', code: 'M9010-PBC' },
  { name: 'Gris Cálido', hex: '#786669', code: 'M9010-WG8C' },
  { name: 'Verde Pantano', hex: '#878A76', code: 'M9010-415C' },
  { name: 'Rojo Esmalte', hex: '#AE1F23', code: 'FE-RAL3020' },
  { name: 'Amarillo Esmalte', hex: '#E5BC40', code: 'FE-15' },
  { name: 'Azul Esmalte', hex: '#025395', code: 'FE-RAL5010' },
  { name: 'Plata', hex: '#A6A6A6', code: 'EP-57' },
  { name: 'Gris Esmalte', hex: '#606163', code: 'FE-97' },
  { name: 'Verde Opaco', hex: '#035E52', code: 'FE-RAL6026' },
  { name: 'Negro', hex: '#000000', code: 'FE-02' }
];

export default function ColorStrip({ colors }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const displayList = (colors && colors.length > 0)
    ? colors.map((c) => ({
        name: c.name,
        code: c.code,
        hex: c.hex_code || c.hex || '#000000'
      }))
    : DEFAULT_STRIP_COLORS;

  const handleCopy = (code) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 1500);
  };

  return (
    <div className="bg-[#0b1d33] py-2.5 overflow-hidden border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <span className="font-mono text-[11px] uppercase tracking-wider text-orange-400 font-semibold shrink-0">
          23 colores · clic para copiar código
        </span>
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee flex items-center gap-3">
            {[...displayList, ...displayList].map((col, idx) => {
              const isCopied = copiedCode === col.code;

              return (
                <button
                  key={`${col.code}-${idx}`}
                  type="button"
                  onClick={() => handleCopy(col.code)}
                  title={`Clic para copiar código ${col.code}`}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border shrink-0 text-[11px] font-mono cursor-pointer transition-all active:scale-95 ${
                    isCopied
                      ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 font-bold shadow-xs'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/15 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0 shadow-xs"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span>{isCopied ? '¡Copiado!' : col.code}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
