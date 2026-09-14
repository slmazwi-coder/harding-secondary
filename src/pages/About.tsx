import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon } from 'lucide-react';
import { getAbout, type AboutInfo } from '../admin/utils/storage';

const ACCENT = '#F5C518';

export const About = () => {
  const [data, setData] = useState<AboutInfo>(getAbout());
  const [campusFailed, setCampusFailed] = useState(false);
  const [principalFailed, setPrincipalFailed] = useState(false);

  const campusImageUrl = '/About/campus.jpg';
  const principalImageUrl = '/assets/staff/principal.jpg?v=2';

  useEffect(() => {
    setData(getAbout());
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Title */}
        <h1 className="section-title">About Harding Secondary School</h1>

        {/* ── Section 1: Our School ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-school-primary mb-2">Our School</h2>
            <div className="w-16 h-1 bg-school-primary mx-auto rounded-full" />
          </div>

          <div className="bg-school-secondary rounded-3xl overflow-hidden shadow-lg border border-school-primary">
            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* Campus Photo Column */}
              <div className="flex flex-col items-center justify-center bg-school-primary p-8 md:p-10">
                <div
                  className="w-full rounded-2xl overflow-hidden border-4 shadow-xl"
                  style={{ borderColor: ACCENT, aspectRatio: '4/3' }}
                >
                  {!campusFailed ? (
                    <img
                      src={campusImageUrl}
                      alt="School campus"
                      className="w-full h-full object-cover"
                      onError={() => setCampusFailed(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-school-primary">
                      <ImageIcon className="text-white/40" size={40} />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white text-center leading-tight mt-5">Harding Secondary School</h3>
                <p className="text-sm font-semibold mt-1 text-center" style={{ color: ACCENT }}>Harding, KwaZulu-Natal</p>
              </div>

              {/* Text Column */}
              <div className="col-span-2 flex flex-col justify-center p-8 md:p-12">
                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  {data.historyParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* ── Section 2: Principal's Message ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-school-primary mb-2">Principal's Message</h2>
            <div className="w-16 h-1 bg-school-primary mx-auto rounded-full" />
          </div>

          <div className="bg-school-secondary rounded-3xl overflow-hidden shadow-lg border border-school-primary">
            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* Principal Photo Column */}
              <div className="flex flex-col items-center justify-center bg-school-primary p-8 md:p-10">
                <div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 shadow-xl mb-5"
                  style={{ borderColor: ACCENT }}
                >
                  {!principalFailed ? (
                    <img
                      src={principalImageUrl}
                      alt="Principal"
                      className="w-full h-full object-cover object-top"
                      onError={() => setPrincipalFailed(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-school-primary">
                      <ImageIcon className="text-white/40" size={40} />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white text-center leading-tight">
                  {data.principalName}
                </h3>
                <p className="text-sm font-semibold mt-1 text-center" style={{ color: ACCENT }}>
                  {data.principalTitle}
                </p>
              </div>

              {/* Message Column */}
              <div className="col-span-2 flex flex-col justify-center p-8 md:p-12">
                <div className="text-school-primary text-6xl font-serif leading-none mb-2 opacity-40 select-none">
                  "
                </div>

                <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                  {data.principalMessage.map((msg, i) => (
                    <p key={i}>{msg}</p>
                  ))}
                </div>

                <div className="text-school-primary text-6xl font-serif leading-none mt-2 text-right opacity-40 select-none">
                  "
                </div>
              </div>

            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};
