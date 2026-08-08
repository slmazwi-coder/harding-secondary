import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Music, BookOpen, Mic, Star } from 'lucide-react';
import { getAcademicActivities, type Activity } from '../admin/utils/storage';

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
  >
    <div>
      <h4 className="font-bold text-lg">{activity.name}</h4>
      <p className="text-gray-500 text-sm">{activity.category} • {activity.description}</p>
    </div>
    <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg shrink-0">
      <Trophy size={20} />
    </div>
  </motion.div>
);

const ProgramCard: React.FC<{ prog: Activity }> = ({ prog }) => {
  const Icon = prog.category === 'Culture' ? Music :
               prog.name.toLowerCase().includes('debate') ? Mic : BookOpen;
  
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group"
    >
      <div className="aspect-video bg-school-primary/10 flex items-center justify-center relative">
        <Icon size={64} className="text-school-primary/40" />
        <div className="absolute inset-0 bg-school-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon size={48} className="text-white" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            prog.category === 'Academic' ? 'bg-purple-100 text-purple-700' :
            'bg-orange-100 text-orange-700'
          }`}>{prog.category}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{prog.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{prog.description}</p>
      </div>
    </motion.div>
  );
};

export const Academic = () => {
  const [activities, setActivities] = useState<Activity[]>(getAcademicActivities());

  useEffect(() => {
    setActivities(getAcademicActivities());
  }, []);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">Academic & Cultural Activities</h1>
        
        <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          At Harding Secondary School, we believe in a holistic education. Our academic programs are designed to discover and nurture the diverse talents of our learners.
        </p>

        {/* Academic & Culture */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((prog, i) => <ProgramCard key={i} prog={prog} />)}
          </div>
        </section>

        {/* Accolades */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-school-primary mb-8 flex items-center gap-3 justify-center">
            <Trophy className="text-yellow-600" /> Recent Academic Accolades
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
};
