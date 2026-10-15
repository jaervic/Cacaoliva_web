import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos. */
  delay?: number;
  /** Desplazamiento horizontal inicial (px). */
  x?: number;
  /** Desplazamiento vertical inicial (px). */
  y?: number;
}

/**
 * Envoltorio de aparición al hacer scroll. Se desactiva si el usuario
 * prefiere movimiento reducido.
 */
export function Reveal({ children, className, delay = 0, x = 0, y = 24 }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
