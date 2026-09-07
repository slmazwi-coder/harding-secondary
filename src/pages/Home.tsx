import React from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, Users, Megaphone, ArrowRight } from 'lucide-react';

const stats = [
  { label: '2025 Matric Pass Rate', value: '85.1%', icon: TrendingUp },
  { label: 'Learners', value: '1 272', icon: Users },
  { label: 'Educators', value: '43', icon: Award },
];

export const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Notices */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-school-primary bg-school-secondary p-6 sm:p-7 flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-white border border-school-primary text-school-primary shrink-0">
                <Megaphone size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-black uppercase tracking-widest text-school-primary">Notice</div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-white border border-school-primary text-gray-700">
                    2027
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">2027 Admissions are open</h3>
                <p className="text-gray-700 mt-1">
                  Grade 8 applications for the <span className="font-bold">2027</span> academic year are open. Apply online or download the form.
                </p>
                <a href="/admissions" className="mt-4 inline-flex items-center gap-2 text-school-primary font-bold">
                  Apply now <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-7 flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-white border border-gray-200 text-school-primary shrink-0">
                <Megaphone size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-black uppercase tracking-widest text-school-primary">Info</div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-white border border-gray-200 text-gray-700">
                    School
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">School Fees and Hostel Information</h3>
                <p className="text-gray-700 mt-1">
                  School fees for 2026 are R3 000 per annum. The registration fee of R1 500 must be paid before 31 December 2025.
                </p>
                <a href="/school-fees" className="mt-4 inline-flex items-center gap-2 text-school-primary font-bold">
                  View fees <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="py-12 bg-gray-50 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 border-b-4 border-school-primary"
            >
              <div className="p-4 bg-green-50 rounded-xl text-school-primary">
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">Our Vision</h2>
          <p className="text-2xl text-gray-700 leading-relaxed font-light italic">
            "To strive and provide access to holistic, affordable, quality, disciplined and goal directed education and life skills for our learners."
          </p>
          <h2 className="section-title mt-16">Our Mission</h2>
          <p className="text-2xl text-gray-700 leading-relaxed font-light italic">
            "To provide a diverse, comprehensive, excellent learning that will develop, inspire and motivate learners in a safe, caring, nurturing environment."
          </p>
          <h2 className="section-title mt-16">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Integrity', 'Caring', 'Respect', 'Diligence', 'Professionalism', 'Innovation', 'Dedication'].map(v => (
              <span key={v} className="px-5 py-2 rounded-full bg-green-50 text-school-primary font-semibold">{v}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
