import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SITE } from '../config';

const NAV_LINKS = [
  { href: '#products', label: 'Productos' },
  { href: '#history', label: 'Nuestra Historia' },
  { href: '#faq', label: 'Preguntas' },
  { href: '#order', label: 'Cómo Ordenar' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Cierra el menú móvil con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cacao-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800"
          aria-label={`${SITE.name} — ir al inicio`}
        >
          <img
            src="/images/logo-mark.png"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            aria-hidden="true"
          />
          <span className="font-serif text-2xl font-bold text-cacao-900">{SITE.name}</span>
        </a>

        {/* Menú de escritorio */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-cacao-800">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-leaf-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded px-2 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a
          href="#order"
          className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-cacao-900 text-cream-50 rounded-full text-sm font-medium hover:bg-cacao-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cacao-900"
        >
          Ordenar Ahora
        </a>

        {/* Botón de menú móvil */}
        <button
          type="button"
          className="md:hidden p-2 text-cacao-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded-md"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Alternar menú de navegación"
        >
          {isOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-50 border-b border-cacao-900/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-cacao-800 hover:bg-cream-100 rounded-md"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 mt-4 bg-cacao-900 text-cream-50 rounded-full text-base font-medium hover:bg-cacao-800 transition-colors w-full"
              >
                Ordenar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
