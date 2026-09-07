import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const faqs = [
  { 
    keywords: ['fee', 'price', 'cost', 'money', 'paying'], 
    answer: 'School fees for 2026 are R3 000 per annum with a registration fee of R1 500 payable before 31 December 2025. Hostel fees are R3 000 per month. Visit the "School Fees" page for banking details.' 
  },
  { 
    keywords: ['admission', 'apply', 'enrol', 'register'], 
    answer: 'Applications for Grade 8 are accepted from 1 April to 30 September each year (Grades 9 and 10 will be considered). Online applications are not available — collect a hard-copy application form from the school office at 1 Kirk Street. See the "Admissions" page for age limits and the documents you need to bring.' 
  },
  { 
    keywords: ['holiday', 'calendar', 'term', 'closed', 'break', 'reopen', 'agm'], 
    answer: 'School closes for Term 3 on 23 September 2026 and reopens for Term 4 on 6 October 2026. The Annual General Meeting is on 11 October 2026. Fun Day and Fun Run dates will be announced.' 
  },
  { 
    keywords: ['contact', 'phone', 'call', 'email', 'address', 'hours', 'open'], 
    answer: 'You can reach us at 082 505 3376 or email secretary@hardingsecondary.co.za. We are located at 1 Kirk Street, Harding, 4680. Office hours are Monday to Friday, 07:30 to 16:00.' 
  },
  { 
    keywords: ['principal', 'laurence', 'staff', 'deputy', 'teacher'], 
    answer: 'Our School Principal is TE Laurence, supported by Deputy Principals AP Msizazwe and A Vally. The school has 43 educators — see the "Staff" page for the full list by department.' 
  },
  { 
    keywords: ['subject', 'stream', 'science', 'commerce', 'humanities', 'academic', 'package'], 
    answer: 'From Grade 10 learners choose one of four streams: Sciences (Mathematics, Physical Sciences, Life Sciences, Geography or Agricultural Sciences), Commerce (Accounting, Business Studies, Economics or CAT), Humanities A (Geography, History, Agricultural or Life Sciences) or Humanities B (History, Consumer Studies, Tourism). Two languages and Life Orientation are compulsory.' 
  },
  { 
    keywords: ['sport', 'rugby', 'soccer', 'netball', 'volleyball', 'chess', 'athletics', 'hockey', 'basketball', 'tennis'], 
    answer: 'We offer Rugby, Soccer, Volleyball, Table Tennis, Netball, Athletics, Chess, Basketball and Hockey, mostly at U15, U17 and U19 level. Our sports coordinators are JB Nkhonza-Grimett and B Mthembu. Visit the "Sports" page for more.' 
  },
  { 
    keywords: ['result', 'pass rate', 'matric', 'nsc'], 
    answer: 'Our National Senior Certificate pass rates were 93.7% in 2023, 87.5% in 2024 and 85.1% in 2025.' 
  },
  { 
    keywords: ['history', 'motto', 'vision', 'mission', 'value'], 
    answer: 'Harding Secondary began as a mission school and opened to learners of all backgrounds in 1994. Our motto is "Porro Pergite — Ever Forward" and our values are Integrity, Caring, Respect, Diligence, Professionalism, Innovation and Dedication. Read more on the "About" page.' 
  },
  { 
    keywords: ['hostel', 'boarding', 'accommodation'], 
    answer: 'The school offers hostel accommodation for both boys and girls in a supervised, structured environment. Contact the office at 082 505 3376 for hostel enquiries.' 
  }
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am the HSS Assistant. How can I help you with information about Harding Secondary School?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simple matching
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const match = faqs.find(f => f.keywords.some(k => lowerInput.includes(k)));
      
      const botResponse = match 
        ? match.answer 
        : "I'm not exactly sure about that. Please contact the school office at 082 505 3376 or secretary@hardingsecondary.co.za for more details!";
      
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-school-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-[100]"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[100] border border-gray-100"
          >
            {/* Header */}
            <div className="bg-school-primary p-6 text-white text-center relative">
              <Bot className="mx-auto mb-2" size={32} />
              <h3 className="font-bold text-lg">HSS Assistant</h3>
              <p className="text-green-100 text-xs uppercase tracking-widest font-bold">Online & Ready</p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-school-primary text-white rounded-tr-none shadow-lg' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me something..."
                className="flex-grow px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-school-primary/20"
              />
              <button 
                onClick={handleSend}
                className="w-12 h-12 bg-school-primary text-white rounded-xl flex items-center justify-center hover:bg-school-secondary transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
