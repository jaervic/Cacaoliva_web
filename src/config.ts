/**
 * Configuración central del negocio.
 * Cambia aquí los datos de contacto y redes: se usan en toda la web.
 */
export const SITE = {
  name: 'Cacaoliva',
  tagline: 'Postres Artesanales',
  /** URL pública del sitio (para canonical, Open Graph y sitemap). Sustituir por el dominio real. */
  url: 'https://cacaoliva.com',
  locale: 'es_VE',
  description:
    'Cacaoliva: pastelería y chocolatería venezolana. Descubre el auténtico sabor del cacao venezolano con nuestros bombones, trufas y postres artesanales.',
} as const;

export const CONTACT = {
  /** Número de WhatsApp en formato internacional, sin "+" ni espacios. */
  whatsapp: '584126813132',
  phoneDisplay: '+58 (412) 681-3132',
  address: 'Caracas, Venezuela',
  hours: 'Lun - Sáb: 9:00 am a 6:00 pm',
  instagram: 'https://www.instagram.com/cacaoliva_/',
  facebook: 'https://www.facebook.com/profile.php?id=100069870784798',
} as const;

export const DEFAULT_WHATSAPP_MESSAGE =
  '¡Hola Cacaoliva! Me gustaría hacer un pedido.';

/** Enlace de WhatsApp con mensaje precargado (correctamente codificado). */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Enlace de WhatsApp para pedir un producto concreto. */
export function whatsappProductLink(productName: string): string {
  return whatsappLink(`¡Hola Cacaoliva! Me gustaría ordenar: ${productName}.`);
}
