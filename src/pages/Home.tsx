import React from 'react';
import { motion } from 'motion/react';
import { Award, TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: '2025 Matric Pass Rate', value: '85.1%', icon: TrendingUp },
  { label: 'Learners', value: '1 272', icon: Users },
  { label: 'Educators', value: '43', icon: Award },
];

export const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Stats Quick View */}
      <section className="py-12 bg-gray-50 -mt-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
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
