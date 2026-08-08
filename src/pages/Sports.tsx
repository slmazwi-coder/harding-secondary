import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Dumbbell, Shield, Medal } from 'lucide-react';
import { getSports, type Sport } from '../admin/utils/storage';

export const Sports = () => {
  const [sports, setSports] = useState<Sport[]>(getSports());
  const [activeSport, setActiveSport] = useState<string>(sports[0]?.id || '');

  useEffect(() => {
    setSports(getSports());
    if (sports.length > 0 && !activeSport) {
      setActiveSport(sports[0].id);
    }
  }, []);

  const currentSport = sports.find(s => s.id === activeSport);

  if (!currentSport) return null;

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">Sports Athletics</h1>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Harding Secondary School has a proud sporting tradition. Our sports codes are organized across various age groups, ensuring development from junior levels to the Senior Team.
        </p>

        {/* Sport Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sports.map((sport) => (
            <button
              key={sport.id}
              onClick={() => setActiveSport(sport.id)}
              className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                activeSport === sport.id
                  ? 'bg-school-primary text-white shadow-xl scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Dumbbell size={18} />
              {sport.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Sport Info */}
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 mb-16 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black text-school-primary mb-6 uppercase tracking-tighter">
                    {currentSport.name}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {currentSport.description}
                  </p>
                  
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-gray-800">
                    <Shield className="text-school-primary" /> Active Age Groups
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {currentSport.ageGroups.map((age, i) => (
                      <span key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-bold text-school-primary shadow-sm hover:border-school-primary transition-colors">
                        {age}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white flex items-center justify-center text-gray-400">
                  {currentSport.image ? (
                    <img src={currentSport.image} alt={currentSport.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center font-bold tracking-widest uppercase">
                      <Trophy size={64} className="mx-auto mb-4 opacity-50" />
                      {currentSport.name} Team
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Season fixtures placeholder */}
            <div className="bg-school-primary/5 rounded-2xl p-8 mb-16 border border-school-primary/20 text-center">
              <h3 className="text-xl font-bold text-school-primary mb-2 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500" /> Season Fixtures & Results
              </h3>
              <p className="text-gray-600 italic">Fixtures, team photos and league results will be published as the season progresses.</p>
            </div>

            {/* Hall of Fame for the specific sport */}
            <div className="mb-16 text-center">
              <h3 className="text-3xl font-black text-school-primary flex items-center justify-center gap-3 mb-4 uppercase tracking-tighter">
                <Star className="text-yellow-500" fill="currentColor" /> 
                {currentSport.name} Hall of Fame 
                <Star className="text-yellow-500" fill="currentColor" />
              </h3>
              <p className="text-gray-600 mb-8 italic">Honoring extraordinary athletes who shaped the legacy of this sport.</p>

              {currentSport.hallOfFame.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentSport.hallOfFame.map((hof, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center group"
                    >
                      <div className="w-32 h-32 mx-auto rounded-full bg-gray-100 overflow-hidden border-4 border-school-primary/20 mb-4 flex items-center justify-center">
                        {hof.image ? (
                          <img src={hof.image} alt={hof.name} className="w-full h-full object-cover" />
                        ) : (
                          <Medal size={48} className="text-gray-400" />
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-school-primary transition-colors">{hof.name}</h4>
                      <p className="font-semibold text-school-primary text-sm uppercase tracking-wider mb-2">{hof.achievement}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-500">
                  <Medal size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="font-medium text-lg">No Hall of Fame records documented yet for {currentSport.name}.</p>
                </div>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
