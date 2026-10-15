import { useEffect, useId, useRef } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';
import { whatsappProductLink } from '../config';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Mueve el foco al diálogo (el contenedor es focusable con tabIndex={-1})
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      // Atrapa el foco dentro del diálogo
      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-cacao-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-cream-50 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl focus:outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
          <img
            src={product.image.src}
            srcSet={product.image.srcSet}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt={product.image.alt}
            width={800}
            height={1000}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 md:hidden w-10 h-10 bg-cream-50/80 backdrop-blur-md rounded-full flex items-center justify-center text-cacao-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cacao-900"
            aria-label="Cerrar detalles del producto"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto min-h-0">
          <div className="flex justify-between items-start mb-4 gap-4">
            <div>
              <h2 id={titleId} className="text-3xl font-serif font-bold text-cacao-900 mb-2">
                {product.name}
              </h2>
              <span className="inline-block px-4 py-1.5 bg-leaf-800/10 text-leaf-900 rounded-full text-sm font-bold mb-4">
                {product.price}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="hidden md:flex w-10 h-10 shrink-0 bg-cream-100 hover:bg-cream-200 rounded-full items-center justify-center text-cacao-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cacao-900"
              aria-label="Cerrar detalles del producto"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <p className="text-cacao-800 text-lg mb-6 leading-relaxed">
            {product.longDescription}
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cacao-600 mb-3">
              Ingredientes
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-3 py-1 bg-cream-100 text-cacao-800 rounded-md text-sm font-medium border border-cream-50/50"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cacao-600 mb-1">
              Presentación
            </h3>
            <p className="text-cacao-800 font-medium">{product.weight}</p>
          </div>

          <a
            href={whatsappProductLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-leaf-800 text-cream-50 rounded-xl font-bold text-lg hover:bg-leaf-900 transition-colors shadow-lg shadow-leaf-800/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-leaf-800"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            Pedir por WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
