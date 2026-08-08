import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, TrendingUp, BarChart3, Medal, Calendar, Award } from 'lucide-react';

const matricResults = [
  { year: '2024', pass: 87.5, note: 'National Senior Certificate pass rate.' },
  { year: '2023', pass: 91.3, note: 'Highest recent recorded pass rate.' },
];

const awardImages = [
  { src: '/Gallery/gallery2.jpg', alt: 'Academic awards with staff and learners' },
  { src: '/Gallery/gallery3.jpg', alt: 'Group of learners receiving certificates' },
];

export const Achievements = () => {
  const [activeYear, setActiveYear] = useState(matricResults[0].year);
  const current = matricResults.find(r => r.year === activeYear) || matricResults[0];

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center mb-16">Academic Excellence</h1>

        {/* Historic milestone */}
        <section className="mb-24">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Star size={200} className="text-yellow-600" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-40 h-40 bg-school-primary rounded-full flex flex-col items-center justify-center text-white border-8 border-white shadow-lg shrink-0">
                <span className="text-3xl font-black">91.3%</span>
                <span className="text-xs font-bold uppercase tracking-tighter italic text-center leading-tight mt-1">2023 Matric<br/>Pass Rate</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-school-primary font-bold uppercase tracking-widest text-sm mb-2">
                  <Star size={16} fill="currentColor" /> Recent Highlight <Star size={16} fill="currentColor" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-school-primary mb-4">
                  2023: 91.3% Pass Rate
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl italic leading-relaxed">
                  "Harding Secondary School continues to strive for strong academic outcomes. Our 2023 National Senior Certificate pass rate of 91.3% reflects the dedication of our learners and educators."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards gallery */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-school-primary mb-4 flex items-center justify-center gap-4">
              <Trophy className="text-yellow-500 w-12 h-12" />
              Awards & Recognition
              <Trophy className="text-yellow-500 w-12 h-12" />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating learner achievements at Harding Secondary School.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {awardImages.map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="rounded-2xl overflow-hidden shadow-xl border border-gray-100"
              >
                <img src={img.src} alt={img.alt} className="w-full h-72 object-cover" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Matric results summary */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-school-primary flex items-center gap-3">
              <BarChart3 className="text-school-primary" /> Matric Results Summary
            </h2>
            <div className="flex gap-2 mt-4 md:mt-0 bg-gray-100 p-1 rounded-xl">
              {matricResults.map(r => (
                <button
                  key={r.year}
                  onClick={() => setActiveYear(r.year)}
                  className={`px-6 py-2 rounded-lg font-bold transition-all ${activeYear === r.year ? 'bg-school-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {r.year}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-school-primary rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-12">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                  <TrendingUp size={200} />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 justify-center md:justify-start">
                    <Star className="text-yellow-400" /> {current.year} Performance Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-5xl md:text-7xl font-bold mb-2">{current.pass}%</p>
                      <p className="text-green-100 text-sm font-medium uppercase tracking-wider">Overall Pass Rate</p>
                    </div>
                    <div>
                      <p className="text-lg text-green-100 leading-relaxed">{current.note}</p>
                      <p className="mt-4 text-sm text-white/70">Detailed subject breakdowns and bachelors/distinctions data will be added once the official records are available.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Top achievers call to action */}
        <section className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-school-primary">
            <Calendar className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Top Achievers</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Official top achiever records and names will be added to the Hall of Fame once verified by the school. We look forward to celebrating the outstanding learners of Harding Secondary School.
          </p>
        </section>

      </div>
    </div>
  );
};
