import { useEffect, useState } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

interface ParticleData {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  depth: number;
  drift: number;
}

interface CacaoParticlesProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

function Particle({ data, mouseX, mouseY }: { data: ParticleData } & CacaoParticlesProps) {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const xOffset = useTransform(mouseX, [0, width], [-30 * data.depth, 30 * data.depth]);
  const yOffset = useTransform(mouseY, [0, height], [-30 * data.depth, 30 * data.depth]);

  return (
    <motion.div className="absolute inset-0" style={{ x: xOffset, y: yOffset }}>
      <motion.div
        className="absolute top-[-12%] rounded-full bg-cacao-800/50"
        style={{
          left: `${data.left}%`,
          width: data.size,
          height: data.size * 1.5,
          borderRadius: '40% 60% 50% 50%',
        }}
        animate={{
          y: ['0vh', '135vh'],
          rotate: [data.rotation, data.rotation + 360],
          x: [0, data.drift, 0],
        }}
        transition={{
          y: { duration: data.duration, repeat: Infinity, delay: data.delay, ease: 'linear' },
          rotate: { duration: data.duration * 0.8, repeat: Infinity, ease: 'linear' },
          x: { duration: data.duration * 0.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </motion.div>
  );
}

/**
 * Partículas de cacao a la deriva que reaccionan suavemente al cursor.
 * Se reduce el número en móvil y se desactiva por completo con
 * `prefers-reduced-motion`.
 */
export function CacaoParticles({ mouseX, mouseY }: CacaoParticlesProps) {
  const reduced = usePrefersReducedMotion();
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 7 : 16;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * -20,
        duration: 15 + Math.random() * 20,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
        depth: 0.5 + Math.random() * 1.5,
        drift: Math.random() * 50 - 25,
      })),
    );
  }, []);

  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {particles.map((particle) => (
        <Particle key={particle.id} data={particle} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}
