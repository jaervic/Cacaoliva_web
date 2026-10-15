# Cacaoliva

Landing page de **Cacaoliva**, pastelería y chocolatería venezolana especializada en cacao fino de aroma.

Sitio de una sola página construido con **React 19**, **Vite** y **Tailwind CSS v4**. Todo el contenido
es estático y los pedidos se cierran por WhatsApp.

## Requisitos

- Node.js 18 o superior.

## Puesta en marcha

```bash
npm install
npm run dev
```

La web queda disponible en `http://localhost:3000`.

> No se requieren variables de entorno ni claves de API.

## Scripts

| Comando             | Descripción                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `npm run dev`       | Servidor de desarrollo con HMR.                                    |
| `npm run build`     | Compila la versión de producción en `dist/`.                       |
| `npm run preview`   | Sirve localmente el resultado de `build`.                          |
| `npm run typecheck` | Comprueba los tipos con TypeScript.                                |
| `npm run lint`      | Ejecuta ESLint.                                                    |
| `npm run format`    | Formatea el código con Prettier.                                   |
| `npm run assets`    | Regenera imágenes responsive, favicons y la imagen Open Graph.     |

## Personalización

### Datos del negocio

Edita **`src/config.ts`**: WhatsApp, teléfono, horario, dirección y redes sociales se usan en toda
la web y en los enlaces de pedido. El número de WhatsApp va en formato internacional y sin `+` ni
espacios (por ejemplo `584126812345`).

### Catálogo de productos

Los productos viven en **`src/data/products.ts`**. Cada producto incluye nombre, descripción,
descripción larga, ingredientes, presentación, precio, etiqueta opcional e imagen.

### Fotografías, logo y metadatos

- `brand/logo.png` es el logo de marca (favicon, iconos y Open Graph).
- Las fotografías se generan con `npm run assets` (definidas en `scripts/generate-assets.mjs`).
- Recuerda **reemplazar el dominio `cacaoliva.com`** por el real en:
  `index.html` (canonical, Open Graph y JSON-LD), `public/robots.txt` y `public/sitemap.xml`.

## Estructura

```
brand/               Logo fuente de marca
public/              Assets estáticos (imágenes, iconos, robots.txt, sitemap.xml)
scripts/             Script de generación de assets
src/
  components/        Componentes de la interfaz
  data/products.ts   Catálogo de productos
  lib/               Hooks y utilidades
  config.ts          Configuración del negocio
  types.ts           Tipos compartidos
  App.tsx            Composición de la página
```

## Créditos de imágenes

Las fotografías se descargan y optimizan con `npm run assets` (ver `scripts/generate-assets.mjs`).

- Fotografías de producto y hero: [Unsplash](https://unsplash.com) (Unsplash License).
- `Cocoa Pods.JPG` (sección "Nuestra Historia"): dominio público, autoría de Medicaster, vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cocoa_Pods.JPG).
- `Rocky Mountain chocolates.jpg` (Bombones de Autor): CC0, vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Rocky_Mountain_chocolates.jpg).
- `Truffles with nuts and chocolate dusting.jpg` (Trufas Aterciopeladas): CC BY 2.0, vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Truffles_with_nuts_and_chocolate_dusting.jpg).

