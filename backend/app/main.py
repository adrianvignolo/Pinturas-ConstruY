from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import datetime
import random
import urllib.parse

from app.database import get_db
from app.models import (
    ProductResponse,
    ColorItem,
    OrderCreate,
    OrderResponse,
    CompanyInfoResponse,
    SearchResponse,
    SearchCategoryItem,
    SearchPageItem
)

app = FastAPI(
    title="Materiales ConstruY API",
    description="Backend API con MariaDB en puerto 3307 para Pinturas ConstruY",
    version="1.0.0"
)

# Permitir CORS para React/Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    try:
        with get_db() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT VERSION() as version, DATABASE() as db;")
                row = cur.fetchone()
                return {
                    "status": "healthy",
                    "database": row["db"],
                    "mariadb_version": row["version"],
                    "port": 3307
                }
    except Exception as e:
        return {"status": "error", "message": str(e), "port": 3307}

@app.get("/api/company", response_model=CompanyInfoResponse)
def get_company_info():
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM company_info LIMIT 1;")
            company = cur.fetchone()
            if not company:
                raise HTTPException(status_code=404, detail="Company info not found")
            
            cur.execute("SELECT method_name, details FROM payment_methods WHERE is_active = 1;")
            methods = cur.fetchall()
            company["payment_methods"] = methods
            return company

@app.get("/api/products", response_model=List[ProductResponse])
def get_products(category: Optional[str] = None, search: Optional[str] = None):
    with get_db() as conn:
        with conn.cursor() as cur:
            query = "SELECT * FROM products WHERE 1=1"
            params = []

            if category and category.lower() != "todos":
                query += " AND category = %s"
                params.append(category)

            if search:
                query += " AND (name LIKE %s OR description LIKE %s)"
                params.extend([f"%{search}%", f"%{search}%"])

            query += " ORDER BY id ASC"
            cur.execute(query, params)
            return cur.fetchall()

