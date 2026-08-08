import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Info, Trophy, FileText, Activity, Users, Phone, User, DollarSign, FolderUp } from 'lucide-react';

const cards = [
  { label: 'News', desc: 'Add, edit, or remove news articles', icon: Newspaper, path: '/admin/news', color: 'bg-green-600' },
  { label: 'About', desc: 'Edit school history & principal info', icon: Info, path: '/admin/about', color: 'bg-emerald-600' },
  { label: 'Achievements', desc: 'Manage results & Hall of Fame', icon: Trophy, path: '/admin/achievements', color: 'bg-yellow-600' },
  { label: 'Documents', desc: 'Upload & manage school documents', icon: FileText, path: '/admin/documents', color: 'bg-purple-600' },
  { label: 'Academic', desc: 'Manage debate, spelling bee, etc.', icon: Activity, path: '/admin/academic', color: 'bg-orange-600' },
  { label: 'Sports', desc: 'Manage sport codes & Hall of Fame', icon: Trophy, path: '/admin/sports', color: 'bg-green-600' },
  { label: 'Applications', desc: 'Review student applications', icon: Users, path: '/admin/applications', color: 'bg-red-600' },
  { label: 'Staff', desc: 'Update staff directory', icon: User, path: '/admin/staff', color: 'bg-blue-600' },
  { label: 'Payments', desc: 'Confirm fee & registration payments', icon: DollarSign, path: '/admin/payments', color: 'bg-pink-600' },
  { label: 'Student Docs', desc: 'Upload reports for the student portal', icon: FolderUp, path: '/admin/student-documents', color: 'bg-indigo-600' },
  { label: 'Contact', desc: 'Update contact information', icon: Phone, path: '/admin/contact', color: 'bg-teal-600' },
];

export const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, Administrator</h1>
      <p className="text-gray-400 mb-10">Manage your website content from here. Select a section below.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.path}
              to={card.path}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-school-primary transition-all group"
            >
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{card.label}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
