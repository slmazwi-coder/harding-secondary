import React, { useEffect, useMemo, useState } from 'react';
import { User } from 'lucide-react';
import { getStaff, type StaffMember } from '../admin/utils/storage';

const PRIMARY = '#0B7C5C';
const ACCENT = '#F5C518';

const streamIndex: Record<string, number> = { A: 0, B: 1, C: 2 };

function classOrder(cls?: string): number {
  if (!cls) return -1;
  const grade = parseInt(cls, 10);
  const stream = cls.replace(/^\d+/, '');
  const streamRank = streamIndex[stream] ?? 9;
  return grade * 10 + streamRank;
}

const categories = ['School Management', 'Class Teachers', 'Subject Teachers', 'Support Staff'];

const StaffCard = ({ member, activeCategory }: { member: StaffMember; activeCategory: string }) => {
  const positionLabel = useMemo(() => {
    if (activeCategory === 'School Management') {
      return member.departmentHead ? `Departmental Head — ${member.departmentHead}` : member.position;
    }
    if (activeCategory === 'Class Teachers') {
      return member.classTeacherFor ? `Class Teacher — Grade ${member.classTeacherFor}` : member.position;
    }
    return activeCategory === 'Subject Teachers' ? member.subject : member.position;
  }, [member, activeCategory]);

  return (
    <div
      className="h-full rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center p-6 text-center hover:-translate-y-1"
      style={{ background: '#F0FDF9', border: `1px solid ${PRIMARY}` }}
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden"
        style={{ background: '#E6F7F1', border: `3px solid ${PRIMARY}` }}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            style={{ objectPosition: member.imgPosition || 'center center' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <User size={40} style={{ color: PRIMARY, opacity: 0.5 }} />
        )}
      </div>

      <h3 className="text-sm font-bold leading-tight" style={{ color: PRIMARY }}>
        {member.name}
      </h3>
      {positionLabel && (
        <p className="text-xs font-semibold mt-1" style={{ color: '#B45309' }}>
          {positionLabel}
        </p>
      )}
      {activeCategory === 'Subject Teachers' && member.subject && (
        <div
          className="mt-3 w-full text-xs font-medium px-2 py-2 rounded-md text-center leading-tight"
          style={{ background: '#E6F7F1', color: PRIMARY, border: `2px solid ${PRIMARY}` }}
        >
          {member.subject}
        </div>
      )}
    </div>
  );
};

export const Staff = () => {
  const [staffData, setStaffData] = useState<StaffMember[]>(getStaff());
  const [activeCategory, setActiveCategory] = useState('School Management');

  useEffect(() => {
    setStaffData(getStaff());
  }, []);

  const filtered = useMemo(() => {
    const list = staffData.filter(m => m.categories.includes(activeCategory));
    if (activeCategory === 'Class Teachers') {
      return [...list].sort((a, b) => classOrder(b.classTeacherFor) - classOrder(a.classTeacherFor));
    }
    if (activeCategory === 'Support Staff') {
      return [...list].sort((a, b) => (a.supportOrder ?? 99) - (b.supportOrder ?? 99));
    }
    if (activeCategory === 'School Management') {
      return [...list].sort((a, b) => {
        const rank = (m: StaffMember) => {
          if (m.position === 'Principal') return 0;
          if (m.position?.includes('Deputy Principal')) return 1;
          if (m.departmentHead) return 2;
          return 3;
        };
        return rank(a) - rank(b);
      });
    }
    if (activeCategory === 'Subject Teachers') {
      return [...list].sort((a, b) => {
        const rank = (m: StaffMember) => {
          if (m.categories.includes('School Management')) return 0;
          if (m.categories.includes('Class Teachers')) return 1;
          return 2;
        };
        return rank(a) - rank(b) || a.name.localeCompare(b.name);
      });
    }
    return list;
  }, [staffData, activeCategory]);

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: '#E6F7F1' }}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3" style={{ color: PRIMARY }}>
            Our Staff
          </h1>
          <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ background: ACCENT }} />
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Meet the dedicated management, educators and support staff of Harding Secondary School.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={
                activeCategory === cat
                  ? { background: ACCENT, color: PRIMARY, border: `2px solid ${ACCENT}`, fontWeight: 700 }
                  : { background: '#F0FDF9', color: PRIMARY, border: `2px solid ${PRIMARY}` }
              }
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-md"
            >
              {cat}
              <span className="ml-2 text-xs font-bold opacity-60">
                ({staffData.filter(m => m.categories.includes(cat)).length})
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>Staff list for this category will be published soon.</p>
            <p className="text-sm mt-2 opacity-70">Please check back later or contact the school office.</p>
          </div>
        ) : activeCategory === 'School Management' ? (
          <div className="flex flex-col items-center gap-5">
            <div className="w-full max-w-[260px] h-full">
              <StaffCard member={filtered[0]} activeCategory={activeCategory} />
            </div>
            <div className="grid grid-cols-2 gap-5 w-full max-w-2xl justify-items-center auto-rows-fr">
              {filtered.slice(1, 3).map((member, index) => (
                <div key={index} className="w-full max-w-[260px] h-full">
                  <StaffCard member={member} activeCategory={activeCategory} />
                </div>
              ))}
            </div>
            {filtered.length > 3 && (
              <div className="grid grid-cols-2 gap-5 w-full max-w-2xl justify-items-center auto-rows-fr">
                {filtered.slice(3).map((member, index) => (
                  <div key={index} className="w-full max-w-[260px] h-full">
                    <StaffCard member={member} activeCategory={activeCategory} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 auto-rows-fr">
            {filtered.map((member, index) => (
              <div key={index} className="h-full">
                <StaffCard member={member} activeCategory={activeCategory} />
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-gray-400 text-xs mt-10 italic">
          Staff names and photos are updated as new information is provided.
        </p>
      </div>
    </div>
  );
};
