import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle, AlertCircle, FileText, MapPin, Phone, Mail } from 'lucide-react';
import { getContact } from '../admin/utils/storage';

const ageLimits = [
  { grade: 'Grade 8', age: 14 },
  { grade: 'Grade 9', age: 15 },
  { grade: 'Grade 10', age: 16 },
  { grade: 'Grade 11', age: 17 },
  { grade: 'Grade 12', age: 18 },
];

const requiredDocuments = [
  'Learner portfolio from previous school',
  'Previous school report, including transfer letter',
  'Conduct record',
  'Medical history / health form',
  'Proof of residence',
  'Salary advice of both parents',
  'Three months\' bank statements',
  'Unabridged birth certificate(s)',
];

export const Admissions = () => {
  const contact = getContact();

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">Admissions</h1>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-school-primary p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Applications for the 2027 Academic Year</h2>
            <p className="text-green-100">
              Harding Secondary School accepts applications for Grade 8. Applications for Grades 9 and 10 will be considered where space is available.
            </p>
          </div>

          <div className="p-8 space-y-12">
            {/* Dates */}
            <section>
              <h3 className="text-xl font-bold text-school-primary border-b pb-2 mb-6 flex items-center gap-2">
                <CalendarDays size={22} /> Application Window
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 rounded-2xl p-6 border-l-4 border-school-primary">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500">Applications open</p>
                  <p className="text-3xl font-black text-school-primary mt-1">1 April</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500">Applications close</p>
                  <p className="text-3xl font-black text-yellow-700 mt-1">30 September</p>
                </motion.div>
              </div>
            </section>

            {/* How to apply */}
            <section className="bg-yellow-50 p-6 rounded-2xl flex gap-4 items-start">
              <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={24} />
              <div className="text-sm text-yellow-900 space-y-2">
                <p className="font-bold text-base">Online applications are not available.</p>
                <p>
                  Application forms must be collected from, and returned in hard copy to, the school office at {contact.address}
                  {' '}({contact.monThu}, Monday to Friday). Incomplete applications will not be processed.
                </p>
              </div>
            </section>

            {/* Age limits */}
            <section>
              <h3 className="text-xl font-bold text-school-primary border-b pb-2 mb-6">Maximum Age per Grade</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {ageLimits.map(a => (
                  <div key={a.grade} className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{a.grade}</p>
                    <p className="text-3xl font-black text-gray-900 mt-1">{a.age}</p>
                    <p className="text-xs text-gray-500">years</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Required documents */}
            <section>
              <h3 className="text-xl font-bold text-school-primary border-b pb-2 mb-6 flex items-center gap-2">
                <FileText size={22} /> Admission Criteria &amp; Required Documents
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requiredDocuments.map(doc => (
                  <li key={doc} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <CheckCircle size={20} className="text-school-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact */}
            <section className="bg-school-primary/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-school-primary mb-4">Admissions Enquiries</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                <p className="flex items-center gap-2"><MapPin size={18} className="text-school-primary shrink-0" /> {contact.address}</p>
                <p className="flex items-center gap-2"><Phone size={18} className="text-school-primary shrink-0" /> {contact.phone}</p>
                <p className="flex items-center gap-2"><Mail size={18} className="text-school-primary shrink-0" /> {contact.email}</p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                See the <Link to="/school-fees" className="text-school-primary font-semibold hover:underline">School Fees</Link> page for fee information and the{' '}
                <Link to="/activities" className="text-school-primary font-semibold hover:underline">Academics</Link> page for the Grade 10–12 subject packages.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
