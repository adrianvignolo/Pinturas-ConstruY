# Pinturas ConstruY — ConstruY Industrial Studio

Plataforma web desarrollada para **Materiales ConstruY, C.A.** rediseñada con el sistema de diseño arquitectónico e industrial de `stitch_materiales_construy_header_redesign` utilizando **React + Vite + Tailwind CSS**, **Python (FastAPI)** y **MariaDB en el puerto 3307**.

---

## 🏗️ Servicios Activos y URLs

| Servicio | Tecnología | Puerto | URL Local |
| :--- | :--- | :--- | :--- |
| **Frontend Web** | React 18 + Vite + Tailwind | `5174` | [http://localhost:5174](http://localhost:5174) |
| **Backend API** | Python 3.12 + FastAPI + Uvicorn | `8002` | [http://localhost:8002](http://localhost:8002) |
| **Documentación API** | Swagger / OpenAPI | `8002` | [http://localhost:8002/docs](http://localhost:8002/docs) |
| **Base de Datos** | MariaDB 11.5 | `3307` | `localhost:3307` (`materialesconstruy_db`) |

---

## 🎨 Sistema de Diseño Implementado

Basado en las especificaciones de `design/stitch_materiales_construy_header_redesign`:
- **Tipografías:** `Montserrat`, `Poppins` (titulares y labels arquitectónicos) y `Hanken Grotesk` (cuerpo de texto y especificaciones técnicas).
- **Paleta de Colores:**
  - `primary`: `#001026` (Azul marino industrial profundo)
  - `secondary`: `#b02f00` / `secondary-container`: `#fd5927` (Terracota y naranja de seguridad)
  - `gold-warm`: `#E5A823` (Dorado de programa de fidelidad de estrellas)
  - `surface`: `#f8f9ff` / `surface-container-lowest`: `#ffffff` (Superficies limpias de estudio)
- **Componentes Clave:**
  - **TopBar:** Barra fiscal con RIF `J-504842850`, horarios, ventas al mayor/detal y canal telefónico.
  - **Header:** Logotipo oficial, buscador en tiempo real, menú de navegación, indicador de estado ("Abierto ahora"), botón interactivo de pedidos y botón de cotización.
  - **Hero:** Banners de fábrica rotativos con badge "Hecho en Venezuela", especificaciones técnicas y CTAs.
  - **LoyaltyStarsBanner:** Cintillo del programa de estrellas (`0.30★ / 1 USD`) con canjes directos (150★, 350★, 885★).
  - **CatalogSection:** Catálogo de 6 productos reales con filtros de categoría, insignias de stock y modal rápido.
  - **ColorChartSection:** Muestrario técnico de los 23 colores de fórmula con códigos y valores HEX.
  - **PartnerSection:** Niveles Auyantepuy (detal) y Roraima (mayoristas y constructoras).
  - **CalculatorBanner:** Calculadora interactiva de metros cuadrados y rendimiento de pintura.
  - **OrdersPage:** Página independiente de pedidos con carrito, cálculo en VES y REF, formulario de datos del comprador, almacenamiento en MariaDB 3307 y generación de mensaje estructurado para WhatsApp.
  - **Footer:** Pie corporativo con datos legales, contacto directo, garantía y redes sociales.
