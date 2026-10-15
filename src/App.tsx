import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { History } from './components/History';
import { Testimonials } from './components/Testimonials';
import { Faq } from './components/Faq';
import { OrderProcess } from './components/OrderProcess';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-cream-50 text-cacao-900 selection:bg-leaf-800 selection:text-cream-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-3 focus:bg-cacao-900 focus:text-cream-50 focus:rounded-full focus:font-medium focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Products />
        <History />
        <Testimonials />
        <Faq />
        <OrderProcess />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
