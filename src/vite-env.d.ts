/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL pública del sitio (inyectada desde vite.config.ts). */
  readonly VITE_SITE_URL: string;
}
