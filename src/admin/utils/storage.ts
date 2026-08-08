// Storage utility — localStorage wrapper (swap with Supabase later)

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  grade: string;
  subject: string;
  category?: string;
  fileData: string; // base64 for demo
  fileName: string;
  uploadDate: string;
}

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  dob: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  address: string;
  previousSchool: string;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  submittedDate: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  monThu: string;
  friday: string;
  weekend: string;
}

export interface AboutInfo {
  historyParagraphs: string[];
  principalName: string;
  principalTitle: string;
  principalMessage: string[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface PolicyInfo {
  introduction: string;
  lastUpdated: string;
  sections: { title: string; content: string[] }[];
}

export interface AchieverEntry {
  id: string;
  name: string;
  achievement: string;
  image: string;
}

export interface HallOfFameEntry {
  id: string;
  name: string;
  title: string;
  year: string;
  desc: string;
  image: string;
}

export interface YearResults {
  overall: number;
  bachelor: number;
  bachelorRate: number;
  distinctions: number;
  wrote: number;
  subjects: { subject: string; rate: number }[];
}

// Generic CRUD helpers
function getItems<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setItems<T>(key: string, items: T[]): void {
  localStorage.setItem(key, JSON.stringify(items));
}

function getObject<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setObject<T>(key: string, obj: T): void {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// News
const defaultNews: NewsItem[] = [
  {
    id: '1',
    title: "2027 Admissions Open",
    date: "August 2026",
    content: "Applications for the 2027 academic year are now open. Visit the Admissions portal to register and learn about the R1 500 registration fee and R3 000 annual school fees.",
    image: ""
  },
  {
    id: '2',
    title: "2026 Term 1 Re-opening",
    date: "December 2025",
    content: "School re-opens on 12 January 2026 for educators and 14 January 2026 for learners. The 2026 school fees are R3 000 per annum, payable into the school's FNB account.",
    image: ""
  },
  {
    id: '3',
    title: "Important 2026 Term 1 Dates",
    date: "December 2025",
    content: "Awards Day 23 Jan, Valentine's Celebration 14 Feb, Cross Country 20 Feb, Road Relay 25 Feb, Inter-House Sports Day 27 Feb, Career Day 10 Mar and Matric Farewell 10 Apr.",
    image: ""
  }
];
export const getNews = () => getItems<NewsItem>('admin_news').length ? getItems<NewsItem>('admin_news') : defaultNews;
export const setNews = (items: NewsItem[]) => setItems('admin_news', items);

// Documents
export const getDocuments = () => getItems<DocumentItem>('admin_documents');
export const setDocuments = (items: DocumentItem[]) => setItems('admin_documents', items);

// Applications
export const getApplications = () => getItems<Application>('admin_applications');
export const setApplications = (items: Application[]) => setItems('admin_applications', items);

// Contact
const defaultContact: ContactInfo = {
  address: 'Kirk Street, Harding, 4680',
  phone: '063 540 5901',
  email: 'hardingsec@telkomsa.net',
  monThu: '07:30 - 15:00',
  friday: '07:30 - 13:00',
  weekend: 'Closed',
};
export const getContact = () => getObject<ContactInfo>('admin_contact', defaultContact);
export const setContact = (info: ContactInfo) => setObject('admin_contact', info);

// About
const defaultAbout: AboutInfo = {
  historyParagraphs: [
    'Harding Secondary School is a public school in Harding, KwaZulu-Natal, serving the local community with a comprehensive curriculum for the senior phase and FET band. The school is situated on Kirk Street in the Umuziwabantu Local Municipality of the Ugu District.',
    'Our motto, "Porro Pergite" — Ever Forward — guides our commitment to academic achievement, discipline and holistic learner development. We are proud of our green blazer tradition and the values that unite our learners and educators.',
    'Under the leadership of Principal TE Laurence, Harding Secondary School continues to nurture a safe, disciplined environment where every learner can grow academically and personally. We currently serve over 1 200 learners with a dedicated team of educators.',
  ],
  principalName: 'TE Laurence',
  principalTitle: 'School Principal',
  principalMessage: [
    'Welcome to Harding Secondary School. It is an honour to lead this vibrant school community in Harding, KwaZulu-Natal.',
    'Together with our dedicated staff, we strive to uphold discipline, academic excellence and the values captured in our motto: Porro Pergite — Ever Forward.',
  ],
};

const defaultPolicy: PolicyInfo = {
  introduction: "Harding Secondary School is committed to creating a safe, disciplined environment that supports teaching, learning and the wellbeing of every learner.",
  lastUpdated: "January 2026",
  sections: [
    { title: "Uniform & Dress Code", content: [
      "The green blazer is compulsory for all grades.",
      "Boys: green blazer with school badge, school grey trousers, white collar shirt, school tie, black school shoes (Bata Toughees), grey socks, white crew neck T-shirt, black belt and a green V-neck jersey for winter.",
      "Girls: green blazer with school badge, green skirt and shirt for Grade 8, green tunic, white collar shirt, white socks, black shoes, green V-neck jersey for winter and black stockings for winter.",
      "The new Grade 8 girls' uniform is optional; other learners may wear it if they wish. Uniform items can be purchased at Nu Fair in Harding.",
    ]},
    { title: "School Policies", content: [
      "Tracksuits may not be worn to school except on Sports Day or when Harding Secondary is playing against another school.",
      "No gel, fades, fancy haircuts, braids, highlights, dyed hair or fan tales are allowed.",
      "Hair must be neatly trimmed.",
      "Excessively shortened trousers are not allowed.",
      "No fashion shoes, suede shoes, Hush Puppies, Sebago style, Dakotas or similar are allowed.",
      "No coloured or secret ankle socks are allowed.",
      "Cell phones are not allowed at school. They will be confiscated until the end of the year and a R250 fine will be imposed.",
      "Learners must arrive on time. Late or absent learners must present a letter with the parent's contact number and signature explaining the reason.",
      "Drugs and alcohol are serious problems; parents must monitor children closely. Bunking classes is on the increase and will be addressed.",
      "Learners renting rooms without adult supervision is a huge problem; such cases will be reported to Social Services and SAPS.",
    ]},
    { title: "Hostel & Fees", content: [
      "School fees for 2026 are R3 000 per annum.",
      "The registration fee of R1 500 must be paid before 31 December 2025 into the school's banking account. Non-payment will result in the learner not being issued textbooks and/or stationery.",
      "The on-site girls' hostel accommodates up to 200 girls. Hostel fees for 2026 are R3 000 per month, with a compulsory non-refundable R500 fee accompanying the first monthly payment.",
      "No new boys will be enrolled at the hostel from January 2026 as enrolment is phased out.",
      "No learner with an outstanding 2025 balance will be allowed to return in 2026.",
    ]},
    { title: "Important Term 1 Dates", content: [
      "Educators return: 12 January 2026",
      "Learners return: 14 January 2026",
      "Awards Day: 23 January 2026",
      "Valentine's Celebration: 14 February 2026",
      "Cross Country: 20 February 2026",
      "Road Relay: 25 February 2026",
      "Annual Inter-House Sports Day: 27 February 2026",
      "Career Day: 10 March 2026",
      "Matric Farewell: 10 April 2026",
    ]},
  ]
};
export const getAbout = () => getObject<AboutInfo>('admin_about', defaultAbout);
export const setAbout = (info: AboutInfo) => setObject('admin_about', info);

export const getPolicy = () => getObject<PolicyInfo>('admin_policy', defaultPolicy);
export const setPolicy = (info: PolicyInfo) => setObject('admin_policy', info);

// Academic Activities
const defaultAcademic: Activity[] = [
  { id: '1', name: 'isiZulu Home Language', category: 'Academic', description: 'Developing strong communication and literature skills in isiZulu.', image: '' },
  { id: '2', name: 'English First Additional Language', category: 'Academic', description: 'Building English proficiency for further study and the world of work.', image: '' },
  { id: '3', name: 'Mathematics & Mathematical Literacy', category: 'Academic', description: 'From problem solving and algebra to everyday numeracy and finance.', image: '' },
  { id: '4', name: 'Physical Sciences', category: 'Academic', description: 'Physics and Chemistry for learners pursuing science and engineering paths.', image: '' },
  { id: '5', name: 'Life Sciences', category: 'Academic', description: 'Exploring biology, ecology and human health through practical investigation.', image: '' },
  { id: '6', name: 'Agricultural Sciences', category: 'Academic', description: 'Agricultural theory and practice rooted in the local context.', image: '' },
  { id: '7', name: 'History', category: 'Academic', description: 'Understanding our past to shape informed, active citizens.', image: '' },
  { id: '8', name: 'Geography', category: 'Academic', description: 'Physical and human geography, map skills and environmental awareness.', image: '' },
  { id: '9', name: 'Business Studies', category: 'Academic', description: 'Entrepreneurship, management and the business environment.', image: '' },
  { id: '10', name: 'Economics', category: 'Academic', description: 'Micro- and macro-economics, markets and policy.', image: '' },
  { id: '11', name: 'Accounting', category: 'Academic', description: 'Financial literacy, bookkeeping and commercial accounting.', image: '' },
  { id: '12', name: 'Life Orientation', category: 'Academic', description: 'Guidance on career, health, citizenship and personal development.', image: '' },
  { id: '13', name: 'Choral Music', category: 'Culture', description: 'School choir and vocal ensembles performing at school and community events.', image: '' },
  { id: '14', name: 'Drama & Public Speaking', category: 'Culture', description: 'Building confidence, expression and performance skills.', image: '' },
  { id: '15', name: 'Debating', category: 'Culture', description: 'Developing critical thinking and eloquent argumentation.', image: '' },
];
export const getAcademicActivities = () => getItems<Activity>('admin_academic').length ? getItems<Activity>('admin_academic') : defaultAcademic;
export const setAcademicActivities = (items: Activity[]) => setItems('admin_academic', items);

// Sports
export interface Sport {
  id: string;
  name: string;
  image: string;
  description: string;
  ageGroups: string[]; // e.g. ["u/13", "u/15", "Senior Team"]
  hallOfFame: { name: string; achievement: string; image: string }[];
}
const defaultSports: Sport[] = [
  { id: 's1', name: 'Soccer', image: '', description: 'Boys and girls soccer teams compete in local and district fixtures.', ageGroups: ['u/14', 'u/16', 'Open'], hallOfFame: [] },
  { id: 's2', name: 'Netball', image: '', description: 'Fast-paced netball across junior and senior age groups.', ageGroups: ['u/14', 'u/16', 'Open'], hallOfFame: [] },
  { id: 's3', name: 'Rugby', image: '', description: 'Rugby development from junior levels to the senior open team.', ageGroups: ['u/14', 'u/16', 'Open'], hallOfFame: [] },
  { id: 's4', name: 'Cricket', image: '', description: 'Cricket coaching and friendly matches throughout the season.', ageGroups: ['u/14', 'u/16', 'Open'], hallOfFame: [] },
  { id: 's5', name: 'Athletics', image: '', description: 'Track and field events preparing learners for inter-school competition.', ageGroups: ['u/14', 'u/16', 'Open'], hallOfFame: [] },
];
export const getSports = () => getItems<Sport>('admin_sports').length ? getItems<Sport>('admin_sports') : defaultSports;
export const setSports = (items: Sport[]) => setItems('admin_sports', items);

// Achievers by year
export const getAchieversByYear = (year: string) => getItems<AchieverEntry>(`admin_achievers_${year}`);
export const setAchieversByYear = (year: string, items: AchieverEntry[]) => setItems(`admin_achievers_${year}`, items);

// Hall of Fame
const defaultHall: HallOfFameEntry[] = [
  { id: '1', name: '[ACHIEVER 1]', title: 'Top Achiever', year: '2025', desc: 'Awaiting Records', image: '' },
  { id: '2', name: '[ACHIEVER 2]', title: 'Top Achiever', year: '2024', desc: 'Awaiting Records', image: '' },
];
export const getHallOfFame = () => getItems<HallOfFameEntry>('admin_hall_of_fame').length ? getItems<HallOfFameEntry>('admin_hall_of_fame') : defaultHall;
export const setHallOfFame = (items: HallOfFameEntry[]) => setItems('admin_hall_of_fame', items);

// Results by year
const defaultResults: Record<string, YearResults> = {
  "2024": {
    overall: 87.5,
    bachelor: 0,
    bachelorRate: 0,
    distinctions: 0,
    wrote: 0,
    subjects: []
  },
  "2023": {
    overall: 91.3,
    bachelor: 0,
    bachelorRate: 0,
    distinctions: 0,
    wrote: 0,
    subjects: []
  },
};
export const getResultsByYear = (year: string) => getObject<YearResults | null>(`admin_results_${year}`, defaultResults[year] || null);
export const setResultsByYear = (year: string, data: YearResults) => setObject(`admin_results_${year}`, data);

// Auth
export const isAuthenticated = () => localStorage.getItem('admin_auth') === 'true';
export const login = (password: string): boolean => {
  if (password === 'harding2026') {
    localStorage.setItem('admin_auth', 'true');
    return true;
  }
  return false;
};
export const logout = () => localStorage.removeItem('admin_auth');

// Invoices
export interface Invoice {
  id: string;
  studentName: string;
  studentGrade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  amount: number;
  description: string;
  dueDate: string;
  createdDate: string;
  status: string;
  popFile: string;
  popDate: string;
}
export const getInvoices = () => getItems<Invoice>('admin_invoices');
export const setInvoices = (items: Invoice[]) => setItems('admin_invoices', items);
