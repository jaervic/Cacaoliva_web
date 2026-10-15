import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { ProductModal } from './ProductModal';
import { Reveal } from './Reveal';
import type { Product } from '../types';

export function Products() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section id="products" className="scroll-mt-24 py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-leaf-800 mb-3">
            Nuestras Creaciones
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900">
            Ofertas Artesanales
          </h2>
          <div className="w-24 h-1 bg-leaf-800 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.1} className="h-full">
              <article className="group h-full flex flex-col">
                <button
                  type="button"
                  onClick={() => setSelected(product)}
                  className="text-left w-full h-full flex flex-col rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-leaf-800"
                  aria-label={`Ver detalles de ${product.name}`}
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 bg-cream-100">
                    <img
                      src={product.image.src}
                      srcSet={product.image.srcSet}
                      sizes={product.image.sizes}
                      alt={product.image.alt}
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-cacao-900/20 group-hover:bg-transparent transition-colors duration-500" />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-amber-400 text-cacao-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="bg-cream-50 text-cacao-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {product.price}
                      </span>
                      <span className="w-10 h-10 bg-leaf-800 text-cream-50 rounded-full flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-cacao-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-cacao-600 text-sm leading-relaxed">{product.description}</p>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
