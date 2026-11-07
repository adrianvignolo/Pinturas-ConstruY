import { MOCK_COMPANY, MOCK_PRODUCTS, MOCK_COLORS } from './mockData';

const API_BASE = '/api';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Modo demo/GitHub Pages
  }
  return { status: "healthy", database: "materialesconstruy_db (demo mode)", port: 3307 };
}

export async function fetchCompany() {
  try {
    const res = await fetch(`${API_BASE}/company`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback a mock data
  }
  return MOCK_COMPANY;
}

export async function fetchProducts(category = '', search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'Todos') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }

  // Filtrado local en caso de estar en GitHub Pages sin backend
  let results = [...MOCK_PRODUCTS];
  if (category && category !== 'Todos') {
    results = results.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
  }
  return results;
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  return MOCK_PRODUCTS.find(p => p.id === parseInt(id)) || MOCK_PRODUCTS[0];
}

export async function fetchColors(paintType = '') {
  try {
    const url = paintType ? `${API_BASE}/colors?paint_type=${encodeURIComponent(paintType)}` : `${API_BASE}/colors`;
    const res = await fetch(url);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  if (paintType) {
    return MOCK_COLORS.filter(c => c.paint_type.toLowerCase() === paintType.toLowerCase());
  }
  return MOCK_COLORS;
}

export async function createOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback simulado para demo online
  }

  const orderNum = `ORD-${Date.now().toString().slice(-6)}`;
  return {
    order_number: orderNum,
    status: "Recibido",
    created_at: new Date().toISOString(),
    customer_name: orderData.customer_name,
    total_ref: orderData.total_ref,
    whatsapp_url: `https://wa.me/584242803167?text=${encodeURIComponent(`Hola Materiales ConstruY, deseo confirmar mi pedido ${orderNum}`)}`
  };
}

export async function fetchOrderByNumber(orderNumber) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderNumber}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }
  return {
    order_number: orderNumber,
    status: "Recibido",
    customer_name: "Cliente ConstruY",
    items: []
  };
}

export async function fetchSearch(query = '') {
  const clean = query.trim();
  if (clean.length < 3) {
    return {
      query: clean,
      min_chars_met: false,
      products: [],
      categories: [],
      pages: [],
      total: 0
    };
  }

  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(clean)}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // Fallback
  }

  const s = clean.toLowerCase();
  const matched = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
  return {
    query: clean,
    min_chars_met: true,
    products: matched,
    categories: [],
    pages: [],
    total: matched.length
  };
}
