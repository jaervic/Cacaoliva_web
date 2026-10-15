import { Reveal } from './Reveal';

const STATS = [
  { value: '100%', label: 'Granos Venezolanos' },
  { value: 'Artesanal', label: 'Proceso Hecho a Mano' },
];

export function History() {
  return (
    <section id="history" className="scroll-mt-24 py-24 bg-cacao-900 text-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal x={-30} y={0} className="relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden">
              <img
                src="/images/historia-640.webp"
                srcSet="/images/historia-640.webp 640w, /images/historia-960.webp 960w"
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt="Mazorcas de cacao de distintos colores madurando en el tronco del árbol"
                width={960}
                height={1440}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-leaf-800 rounded-full items-center justify-center p-8 text-center border-8 border-cacao-900 hidden md:flex">
              <span className="font-serif italic text-xl">
                Desde el
                <br />
                Siglo XVI
              </span>
            </div>
          </Reveal>

          <Reveal x={30} y={0}>
            <p className="text-sm font-bold tracking-widest uppercase text-amber-400 mb-3">
              El Legado de Nuestra Tierra
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Un Viaje a las Raíces del Sabor
            </h2>

            <div className="space-y-6 text-cream-100/80 font-light text-lg leading-relaxed">
              <p>
                El cacao venezolano no es solo un ingrediente; es el latido de nuestra tierra.
                Nacido entre selvas húmedas, montañas imponentes y costas cálidas, nuestro "Cacao
                Fino de Aroma" lleva siglos seduciendo a los paladares más exigentes del mundo con
                su complejidad y elegancia inigualables.
              </p>
              <p>
                En Cacaoliva, cada creación es un tributo a ese legado ancestral. Transformamos con
                reverencia los granos cosechados por manos campesinas expertas, cuidando cada
                detalle del proceso artesanal.
              </p>
              <p>
                Queremos que al probar nuestros dulces, sientas el orgullo de nuestra cultura, el
                calor de nuestra gente y la magia pura de Venezuela en cada bocado.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream-50/10 pt-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-2">
                  <dt className="text-sm text-cream-100/60 uppercase tracking-wider">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-serif font-bold text-amber-400">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
