import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';

const FAQS = [
  {
    question: '¿Cómo hago mi pedido?',
    answer:
      'Todos nuestros pedidos se coordinan por WhatsApp. Escríbenos con los productos que te antojan y te confirmamos disponibilidad, precio y forma de pago en minutos.',
  },
  {
    question: '¿Hacen entregas a domicilio?',
    answer:
      'Sí. Coordinamos delivery en Caracas y zonas cercanas. Para el interior del país enviamos con embalaje térmico para que el chocolate llegue en perfectas condiciones. La tarifa depende de tu ubicación.',
  },
  {
    question: '¿Con cuánta anticipación debo pedir?',
    answer:
      'Cada creación se elabora bajo pedido. Recomendamos pedir con al menos 48 horas de anticipación; para tortas y marquesas grandes, 72 horas.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos Pago Móvil, transferencia bancaria, Zelle y efectivo en divisas. Te indicamos los datos al confirmar tu pedido.',
  },
  {
    question: '¿Tienen opciones sin azúcar o veganas?',
    answer:
      'Trabajamos con chocolate oscuro de origen, que naturalmente contiene menos azúcar. Cuéntanos tus necesidades al escribirnos y te proponemos la mejor opción disponible.',
  },
  {
    question: '¿Los productos contienen alérgenos?',
    answer:
      'Nuestras preparaciones pueden contener leche, frutos secos y gluten. Si tienes alguna alergia, avísanos antes de ordenar para orientarte con cuidado.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 bg-cream-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-leaf-800 mb-3">
            Resolvemos tus Dudas
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900">
            Preguntas Frecuentes
          </h2>
          <div className="w-24 h-1 bg-leaf-800 mx-auto mt-6 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.05}>
              <details className="group bg-cream-50 rounded-2xl border border-cacao-900/5 shadow-sm overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-cacao-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded-2xl">
                  {faq.question}
                  <ChevronDown
                    className="w-5 h-5 shrink-0 text-leaf-800 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-6 text-cacao-800 leading-relaxed">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
