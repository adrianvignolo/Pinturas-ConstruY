import React from 'react';
import Hero from '../components/home/Hero';
import ColorStrip from '../components/home/ColorStrip';
import LoyaltyStarsBanner from '../components/home/LoyaltyStarsBanner';
import CatalogSection from '../components/home/CatalogSection';
import ColorChartSection from '../components/home/ColorChartSection';
import PartnerSection from '../components/home/PartnerSection';
import CalculatorBanner from '../components/home/CalculatorBanner';
import PaymentMethodsSection from '../components/home/PaymentMethodsSection';

export default function HomePage({
  products,
  loadingProducts,
  productsError,
  colors,
  company,
  onGoToOrders
}) {
  const scrollToCatalog = () => {
    const el = document.querySelector('#catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full">
      {/* 1. Hero Industrial Studio */}
      <Hero
        onExploreClick={scrollToCatalog}
        onOrderClick={onGoToOrders}
      />

      {/* 2. Franja de Colores de Fórmula */}
      <ColorStrip colors={colors} />

      {/* 3. Cintillo / Beneficios & Programa de Estrellas */}
      <LoyaltyStarsBanner />

      {/* 4. 01 / Catálogo de Presentaciones */}
      <CatalogSection
        products={products}
        loading={loadingProducts}
        error={productsError}
        onGoToOrders={onGoToOrders}
      />

      {/* 5. 02 / Carta Técnica de Color */}
      <ColorChartSection colors={colors} />

      {/* 6. 03 / Programa Partner ConstruY */}
      <PartnerSection />

      {/* 7. Calculadora de Metros Cuadrados y Dosificación */}
      <CalculatorBanner onGoToOrders={onGoToOrders} />

      {/* 8. Métodos de Pago Aceptados con Logos (Sin datos bancarios) */}
      <PaymentMethodsSection onGoToOrders={onGoToOrders} />
    </main>
  );
}
