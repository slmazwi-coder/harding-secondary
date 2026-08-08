import React, { useState } from 'react';
import { Upload, FileText, Trash2, ShieldCheck } from 'lucide-react';
import { getStudentDocs, setStudentDocs, type StudentDoc } from '../utils/storage';
import { runFullDefenseScan } from '../utils/defense';

export const StudentDocsEditor = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Report');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [term, setTerm] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [docs, setDocs] = useState<StudentDoc[]>([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const loadDocs = () => {
    const list = getStudentDocs(studentNumber.trim());
    setDocs(list);
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFileName(file.name);
      setFileUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const upload = async () => {
    const sn = studentNumber.trim();
    if (!sn || !title || !fileUrl) return;
    setError('');
    const doc: StudentDoc = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      studentNumber: sn,
      title: title.trim(),
      category,
      year,
      term,
      fileName,
      fileUrl,
      createdAt: new Date().toISOString(),
    };
    const scan = await runFullDefenseScan(doc, 'documents');
    if (!scan.safe) { setError(scan.reason || 'Security check failed'); return; }
    const updated = [doc, ...getStudentDocs(sn)];
    setStudentDocs(sn, updated);
    setDocs(updated);
    setTitle('');
    setTerm('');
    setFileName('');
    setFileUrl('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = (id: string) => {
    const sn = studentNumber.trim();
    const updated = getStudentDocs(sn).filter(d => d.id !== id);
    setStudentDocs(sn, updated);
    setDocs(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3"><FileText size={24} /> Student Documents</h1>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            value={studentNumber}
            onChange={e => setStudentNumber(e.target.value)}
            placeholder="Student number"
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white"
          />
          <button onClick={loadDocs} className="bg-school-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-green-800">Load Documents</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white">
            <option>Report</option><option>Memo</option><option>Notice</option><option>Timetable</option><option>Other</option>
          </select>
          <input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
          <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Term (optional)" className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white" />
        </div>

        {error && <p className="text-red-400 text-sm mb-3 bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>}
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 cursor-pointer hover:bg-gray-600 text-white text-sm">
            <Upload size={16} /> {fileName || 'Choose file'}
            <input type="file" className="hidden" onChange={onFile} />
          </label>
          <button onClick={upload} disabled={!studentNumber.trim() || !title || !fileUrl} className="bg-school-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-green-800 disabled:opacity-50 flex items-center gap-2">
            {saved ? <><ShieldCheck size={16} /> Uploaded</> : <><Upload size={16} /> Upload Document</>}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        {docs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-4 opacity-30" />
            <p>No documents loaded. Enter a student number and click Load Documents.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Year</th>
                  <th className="text-left p-4">Term</th>
                  <th className="text-left p-4">File</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map(doc => (
                  <tr key={doc.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="p-4 text-white font-medium">{doc.title}</td>
                    <td className="p-4 text-gray-400">{doc.category}</td>
                    <td className="p-4 text-gray-400">{doc.year}</td>
                    <td className="p-4 text-gray-400">{doc.term || '-'}</td>
                    <td className="p-4 text-gray-400">{doc.fileName}</td>
                    <td className="p-4">
                      <button onClick={() => remove(doc.id)} className="text-red-400 hover:text-red-300 flex items-center gap-1"><Trash2 size={14} /> Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
