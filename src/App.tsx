import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Leaf, ShoppingBag, Phone, MapPin, Clock, MessageCircle, ArrowRight, Menu, X } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-cream-50 text-cacao-900 selection:bg-leaf-800 selection:text-cream-50">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <History />
        <OrderProcess />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cacao-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-leaf-800" aria-hidden="true" />
          <span className="font-serif text-2xl font-bold text-cacao-900">Cacaoliva</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-cacao-800">
          <a href="#products" className="hover:text-leaf-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded px-2 py-1">Productos</a>
          <a href="#history" className="hover:text-leaf-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded px-2 py-1">Nuestra Historia</a>
          <a href="#order" className="hover:text-leaf-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded px-2 py-1">Cómo Ordenar</a>
        </div>
        <a href="#order" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-cacao-900 text-cream-50 rounded-full text-sm font-medium hover:bg-cacao-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cacao-900">
          Ordenar Ahora
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-cacao-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf-800 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Alternar menú de navegación"
        >
          {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-50 border-b border-cacao-900/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <a href="#products" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-cacao-800 hover:bg-cream-100 rounded-md">Productos</a>
              <a href="#history" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-cacao-800 hover:bg-cream-100 rounded-md">Nuestra Historia</a>
              <a href="#order" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-cacao-800 hover:bg-cream-100 rounded-md">Cómo Ordenar</a>
              <a href="#order" onClick={() => setIsOpen(false)} className="inline-flex items-center justify-center px-6 py-3 mt-4 bg-cacao-900 text-cream-50 rounded-full text-base font-medium hover:bg-cacao-800 transition-colors w-full">
                Ordenar Ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Particle({ p, mouseX, mouseY }: { p: any, mouseX: any, mouseY: any }) {
  const xOffset = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-30 * p.depth, 30 * p.depth]);
  const yOffset = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-30 * p.depth, 30 * p.depth]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x: xOffset, y: yOffset }}
    >
      <motion.div
        className="absolute top-[-10%] rounded-full bg-cacao-800/50 blur-[1px]"
        style={{
          left: `${p.x}%`,
          width: p.size,
          height: p.size * 1.5,
          borderRadius: '40% 60% 50% 50%',
        }}
        animate={{
          y: ['0vh', '120vh'],
          rotate: [p.rotation, p.rotation + 360],
          x: [0, Math.random() * 50 - 25]
        }}
        transition={{
          y: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' },
          rotate: { duration: p.duration * 0.8, repeat: Infinity, ease: 'linear' },
          x: { duration: p.duration * 0.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
        }}
      />
    </motion.div>
  );
}