@app.get("/api/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
            prod = cur.fetchone()
            if not prod:
                raise HTTPException(status_code=404, detail="Product not found")
            return prod

@app.get("/api/colors", response_model=List[ColorItem])
def get_colors(paint_type: Optional[str] = None):
    with get_db() as conn:
        with conn.cursor() as cur:
            if paint_type:
                cur.execute("SELECT * FROM color_palette WHERE paint_type = %s ORDER BY id ASC", (paint_type,))
            else:
                cur.execute("SELECT * FROM color_palette ORDER BY id ASC")
            return cur.fetchall()

@app.post("/api/orders")
def create_order(order_data: OrderCreate):
    if not order_data.items:
        raise HTTPException(status_code=400, detail="El pedido debe tener al menos un producto.")

    now = datetime.datetime.now()
    order_number = f"CY-{now.strftime('%Y%m%d')}-{random.randint(1000, 9999)}"

    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("""
            INSERT INTO orders (
                order_number, customer_name, customer_document, customer_phone,
                customer_email, delivery_method, delivery_address, payment_method,
                subtotal_ves, total_ves, total_ref, notes, status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'Pendiente')
            """, (
                order_number,
                order_data.customer_name,
                order_data.customer_document,
                order_data.customer_phone,
                order_data.customer_email or "",
                order_data.delivery_method,
                order_data.delivery_address or "",
                order_data.payment_method,
                order_data.subtotal_ves,
                order_data.total_ves,
                order_data.total_ref or 0.0,
                order_data.notes or ""
            ))
            order_id = cur.lastrowid

            for item in order_data.items:
                cur.execute("""
                INSERT INTO order_items (
                    order_id, product_id, product_name, unit_price_ves, quantity, total_price_ves
                ) VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    order_id,
                    item.product_id,
                    item.product_name,
                    item.unit_price_ves,
                    item.quantity,
                    item.total_price_ves
                ))

    # Generar enlace de WhatsApp con el resumen listo para enviar: Primero USD y luego VES
    items_summary = "\n".join([f"- {it.quantity}x {it.product_name} ({it.total_price_ves:,.2f} VES)" for it in order_data.items])
    whatsapp_msg = (
        f"¡Hola Pinturas ConstruY! 🎨\n"
        f"Acabo de generar un pedido desde la web.\n\n"
        f"📦 *Pedido #{order_number}*\n"
        f"👤 *Cliente:* {order_data.customer_name} ({order_data.customer_document})\n"
        f"📞 *Teléfono:* {order_data.customer_phone}\n"
        f"📍 *Entrega:* {order_data.delivery_method} - {order_data.delivery_address or 'A coordinar'}\n"
        f"💳 *Pago:* {order_data.payment_method}\n\n"
        f"*Productos:*\n{items_summary}\n\n"
        f"💰 *Total:* ${order_data.total_ref:.2f} USD ({order_data.total_ves:,.2f} VES)\n"
        f"Quedo a la espera de confirmación de disponibilidad para realizar el pago."
    )
    whatsapp_url = f"https://wa.me/584242803167?text={urllib.parse.quote(whatsapp_msg)}"

    return {
        "success": True,
        "message": "Pedido registrado exitosamente en MariaDB",
        "order_id": order_id,
        "order_number": order_number,
        "total_ves": order_data.total_ves,
        "whatsapp_url": whatsapp_url
    }

@app.get("/api/orders/{order_number}")
def get_order(order_number: str):
    with get_db() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM orders WHERE order_number = %s", (order_number,))
            order = cur.fetchone()
            if not order:
                raise HTTPException(status_code=404, detail="Pedido no encontrado")
            
            cur.execute("SELECT * FROM order_items WHERE order_id = %s", (order["id"],))
            order["items"] = cur.fetchall()
            return order

SITE_PAGES = [
    {
        "id": "page-home",
        "title": "Inicio",
        "subtitle": "Página principal con promociones y catálogo de fábrica",
        "type": "page",
        "page": "home",
        "anchor": "",
        "keywords": ["inicio", "portada", "home", "tienda", "principal", "pinturas"]
    },
    {
        "id": "page-catalogo",
        "title": "Catálogo de Presentaciones",
        "subtitle": "Galones y Cuñetes de caucho lavable y esmalte sintético",
        "type": "section",
        "page": "home",
        "anchor": "#catalogo",
        "keywords": ["catalogo", "presentaciones", "productos", "galon", "cuñete", "precios", "comprar", "caucho", "esmalte"]
    },
    {
        "id": "page-carta",
        "title": "Carta de Color",
        "subtitle": "23 Fórmulas oficiales (15 caucho y 8 esmaltes)",
        "type": "section",
        "page": "home",
        "anchor": "#carta",
        "keywords": ["carta", "color", "colores", "paleta", "tonos", "formulas", "m9010", "blanco", "negro", "gris", "amarillo", "azul", "rojo"]
    },
    {
        "id": "page-partner",
        "title": "Programa Partner ConstruY",
        "subtitle": "Puntos de venta Auyantepuy y Mayoristas Roraima",
        "type": "section",
        "page": "home",
        "anchor": "#partner",
        "keywords": ["partner", "mayoristas", "revendedores", "descuentos", "distribuidor", "ferreterias", "construccion", "contratistas", "roraima", "auyantepuy"]
    },
    {
        "id": "page-calculadora",
        "title": "Calculadora de Pintura",
        "subtitle": "Calcula los litros, galones o cuñetes según tus metros cuadrados",
        "type": "section",
        "page": "home",
        "anchor": "#calculadora",
        "keywords": ["calculadora", "metros", "m2", "dosificacion", "rendimiento", "cuanto", "estimar", "superficie", "pared"]
    },
    {
        "id": "page-pagos",
        "title": "Formas de Pago Aceptadas",
        "subtitle": "Zelle, Pago Móvil, Tarjetas, Transferencias bancarias y Efectivo",
        "type": "section",
        "page": "home",
        "anchor": "#pagos",
        "keywords": ["pagos", "formas de pago", "metodos", "zelle", "pago movil", "transferencia", "banesco", "bdt", "tesoro", "tarjetas", "efectivo", "dolares", "bolivares"]
    },
    {
        "id": "page-pedidos",
        "title": "Página de Pedidos en Línea",
        "subtitle": "Revisión de productos en tu carrito y cantidades",
        "type": "page",
        "page": "pedidos",
        "anchor": "",
        "keywords": ["pedidos", "pedido", "carrito", "orden", "compras", "bolsa", "revisar", "productos"]
    },
    {
        "id": "page-checkout",
        "title": "Facturación y Despacho",
        "subtitle": "Ingreso de datos de facturación legal y modalidad de entrega",
        "type": "page",
        "page": "checkout",
        "anchor": "",
        "keywords": ["checkout", "facturacion", "pago", "despacho", "datos", "rif", "cedula", "retiro en tienda", "envio caracas"]
    },
    {
        "id": "page-contacto",
        "title": "Contacto y Ubicación",
        "subtitle": "Sede física en Macaracuay, teléfonos, WhatsApp y horarios",
        "type": "page",
        "page": "contacto",
        "anchor": "",
        "keywords": ["contacto", "ubicacion", "direccion", "donde estan", "telefono", "whatsapp", "macaracuay", "caracas", "horario", "mapa"]
    }
]

@app.get("/api/search")
def search_all(q: Optional[str] = Query(None, min_length=0)):
    term = (q or "").strip()
    if len(term) < 3:
        return {
            "query": term,
            "min_chars_met": False,
            "products": [],
            "categories": [],
            "pages": [],
            "total": 0,
            "message": "Escribe al menos 3 caracteres para buscar"
        }

    like_term = f"%{term}%"
    term_lower = term.lower()

    # 1. Buscar Productos en MariaDB
    matched_products = []
    # 2. Buscar Categorías en MariaDB
    matched_categories = []

    with get_db() as conn:
        with conn.cursor() as cur:
            # Productos
            cur.execute("""
                SELECT id, category, name, description, price_ves, price_ref, stock_status, image_url, local_image
                FROM products
                WHERE name LIKE %s OR description LIKE %s OR category LIKE %s
                LIMIT 8;
            """, (like_term, like_term, like_term))
            matched_products = cur.fetchall()

            # Categorías
            cur.execute("""
                SELECT DISTINCT name, description
                FROM categories
                WHERE name LIKE %s OR description LIKE %s
                LIMIT 5;
            """, (like_term, like_term))
            matched_categories = cur.fetchall()

            if not matched_categories:
                cur.execute("""
                    SELECT DISTINCT category as name, CONCAT('Productos en la categoría ', category) as description
                    FROM products
                    WHERE category LIKE %s
                    LIMIT 5;
                """, (like_term,))
                matched_categories = cur.fetchall()

    # 3. Buscar Páginas y Secciones
    matched_pages = []
    for p in SITE_PAGES:
        # Coincidencia en título, subtítulo o palabras clave
        title_match = term_lower in p["title"].lower()
        subtitle_match = term_lower in p["subtitle"].lower()
        keyword_match = any(term_lower in kw or kw in term_lower for kw in p.get("keywords", []))
        if title_match or subtitle_match or keyword_match:
            matched_pages.append(p)

    return {
        "query": term,
        "min_chars_met": True,
        "products": matched_products,
        "categories": matched_categories,
        "pages": matched_pages,
        "total": len(matched_products) + len(matched_categories) + len(matched_pages)
    }
