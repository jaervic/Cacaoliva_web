import { Clock, Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { CONTACT, SITE } from '../config';

export function Footer() {
  return (
    <footer className="bg-cacao-900 text-cream-50/60 py-12 border-t border-cream-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo-mark.png"
                alt=""
                width={56}
                height={56}
                className="w-14 h-14 rounded-full"
                aria-hidden="true"
              />
              <span className="font-serif text-xl font-bold text-cream-50">{SITE.name}</span>
            </div>
            <p className="text-sm max-w-xs">
              Llevando el auténtico sabor del cacao venezolano a tu mesa a través de la artesanía.
            </p>
          </div>

          <div>
            <h2 className="text-cream-50 font-bold mb-4 uppercase tracking-wider text-sm">
              Contacto
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:+${CONTACT.whatsapp}`}
                  className="hover:text-cream-50 transition-colors"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                {CONTACT.address}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                {CONTACT.hours}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-cream-50 font-bold mb-4 uppercase tracking-wider text-sm">
              Síguenos
            </h2>
            <div className="flex gap-4 text-sm">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream-50 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                Instagram
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream-50 transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs pt-8 border-t border-cream-50/10">
          &copy; {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
