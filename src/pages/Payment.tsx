import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, CheckCircle, Upload, Building, Info, ArrowLeft } from 'lucide-react';
import { getInvoices, setInvoices, generateId, type Invoice } from '../admin/utils/storage';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [form, setForm] = useState({
    studentName: '',
    studentGrade: '8',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    amount: '',
    method: 'EFT' as Invoice['method'],
    reference: '',
    description: 'School Fees',
    popFile: '',
  });

  const handlePopUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(f => ({ ...f, popFile: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `HSS-${generateId().slice(0, 6).toUpperCase()}`;
    const invoice: Invoice = {
      id,
      studentName: form.studentName,
      studentGrade: form.studentGrade,
      parentName: form.parentName,
      parentEmail: form.parentEmail,
      parentPhone: form.parentPhone,
      amount: parseFloat(form.amount) || 0,
      description: form.description,
      dueDate: new Date().toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      method: form.method,
      popFile: form.popFile,
      popDate: form.popFile ? new Date().toISOString() : '',
    };
    setInvoices([invoice, ...getInvoices()]);
    setPaymentId(id);
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-school-primary transition-colors">
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="section-title">Easy Payment Portal</h1>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-xl mx-auto border border-green-100"
          >
            <div className="w-20 h-20 bg-green-100 text-school-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Recorded</h2>
            <p className="text-gray-600 mb-6">Thank you. Your payment reference is <span className="font-bold text-school-primary">{paymentId}</span>. The finance office will verify it within 48 hours.</p>
            <div className="bg-green-50 rounded-2xl p-6 text-left mb-6 text-sm text-gray-700">
              <p className="mb-2"><strong>Bank:</strong> First National Bank (FNB)</p>
              <p className="mb-2"><strong>Account Holder:</strong> HARDING SECONDARY SCHOOL</p>
              <p className="mb-2"><strong>Account Number:</strong> 5240 4909 304</p>
              <p className="mb-2"><strong>Branch Code:</strong> 220123</p>
              <p><strong>Reference:</strong> CHILD'S NAME</p>
            </div>
            <button onClick={() => navigate('/')} className="btn-primary w-full">Back to Home</button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-6">
              <section className="bg-green-50/50 text-gray-900 p-8 rounded-[2.5rem] border border-green-100 border-l-8 border-l-school-primary shadow-xl">
                <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-school-primary flex items-center gap-2"><Building size={24} /> Bank Details</h2>
                <div className="space-y-4 text-sm">
                  <div className="pb-4 border-b border-gray-200"><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account Holder</p><p className="font-bold text-gray-800">HARDING SECONDARY SCHOOL</p></div>
                  <div className="pb-4 border-b border-gray-200"><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Bank</p><p className="font-bold text-gray-800">First National Bank (FNB)</p></div>
                  <div className="pb-4 border-b border-gray-200"><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account Number</p><p className="font-bold text-school-primary text-xl">5240 4909 304</p></div>
                  <div className="pb-4 border-b border-gray-200"><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Branch Code</p><p className="font-bold text-gray-800">220123</p></div>
                  <div><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Reference</p><p className="font-bold text-school-primary italic">CHILD'S NAME</p></div>
                </div>
              </section>

              <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-black mb-4 uppercase tracking-tighter flex items-center gap-2"><Info size={18} className="text-school-primary" /> How to pay</h3>
                <ol className="text-sm text-gray-600 space-y-4 list-decimal pl-4 font-medium">
                  <li>Fill in the payment form and choose your method.</li>
                  <li>For EFT, use the bank details on the left.</li>
                  <li>Upload your Proof of Payment (POP).</li>
                  <li>Submit and wait for finance to confirm within 48 hours.</li>
                </ol>
              </section>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100"
              >
                <h3 className="text-2xl font-black text-black mb-8 flex items-center gap-3 uppercase tracking-tighter border-b-2 border-gray-100 pb-4">
                  <CreditCard className="text-school-primary" size={24} /> Record Payment
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Full Name</label>
                      <input required value={form.studentName} onChange={e => setForm({...form, studentName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Grade</label>
                      <select value={form.studentGrade} onChange={e => setForm({...form, studentGrade: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none">
                        <option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Parent / Payer Name</label>
                      <input required value={form.parentName} onChange={e => setForm({...form, parentName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Amount (ZAR)</label>
                      <input required type="number" min={1} value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
                      <select value={form.method} onChange={e => setForm({...form, method: e.target.value as Invoice['method']})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none">
                        <option>EFT</option>
                        <option>Cash</option>
                        <option>Card</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Reference Used</label>
                      <input value={form.reference} onChange={e => setForm({...form, reference: e.target.value})} placeholder="e.g. Child's name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                      <select value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary/20 outline-none">
                        <option>School Fees</option>
                        <option>Registration Fee</option>
                        <option>Hostel Fees</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Proof of Payment (optional)</label>
                    <label className="flex items-center gap-3 px-5 py-4 bg-gray-50 border border-gray-200 border-dashed rounded-2xl cursor-pointer hover:bg-green-50 transition-colors">
                      <Upload className="text-school-primary" size={20} />
                      <span className="text-sm text-gray-600">{form.popFile ? 'POP uploaded' : 'Click to upload screenshot or PDF'}</span>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={handlePopUpload} />
                    </label>
                  </div>

                  <button type="submit" className="w-full btn-primary bg-school-primary hover:bg-green-800 py-5 text-white font-black uppercase tracking-[0.2em] transition-all">
                    Submit Payment
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
