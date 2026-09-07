import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Music, BookOpen, Mic, GraduationCap, CheckCircle2 } from 'lucide-react';
import { getAcademicActivities, subjectStreams, type Activity, type SubjectStream } from '../admin/utils/storage';

const StreamCard: React.FC<{ stream: SubjectStream }> = ({ stream }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col"
  >
    <div className="bg-school-primary text-white px-6 py-4 flex items-center justify-between">
      <h3 className="text-xl font-bold">{stream.name}</h3>
      <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full">{stream.classLabel}</span>
    </div>
    <div className="p-6 flex-1 flex flex-col gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Compulsory</p>
        <ul className="space-y-1.5">
          {stream.compulsory.map(s => (
            <li key={s} className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 size={16} className="text-school-primary shrink-0 mt-0.5" />{s}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Stream Subjects</p>
        <ul className="space-y-1.5">
          {stream.electives.map(s => (
            <li key={s} className="flex items-start gap-2 text-gray-900 font-medium text-sm"><CheckCircle2 size={16} className="text-yellow-500 shrink-0 mt-0.5" />{s}</li>
          ))}
        </ul>
      </div>
      {stream.note && <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3 mt-auto">{stream.note}</p>}
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
        <h1 className="section-title text-center">Academics</h1>
        
        <p className="text-center text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          Harding Secondary School offers Grades 8 to 12. Grades 8 and 9 (GET Phase) follow English Home Language and isiZulu Home Language streams; from Grade 10 learners choose one of four National Senior Certificate subject packages.
        </p>

        {/* Subject Streams */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-school-primary mb-3 flex items-center gap-3 justify-center">
            <GraduationCap /> Grade 10–12 Subject Packages (2027)
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Every learner takes seven subjects: two languages, Life Orientation, Mathematics or Mathematical Literacy, plus the three subjects of their chosen stream.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {subjectStreams.map(s => <StreamCard key={s.id} stream={s} />)}
          </div>
        </section>

        <h2 className="text-3xl font-bold text-school-primary mb-8 flex items-center gap-3 justify-center">
          <BookOpen /> Subjects & Cultural Activities
        </h2>

        {/* Academic & Culture */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((prog, i) => <ProgramCard key={i} prog={prog} />)}
          </div>
        </section>

      </div>
    </div>
  );
};