function CacaoParticles({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * -20, // Negative delay so they are already falling
      duration: 15 + Math.random() * 20,
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
      depth: 0.5 + Math.random() * 1.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {particles.map((p) => (
        <Particle key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-cacao-900"
      onMouseMove={handleMouseMove}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img 
          src="https://images.unsplash.com/photo-1542843137-87f1883389f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=75&fm=webp" 
          alt="" 
          role="presentation"
          fetchPriority="high"
          className="w-full h-[120%] object-cover -top-[10%] relative"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cacao-900/80 via-cacao-900/60 to-cacao-900/90" />
      </motion.div>
      
      <CacaoParticles mouseX={mouseXSpring} mouseY={mouseYSpring} />
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-leaf-800/80 text-cream-50 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-leaf-600/50">
            100% Herencia Venezolana
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-cream-50 mb-6 leading-tight">
            El Alma de Venezuela, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Fundida en Chocolate</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cream-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2">
            Despierta tus sentidos con el aroma profundo y la textura aterciopelada del mejor cacao del mundo. Pastelería artesanal creada para derretirse en tu paladar y acariciar tu memoria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            <a href="#products" className="w-full sm:w-auto px-8 py-4 bg-leaf-800 text-cream-50 rounded-full font-medium hover:bg-leaf-900 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cacao-900 focus-visible:ring-leaf-600">
              Probar la Magia <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href="#history" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-cream-50/30 text-cream-50 rounded-full font-medium hover:bg-cream-50/10 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cacao-900 focus-visible:ring-cream-50">
              Conoce Nuestra Esencia
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const products = [
  {
    id: 1,
    name: "Bombones de Autor",
    description: "Pequeñas joyas de chocolate oscuro al 70%, rellenas con ganache de parchita y un toque de ron añejo. Un estallido tropical en cada bocado.",
    longDescription: "Nuestros bombones de autor son el resultado de años de perfeccionamiento. Cada pieza es moldeada a mano y pintada con manteca de cacao coloreada. El relleno es una emulsión perfecta de chocolate oscuro, jugo de parchita fresca y ron añejo venezolano de primera calidad, logrando un equilibrio perfecto entre acidez, dulzor y el carácter robusto del cacao.",
    ingredients: ["Cacao 70%", "Parchita", "Ron Añejo", "Manteca de Cacao", "Azúcar de Caña"],
    weight: "120g (Caja de 9 unidades)",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp",
    alt: "Bombones de autor de chocolate oscuro venezolano rellenos de parchita"
  },
  {
    id: 2,
    name: "Trufas Aterciopeladas",
    description: "Esferas de cacao puro espolvoreadas a mano, que esconden un corazón cremoso con notas del mejor café andino. Suavidad que acaricia el alma.",
    longDescription: "Inspiradas en las mañanas frías de los Andes venezolanos, estas trufas combinan la intensidad del cacao con el aroma inconfundible del café recién tostado. Su textura exterior es rústica, espolvoreada con cacao puro, mientras que su interior es una ganache sedosa que se funde instantáneamente en el paladar.",
    ingredients: ["Cacao 60%", "Café Andino", "Crema de Leche", "Mantequilla", "Cacao en Polvo"],
    weight: "150g (Caja de 12 unidades)",
    price: "$24.00",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp",
    alt: "Trufas artesanales de cacao venezolano con café andino"
  },
  {
    id: 3,
    name: "Tableta Origen Chuao",
    description: "Para los puristas. Una experiencia sensorial profunda con notas a frutos rojos y madera, elaborada con el cacao más codiciado del planeta.",
    longDescription: "El valle de Chuao es legendario por producir el mejor cacao del mundo. Esta tableta rinde homenaje a ese terruño excepcional. Elaborada únicamente con granos de Chuao, tostados ligeramente para preservar sus notas naturales a frutos rojos, ciruelas pasas y un final sutilmente amaderado. Una experiencia de cata obligatoria.",
    ingredients: ["Cacao de Chuao 75%", "Azúcar de Caña", "Manteca de Cacao"],
    weight: "80g",
    price: "$14.00",
    image: "https://images.unsplash.com/photo-1511381939415-e440c05217e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp",
    alt: "Tableta de chocolate oscuro origen Chuao, cacao venezolano"
  },
  {
    id: 4,
    name: "La Marquesa de la Casa",
    description: "Nuestro homenaje al postre rey de Venezuela. Capas infinitas de galleta bañadas en una crema de chocolate sedosa, intensa y adictiva.",
    longDescription: "La Marquesa es el postre de las celebraciones venezolanas. Nuestra versión eleva la receta tradicional utilizando un pudín de chocolate oscuro de origen único, intercalado con galletas tipo María empapadas ligeramente en leche y un toque de vainilla. Decorada con lluvia de chocolate y trozos de almendras tostadas.",
    ingredients: ["Chocolate Oscuro 60%", "Galletas María", "Leche Condensada", "Leche Evaporada", "Vainilla", "Almendras"],
    weight: "1.2 kg (8-10 porciones)",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp",
    alt: "Marquesa de chocolate, postre tradicional venezolano"
  }
];

function ProductModal({ product, onClose }: { product: any, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-cacao-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-cream-50 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={product.image} 
            alt={product.alt || product.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 md:hidden w-10 h-10 bg-cream-50/80 backdrop-blur-md rounded-full flex items-center justify-center text-cacao-900"
            aria-label="Cerrar detalles del producto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-3xl font-serif font-bold text-cacao-900 mb-2">{product.name}</h3>
              <span className="inline-block px-4 py-1.5 bg-leaf-800/10 text-leaf-800 rounded-full text-sm font-bold mb-4">
                {product.price}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="hidden md:flex w-10 h-10 bg-cream-100 hover:bg-cream-200 rounded-full items-center justify-center text-cacao-900 transition-colors"
              aria-label="Cerrar detalles del producto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-cacao-800 text-lg mb-6 leading-relaxed">
            {product.longDescription || product.description}
          </p>
          
          {product.ingredients && (
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cacao-600 mb-3">Ingredientes</h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-cream-100 text-cacao-800 rounded-md text-sm font-medium border border-cream-50/50">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {product.weight && (
            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-cacao-600 mb-1">Presentación</h4>
              <p className="text-cacao-800 font-medium">{product.weight}</p>
            </div>
          )}
          
          <a 
            href={`https://wa.me/1234567890?text=Hola, me gustaría ordenar: ${product.name}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-leaf-800 text-cream-50 rounded-xl font-bold text-lg hover:bg-leaf-900 transition-colors shadow-lg shadow-leaf-800/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-leaf-800"
          >
            <ShoppingBag className="w-5 h-5" />
            Añadir al Pedido
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Products() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <section id="products" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-leaf-800 mb-3">Nuestras Creaciones</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900">Ofertas Artesanales</h3>
          <div className="w-24 h-1 bg-leaf-800 mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedProduct(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProduct(product);
                }
              }}
              aria-label={`Ver detalles de ${product.name}`}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                <img 
                  src={product.image} 
                  alt={product.alt || product.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-cacao-900/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="bg-cream-50 text-cacao-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {product.price}
                  </span>
                  <div className="w-10 h-10 bg-leaf-800 text-cream-50 rounded-full flex items-center justify-center shadow-lg hover:bg-leaf-900 transition-colors transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold text-cacao-900 mb-2">{product.name}</h4>
              <p className="text-cacao-600 text-sm leading-relaxed flex-grow">{product.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function History() {
  return (
    <section id="history" className="py-24 bg-cacao-900 text-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1604514628550-37477afdf4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=75&fm=webp" 
                alt="Mazorcas de cacao venezolano fresco en el árbol, origen del mejor chocolate" 
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-leaf-800 rounded-full flex items-center justify-center p-8 text-center border-8 border-cacao-900 hidden md:flex">
              <span className="font-serif italic text-xl">Desde el<br/>Siglo XVI</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest uppercase text-leaf-600 mb-3">El Legado de Nuestra Tierra</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Un Viaje a las Raíces del Sabor</h3>
            
            <div className="space-y-6 text-cream-100/80 font-light text-lg leading-relaxed">
              <p>
                El cacao venezolano no es solo un ingrediente; es el latido de nuestra tierra. Nacido entre selvas húmedas, montañas imponentes y costas cálidas, nuestro "Cacao Fino de Aroma" lleva siglos seduciendo a los paladares más exigentes del mundo con su complejidad y elegancia inigualables.
              </p>
              <p>
                En Cacaoliva, cada creación es un tributo a ese legado ancestral. Transformamos con reverencia los granos cosechados por manos campesinas expertas, cuidando cada detalle del proceso artesanal.
              </p>
              <p>
                Queremos que al probar nuestros dulces, sientas el orgullo de nuestra cultura, el calor de nuestra gente y la magia pura de Venezuela en cada bocado.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-cream-50/10 pt-10">
              <div>
                <h4 className="text-3xl font-serif font-bold text-amber-400 mb-2">100%</h4>
                <p className="text-sm text-cream-100/60 uppercase tracking-wider">Granos Venezolanos</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold text-amber-400 mb-2">Artesanal</h4>
                <p className="text-sm text-cream-100/60 uppercase tracking-wider">Proceso Hecho a Mano</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OrderProcess() {
  return (
    <section id="order" className="py-24 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-leaf-800 mb-3">Un Antojo a un Clic de Distancia</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-cacao-900">Cómo Hacer tu Pedido</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-cacao-900/10 z-0"></div>
          
          {[
            {
              step: "01",
              title: "Déjate Tentar",
              description: "Explora nuestras creaciones y elige esos sabores que ya te hacen agua la boca."
            },
            {
              step: "02",
              title: "Escríbenos",
              description: "Haz clic en el botón de WhatsApp. Te atenderemos personalmente para tomar tu pedido con todo el cariño que mereces."
            },
            {
              step: "03",
              title: "Saborea el Momento",
              description: "Preparamos tu orden fresca y te la entregamos lista para que vivas una experiencia inolvidable."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-cream-50 border-4 border-cream-100 shadow-xl flex items-center justify-center mb-6">
                <span className="text-3xl font-serif font-bold text-leaf-800">{item.step}</span>
              </div>
              <h4 className="text-xl font-bold text-cacao-900 mb-3">{item.title}</h4>
              <p className="text-cacao-600 max-w-xs">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 bg-cacao-900 rounded-3xl p-8 md:p-12 text-center text-cream-50 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cacao-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0zm0 2c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18S29.941 2 20 2z" fill="currentColor" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#cacao-pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">¿Sientes el aroma a cacao recién tostado?</h3>
            <p className="text-lg text-cream-100/80 mb-8 max-w-2xl mx-auto">
              Cada uno de nuestros postres se elabora bajo pedido para garantizar su frescura absoluta. Escríbenos ahora y permítenos endulzar tu día con el verdadero sabor de Venezuela.
            </p>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] w-full sm:w-auto"
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

function Footer() {
  return (
    <footer className="bg-cacao-900 text-cream-50/60 py-12 border-t border-cream-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-leaf-600" />
              <span className="font-serif text-xl font-bold text-cream-50">Cacaoliva</span>
            </div>
            <p className="text-sm max-w-xs">
              Llevando el auténtico sabor del cacao venezolano a tu mesa a través de la artesanía.
            </p>
          </div>
          <div>
            <h4 className="text-cream-50 font-bold mb-4 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +58 (412) 123-4567</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Caracas, Venezuela</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Lun-Sáb: 9am - 6pm</li>
            </ul>
          </div>
          <div>
            <h4 className="text-cream-50 font-bold mb-4 uppercase tracking-wider text-sm">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cream-50 transition-colors">Instagram</a>
              <a href="#" className="hover:text-cream-50 transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs pt-8 border-t border-cream-50/10">
          &copy; {new Date().getFullYear()} Cacaoliva. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#20bd5a]"
      aria-label="Contáctanos por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
