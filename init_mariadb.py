import pymysql
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

DB_CONFIG = {
    'host': '127.0.0.1',
    'port': 3307,
    'user': 'root',
    'password': '',
    'charset': 'utf8mb4'
}

def setup_database():
    print("Conectando a MariaDB en el puerto 3307...")
    conn = pymysql.connect(**DB_CONFIG)
    cur = conn.cursor()
    
    cur.execute("CREATE DATABASE IF NOT EXISTS materialesconstruy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
    print("Base de datos 'materialesconstruy_db' lista o creada.")
    cur.execute("USE materialesconstruy_db;")

    # Crear tablas
    cur.execute("""
    CREATE TABLE IF NOT EXISTS company_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        legal_name VARCHAR(255) NOT NULL,
        rif VARCHAR(50) NOT NULL,
        schedule VARCHAR(255),
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        email VARCHAR(100),
        address TEXT,
        instagram VARCHAR(100),
        tiktok VARCHAR(100),
        store_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS payment_methods (
        id INT AUTO_INCREMENT PRIMARY KEY,
        method_name VARCHAR(100) NOT NULL,
        details TEXT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price_ves DECIMAL(12, 2) NOT NULL,
        price_ref VARCHAR(50),
        stock_status VARCHAR(50) DEFAULT 'Disponible',
        image_url TEXT,
        local_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS color_palette (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(50) NOT NULL,
        hex_code VARCHAR(20) NOT NULL,
        paint_type VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        customer_name VARCHAR(255) NOT NULL,
        customer_document VARCHAR(50) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(150),
        delivery_method VARCHAR(100) NOT NULL,
        delivery_address TEXT,
        payment_method VARCHAR(100) NOT NULL,
        subtotal_ves DECIMAL(12, 2) NOT NULL,
        total_ves DECIMAL(12, 2) NOT NULL,
        total_ref DECIMAL(10, 2) DEFAULT 0.0,
        notes TEXT,
        status VARCHAR(50) DEFAULT 'Pendiente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT,
        product_name VARCHAR(255) NOT NULL,
        unit_price_ves DECIMAL(12, 2) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        total_price_ves DECIMAL(12, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );
    """)
    conn.commit()
    print("Tablas verificadas y creadas correctamente.")

    # Sembrar datos de la empresa
    cur.execute("SELECT COUNT(*) FROM company_info;")
    if cur.fetchone()[0] == 0:
        cur.execute("""
        INSERT INTO company_info (name, legal_name, rif, schedule, phone, whatsapp, email, address, instagram, tiktok, store_url)
        VALUES (
            'Pinturas ConstruY',
            'Materiales ConstruY, C.A.',
            'J-504842850',
            'Lunes a viernes de 8:00 a 17:00',
            '+58 424 280 3167',
            '+584242803167',
            'materialesconstruy@gmail.com',
            'Avenida Principal de Macaracuay, Caracas 1071, Miranda',
            'https://instagram.com/materialesconstruy',
            'https://tiktok.com/@materialesconstruy',
            'https://www.hubshop.app/construy'
        );
        """)
        print("Datos de empresa insertados.")

    # Sembrar métodos de pago
    cur.execute("SELECT COUNT(*) FROM payment_methods;")
    if cur.fetchone()[0] == 0:
        methods = [
            ("Pago Móvil", "J-504842850 | 04242803167 | Banesco 0134 / BDT 0175 / Tesoro 0163"),
            ("Zelle", "Adrianvignolo@gmail.com (Adrian Meneses)"),
            ("Transferencia Bancaria Banesco", "Materiales Construy CA | J-504842850 | Cta: 0134-1202-20-0001004193"),
            ("Transferencia Bancaria BDT", "Materiales Construy CA | J-504842850 | Cta: 0175-0473-80-0077771890"),
            ("Transferencia Banco del Tesoro", "Materiales Construy CA | J-504842850 | Cta: 0163-0913-38-9133005671")
        ]
        cur.executemany("INSERT INTO payment_methods (method_name, details) VALUES (%s, %s)", methods)
        print("Métodos de pago insertados.")

    # Sembrar categorías
    cur.execute("SELECT COUNT(*) FROM categories;")
    if cur.fetchone()[0] == 0:
        cats = [
            ("Esmalte semi-industrial", "Esmalte para interiores y exteriores de alta durabilidad"),
            ("Pinturas de caucho", "Pintura de caucho lavable clases A y B para paredes interiores y exteriores"),
            ("Taza", "Mercancía oficial y accesorios de Pinturas ConstruY")
        ]
        cur.executemany("INSERT INTO categories (name, description) VALUES (%s, %s)", cats)
        print("Categorías insertadas.")

    # Sembrar productos
    cur.execute("SELECT COUNT(*) FROM products;")
    if cur.fetchone()[0] == 0:
        prods = [
            (
                "Esmalte semi-industrial",
                "Galón de Esmalte",
                "Esmalte semi-industrial para interiores y exteriores. Fuerte adhesión y secado rápido, película lisa y hermosa, buen poder de ocultación, alta dureza y buena resistencia a la abrasión, con excelente nivelación y fácil aplicación. 8 colores.",
                35804.20,
                "40,60 REF",
                "Disponible",
                "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/galon-esmalte/portada-v2.webp",
                "/products/galon-pintura-esmalte-azul-clase-a-2.jpg"
            ),
            (
                "Pinturas de caucho",
                "Cuñete Caucho Clase A",
                "Pintura de caucho clase A, lavable, para interiores y exteriores. Máxima carga de resina: mayor rendimiento por litro, cubrimiento total en menos manos y resistencia al lavado y a la intemperie. Disponible en 7 colores de la carta ConstruY.",
                97182.83,
                "110,20 REF",
                "Disponible",
                "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
                "/products/producto_cunete_pintura_caucho_materiales_construy-25.png"
            ),
            (
                "Pinturas de caucho",
                "Cuñete Caucho Clase A hecho en Venezuela",
                "Edición especial con formulación optimizada para clima tropical y sello nacional. Excelente acabado mate sedoso, fácil aplicación y máxima lavabilidad.",
                101415.84,
                "115,00 REF",
                "Disponible",
                "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
                "/products/producto_cunete_pintura_caucho_materiales_construy-26.png"
            ),
            (
                "Pinturas de caucho",
                "Cuñete Caucho Clase B",
                "Pintura de caucho clase B ideal para renovación de grandes superficies, techos y muros con excelente relación costo-rendimiento y acabado uniforme.",
                91044.97,
                "103,24 REF",
                "Disponible",
                "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
                "/products/producto_cunete_pintura_caucho_materiales_construy-27.png"
            ),
            (
                "Pinturas de caucho",
                "Galón Caucho Clase A",
                "Presentación de 1 galón (3.785 litros) de pintura de caucho clase A super lavable. Ideal para retoques, habitaciones, oficinas y áreas de tráfico moderado.",
                31968.04,
                "36,25 REF",
                "Disponible",
                "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/cunete-caucho-a/portada-v2.webp",
                "/products/producto_pintura_caucho_materiales_construy-9.png"
            ),
            (
                "Taza",
                "Taza Construy",
                "Taza conmemorativa oficial de Materiales ConstruY con acabado cerámico esmaltado de alta resistencia térmica.",
                8818.77,
                "10,00 REF",
                "Disponible",
                "https://mbjcgebnctfnmrgrqgql.supabase.co/storage/v1/object/public/product-images/dda602e1-f737-4d8c-8bf2-3881d1b9fa1a/krkbyxq4n9/taza_construy2.png",
                "/brand/favicon-512x512.png"
            )
        ]
        cur.executemany("""
        INSERT INTO products (category, name, description, price_ves, price_ref, stock_status, image_url, local_image)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, prods)
        print("Productos insertados.")

    # Sembrar paleta de colores
    cur.execute("SELECT COUNT(*) FROM color_palette;")
    if cur.fetchone()[0] == 0:
        colors = [
            # 15 Caucho
            ("Blanco", "M9010", "#FFFFFF", "Pinturas de caucho"),
            ("Blanco ostra", "M9010-BOW1", "#F1EBE3", "Pinturas de caucho"),
            ("Verde", "M9010-7494C", "#BBCBA8", "Pinturas de caucho"),
            ("Verde oscuro", "M9010-445C", "#393E38", "Pinturas de caucho"),
            ("Azul oscuro", "M9010-281A", "#1A4686", "Pinturas de caucho"),
            ("Madera", "M9010-M3082-14A", "#543F28", "Pinturas de caucho"),
            ("Rojo", "M9010-185C", "#C22F1F", "Pinturas de caucho"),
            ("Amarillo", "M9010-252A", "#E9C323", "Pinturas de caucho"),
            ("Púrpura", "M9010-262C", "#340D19", "Pinturas de caucho"),
            ("Gris troyano", "M9010-4233D", "#656B6E", "Pinturas de caucho"),
            ("Gris libertad", "M9010-4222T", "#9B9C9F", "Pinturas de caucho"),
            ("Gris místico", "M9010-4225P", "#BBBBB8", "Pinturas de caucho"),
            ("Azul claro", "M9010-PBC", "#458FBC", "Pinturas de caucho"),
            ("Gris cálido", "M9010-WG8C", "#786669", "Pinturas de caucho"),
            ("Verde pantano", "M9010-415C", "#878A76", "Pinturas de caucho"),
            # 8 Esmalte
            ("Rojo", "FE-RAL3020", "#AE1F23", "Esmalte semi-industrial"),
            ("Amarillo", "FE-15", "#E5BC40", "Esmalte semi-industrial"),
            ("Azul", "FE-RAL5010", "#025395", "Esmalte semi-industrial"),
            ("Plata", "EP-57", "#A6A6A6", "Esmalte semi-industrial"),
            ("Gris", "FE-97", "#606163", "Esmalte semi-industrial"),
            ("Verde opaco", "FE-RAL6026", "#035E52", "Esmalte semi-industrial"),
            ("Negro", "FE-02", "#000000", "Esmalte semi-industrial"),
            ("Blanco", "FE-01", "#FFFFFF", "Esmalte semi-industrial")
        ]
        cur.executemany("INSERT INTO color_palette (name, code, hex_code, paint_type) VALUES (%s, %s, %s, %s)", colors)
        print("Paleta de 23 colores insertada.")

    # Sembrar un pedido de ejemplo si no existe
    cur.execute("SELECT COUNT(*) FROM orders;")
    if cur.fetchone()[0] == 0:
        cur.execute("""
        INSERT INTO orders (order_number, customer_name, customer_document, customer_phone, customer_email, delivery_method, delivery_address, payment_method, subtotal_ves, total_ves, total_ref, notes, status)
        VALUES (
            'CY-2026-0001',
            'Cliente de Ejemplo',
            'V-12345678',
            '+58 424 000 0000',
            'cliente@ejemplo.com',
            'Envío a Caracas (Sin costo)',
            'Av. Francisco de Miranda, Caracas',
            'Pago Móvil Banesco',
            141805.80,
            141805.80,
            160.80,
            'Pedido inicial de muestra',
            'Confirmado'
        );
        """)
        order_id = cur.lastrowid
        cur.execute("""
        INSERT INTO order_items (order_id, product_name, unit_price_ves, quantity, total_price_ves)
        VALUES 
        (%s, 'Galón de Esmalte', 35804.20, 1, 35804.20),
        (%s, 'Cuñete Caucho Clase A', 97182.83, 1, 97182.83),
        (%s, 'Taza Construy', 8818.77, 1, 8818.77);
        """, (order_id, order_id, order_id))
        print("Pedido de ejemplo insertado.")

    conn.commit()
    conn.close()
    print("Base de datos en MariaDB (puerto 3307) inicializada con éxito total.")

if __name__ == '__main__':
    setup_database()
