import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, Download, Printer, Upload, CheckCircle2, User, Building, Info, FileCheck, ArrowRight } from 'lucide-react';
import { generateId, setInvoices, getInvoices, type Invoice } from '../admin/utils/storage';

export const SchoolFees = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentGrade: '8',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    amount: '',
    description: 'School Fees - Grade 8'
  });

  const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(null);
  const [popUploaded, setPopUploaded] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const invoice: Invoice = {
      id: `HSS-${generateId().slice(0, 6)}`,
      studentName: formData.studentName,
      studentGrade: formData.studentGrade,
      parentName: formData.parentName,
      parentEmail: formData.parentEmail,
      parentPhone: formData.parentPhone,
      amount: parseFloat(formData.amount),
      description: formData.description,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      popFile: '',
      popDate: ''
    };
    
    const existing = getInvoices();
    setInvoices([...existing, invoice]);
    setGeneratedInvoice(invoice);
  };

  const handlePopUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && generatedInvoice) {
      const updated = getInvoices().map(inv => 
        inv.id === generatedInvoice.id 
          ? { ...inv, popFile: 'uploaded', popDate: new Date().toISOString() } 
          : inv
      );
      setInvoices(updated);
      setPopUploaded(true);
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="section-title">School Fee Management</h1>
          <a
            href="/payment"
            className="inline-flex items-center justify-center gap-2 bg-school-primary hover:bg-green-800 text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            Easy Payment Portal <ArrowRight size={18} />
          </a>
        </div>
        <p className="text-gray-600 mb-10">Generate an invoice below, or use the <a href="/payment" className="text-school-primary font-bold underline">Easy Payment Portal</a> to record a payment directly.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Instructions & Banking */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-green-50/50 text-gray-900 p-8 rounded-[2.5rem] border border-green-100 border-l-8 border-l-school-primary shadow-xl">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-school-primary">Banking Details</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account Holder</p>
                  <p className="font-bold text-gray-800">HARDING SECONDARY SCHOOL</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Bank</p>
                  <p className="font-bold text-gray-800">First National Bank (FNB)</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account Number</p>
                  <p className="font-bold text-school-primary text-xl">5240 4909 304</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Branch Code</p>
                  <p className="font-bold text-gray-800">220123</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Reference</p>
                  <p className="font-bold text-school-primary italic">CHILD’S NAME</p>
                </div>
              </div>
            </section>

            <section className="bg-green-50/50 text-gray-900 p-8 rounded-[2.5rem] border border-green-100 border-l-8 border-l-school-primary shadow-xl">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter text-school-primary">Hostel Banking Details</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account Holder</p>
                  <p className="font-bold text-gray-800">HARDING SECONDARY HOSTEL</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Bank</p>
                  <p className="font-bold text-gray-800">First National Bank (FNB)</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Account Number</p>
                  <p className="font-bold text-school-primary text-xl">5240 1044 971</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Branch Code</p>
                  <p className="font-bold text-gray-800">220123</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Reference</p>
                  <p className="font-bold text-school-primary italic">CHILD’S NAME</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
               <h3 className="font-black mb-4 uppercase tracking-tighter flex items-center gap-2">
                 <Info size={18} className="text-school-primary" /> Payment Process
               </h3>
               <ol className="text-sm text-gray-600 space-y-4 list-decimal pl-4 font-medium">
                  <li>Generate an official invoice using the form.</li>
                  <li>Make payment via EFT using the generated Reference.</li>
                  <li>Upload your Proof of Payment (POP) below.</li>
                  <li>Admin will verify the payment within 48 hours.</li>
               </ol>
            </section>
          </div>

          {/* Form / Invoice Area */}
          <div className="lg:col-span-2">
            {!generatedInvoice ? (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100"
              >
                <h3 className="text-2xl font-black text-black mb-8 flex items-center gap-3 uppercase tracking-tighter border-b-2 border-gray-100 pb-4">
                  <CreditCard className="text-school-primary" size={24} /> Generate Invoice
                </h3>
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Student Full Name</label>
                      <input 
                        required
                        value={formData.studentName}
                        onChange={e => setFormData({...formData, studentName: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Current Grade</label>
                      <select 
                        value={formData.studentGrade}
                        onChange={e => setFormData({...formData, studentGrade: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary outline-none"
                      >
                        <option>8</option><option>9</option><option>10</option><option>11</option><option>12</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Parent Name</label>
                      <input 
                        required
                        value={formData.parentName}
                        onChange={e => setFormData({...formData, parentName: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Amount (ZAR)</label>
                      <input 
                        required
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: e.target.value})}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-school-primary outline-none" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full btn-primary bg-school-primary hover:bg-green-800 py-5 text-white font-black uppercase tracking-[0.3em] transition-all">
                    Create Official Invoice
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
              >
                {/* Visual Invoice */}
                <div className="p-12" id="invoice-print">
                   <div className="flex justify-between items-start mb-12 border-b-2 border-school-primary pb-8">
                      <div className="flex items-center gap-4">
                         <img src="/Logo/logo.png" alt="Logo" className="w-20 h-20 rounded-xl" />
                         <div>
                            <h2 className="text-2xl font-black text-black leading-none">HSS Official</h2>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Harding Secondary School</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-4xl font-black text-school-primary uppercase italic">Invoice</p>
                         <p className="text-sm font-bold text-gray-500 mt-1">NO: {generatedInvoice.id}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-12 mb-12">
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Bill To:</p>
                         <h4 className="font-bold text-xl">{generatedInvoice.parentName}</h4>
                         <p className="text-gray-500">{generatedInvoice.studentName} — Grade {generatedInvoice.studentGrade}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Issue Date:</p>
                         <p className="font-bold">{generatedInvoice.createdDate}</p>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4 mb-2">Due Date:</p>
                         <p className="font-bold text-red-500">{generatedInvoice.dueDate}</p>
                      </div>
                   </div>

                   <div className="bg-gray-50 p-8 rounded-3xl mb-12">
                      <div className="flex justify-between font-bold text-sm uppercase tracking-widest text-gray-400 mb-4 px-2">
                         <span>Description</span>
                         <span>Total</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm font-black text-lg">
                         <span>{generatedInvoice.description}</span>
                         <span className="text-school-primary">R {generatedInvoice.amount.toFixed(2)}</span>
                      </div>
                   </div>

                   <div className="flex items-center gap-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                      <ShieldCheck className="text-school-primary shrink-0" size={32} />
                      <p className="text-sm font-medium text-gray-700 leading-snug">
                         This is a system-generated document for Harding Secondary School. Use the Bank Details on the left for payment.
                      </p>
                   </div>
                </div>

                {/* Post-Generation Actions */}
                <div className="bg-black p-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                   <div className="flex gap-2">
                      <button onClick={() => window.print()} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold uppercase transition-all">
                         <Printer size={18} /> Print
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-bold uppercase transition-all">
                         <Download size={18} /> Download PDF
                      </button>
                   </div>
                   
                   <div className="relative">
                      {!popUploaded ? (
                        <label className="bg-school-primary hover:bg-white hover:text-black text-white px-8 py-3 rounded-2xl flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all cursor-pointer shadow-xl">
                           <Upload size={18} /> Upload POP
                           <input type="file" className="hidden" onChange={handlePopUpload} />
                        </label>
                      ) : (
                        <div className="bg-green-500 text-white px-8 py-3 rounded-2xl flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                           <FileCheck size={18} /> POP Received
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
