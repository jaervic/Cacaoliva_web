import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config';

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#20bd5a]"
      aria-label="Contáctanos por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
