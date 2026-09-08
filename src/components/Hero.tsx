import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { url: '/Hero/hero1.jpg', caption: 'Excellence in Education' },
  { url: '/Hero/hero2.jpg', caption: 'Empowering Students' },
  { url: '/Hero/hero3.jpg', caption: 'Nurturing Future Leaders' },
  { url: '/Hero/hero4.jpg', caption: 'Building Brighter Futures' },
  { url: '/Hero/hero5.jpg', caption: 'Harding Secondary Pride' },
];

const PRIMARY = '#0B7C5C';
const ACCENT = '#F5C518';

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentIndex];

  return (
    <div className="relative h-[650px] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.url}
            alt={slide.caption}
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-x-0 top-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0))' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Top: school name + crest */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center text-center pt-6 md:pt-8 px-4 z-10 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs md:text-sm font-bold uppercase tracking-[0.35em] mb-3 whitespace-nowrap"
          style={{ color: ACCENT, textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
        >
          Harding Secondary School
        </motion.h1>
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          src="/Logo/logo.png"
          alt="Harding Secondary School crest"
          className="w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover shadow-2xl bg-white"
          style={{ border: `2px solid ${ACCENT}` }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Bottom: caption + buttons */}
      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center px-4 z-20 gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-xs md:text-sm font-medium tracking-widest uppercase"
            style={{ color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
          >
            {slide.caption}
          </motion.p>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="flex gap-3 flex-wrap justify-center"
        >
          <a
            href="/admissions"
            className="px-4 py-1.5 text-sm font-bold transition-all rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: ACCENT, color: PRIMARY }}
          >
            Admissions
          </a>
          <a
            href="/about"
            className="px-4 py-1.5 text-sm font-bold transition-all rounded-md hover:-translate-y-0.5"
            style={{ border: `2px solid ${ACCENT}`, color: ACCENT, background: 'rgba(0,0,0,0.35)' }}
          >
            About Us
          </a>
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-all hover:scale-110"
        style={{ background: 'rgba(0,0,0,0.35)', color: ACCENT }}
        aria-label="Previous"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-all hover:scale-110"
        style={{ background: 'rgba(0,0,0,0.35)', color: ACCENT }}
        aria-label="Next"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 flex-wrap justify-center max-w-xs">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="h-2 w-2 rounded-full transition-all"
            style={{ background: i === currentIndex ? ACCENT : 'rgba(245,197,24,0.3)' }}
          />
        ))}
      </div>
    </div>
  );
};
