import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { getPolicy, type PolicyInfo } from '../admin/utils/storage';

const sectionIcons: Record<string, any> = {
  'Code of Conduct': Shield,
  'Academic Rules': BookOpen,
  'Attendance and Leave': Clock,
};

export const SchoolPolicy = () => {
  const [data, setData] = useState<PolicyInfo>(getPolicy());

  useEffect(() => {
    setData(getPolicy());
  }, []);

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">School Policy & Rules</h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-12"
        >
          <p className="text-gray-700 text-lg leading-relaxed">{data.introduction}</p>
          <p className="text-sm text-gray-400 mt-4 italic">Last updated: {data.lastUpdated}</p>
        </motion.div>

        <div className="space-y-8">
          {data.sections.map((section, i) => {
            const Icon = sectionIcons[section.title] || AlertCircle;
            return (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="bg-school-primary p-6 text-white flex items-center gap-3">
                  <Icon size={24} />
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {section.content.map((rule, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-school-primary/10 text-school-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {j + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
