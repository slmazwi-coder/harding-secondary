import React, { useState } from 'react';
import { getPolicy, setPolicy, type PolicyInfo } from '../utils/storage';
import { runFullDefenseScan } from '../utils/defense';
import { Save, Plus, Trash2, ShieldCheck, Loader2 } from 'lucide-react';

export const PolicyEditor = () => {
  const [data, setData] = useState<PolicyInfo>(getPolicy());
  const [saved, setSaved] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const save = async () => {
    setIsScanning(true);
    const result = await runFullDefenseScan({ ...data, sections: JSON.stringify(data.sections) }, 'policy');
    setIsScanning(false);
    if (!result.safe) { alert(`🛡️ AMD ALERT: ${result.reason}`); return; }
    setPolicy(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSection = () => setData({ ...data, sections: [...data.sections, { title: '', content: [''] }] });
  const removeSection = (i: number) => setData({ ...data, sections: data.sections.filter((_, idx) => idx !== i) });
  
  const updateSectionTitle = (i: number, title: string) => {
    const sections = [...data.sections];
    sections[i] = { ...sections[i], title };
    setData({ ...data, sections });
  };

  const addRule = (i: number) => {
    const sections = [...data.sections];
    sections[i] = { ...sections[i], content: [...sections[i].content, ''] };
    setData({ ...data, sections });
  };

  const removeRule = (sectionIdx: number, ruleIdx: number) => {
    const sections = [...data.sections];
    sections[sectionIdx] = { ...sections[sectionIdx], content: sections[sectionIdx].content.filter((_, j) => j !== ruleIdx) };
    setData({ ...data, sections });
  };

  const updateRule = (sectionIdx: number, ruleIdx: number, value: string) => {
    const sections = [...data.sections];
    const content = [...sections[sectionIdx].content];
    content[ruleIdx] = value;
    sections[sectionIdx] = { ...sections[sectionIdx], content };
    setData({ ...data, sections });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Policy & Rules Editor</h1>
        <div className="flex flex-col items-end gap-2">
          <button onClick={save} disabled={isScanning} className="flex items-center gap-2 bg-school-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-green-800 disabled:opacity-50">
            {isScanning ? (<><Loader2 size={18} className="animate-spin" /> Scanning...</>) : (<><Save size={18} /> {saved ? 'Saved ✓' : 'Save Changes'}</>)}
          </button>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <ShieldCheck size={12} className="text-green-500" /> AMD Active
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Introduction</h2>
        <textarea value={data.introduction} onChange={e => setData({ ...data, introduction: e.target.value })} rows={3} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm" />
      </section>

      {/* Sections */}
      {data.sections.map((section, i) => (
        <section key={i} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <input value={section.title} onChange={e => updateSectionTitle(i, e.target.value)} placeholder="Section title" className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white font-bold" />
            <div className="flex gap-2">
              <button onClick={() => addRule(i)} className="text-sm text-school-primary hover:underline flex items-center gap-1"><Plus size={14} /> Add Rule</button>
              <button onClick={() => removeSection(i)} className="text-gray-500 hover:text-red-400"><Trash2 size={16} /></button>
            </div>
          </div>
          <div className="space-y-3">
            {section.content.map((rule, j) => (
              <div key={j} className="flex gap-2">
                <span className="text-gray-500 text-sm mt-2 shrink-0">{j + 1}.</span>
                <input value={rule} onChange={e => updateRule(i, j, e.target.value)} className="flex-grow bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm" />
                <button onClick={() => removeRule(i, j)} className="text-gray-500 hover:text-red-400 shrink-0"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <button onClick={addSection} className="flex items-center gap-1 text-sm text-school-primary hover:underline mt-4"><Plus size={14} /> Add Policy Section</button>
    </div>
  );
};
