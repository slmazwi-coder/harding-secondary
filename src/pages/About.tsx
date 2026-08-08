import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User, Quote } from 'lucide-react';
import { getAbout, type AboutInfo } from '../admin/utils/storage';

export const About = () => {
  const [data, setData] = useState<AboutInfo>(getAbout());

  useEffect(() => {
    setData(getAbout());
  }, []);
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">About Harding Secondary School</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-school-primary mb-6">Our History & Formation</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {data.historyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/About/campus.jpg" 
              alt="Harding Secondary School Campus" 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>
        </div>

        {/* Leadership & Staff */}
        <section className="bg-gray-50 rounded-3xl p-12 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-school-primary/10">
            <Quote size={120} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
            <div className="col-span-1">
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex flex-col items-center justify-center text-gray-400">
                <User size={64} className="mb-2 opacity-50" />
                <span className="font-bold text-sm tracking-widest uppercase">Image Placeholder</span>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-school-primary">{data.principalName}</h3>
                <p className="text-gray-500">{data.principalTitle}</p>
              </div>
            </div>
            <div className="col-span-2">
              <h2 className="text-3xl font-bold text-school-primary mb-6 italic">Principal's Message</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                {data.principalMessage.map((p, i) => (
                  <p key={i}>"{p}"</p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 pt-12">
            {/* Deputy Principal */}
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex flex-col items-center justify-center text-gray-400 mb-4">
                <User size={48} className="mb-2 opacity-50" />
                <span className="font-bold text-xs tracking-widest uppercase">Image Placeholder</span>
              </div>
              <h3 className="text-xl font-bold text-school-primary">Deputy Principal</h3>
              <p className="text-gray-500">Academic Leadership</p>
            </div>

            {/* Student Leadership */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-200 aspect-video">
                <img 
                  src="/About/council.jpg" 
                  alt="Student Leadership" 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <h3 className="text-xl font-bold text-school-primary">Student Leadership</h3>
              <p className="text-gray-500">Student Leadership</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
