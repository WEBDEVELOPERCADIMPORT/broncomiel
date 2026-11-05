# MEMORY.md — Registro Central del Proyecto AutoUI (autroui)

> **Propósito**: Este archivo es la fuente de verdad sobre el estado actual, arquitectura, módulos, datos, acciones y componentes del starter kit **AutoUI (autroui)**.
> **Regla Inquebrantable**: Todo agente (`manager`, `coder`, `tester`) debe consultar este documento antes de planificar o modificar código, y el `manager` debe actualizarlo tras cada tarea verificada por el `tester`.

---

## 1. Identidad y Propósito del Starter Kit

- **Nombre**: AutoUI (`autroui`)
- **Template / Origen**: `KEVIN01306/autroui`
- **Propósito**: Starter kit de alto rendimiento y arquitectura modular para la creación, desarrollo y mantenimiento acelerado de sitios web modernos, landing pages, catálogos dinámicos por categoría y soluciones e-commerce multilingües.
- **Enfoque Principal**: Separación estricta entre presentación visual (componentes desacoplados en Astro), lógica de datos en el servidor (Astro Server Actions), contenidos estructurados internacionalizados (JSONs simétricos `es`/`en`) y despliegue edge en Cloudflare.

---

## 2. Stack Tecnológico y Configuración

- **Framework**: Astro `^6.1.6` (modo SSR: `output: 'server'`, con `@astrojs/cloudflare` `^13.1.9`).
- **Estilos**: Tailwind CSS `^4.2.2` integrado vía `@tailwindcss/vite` (`@import "tailwindcss";` en `src/styles/global.css`).
- **Lenguaje**: TypeScript (`strict` mode con `astro/tsconfigs/strict`).
- **Navegación e Interactividad**: Astro `ClientRouter` nativo; los scripts de cliente se inicializan en carga y en el evento `astro:page-load`.
- **Internacionalización (i18n)**:
  - Idiomas soportados: Español (`es`) e Inglés (`en`).
  - Configuración: `astro.config.mjs` con `prefixDefaultLocale: true`, fallback y redirección automática.
  - Diccionarios y helpers en `src/i18n/config.i18n.ts` y `src/i18n/utils.i18n.ts`.
- **SEO & Metadatos**:
  - `@astrojs/sitemap` con generación dinámica de URLs (`src/utils/seo/sitemapUrls.ts`).
  - `src/layouts/Layout.astro` con soporte para Open Graph, Twitter Cards, canonical tags, alternate hreflang y JSON-LD (`schema`).
- **Hosting / Deploy**: Cloudflare Pages / Workers (`wrangler` `^4.82.2`).

---

## 3. Mapa de Arquitectura y Capas

```plaintext
public/
└── images/                               # Galería estática de medios y recursos visuales
    ├── home/                             # Assets globales y de la página principal
    └── <categoria>/                      # Assets organizados por módulo/categoría
        ├── banner.png (o hero.png)
        ├── logo.png
        └── products/                     # Imágenes de productos de la categoría
            └── <slug-o-sku>.png

src/
├── actions/                              # Astro Server Actions (Lógica de servidor)
│   ├── index.ts                          # Registro central export const server = { ... }
│   └── <modulo>/                         # Módulos por dominio (ej. reviews/, products/)
│       └── <nombre>.action.ts
│
├── components/                           # Presentación pura (sin queries ni mutaciones)
│   ├── common/                           # UI global compartida (Navbar.astro, Footer.astro)
│   ├── ui/                               # Primitivas de UI
│   └── <pagina>/                         # Componentes de páginas específicas
│       ├── sections/                     # Bloques de sección completos (Hero.astro, FAQ.astro)
│       └── components/                   # Subcomponentes atómicos (Card.astro)
│
├── data/                                 # Contenido centralizado y fuentes locales
│   ├── site-global-content.json          # Textos compartidos, Navbar (con submenús) y Footer
│   ├── site-<pagina>-content.json        # Textos de página indexados por idioma ("es", "en")
│   └── <modulo>/                         # Colecciones de datos locales
│       └── <modulo>.data.json            # Entidades en plural (ej. products.data.json)
│
├── db/                                   # Capa de persistencia (opcional / extensible)
│   ├── index.ts                          # Cliente de base de datos
│   ├── schema.ts                         # Definición de tablas / esquemas
│   └── repositories/                     # Repositorios de acceso a datos
│
├── i18n/                                 # Configuración y utilidades de internacionalización
│   ├── config.i18n.ts                    # Constantes de idiomas y tipo Lang
│   └── utils.i18n.ts                     # Funciones utilitarias (getLangFromUrl, useTranslations)
│
├── layouts/                              # Plantillas maestras
│   └── Layout.astro                      # Head, SEO, metadatos y ClientRouter
│
├── pages/                                # Enrutamiento basado en archivos
│   ├── index.astro                       # Redirección raíz hacia /[defaultLocale]
│   ├── 404.astro                         # Página de error 404
│   └── [lang]/                           # Enrutamiento dinámico multilenguaje
│       ├── index.astro                   # Vista Home
│       └── [category]/                   # Vistas anidadas
│           ├── index.astro               # Catálogo / Vista de Categoría
│           └── [product]/
│               └── index.astro           # Detalle / Ficha de Producto
│
├── styles/                               # Estilos globales
│   └── global.css                        # Tailwind CSS v4 (@import "tailwindcss";)
│
└── utils/                                # Utilidades puras
    └── seo/
        └── sitemapUrls.ts                # Extractor dinámico de rutas para el sitemap
```

