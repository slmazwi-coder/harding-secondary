import React, { useState } from 'react';
import { getStaff, setStaff, type StaffMember } from '../utils/storage';
import { runFullDefenseScan } from '../utils/defense';
import { Plus, Trash2, Save, X, User, ImageIcon } from 'lucide-react';

const categories = ['School Management', 'Class Teachers', 'Subject Teachers', 'Support Staff'];

const emptyMember: StaffMember = {
  name: '',
  position: '',
  subject: '',
  categories: ['Subject Teachers'],
  image: '',
  departmentHead: '',
  classTeacherFor: '',
  supportOrder: undefined,
};

export const StaffEditor = () => {
  const [staff, setStaffState] = useState<StaffMember[]>(getStaff());
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState('');

  const save = async () => {
    if (!editing) return;
    setError('');
    const scan = await runFullDefenseScan(editing, 'staff');
    if (!scan.safe) { setError(scan.reason || 'Security check failed'); return; }
    let updated: StaffMember[];
    if (editingIndex === null) {
      updated = [editing, ...staff];
    } else {
      updated = staff.map((s, i) => (i === editingIndex ? editing : s));
    }
    setStaffState(updated);
    setStaff(updated);
    setEditing(null);
    setEditingIndex(null);
  };

  const remove = (index: number) => {
    const updated = staff.filter((_, i) => i !== index);
    setStaffState(updated);
    setStaff(updated);
  };

  const add = () => {
    setEditing({ ...emptyMember });
    setEditingIndex(null);
  };

  const onImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    const reader = new FileReader();
    reader.onload = () => setEditing({ ...editing, image: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const toggleCategory = (cat: string) => {
    if (!editing) return;
    const set = new Set(editing.categories);
    if (set.has(cat)) set.delete(cat); else set.add(cat);
    setEditing({ ...editing, categories: Array.from(set) });
  };

  if (editing) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{editingIndex === null ? 'Add Staff Member' : 'Edit Staff Member'}</h2>
          <div className="flex gap-2">
            <button onClick={() => { setEditing(null); setEditingIndex(null); }} className="px-4 py-2 bg-gray-700 text-white rounded-xl flex items-center gap-2 hover:bg-gray-600"><X size={18} /> Cancel</button>
            <button onClick={save} className="px-4 py-2 bg-school-primary text-white rounded-xl flex items-center gap-2 hover:bg-green-800"><Save size={18} /> Save</button>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input value={editing.name} onChange={e => setEditing({...editing, name: e.target.value})} placeholder="Full name" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <input value={editing.position} onChange={e => setEditing({...editing, position: e.target.value})} placeholder="Position" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <input value={editing.subject || ''} onChange={e => setEditing({...editing, subject: e.target.value})} placeholder="Subject / responsibility" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <input value={editing.departmentHead || ''} onChange={e => setEditing({...editing, departmentHead: e.target.value})} placeholder="Department head of..." className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <input value={editing.classTeacherFor || ''} onChange={e => setEditing({...editing, classTeacherFor: e.target.value})} placeholder="Class teacher for grade (e.g. 10A)" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <input type="number" value={editing.supportOrder || ''} onChange={e => setEditing({...editing, supportOrder: e.target.value ? parseInt(e.target.value) : undefined})} placeholder="Support order (optional)" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`px-3 py-1 rounded-full text-xs font-semibold border ${editing.categories.includes(cat) ? 'bg-school-primary text-white border-school-primary' : 'bg-gray-700 text-gray-300 border-gray-600'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-600 text-white text-sm">
            <ImageIcon size={16} /> {editing.image ? 'Change photo' : 'Upload photo'}
            <input type="file" accept="image/*" className="hidden" onChange={onImage} />
          </label>
          {editing.image && <img src={editing.image} alt="preview" className="h-12 w-12 rounded-lg object-cover" />}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3"><User size={24} /> Staff Directory Editor</h1>
        <button onClick={add} className="bg-school-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-800"><Plus size={18} /> Add Staff Member</button>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        {staff.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No staff members found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Position</th>
                <th className="text-left p-4">Categories</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member, i) => (
                <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="p-4 text-white font-medium">{member.name}</td>
                  <td className="p-4 text-gray-400">{member.position}</td>
                  <td className="p-4 text-gray-400">{member.categories.join(', ')}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => { setEditing(member); setEditingIndex(i); }} className="text-school-primary hover:text-white text-xs">Edit</button>
                    <button onClick={() => remove(i)} className="text-red-400 hover:text-red-300 flex items-center gap-1 text-xs"><Trash2 size={14} /> Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
