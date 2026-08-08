import React, { useState } from 'react';
import { getSports, setSports, type Sport } from '../utils/storage';
import { Plus, Trash2, Save, X, ImageIcon, Pencil, Filter } from 'lucide-react';

export const SportsEditor = () => {
  const [sports, setSportsState] = useState<Sport[]>(getSports());
  const [editing, setEditing] = useState<Sport | null>(null);

  const save = () => {
    if (!editing) return;
    const newSports = sports.map(s => s.id === editing.id ? editing : s);
    setSportsState(newSports);
    setSports(newSports);
    setEditing(null);
  };

  const addAgeGroup = () => {
    if (!editing) return;
    const groupName = prompt('Enter new age group (e.g. u/14, u/16)');
    if (groupName) {
      setEditing({ ...editing, ageGroups: [...editing.ageGroups, groupName] });
    }
  };

  const removeAgeGroup = (index: number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      ageGroups: editing.ageGroups.filter((_, i) => i !== index)
    });
  };

  const addHof = () => {
    if (!editing) return;
    setEditing({
      ...editing,
      hallOfFame: [...editing.hallOfFame, { name: '', achievement: '', image: '' }]
    });
  };

  const updateHof = (index: number, field: string, value: string) => {
    if (!editing) return;
    const updated = [...editing.hallOfFame];
    updated[index] = { ...updated[index], [field]: value };
    setEditing({ ...editing, hallOfFame: updated });
  };

  const removeHof = (index: number) => {
    if (!editing) return;
    setEditing({
      ...editing,
      hallOfFame: editing.hallOfFame.filter((_, i) => i !== index)
    });
  };

  if (editing) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Editing {editing.name}</h2>
          <div className="flex gap-2">
            <button onClick={() => setEditing(null)} className="btn-secondary px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
              <X size={20} /> Cancel
            </button>
            <button onClick={save} className="btn-primary flex items-center gap-2">
              <Save size={20} /> Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sport Description</label>
            <textarea
              value={editing.description}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-school-primary"
              rows={3}
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-3 font-bold">Age Groups <span className="font-normal text-gray-500">(Includes High School groups like u/13, u/15, Senior Team)</span></label>
             <div className="flex flex-wrap gap-2 mb-2">
               {editing.ageGroups.map((age, i) => (
                 <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                   {age}
                   <button onClick={() => removeAgeGroup(i)} className="text-red-500 hover:text-red-700"><X size={14}/></button>
                 </div>
               ))}
             </div>
             <button onClick={addAgeGroup} className="text-sm text-school-primary font-bold hover:underline">+ Add Age Group</button>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 font-bold">Hall of Fame</label>
              <button type="button" onClick={addHof} className="text-sm border border-school-primary text-school-primary px-3 py-1 rounded-lg hover:bg-school-primary hover:text-white transition-colors">
                + Add Legend
              </button>
            </div>
            
            <div className="space-y-4">
              {editing.hallOfFame.map((hof, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50 relative pr-12">
                  <button onClick={() => removeHof(i)} className="absolute right-4 top-4 text-gray-400 hover:text-red-600">
                    <Trash2 size={20}/>
                  </button>
                  <input placeholder="Name" value={hof.name} onChange={e => updateHof(i, 'name', e.target.value)} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-school-primary" />
                  <input placeholder="Achievement (e.g. National U18, Top Goalscorer)" value={hof.achievement} onChange={e => updateHof(i, 'achievement', e.target.value)} className="w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-school-primary md:col-span-2" />
                </div>
              ))}
              {editing.hallOfFame.length === 0 && (
                <p className="text-sm text-gray-400 italic">No legends added for {editing.name} yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Filter className="text-school-primary" /> Sports Administration
        </h2>
      </div>

      <div className="grid gap-4">
        {sports.map((sport) => (
          <div key={sport.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <h3 className="font-bold text-lg">{sport.name}</h3>
              <p className="text-gray-500 text-sm max-w-2xl truncate">{sport.description}</p>
              <div className="text-xs text-gray-400 mt-2">
                {sport.ageGroups.length} Age Groups | {sport.hallOfFame.length} Hall of Fame Entries
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(sport)} className="p-2 text-school-primary hover:bg-green-50 bg-gray-100 rounded-lg">
                <Pencil size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
