import React from 'react';
import { Trophy, Calendar, ChevronRight } from 'lucide-react';

const events = [
  { sport: 'Cross Country', date: '20 Feb 2026' },
  { sport: 'Road Relay', date: '25 Feb 2026' },
  { sport: 'Inter-House Sports Day', date: '27 Feb 2026' },
];

export const SportResultBoard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full max-w-sm shadow-2xl">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <Trophy className="text-yellow-400" size={20} />
        <h3 className="text-white font-bold uppercase tracking-wider text-sm">Term 1 Sports</h3>
      </div>
      <div className="space-y-3">
        {events.map((e, i) => (
          <div key={i} className="flex justify-between items-center group">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-100 uppercase tracking-tighter">{e.sport}</span>
              <span className="text-white text-sm font-medium flex items-center gap-1">
                <Calendar size={12} /> {e.date}
              </span>
            </div>
            <span className="text-yellow-400 text-xs font-black uppercase tracking-widest">Upcoming</span>
          </div>
        ))}
      </div>
      <a href="/sports" className="w-full mt-4 py-2 text-xs font-bold text-white/60 hover:text-white uppercase tracking-widest flex items-center justify-center gap-1 transition-colors">
        View Sports Page <ChevronRight size={14} />
      </a>
    </div>
  );
};
