import React, { useState } from 'react';
import { getInvoices, setInvoices, type Invoice } from '../utils/storage';
import { Download, FileCheck, Search, CreditCard, Eye } from 'lucide-react';

export const PaymentsEditor = () => {
  const [invoices, setLocalInvoices] = useState<Invoice[]>(getInvoices());
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshData = () => setLocalInvoices(getInvoices());

  const updateStatus = (id: string, status: Invoice['status']) => {
    const updated = invoices.map(inv => inv.id === id ? { ...inv, status } : inv);
    setLocalInvoices(updated);
    setInvoices(updated);
  };

  const filtered = invoices.filter(inv => {
    const matchesSearch = !searchQuery || inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || inv.parentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFrom = !filterFrom || inv.createdDate >= filterFrom;
    const matchesTo = !filterTo || inv.createdDate <= filterTo;
    return matchesSearch && matchesFrom && matchesTo;
  });

  const exportCSV = () => {
    const headers = ['Date', 'Student', 'Grade', 'Parent', 'Email', 'Phone', 'Amount', 'Description', 'Status', 'POP Date'];
    const rows = filtered.map(inv => [
      inv.createdDate, inv.studentName, inv.studentGrade, inv.parentName,
      inv.parentEmail, inv.parentPhone, `R${inv.amount.toFixed(2)}`,
      inv.description, inv.status, inv.popDate || 'N/A'
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HSS_Payment_Register_${filterFrom || 'all'}_to_${filterTo || 'all'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3"><CreditCard size={24} /> Payments Register</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-school-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-green-800">
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search student/parent..." className="w-full bg-gray-700 border border-gray-600 rounded-xl pl-9 pr-4 py-2 text-white text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">From</label>
            <input type="date" value={filterFrom} onChange={e => setFilterFrom(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">To</label>
            <input type="date" value={filterTo} onChange={e => setFilterTo(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm" />
          </div>
          <div className="flex items-end">
            <button onClick={refreshData} className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white text-sm hover:bg-gray-600">Refresh</button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{filtered.length}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Total Entries</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">R {filtered.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0).toFixed(2)}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Confirmed Paid</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-400">R {filtered.filter(i => i.status === 'Pending').reduce((s, i) => s + i.amount, 0).toFixed(2)}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Pending</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <CreditCard size={48} className="mx-auto mb-4 opacity-30" />
            <p>No payment records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Parent</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">POP</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="p-4 text-gray-300">{inv.createdDate}</td>
                    <td className="p-4 font-medium">{inv.studentName} <span className="text-xs text-gray-500">({inv.studentGrade})</span></td>
                    <td className="p-4 text-gray-300">{inv.parentName}</td>
                    <td className="p-4 font-bold text-white">R {inv.amount.toFixed(2)}</td>
                    <td className="p-4 text-gray-400">{inv.description}</td>
                    <td className="p-4">
                      {inv.popFile ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs"><FileCheck size={14} /> Uploaded</span>
                      ) : (
                        <span className="text-gray-500 text-xs">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        inv.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                        inv.status === 'Overdue' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>{inv.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button onClick={() => updateStatus(inv.id, 'Paid')} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded hover:bg-green-500/30">Confirm</button>
                        <button onClick={() => updateStatus(inv.id, 'Overdue')} className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30">Overdue</button>
                      </div>
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
