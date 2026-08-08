import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, ChevronRight } from 'lucide-react';

const results = [
  { sport: 'Rugby U19', opponent: 'Queens College', score: '24 - 12', result: 'W' },
  { sport: 'Netball U17', opponent: 'Hangklip High', score: '32 - 28', result: 'W' },
  { sport: 'Rugby U15', opponent: 'Aliwal North', score: '15 - 15', result: 'D' },
];

export const SportResultBoard = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full max-w-sm shadow-2xl">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
        <Trophy className="text-yellow-400" size={20} />
        <h3 className="text-white font-bold uppercase tracking-wider text-sm">Recent Results</h3>
      </div>
      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className="flex justify-between items-center group">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-200 uppercase tracking-tighter">{r.sport}</span>
              <span className="text-white text-sm font-medium">vs {r.opponent}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-black tabular-nums">{r.score}</span>
              <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${
                r.result === 'W' ? 'bg-green-500 text-white' : 
                r.result === 'L' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {r.result}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-xs font-bold text-white/60 hover:text-white uppercase tracking-widest flex items-center justify-center gap-1 transition-colors">
        View All Fixtures <ChevronRight size={14} />
      </button>
    </div>
  );
};
