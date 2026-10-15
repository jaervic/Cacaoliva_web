import type { MouseEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CacaoParticles } from './CacaoParticles';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  const mouseXSpring = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(mouseY, { damping: 25, stiffness: 150 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-cacao-900"
      onMouseMove={reduced ? undefined : handleMouseMove}
    >
      <motion.div className="absolute inset-0 z-0" style={reduced ? undefined : { y }}>
        <img
          src="/images/hero-1280.webp"
          srcSet="/images/hero-800.webp 800w, /images/hero-1280.webp 1280w, /images/hero-1920.webp 1920w"
          sizes="100vw"
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="w-full h-[120%] object-cover -top-[10%] relative"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cacao-900/80 via-cacao-900/60 to-cacao-900/90" />
      </motion.div>

      {!reduced && <CacaoParticles mouseX={mouseXSpring} mouseY={mouseYSpring} />}

      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-16">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-leaf-800/80 text-cream-50 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-leaf-600/50">
            100% Herencia Venezolana
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-cream-50 mb-6 leading-tight">
            El Alma de Venezuela, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">
              Fundida en Chocolate
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cream-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Despierta tus sentidos con el aroma profundo y la textura aterciopelada del mejor cacao
            del mundo. Pastelería artesanal creada para derretirse en tu paladar y acariciar tu
            memoria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            <a
              href="#products"
              className="w-full sm:w-auto px-8 py-4 bg-leaf-800 text-cream-50 rounded-full font-medium hover:bg-leaf-900 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cacao-900 focus-visible:ring-leaf-600"
            >
              Probar la Magia
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#history"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-cream-50/30 text-cream-50 rounded-full font-medium hover:bg-cream-50/10 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cacao-900 focus-visible:ring-cream-50"
            >
              Conoce Nuestra Esencia
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
