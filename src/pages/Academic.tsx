import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Music, BookOpen, GraduationCap, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { getAcademicActivities, subjectStreams, type Activity, type SubjectStream } from '../admin/utils/storage';

const SectionHeading: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
  <div className="text-center mb-10">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-school-primary/10 text-school-primary mb-4">
      {icon}
    </div>
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    {subtitle && <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

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

const SubjectCard: React.FC<{ item: Activity }> = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex gap-4"
  >
    <div className="w-10 h-10 rounded-lg bg-school-primary/10 text-school-primary flex items-center justify-center shrink-0">
      {item.category === 'Culture' ? <Music size={20} /> : <BookOpen size={20} />}
    </div>
    <div className="min-w-0">
      <h3 className="font-semibold text-gray-900 leading-snug">{item.name}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mt-1">{item.description}</p>
    </div>
  </motion.div>
);

const phases = [
  {
    label: 'Grades 8 – 9',
    title: 'GET Phase',
    text: 'Learners follow the English Home Language stream, or the isiZulu Home Language (with English FAL) stream — introduced in Grade 8 in 2026 and extending to Grade 9 in 2027 — with a broad foundation across languages, Mathematics, Natural Sciences & Technology, Social Sciences and Life Orientation.',
  },
  {
    label: 'Grades 10 – 12',
    title: 'FET Phase',
    text: 'Learners choose one of four National Senior Certificate subject packages — Sciences, Commerce, Humanities A or Humanities B — and take seven subjects through to Matric.',
  },
];

export const Academic = () => {
  const [activities, setActivities] = useState<Activity[]>(getAcademicActivities());

  useEffect(() => {
    setActivities(getAcademicActivities());
  }, []);

  const subjects = activities.filter(a => a.category !== 'Culture');
  const cultural = activities.filter(a => a.category === 'Culture');

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="section-title">Academics</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Harding Secondary School offers Grades 8 to 12, guiding every learner from the General Education phase through to the National Senior Certificate.
          </p>
        </div>

        {/* Phases */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {phases.map(p => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
              >
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-school-primary bg-school-primary/10 px-3 py-1 rounded-full mb-4">{p.label}</span>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Subject Streams */}
        <section className="mb-24">
          <SectionHeading
            icon={<GraduationCap />}
            title="Grade 10 – 12 Subject Packages"
            subtitle="Every learner takes seven subjects: two languages, Life Orientation, Mathematics or Mathematical Literacy, plus the three subjects of their chosen stream."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {subjectStreams.map(s => <StreamCard key={s.id} stream={s} />)}
          </div>
        </section>

        {/* Subjects */}
        <section className="mb-24">
          <SectionHeading
            icon={<Layers />}
            title="Subjects Offered"
            subtitle="The full range of subjects taught across Grades 8 to 12."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map(item => <SubjectCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* Cultural */}
        {cultural.length > 0 && (
          <section className="mb-16">
            <SectionHeading
              icon={<Sparkles />}
              title="Cultural Activities"
              subtitle="Enrichment beyond the classroom."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {cultural.map(item => <SubjectCard key={item.id} item={item} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
