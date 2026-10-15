import { CreditCard, MapPin, MessageCircle, Truck } from 'lucide-react';
import { whatsappLink } from '../config';
import { Reveal } from './Reveal';

const STEPS = [
  {
    step: '01',
    title: 'Déjate Tentar',
    description: 'Explora nuestras creaciones y elige esos sabores que ya te hacen agua la boca.',
  },
  {
    step: '02',
    title: 'Escríbenos',
    description:
      'Haz clic en el botón de WhatsApp. Te atenderemos personalmente para tomar tu pedido con todo el cariño que mereces.',
  },
  {
    step: '03',
    title: 'Saborea el Momento',
    description:
      'Preparamos tu orden fresca y te la entregamos lista para que vivas una experiencia inolvidable.',
  },
];

const DETAILS = [
  {
    icon: Truck,
    title: 'Delivery y envíos',
    text: 'Entregas en Caracas y envíos al interior del país con embalaje térmico.',
  },
  {
    icon: CreditCard,
    title: 'Métodos de pago',
    text: 'Pago Móvil, transferencia, Zelle o efectivo en divisas.',
  },
  {
    icon: MapPin,
    title: 'Pedidos con anticipación',
    text: 'Elaboramos bajo pedido: 48h de anticipación (72h para piezas grandes).',
  },
];

export function OrderProcess() {
  return (
    <section id="order" className="scroll-mt-24 py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-leaf-800 mb-3">
            Un Antojo a un Clic de Distancia
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900">
            Cómo Hacer tu Pedido
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-cacao-900/10 z-0" />

          {STEPS.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.15}>
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 rounded-full bg-cream-50 border-4 border-cream-100 shadow-xl flex items-center justify-center mb-6">
                  <span className="text-3xl font-serif font-bold text-leaf-800">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-cacao-900 mb-3">{item.title}</h3>
                <p className="text-cacao-600 max-w-xs">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {DETAILS.map((detail) => (
            <div
              key={detail.title}
              className="flex items-start gap-3 bg-cream-50 rounded-2xl p-5 border border-cacao-900/5 shadow-sm"
            >
              <detail.icon className="w-6 h-6 text-leaf-800 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-cacao-900 text-sm mb-1">{detail.title}</h3>
                <p className="text-cacao-600 text-sm leading-relaxed">{detail.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-cacao-900 rounded-3xl p-8 md:p-12 text-center text-cream-50 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="cacao-pattern"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 2c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2z"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#cacao-pattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              ¿Sientes el aroma a cacao recién tostado?
            </h3>
            <p className="text-lg text-cream-100/80 mb-8 max-w-2xl mx-auto">
              Cada uno de nuestros postres se elabora bajo pedido para garantizar su frescura
              absoluta. Escríbenos ahora y permítenos endulzar tu día con el verdadero sabor de
              Venezuela.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cacao-900 focus-visible:ring-[#25D366] w-full sm:w-auto"
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
              ¡Quiero mi pedido por WhatsApp!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
