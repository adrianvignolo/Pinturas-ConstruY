export const MOCK_COMPANY = {
  name: "Pinturas ConstruY",
  legal_name: "Materiales ConstruY, C.A.",
  rif: "J-504842850",
  schedule: "Lunes a viernes de 8:00 a 17:00",
  phone: "+58 424 280 3167",
  whatsapp: "+584242803167",
  email: "materialesconstruy@gmail.com",
  address: "Avenida Principal de Macaracuay, Caracas 1071, Miranda",
  instagram: "https://instagram.com/materialesconstruy",
  tiktok: "https://tiktok.com/@materialesconstruy",
  store_url: "https://www.hubshop.app/construy",
  payment_methods: [
    { method_name: "Pago Móvil", details: "J-504842850 | 04242803167 | Banesco 0134 / BDT 0175 / Tesoro 0163" },
    { method_name: "Zelle", details: "Adrianvignolo@gmail.com (Adrian Meneses)" },
    { method_name: "Transferencia Bancaria Banesco", details: "Materiales Construy CA | J-504842850 | Cta: 0134-1202-20-0001004193" },
    { method_name: "Transferencia Bancaria BDT", details: "Materiales Construy CA | J-504842850 | Cta: 0175-0473-80-0077771890" },
    { method_name: "Transferencia Banco del Tesoro", details: "Materiales Construy CA | J-504842850 | Cta: 0163-0913-38-9133005671" }
  ]
};

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Galón de Esmalte",
    category: "Esmalte semi-industrial",
    description: "Esmalte semi-industrial para interiores y exteriores. Fuerte adhesión y secado rápido, película lisa y hermosa, buen poder de ocultación, alta dureza y buena resistencia a la abrasión, con excelente nivelación y fácil aplicación. 8 colores.",
    price_ves: 35804.2,
    price_ref: "40,60 REF",
    stock_status: "Disponible",
    image_url: "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/galon-esmalte/portada-v2.webp",
    local_image: "./products/producto_pintura_esmalte_materiales_construy.png"
  },
  {
    id: 2,
    name: "Cuñete Caucho Clase A",
    category: "Pinturas de caucho",
    description: "Pintura de caucho clase A, lavable, para interiores y exteriores. Máxima carga de resina: mayor rendimiento por litro, cubrimiento total en menos manos y resistencia al lavado y a la intemperie. Disponible en 7 colores de la carta ConstruY.",
    price_ves: 97182.83,
    price_ref: "110,20 REF",
    stock_status: "Disponible",
    image_url: "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
    local_image: "./products/producto_cunete_pintura_caucho_materiales_construy-25.png"
  },
  {
    id: 3,
    name: "Cuñete Caucho Clase A hecho en Venezuela",
    category: "Pinturas de caucho",
    description: "Edición especial con formulación optimizada para clima tropical y sello nacional. Excelente acabado mate sedoso, fácil aplicación y máxima lavabilidad.",
    price_ves: 101415.84,
    price_ref: "115,00 REF",
    stock_status: "Disponible",
    image_url: "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
    local_image: "./products/producto_cunete_pintura_caucho_materiales_construy-26.png"
  },
  {
    id: 4,
    name: "Cuñete Caucho Clase B",
    category: "Pinturas de caucho",
    description: "Pintura de caucho clase B ideal para renovación de grandes superficies, techos y muros con excelente relación costo-rendimiento y acabado uniforme.",
    price_ves: 91044.97,
    price_ref: "103,24 REF",
    stock_status: "Disponible",
    image_url: "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
    local_image: "./products/producto_cunete_pintura_caucho_materiales_construy-27.png"
  },
  {
    id: 5,
    name: "Galón Caucho Clase A",
    category: "Pinturas de caucho",
    description: "Presentación de 1 galón (3.785 litros) de pintura de caucho clase A super lavable. Ideal para retoques, habitaciones, oficinas y áreas de tráfico moderado.",
    price_ves: 31968.04,
    price_ref: "36,25 REF",
    stock_status: "Disponible",
    image_url: "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
    local_image: "./products/producto_pintura_caucho_materiales_construy-9.png"
  },
  {
    id: 6,
    name: "Taza Construy",
    category: "Taza",
    description: "Taza conmemorativa oficial de Materiales ConstruY con acabado cerámico esmaltado de alta resistencia térmica.",
    price_ves: 8818.77,
    price_ref: "10,00 REF",
    stock_status: "Disponible",
    image_url: "./products/ahj9m1443p/taza_construy.png",
    local_image: "./products/krkbyxq4n9/taza_construy2.png"
  }
];

