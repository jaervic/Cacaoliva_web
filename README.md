# Cacaoliva

**Cacaoliva** es un emprendimiento de repostería y chocolatería venezolana dedicado al cacao fino
de aroma. Este repositorio es el sitio web del negocio: una página sencilla, de un solo recorrido,
donde se presentan las creaciones de la casa y los pedidos se cierran por WhatsApp.

No hay carrito ni pasarela de pagos. La idea es simple: que quien entre se antoje, conozca nuestra
historia y nos escriba.

## Qué encontrarás en la página

- **Portada** con la propuesta de la casa y accesos directos.
- **Nuestras creaciones**: bombones, trufas, la Tableta Origen Chuao y la Marquesa, con su ficha de
  ingredientes y presentación.
- **Nuestra historia**: el vínculo con el cacao venezolano.
- **Lo que dicen los clientes** y **preguntas frecuentes** (delivery, métodos de pago, anticipación
  y alérgenos).
- **Cómo ordenar**, paso a paso, con contacto directo por WhatsApp.

## Ver el sitio en tu computadora

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev
```

Después abre `http://localhost:3000`. Para generar la versión lista para publicar:

```bash
npm run build
```

Todo es contenido estático: no hacen falta claves ni servicios externos.

## Publicación

El sitio se publica en **Vercel** (detecta Vite y usa `npm run build`, con la salida en `dist/`).

1. Importa este repositorio en Vercel.
2. Copia la URL de producción que te asigne y ponla en la variable de entorno `VITE_SITE_URL`
   (Vercel → Settings → Environment Variables). Ese valor alimenta el canonical, Open Graph,
   `robots.txt` y `sitemap.xml`.
3. A partir de ahí, cada `git push` a `main` vuelve a desplegar solo.

Para probar el resultado de producción en local: `npm run build && npm run preview`.

## Cómo mantenerlo

**Datos de contacto y redes.** WhatsApp, teléfono, horario y redes sociales están en
`src/config.ts`. El número de WhatsApp va en formato internacional, sin `+` ni espacios (por
ejemplo, `584126812345`).

**Productos.** El catálogo vive en `src/data/products.ts`: nombre, descripciones, ingredientes,
presentación, precio y fotografía.

**Logo e imágenes.** El logo está en `brand/logo.png`; de él se generan el favicon y la imagen que
aparece al compartir el enlace. Con `npm run assets` se regeneran las fotografías en varios tamaños
y todos esos derivados.

**Dirección del sitio.** La URL pública vive en una sola variable, `VITE_SITE_URL` (ver
`.env.example`). De ahí se rellenan el canonical, Open Graph, los datos estructurados y los archivos
`robots.txt` y `sitemap.xml`, que se generan durante el build. Para cambiar de dirección —por
ejemplo, al comprar un dominio propio— basta con actualizar esa variable y volver a desplegar.

## Créditos de las fotografías

Las fotos actuales son de banco de imágenes y están pensadas para sustituirse por fotografías
propias.

- Fotografías de producto y portada: [Unsplash](https://unsplash.com) (Unsplash License).
- `Cocoa Pods.JPG` (sección "Nuestra Historia"): dominio público, autoría de Medicaster, vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Cocoa_Pods.JPG).
- `Rocky Mountain chocolates.jpg` (Bombones de Autor): CC0, vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Rocky_Mountain_chocolates.jpg).
- `Truffles with nuts and chocolate dusting.jpg` (Trufas Aterciopeladas): CC BY 2.0, vía
  [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Truffles_with_nuts_and_chocolate_dusting.jpg).

## Detalles técnicos

Página hecha con React, Vite y Tailwind CSS, tipada con TypeScript. Todo el contenido es estático y
los pedidos se coordinan íntegramente por WhatsApp.

Comandos útiles, además de `dev` y `build`: `npm run preview` (ver el resultado del build),
`npm run typecheck`, `npm run lint`, `npm run format` y `npm run assets`.

<!--
Estructura del proyecto:
  brand/               Logo fuente
  public/              Imágenes e iconos
  scripts/             Generación de imágenes y assets de marca
  src/components/      Secciones de la página
  src/data/products.ts Catálogo de productos
  src/config.ts        Datos del negocio
  src/lib/             Utilidades
  vite.config.ts       Build, URL del sitio y generación de robots.txt/sitemap.xml
-->
