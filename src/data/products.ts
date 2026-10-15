import type { Product, ProductImage } from '../types';

const detailSizes = '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw';

/** Construye la imagen responsive de un producto a partir de su slug y sus anchos. */
const productImage = (slug: string, alt: string, widths: number[]): ProductImage => ({
  src: `/images/${slug}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((width) => `/images/${slug}-${width}.webp ${width}w`).join(', '),
  sizes: detailSizes,
  alt,
});

export const products: Product[] = [
  {
    id: 1,
    slug: 'bombones-de-autor',
    name: 'Bombones de Autor',
    description:
      'Pequeñas joyas de chocolate oscuro al 70%, rellenas con ganache de parchita y un toque de ron añejo. Un estallido tropical en cada bocado.',
    longDescription:
      'Nuestros bombones de autor son el resultado de años de perfeccionamiento. Cada pieza es moldeada a mano y pintada con manteca de cacao coloreada. El relleno es una emulsión perfecta de chocolate oscuro, jugo de parchita fresca y ron añejo venezolano de primera calidad, logrando un equilibrio perfecto entre acidez, dulzor y el carácter robusto del cacao.',
    ingredients: ['Cacao 70%', 'Parchita', 'Ron Añejo', 'Manteca de Cacao', 'Azúcar de Caña'],
    weight: '120g (Caja de 9 unidades)',
    price: '$12.00',
    badge: 'Más vendido',
    image: productImage(
      'bombones-de-autor',
      'Surtido de bombones y pralinas de chocolate rellenos, presentados en cápsulas',
      [1200, 700],
    ),
  },
  {
    id: 2,
    slug: 'trufas-aterciopeladas',
    name: 'Trufas Aterciopeladas',
    description:
      'Esferas de cacao puro espolvoreadas a mano, que esconden un corazón cremoso con notas del mejor café andino. Suavidad que acaricia el alma.',
    longDescription:
      'Inspiradas en las mañanas frías de los Andes venezolanos, estas trufas combinan la intensidad del cacao con el aroma inconfundible del café recién tostado. Su textura exterior es rústica, espolvoreada con cacao puro, mientras que su interior es una ganache sedosa que se funde instantáneamente en el paladar.',
    ingredients: ['Cacao 60%', 'Café Andino', 'Crema de Leche', 'Mantequilla', 'Cacao en Polvo'],
    weight: '150g (Caja de 12 unidades)',
    price: '$24.00',
    image: productImage(
      'trufas-aterciopeladas',
      'Trufas de chocolate espolvoreadas con cacao y trocitos de frutos secos',
      [960, 640],
    ),
  },
  {
    id: 3,
    slug: 'tableta-chuao',
    name: 'Tableta Origen Chuao',
    description:
      'Para los puristas. Una experiencia sensorial profunda con notas a frutos rojos y madera, elaborada con el cacao más codiciado del planeta.',
    longDescription:
      'El valle de Chuao es legendario por producir el mejor cacao del mundo. Esta tableta rinde homenaje a ese terruño excepcional. Elaborada únicamente con granos de Chuao, tostados ligeramente para preservar sus notas naturales a frutos rojos, ciruelas pasas y un final sutilmente amaderado. Una experiencia de cata obligatoria.',
    ingredients: ['Cacao de Chuao 75%', 'Azúcar de Caña', 'Manteca de Cacao'],
    weight: '80g',
    price: '$14.00',
    badge: 'Origen único',
    image: productImage(
      'tableta-chuao',
      'Tableta de chocolate oscuro origen Chuao con granos de cacao venezolano',
      [1600, 800],
    ),
  },
  {
    id: 4,
    slug: 'marquesa',
    name: 'La Marquesa de la Casa',
    description:
      'Nuestro homenaje al postre rey de Venezuela. Capas infinitas de galleta bañadas en una crema de chocolate sedosa, intensa y adictiva.',
    longDescription:
      'La Marquesa es el postre de las celebraciones venezolanas. Nuestra versión eleva la receta tradicional utilizando un pudín de chocolate oscuro de origen único, intercalado con galletas tipo María empapadas ligeramente en leche y un toque de vainilla. Decorada con lluvia de chocolate y trozos de almendras tostadas.',
    ingredients: [
      'Chocolate Oscuro 60%',
      'Galletas María',
      'Leche Condensada',
      'Leche Evaporada',
      'Vainilla',
      'Almendras',
    ],
    weight: '1.2 kg (8-10 porciones)',
    price: '$35.00',
    image: productImage(
      'marquesa',
      'Marquesa de chocolate, postre tradicional venezolano',
      [1600, 800],
    ),
  },
];