export const MOCK_COLORS = [
  { id: 1, name: "Blanco", code: "M9010", hex_code: "#FFFFFF", paint_type: "Pinturas de caucho" },
  { id: 2, name: "Blanco ostra", code: "M9010-BOW1", hex_code: "#F1EBE3", paint_type: "Pinturas de caucho" },
  { id: 3, name: "Verde", code: "M9010-7494C", hex_code: "#BBCBA8", paint_type: "Pinturas de caucho" },
  { id: 4, name: "Verde oscuro", code: "M9010-445C", hex_code: "#393E38", paint_type: "Pinturas de caucho" },
  { id: 5, name: "Azul oscuro", code: "M9010-281A", hex_code: "#1A4686", paint_type: "Pinturas de caucho" },
  { id: 6, name: "Madera", code: "M9010-M3082-14A", hex_code: "#543F28", paint_type: "Pinturas de caucho" },
  { id: 7, name: "Rojo", code: "M9010-185C", hex_code: "#C22F1F", paint_type: "Pinturas de caucho" },
  { id: 8, name: "Amarillo", code: "M9010-252A", hex_code: "#E9C323", paint_type: "Pinturas de caucho" },
  { id: 9, name: "Púrpura", code: "M9010-262C", hex_code: "#340D19", paint_type: "Pinturas de caucho" },
  { id: 10, name: "Gris troyano", code: "M9010-4233D", hex_code: "#656B6E", paint_type: "Pinturas de caucho" },
  { id: 11, name: "Gris libertad", code: "M9010-4222T", hex_code: "#9B9C9F", paint_type: "Pinturas de caucho" },
  { id: 12, name: "Gris místico", code: "M9010-4225P", hex_code: "#BBBBB8", paint_type: "Pinturas de caucho" },
  { id: 13, name: "Azul claro", code: "M9010-PBC", hex_code: "#458FBC", paint_type: "Pinturas de caucho" },
  { id: 14, name: "Gris cálido", code: "M9010-WG8C", hex_code: "#786669", paint_type: "Pinturas de caucho" },
  { id: 15, name: "Verde pantano", code: "M9010-415C", hex_code: "#878A76", paint_type: "Pinturas de caucho" },
  { id: 16, name: "Rojo", code: "FE-RAL3020", hex_code: "#AE1F23", paint_type: "Esmalte semi-industrial" },
  { id: 17, name: "Amarillo", code: "FE-15", hex_code: "#E5BC40", paint_type: "Esmalte semi-industrial" },
  { id: 18, name: "Azul", code: "FE-RAL5010", hex_code: "#025395", paint_type: "Esmalte semi-industrial" },
  { id: 19, name: "Plata", code: "EP-57", hex_code: "#A6A6A6", paint_type: "Esmalte semi-industrial" },
  { id: 20, name: "Gris", code: "FE-97", hex_code: "#606163", paint_type: "Esmalte semi-industrial" },
  { id: 21, name: "Verde opaco", code: "FE-RAL6026", hex_code: "#035E52", paint_type: "Esmalte semi-industrial" },
  { id: 22, name: "Negro", code: "FE-02", hex_code: "#000000", paint_type: "Esmalte semi-industrial" },
  { id: 23, name: "Blanco", code: "FE-01", hex_code: "#FFFFFF", paint_type: "Esmalte semi-industrial" }
];
