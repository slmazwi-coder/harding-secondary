import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { getContact, type ContactInfo } from '../admin/utils/storage';

export const Contact = () => {
  const [info, setInfo] = useState<ContactInfo>(getContact());

  useEffect(() => {
    setInfo(getContact());
  }, []);
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-school-primary mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-school-primary rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Address</h3>
                  <p className="text-gray-600">Kirk Street, Harding, 4680</p>
                  <p className="text-gray-500 text-sm">Private Bag X1002, Harding, 4680</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-school-primary rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-600">063 540 5901</p>
                  <p className="text-gray-500 text-sm">082 505 3376 / 039 433 1223</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-school-primary rounded-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600">hardingsec@telkomsa.net</p>
                  <p className="text-gray-500 text-sm">harding-ss@kznschools.gov.za</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-school-primary rounded-xl">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Office Hours</h4>
                  <p className="text-gray-600">Monday - Thursday: {info.monThu}</p>
                  <p className="text-gray-600">Friday: {info.friday}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12 rounded-3xl overflow-hidden h-[400px] border-4 border-gray-100 shadow-md bg-gray-100 relative">
              <iframe 
                title="School Location"
                src="https://maps.google.com/maps?q=Harding%20Secondary%20School,%20Kirk%20Street,%20Harding,%204680,%20South%20Africa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-school-primary mb-8">Send us a Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-school-primary/20 outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-school-primary/20 outline-none"
                  placeholder="Your email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subject</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-school-primary/20 outline-none"
                  placeholder="What is this regarding?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Message</label>
                <textarea 
                  rows={4}
                  className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-school-primary/20 outline-none resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
