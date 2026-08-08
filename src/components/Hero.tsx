import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SportResultBoard } from './SportResultBoard';

const slides = [
  {
    url: "/Hero/hero1.jpg",
    caption: "Excellence in Education"
  },
  {
    url: "/Hero/hero2.jpg",
    caption: "Empowering Students"
  },
  {
    url: "/Hero/hero3.jpg",
    caption: "Nurturing Future Leaders"
  },
  {
    url: "/Hero/hero4.jpg",
    caption: "Building Brighter Futures"
  },
  {
    url: "/Hero/hero5.jpg",
    caption: "Harding Secondary Pride"
  },
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[650px] w-full overflow-hidden bg-school-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].url}
            alt={slides[currentIndex].caption}
            className="h-full w-full object-cover object-center opacity-40"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute bottom-20 left-0 right-0 text-center z-20">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              key={`caption-${currentIndex}`}
              className="text-white/80 text-lg md:text-xl font-medium tracking-wide uppercase"
            >
              {slides[currentIndex].caption}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-12">
        {/* Left: School Name */}
        <div className="flex flex-col items-start text-left text-white max-w-xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4 uppercase leading-tight"
          >
            Harding Secondary School
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-light italic mb-2"
          >
            "Porro Pergite — Ever Forward"
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-green-100 font-medium tracking-widest uppercase"
          >
            KwaZulu-Natal | Kirk Street, Harding
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex gap-4"
          >
            <Link to="/admissions" className="btn-primary bg-white text-school-primary hover:bg-gray-100">
              Admissions 2027
            </Link>
            <Link to="/about" className="btn-primary border-2 border-white bg-transparent hover:bg-white/10">
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Right: Sport Result Board */}
        <div className="hidden lg:block">
          <SportResultBoard />
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-30">
        <ChevronLeft size={32} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-30">
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`h-2 w-2 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};
