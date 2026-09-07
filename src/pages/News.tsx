import React, { useEffect, useState } from 'react';
import { Bell, Calendar, Info, Megaphone, ArrowRight } from 'lucide-react';
import { getNews, type NewsItem } from '../admin/utils/storage';

const PRIMARY = '#0B7C5C';
const ACCENT = '#F5C518';

export const News = () => {
  const [notices, setNotices] = useState<NewsItem[]>(getNews());

  useEffect(() => {
    setNotices(getNews());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Notices ── */}
      <section className="py-10 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-3" style={{ color: PRIMARY }}>
              News & Notices
            </h1>
            <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: ACCENT }} />
            <p className="text-gray-500 text-base max-w-2xl mx-auto">
              Stay up to date with announcements, events and important information from Harding Secondary School.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-school-primary bg-school-secondary p-6 sm:p-7 flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-white border border-school-primary text-school-primary shrink-0">
                <Megaphone size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-black uppercase tracking-widest" style={{ color: PRIMARY }}>Notice</div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-white border border-school-primary text-gray-700">
                    2027
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">2027 Admissions are open</h3>
                <p className="text-gray-700 mt-1">
                  Grade 8 applications for the <span className="font-bold">2027</span> academic year are open. Apply online or download the form.
                </p>
                <a href="/admissions" className="mt-4 inline-flex items-center gap-2 font-bold" style={{ color: PRIMARY }}>
                  Apply now <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-school-secondary border border-gray-200 text-school-primary shrink-0">
                <Megaphone size={22} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-black uppercase tracking-widest" style={{ color: PRIMARY }}>Info</div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-white border border-gray-200 text-gray-700">
                    School
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mt-2">School Fees and Hostel Information</h3>
                <p className="text-gray-700 mt-1">
                  School fees for 2026 are R3 000 per annum. The registration fee of R1 500 must be paid before 31 December 2025.
                </p>
                <a href="/school-fees" className="mt-4 inline-flex items-center gap-2 font-bold" style={{ color: PRIMARY }}>
                  View fees <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold flex items-center gap-2" style={{ color: PRIMARY }}>
              <Bell className="text-yellow-500" /> Latest News
            </h2>
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              No active notices at this time.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="card flex flex-col h-full border-l-4"
                  style={{ borderLeftColor: ACCENT, background: '#F0FDF9', borderColor: PRIMARY }}
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar size={14} />
                    <span>{notice.date}</span>
                    <span className="ml-auto px-2 py-1 bg-white rounded text-xs font-bold uppercase tracking-wider" style={{ color: PRIMARY, border: `1px solid ${PRIMARY}` }}>
                      Update
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{notice.title}</h3>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{notice.content}</p>
                  <button className="font-medium flex items-center gap-1 hover:gap-2 transition-all" style={{ color: PRIMARY }}>
                    Read More <Info size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
