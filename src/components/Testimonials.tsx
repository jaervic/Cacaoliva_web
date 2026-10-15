import { Star } from 'lucide-react';
import { Reveal } from './Reveal';

const TESTIMONIALS = [
  {
    name: 'María Fernanda R.',
    location: 'Caracas',
    quote:
      'Los bombones de parchita son de otro planeta. Se nota el cuidado artesanal y el cacao es intenso, nada empalagoso. Ya son mi regalo favorito.',
  },
  {
    name: 'Alejandro P.',
    location: 'Valencia',
    quote:
      'Pedí la marquesa para un cumpleaños y desapareció en minutos. La atención por WhatsApp fue rápida y muy atenta. Repetiremos seguro.',
  },
  {
    name: 'Gabriela M.',
    location: 'Maracaibo',
    quote:
      'La tableta de Chuao me transportó a mi infancia. Un chocolate fino, con notas frutales que no había probado antes. Calidad de exportación.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-leaf-800 mb-3">
            Lo Que Dicen Nuestros Clientes
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900">
            Historias que Saben a Cacao
          </h2>
          <div className="w-24 h-1 bg-leaf-800 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.12} className="h-full">
              <figure className="h-full flex flex-col bg-cream-100 rounded-2xl p-8 border border-cacao-900/5 shadow-sm">
                <div className="flex gap-1 mb-5 text-amber-400" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="w-5 h-5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-cacao-800 leading-relaxed flex-grow">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-cacao-900/10">
                  <span className="block font-bold text-cacao-900">{testimonial.name}</span>
                  <span className="block text-sm text-cacao-600">{testimonial.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