---

## 4. Estructuras de Sitio Predefinidas

### 1. `site_category_products` (E-commerce / Catálogo Dinámico)
- **Propósito**: Navegación multinivel por categorías y catálogo con ficha técnica detallada.
- **Páginas requeridas**:
  - Home: `src/pages/[lang]/index.astro`
  - Categoría: `src/pages/[lang]/[category]/index.astro`
  - Producto: `src/pages/[lang]/[category]/[product]/index.astro`
- **Datos requeridos** (`src/data/`):
  - `categories/categories.data.json`
  - `products/products.data.json`
  - `site-home-content.json`
- **Requerimiento de Insumos Visuales (Figma / Mockups)**:
  - Vista Home (Layout principal y secciones).
  - Vista Categoría (Hero de categoría y cuadrícula de productos).
  - Vista Producto (Ficha técnica, galería de imágenes y detalles).

---

## 5. Módulos y Estado Actual del Starter Kit

| Módulo / Capa | Directorio / Archivo | Estado | Descripción |
| :--- | :--- | :--- | :--- |
| **Global Layout & SEO** | `src/layouts/Layout.astro` | Activo | Plantilla base con Open Graph, Twitter Cards, `ClientRouter`, metadatos de BroncoMiel y JSON-LD. |
| **Internacionalización** | `src/i18n/` | Activo | Idiomas `es` y `en` con helpers de traducción y rutas. |
| **Navbar & Footer** | `src/components/common/` | Activo | Navegación global con logo de marca, selector ES/EN, enlaces de catálogo, canal oficial de Amazon y disclaimer FDA. |
| **Amazon Review Card** | `src/components/common/ReviewCard.astro` | Activo | Tarjeta atómica reutilizable de review de Amazon con rating, verificación y mascota de la abeja. |
| **Product Actions & Data**| `src/actions/products/`, `src/data/products/` | Activo | Acciones `getFeaturedProducts`, `getProductBySlug`, `getRelatedProducts` y catálogo `products.data.json`. |
| **Home Page (7 Secciones)** | `src/pages/[lang]/index.astro`, `src/components/home/` | Activo | Hero, WhyChoose, FeaturedProducts (#productos), FamilyBanner, ReviewsSection, StoreLocator (#donde-comprar) y FaqSection (#faq). |
| **Ficha de Producto** | `src/pages/[lang]/[product]/index.astro`, `src/components/product/` | Activo | Ficha técnica directa a dos niveles, Breadcrumb, ProductGallery, ProductBadges, ProductDetail y RelatedProducts. |
| **Error Handling** | `src/pages/404.astro` | Activo | Vista estándar 404 para rutas o idiomas inválidos. |
| **Sitemap Dinámico** | `src/utils/seo/sitemapUrls.ts` | Activo | Inyección de URLs localizadas para Home y todos los productos (`https://broncomiel.com/`). |
| **Estilos Centralizados** | `src/styles/global.css` | Activo | Tokens de color `@theme`, clases de gradientes, botones primarios ámbar y badges botánicos. |

---

## 6. Convenciones y Reglas Inquebrantables

1. **Presentación Pura en Componentes**:
   - `src/components/` jamás realiza llamadas directas a base de datos ni mutaciones; recibe datos por props y textos por `lang`.
2. **Server Actions como Única Vía de Datos Dinámicos**:
   - Se crean en `src/actions/<modulo>/<accion>.action.ts` y se registran en `src/actions/index.ts`.
   - Tipado estricto `Promise<{ message: string, data: T }>`. Cero HTML devuelto.
3. **Simetría Multilenguaje Estricta**:
   - En `src/data/`, cada clave en `"es"` debe existir exactamente igual en `"en"`.
4. **Validación de Idioma en Páginas**:
   - Toda página bajo `src/pages/[lang]/` valida que `lang` pertenezca a `LANGUAGES` y redirige a `/404` si no existe.
5. **ClientRouter y Scripts**:
   - Todo script en componentes que añada interactividad debe suscribirse a `astro:page-load`.
6. **Convención Modular de Imágenes**:
   - Toda imagen se almacena en `public/images/<categoria>/...` o `public/images/home/`.

---

## 7. Catálogo de Agentes y Skills del Proyecto

### Agentes (`.agents/agents/`)
- **`manager`**: Líder técnico y orquestador. Confirma insumos visuales, estructura las tareas (`#Task-XX`), asigna skills y coordina con el `tester`.
- **`coder`**: Desarrollador enfocado. Implementa una tarea a la vez en modo `triage` o `implement` siguiendo las skills de AutoUI.
- **`tester`**: Auditor de calidad y arquitectura. Valida tipos, build y cumplimiento estricto de las reglas arquitectónicas de AutoUI.

### Skills Técnicas (`.agents/skills/`)
- **`create-data`**: Creación de diccionarios i18n (`site-<pagina>-content.json`), configuración global y entidades locales (`.data.json`).
- **`create-action`**: Creación y tipado de Server Actions en `src/actions/` y registro en `index.ts`.
- **`create-component`**: Componentes visuales puros con Tailwind CSS v4, carga de copys por `lang` y scripts con `astro:page-load`.
- **`create-page`**: Páginas dinámicas multilenguaje bajo `[lang]`, validación con redirección 404, llamadas `Astro.callAction` y Layout SEO.

---

## 8. Historial de Cambios (Changelog)

| Fecha | Identificador | Capa | Resumen del Cambio | Verificado Por |
| :--- | :--- | :--- | :--- | :--- |
| 2026-10-26 | `#Init-AutoUI-Agents` | Sistema de Agentes | Reconfiguración completa del ecosistema multi-agente (`manager`, `coder`, `tester`), catálogo de skills (`create-data`, `create-action`, `create-component`, `create-page`), actualización de `MEMORY.md`, `AGENTS.md` y `CLAUDE.md` orientados al starter kit AutoUI (Astro, Tailwind CSS v4, i18n, Cloudflare). | Manager AutoUI |
| 2026-11-04 | `#BroncoMiel-Launch` | Full-Stack AutoUI | Implementación completa de BroncoMiel en 2 niveles (Home y Ficha de Producto). Capa de datos simétrica es/en en JSON, Server Actions Zod (`getFeaturedProducts`, `getProductBySlug`, `getRelatedProducts`), diseño idéntico al mockup con variables centralizadas en `global.css`, cero textos hardcodeados y tipado TypeScript estricto. | Tester AutoUI (VERIFIED) |
| 2026-11-04 | `#BroncoMiel-Refinements` | UI & Data Refactor | Integración de `Reviews.astro` con logo de Amazon y eliminación de componentes redundantes. Implementación de carrusel interactivo en `FeaturedProducts.astro` con enlace al detalle de producto. Aplicación del gradiente diagonal exacto (`.bg-brand-diagonal-gradient`) a productos y localizador de tiendas. Reestructuración de `products.data.json` a `{ "products": { "es": [...], "en": [...] } }` con soporte de `lang` en Server Actions. | Tester AutoUI (VERIFIED) |
| 2026-11-05 | `#Product-Schema-UX` | Schema & Card UX | Eliminación de `price`, `title` y `subtitle` en `products.data.json`, adopción de `name` y `description`. Truncado inteligente a 2 líneas (~90 chars) en las tarjetas de `FeaturedProducts` y `RelatedProducts`. Implementación de botón interactivo "Ver más" / "Ver menos" accesible en `ProductDetail.astro` conectado con diccionarios i18n y ciclo `astro:page-load`. | Tester AutoUI (VERIFIED) |
| 2026-11-05 | `#HeroCarousel-NoBottles` | Visual Hero | Remoción de las botellas flotantes superpuestas en el carrusel del Hero (`HeroCarousel.astro`), dejando exclusivamente el slider de fotos familiares con transiciones e indicadores limpios. | Tester AutoUI (VERIFIED) |
| 2026-11-05 | `#FamilyBanner-FullWidth` | Visual Banner | Actualización de `FamilyBanner.astro` a banner full-bleed panorámico completo usando `/images/home/family-broncomiel-banner.png` para cubrir toda la sección sin tarjetas ni textos superpuestos. | Tester AutoUI (VERIFIED) |
| 2026-11-05 | `#StoreLocator-GoogleMaps` | Actions & Maps | Integración de la Server Action `getPlaces` (`places.json`), eliminación de badges de stock y sustitución del mapa estático por un iframe real de Google Maps con navegación dinámica por sucursal en `StoreLocator.astro`. | Tester AutoUI (VERIFIED) |
| 2026-11-05 | `#Product-Remove-Presentation` | Schema & UI | Eliminación total de la propiedad `presentation` del archivo `products.data.json`, de la interfaz `ProductItem` y de todos los componentes visuales (`FeaturedProducts`, `ProductDetail`, `RelatedProducts`). | Tester AutoUI (VERIFIED) |
| 2026-11-05 | `#Product-Remove-IsFeatured` | Schema & Action | Eliminación completa de `isFeatured` de `products.data.json`, del tipo `ProductItem` y actualización de `getFeaturedProducts` para retornar directamente los productos del catálogo. | Tester AutoUI (VERIFIED) |
