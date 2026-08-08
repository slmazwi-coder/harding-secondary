import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Staff', path: '/staff' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Activities', path: '/activities' },
  { name: 'Sports', path: '/sports' },
  { name: 'School Fees', path: '/school-fees' },
  { name: 'Policy', path: '/school-policy' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Contact', path: '/contact' },
  { name: 'Student Portal', path: '/student/login' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/Logo/logo.png" alt="Harding Secondary School Badge" className="h-12 w-12 rounded-xl object-cover border border-green-200 shadow-lg" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="hidden md:block">
                <span className="text-xl font-bold text-school-primary block leading-none">Harding Secondary School</span>
                <span className="text-xs font-semibold text-gray-500">KwaZulu-Natal | Porro Pergite — Ever Forward</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path
                    ? "text-school-primary bg-green-50"
                    : "text-gray-600 hover:text-school-primary hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-school-primary p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.path
                    ? "text-school-primary bg-green-50"
                    : "text-gray-600 hover:text-school-primary hover:bg-gray-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
