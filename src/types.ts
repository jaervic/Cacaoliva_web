export interface ProductImage {
  src: string;
  srcSet: string;
  /** Valor para el atributo `sizes` de la etiqueta img. */
  sizes: string;
  alt: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  weight: string;
  price: string;
  /** Etiqueta destacada opcional (p. ej. "Más vendido"). */
  badge?: string;
  image: ProductImage;
}
