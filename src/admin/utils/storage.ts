// Storage utility — localStorage wrapper (swap with Supabase later)

// ── Cache-buster: if stored data version doesn't match, clear stale school data ──
const SCHOOL_DATA_VERSION = 'harding-v4';
if (localStorage.getItem('school_data_version') !== SCHOOL_DATA_VERSION) {
  ['admin_about', 'admin_contact', 'admin_news', 'admin_staff', 'admin_payments', 'admin_sports', 'admin_academic'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('school_data_version', SCHOOL_DATA_VERSION);
}

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
  studentNumber?: string;
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
    title: "School Closes for Term 3",
    date: "23 September 2026",
    content: "School closes for Term 3 on Wednesday, 23 September 2026. We wish all learners and families a safe and restful break.",
    image: ""
  },
  {
    id: '2',
    title: "School Reopens for Term 4",
    date: "6 October 2026",
    content: "School reopens for Term 4 on Tuesday, 6 October 2026. Learners are expected to arrive on time and in full school uniform.",
    image: ""
  },
  {
    id: '3',
    title: "Annual General Meeting (AGM)",
    date: "11 October 2026",
    content: "The school's Annual General Meeting will be held on 11 October 2026. All parents and guardians are encouraged to attend.",
    image: ""
  },
  {
    id: '4',
    title: "2027 Admissions: Grade 8",
    date: "1 April – 30 September",
    content: "Applications for Grade 8 in 2027 are open from 1 April to 30 September. Grade 9 and 10 applications will be considered. Visit the Admissions page for the requirements.",
    image: ""
  },
  {
    id: '5',
    title: "Fun Day & Fun Run",
    date: "Dates to be announced",
    content: "The school will be hosting a Fun Day and a Fun Run this term. Dates will be confirmed and shared with parents shortly.",
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
  address: '1 Kirk Street, Harding, 4680',
  phone: '082 505 3376',
  email: 'secretary@hardingsecondary.co.za',
  monThu: '07:30 - 16:00',
  friday: '07:30 - 16:00',
  weekend: 'Closed',
};
export const getContact = () => getObject<ContactInfo>('admin_contact', defaultContact);
export const setContact = (info: ContactInfo) => setObject('admin_contact', info);

// About
const defaultAbout: AboutInfo = {
  historyParagraphs: [
    'Harding Secondary School has a rich history that reflects the changing social and political landscape of South Africa. The school began as a mission school during the apartheid era, when education was separated according to race, and catered specifically for Coloured learners. With the advent of democracy in 1994, the school opened its doors to learners from all racial and cultural backgrounds, becoming a truly diverse and inclusive institution.',
    'Today, Harding Secondary School is a Quintile 4, Section 21 fee-paying, multicultural school situated at 1 Kirk Street in Harding, in the UGU District of KwaZulu-Natal, under the uMuziwabantu Local Municipality. Harding itself was established as a British military outpost in the 1870s and was named after Sir Walter Harding, the first Chief Justice of Natal.',
    'The school offers Grades 8 to 12 with a range of National Senior Certificate (NSC) subjects across four subject streams, and provides both education and hostel facilities for boys and girls. It has continued to grow in learner numbers and staff capacity — today serving over 1 270 learners with 43 educators — while remaining committed to developing learners holistically: academically, socially and personally.',
    'From its beginnings as a mission school serving a racially restricted community to its present role as a multicultural school in democratic South Africa, Harding Secondary School\'s history is one of transformation, inclusion and growth. Our motto, "Porro Pergite" — Ever Forward — guides everything we do.',
  ],
  principalName: 'TE Laurence',
  principalTitle: 'School Principal',
  principalMessage: [
    'Our school is committed to providing every learner with a safe, disciplined, supportive and academically focused environment in which they can develop and reach their full potential. We believe that education is a partnership between the school, learners, parents and the wider community, and that strong parent-teacher relationships are essential to the success and wellbeing of every learner.',
    'We place great emphasis on good discipline, respect, responsibility and positive learner behaviour. Our aim is to create an environment where teaching and learning can take place effectively and where every learner understands the importance of respecting educators, fellow learners, school property and the values of our school. We encourage parents to work closely with the school in promoting good behaviour, regular attendance, punctuality, respect and a commitment to academic excellence.',
    'Our school is proud to have qualified and dedicated educators who are committed to providing quality education and supporting learners in their academic development. We strive to maintain manageable class sizes, where possible, to enable meaningful teaching, learning and individual attention to learners.',
    'As a Quintile 4, Section 21 fee-paying school, we are able to take greater responsibility for certain aspects of the management and development of the school. School fees play an important role in assisting us to maintain and improve educational resources, facilities and opportunities for our learners. We encourage all parents to fulfil their financial responsibilities towards the school, as this contributes directly to the continued provision of quality education.',
    'We firmly believe that parents are their children\'s first and most important educators. For this reason, we encourage open communication and positive cooperation between parents and teachers. Parents are warmly invited to visit the school, engage with educators and become actively involved in the education and development of their children.',
    'Our school also offers hostel accommodation for both boys and girls. The hostel provides learners with a structured and supportive environment, with appropriate supervision to promote their safety, wellbeing, discipline and academic development. We understand that a hostel becomes a home away from home for many learners, and we are committed to ensuring that learners are cared for in a safe, orderly and supportive environment under full supervision.',
    'We remain committed to providing a school environment where learners can learn, grow and prepare themselves for a successful future. Together, as parents, educators and learners, we can make a meaningful difference in the lives and future of our children. We warmly welcome you to visit our school and become part of our school community.',
  ],
};

const defaultPolicy: PolicyInfo = {
  introduction: "Harding Secondary School is committed to creating a safe, disciplined environment that supports teaching, learning and the wellbeing of every learner.",
  lastUpdated: "September 2026",
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
      "No learner with an outstanding 2025 balance will be allowed to return in 2026.",
    ]},
    { title: "Important Dates", content: [
      "School closes for Term 3: 23 September 2026",
      "School reopens for Term 4: 6 October 2026",
      "Annual General Meeting (AGM): 11 October 2026",
      "Fun Day and Fun Run: dates to be announced",
    ]},
  ]
};
export const getAbout = () => getObject<AboutInfo>('admin_about', defaultAbout);
export const setAbout = (info: AboutInfo) => setObject('admin_about', info);

export const getPolicy = () => getObject<PolicyInfo>('admin_policy', defaultPolicy);
export const setPolicy = (info: PolicyInfo) => setObject('admin_policy', info);

// Academic Activities
const defaultAcademic: Activity[] = [
  { id: '1', name: 'English Home Language & FAL', category: 'Academic', description: 'English as Home Language or First Additional Language across Grades 8–12.', image: '' },
  { id: '2', name: 'isiZulu Home Language & FAL', category: 'Academic', description: 'isiZulu as Home Language or First Additional Language; English HL and isiZulu HL streams from Grade 8.', image: '' },
  { id: '3', name: 'Afrikaans First Additional Language', category: 'Academic', description: 'Afrikaans offered as a First Additional Language option.', image: '' },
  { id: '4', name: 'Mathematics & Mathematical Literacy', category: 'Academic', description: 'Mathematics (60% term average required for the Sciences stream) or Mathematical Literacy.', image: '' },
  { id: '5', name: 'Life Orientation', category: 'Academic', description: 'Compulsory in all grades: career guidance, health, citizenship and personal development.', image: '' },
  { id: '6', name: 'Physical Sciences', category: 'Academic', description: 'Physics and Chemistry for learners in the Sciences stream.', image: '' },
  { id: '7', name: 'Life Sciences', category: 'Academic', description: 'Biology, ecology and human health — Sciences and Humanities A streams.', image: '' },
  { id: '8', name: 'Agricultural Sciences', category: 'Academic', description: 'Agricultural theory and practice rooted in the local context.', image: '' },
  { id: '9', name: 'Geography', category: 'Academic', description: 'Physical and human geography, map skills and environmental awareness.', image: '' },
  { id: '10', name: 'History', category: 'Academic', description: 'Understanding our past to shape informed, active citizens.', image: '' },
  { id: '11', name: 'Accounting', category: 'Academic', description: 'Financial literacy, bookkeeping and commercial accounting — Commerce stream.', image: '' },
  { id: '12', name: 'Business Studies', category: 'Academic', description: 'Entrepreneurship, management and the business environment.', image: '' },
  { id: '13', name: 'Economics', category: 'Academic', description: 'Micro- and macro-economics, markets and policy.', image: '' },
  { id: '14', name: 'Computer Applications Technology (CAT)', category: 'Academic', description: 'Practical computer skills and information management.', image: '' },
  { id: '15', name: 'Consumer Studies', category: 'Academic', description: 'Food, nutrition, clothing and consumer rights — Humanities B stream.', image: '' },
  { id: '16', name: 'Tourism', category: 'Academic', description: 'Tourism sectors, destinations and customer care — Humanities B stream.', image: '' },
  { id: '17', name: 'Natural Sciences & Technology', category: 'Academic', description: 'Foundational science and technology in the GET Phase (Grades 8 & 9).', image: '' },
  { id: '18', name: 'Music', category: 'Culture', description: 'Music and vocal performance at school and community events.', image: '' },
  { id: '19', name: 'Chess Club', category: 'Culture', description: 'Strategy and critical thinking; learners compete at UGU district level.', image: '' },
];

// Subject streams (Grades 10–12)
export interface SubjectStream {
  id: string;
  name: string;
  classLabel: string;
  compulsory: string[];
  electives: string[];
  note?: string;
}
export const subjectStreams: SubjectStream[] = [
  {
    id: 'sciences',
    name: 'Sciences',
    classLabel: 'Grade 10A',
    compulsory: ['English (HL or FAL)', 'isiZulu (HL or FAL) or Afrikaans FAL', 'Life Orientation', 'Mathematics'],
    electives: ['Physical Sciences', 'Life Sciences', 'Geography or Agricultural Sciences'],
    note: 'A minimum of 60% in Mathematics in each term is required for the Sciences stream.',
  },
  {
    id: 'commerce',
    name: 'Commerce',
    classLabel: 'Grade 10B',
    compulsory: ['English (HL or FAL)', 'isiZulu (HL or FAL) or Afrikaans FAL', 'Life Orientation', 'Mathematics or Mathematical Literacy'],
    electives: ['Accounting', 'Business Studies', 'Economics or Computer Applications Technology (CAT)'],
  },
  {
    id: 'humanities-a',
    name: 'Humanities A',
    classLabel: 'Grade 10C',
    compulsory: ['English (HL or FAL)', 'isiZulu (HL or FAL) or Afrikaans FAL', 'Life Orientation', 'Mathematical Literacy'],
    electives: ['Geography', 'Agricultural Sciences or Life Sciences', 'History'],
  },
  {
    id: 'humanities-b',
    name: 'Humanities B',
    classLabel: 'Grade 10D',
    compulsory: ['English (HL or FAL)', 'isiZulu (HL or FAL) or Afrikaans FAL', 'Life Orientation', 'Mathematical Literacy'],
    electives: ['History', 'Consumer Studies', 'Tourism'],
  },
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
  { id: 's1', name: 'Rugby', image: '', description: 'Winter season. Rugby development from U15 through to the U19 team, with learners selected for KZN provincial squads.', ageGroups: ['U15', 'U17', 'U19'], hallOfFame: [
    { name: 'Aluyolo Sigamla (Gr. 10)', achievement: 'U16 KZN Rugby', image: '' },
    { name: 'Njabulo Mthembu (Gr. 10)', achievement: 'U15 KZN Rugby', image: '' },
  ] },
  { id: 's2', name: 'Soccer', image: '', description: 'Played all year round. Boys and girls teams compete in UGU district and KZN fixtures.', ageGroups: ['U15', 'U17', 'U19'], hallOfFame: [
    { name: 'Lwandile Khambule (Gr. 9)', achievement: 'U17 UGU & KZN Soccer', image: '' },
    { name: 'Taygen Pandohe (Gr. 9)', achievement: 'U17 UGU Soccer', image: '' },
    { name: 'Musawakhe Mpisi (Gr. 9)', achievement: 'U17 UGU Soccer', image: '' },
  ] },
  { id: 's3', name: 'Volleyball', image: '', description: 'Summer and winter seasons. Fast-paced volleyball across junior and senior age groups.', ageGroups: ['U15', 'U17', 'U19'], hallOfFame: [
    { name: 'Vuyokazi Miya (Gr. 9)', achievement: 'U17 KZN Volleyball', image: '' },
    { name: 'Shehroz Tiwana (Gr. 8)', achievement: 'U15 UGU Volleyball & Chess', image: '' },
  ] },
  { id: 's4', name: 'Netball', image: '', description: 'Summer and winter seasons. Netball across all age groups with learners representing UGU and KZN.', ageGroups: ['U15', 'U17', 'U19'], hallOfFame: [
    { name: 'Bonolo Pakkies (Gr. 12)', achievement: 'U19 KZN Netball', image: '' },
    { name: 'Mpho Pakkies (Gr. 9)', achievement: 'U16 UGU Netball', image: '' },
  ] },
  { id: 's5', name: 'Athletics', image: '', description: 'Summer season. Track and field events preparing learners for inter-school competition.', ageGroups: ['U15', 'U17', 'U19'], hallOfFame: [] },
  { id: 's6', name: 'Chess', image: '', description: 'Chess Club runs all year round, developing strategy and concentration.', ageGroups: ['U15', 'U17', 'U19'], hallOfFame: [
    { name: 'Shehroz Tiwana (Gr. 8)', achievement: 'U15 UGU Chess', image: '' },
  ] },
  { id: 's7', name: 'Table Tennis', image: '', description: 'Played all year round at U15 level.', ageGroups: ['U15'], hallOfFame: [] },
  { id: 's8', name: 'Hockey', image: '', description: 'Winter season hockey at U15 level.', ageGroups: ['U15'], hallOfFame: [] },
  { id: 's9', name: 'Basketball', image: '', description: 'Summer season basketball for the U19 team.', ageGroups: ['U19'], hallOfFame: [] },
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
  "2025": {
    overall: 85.1,
    bachelor: 0,
    bachelorRate: 0,
    distinctions: 0,
    wrote: 0,
    subjects: []
  },
  "2024": {
    overall: 87.5,
    bachelor: 0,
    bachelorRate: 0,
    distinctions: 0,
    wrote: 0,
    subjects: []
  },
  "2023": {
    overall: 93.7,
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
  status: 'Pending' | 'Paid' | 'Overdue';
  method?: string;
  popFile: string;
  popDate: string;
}
export const getInvoices = () => getItems<Invoice>('admin_invoices');
export const setInvoices = (items: Invoice[]) => setItems('admin_invoices', items);

// Payments (parent-initiated fee payments)
export interface Payment {
  id: string;
  studentName: string;
  studentGrade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  amount: number;
  method: 'EFT' | 'Cash' | 'Card' | 'Other';
  reference: string;
  description: string;
  status: 'Pending' | 'Confirmed' | 'Rejected';
  createdDate: string;
  popFile: string;
  popDate: string;
}
export const getPayments = () => getItems<Payment>('admin_payments');
export const setPayments = (items: Payment[]) => setItems('admin_payments', items);

// Student documents for the student portal
export interface StudentDoc {
  id: string;
  studentNumber: string;
  title: string;
  category: string;
  year: string;
  term?: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
}
function getStudentDocKey(studentNumber: string) {
  return `harding_student_docs_${studentNumber.trim().toLowerCase()}`;
}
export const getStudentDocs = (studentNumber: string): StudentDoc[] => {
  try {
    const raw = localStorage.getItem(getStudentDocKey(studentNumber));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
};
export const setStudentDocs = (studentNumber: string, docs: StudentDoc[]) => {
  localStorage.setItem(getStudentDocKey(studentNumber), JSON.stringify(docs));
};

// Staff directory
export interface StaffMember {
  name: string;
  position: string;
  subject?: string;
  categories: string[];
  image?: string;
  imgPosition?: string;
  classTeacherFor?: string;
  supportOrder?: number;
  departmentHead?: string;
}
const defaultStaff: StaffMember[] = [
  { name: 'TE Laurence', position: 'Principal', categories: ['School Management'], image: '/assets/staff/principal.jpg' },
  { name: 'AP Msizazwe', position: 'Deputy Principal', subject: 'Physical Sciences', categories: ['School Management', 'Subject Teachers'], image: '/assets/staff/ap-msizazwe.jpg' },
  { name: 'A Vally', position: 'Deputy Principal', subject: 'Natural Sciences', categories: ['School Management', 'Subject Teachers'], image: '/assets/staff/a-vally.jpg' },
{ name: 'LS Bishop', position: 'Departmental Head', subject: 'Mathematics', categories: ['School Management', 'Subject Teachers'], departmentHead: 'Mathematics & Mathematical Literacy', image: '/assets/staff/ls-bishop.jpg' },
  { name: 'P Govender', position: 'Departmental Head', subject: 'Tourism', categories: ['School Management', 'Subject Teachers'], departmentHead: 'Humanities', image: '/assets/staff/p-govender.jpg' },
  { name: 'M Jacobs', position: 'Departmental Head', subject: 'Afrikaans First Additional Language', categories: ['School Management', 'Subject Teachers'], departmentHead: 'Languages' },
  { name: 'SC Mkhize', position: 'Departmental Head', subject: 'Accounting', categories: ['School Management', 'Subject Teachers'], departmentHead: 'Commerce', image: '/assets/staff/sc-mkhize.jpg' },
  { name: 'NS Sigwebela', position: 'Departmental Head', subject: 'Life Sciences', categories: ['School Management', 'Subject Teachers'], departmentHead: 'Sciences', image: '/assets/staff/ns-sigwebela.jpg' },
  { name: 'XP Dayi', position: 'Educator', subject: 'Computer Applications Technology', categories: ['Subject Teachers'], image: '/assets/staff/xp-dayi.jpg' },
  { name: 'PP Dickens', position: 'Educator', subject: 'English Home Language', categories: ['Subject Teachers'], image: '/assets/staff/pp-dickens.jpg' },
  { name: 'SE Dlamini', position: 'Educator', subject: 'Mathematical Literacy', categories: ['Subject Teachers'], image: '/assets/staff/se-dlamini.jpg' },
  { name: 'P Fundzo', position: 'Educator', subject: 'Life Sciences', categories: ['Subject Teachers'], image: '/assets/staff/p-fundzo.jpg' },
  { name: 'K Gana', position: 'Educator', subject: 'Tourism', categories: ['Subject Teachers'], image: '/assets/staff/k-gana.jpg' },
  { name: 'CB Grimett', position: 'Educator', subject: 'History', categories: ['Subject Teachers'], image: '/assets/staff/cb-grimett.jpg' },
  { name: 'AC Gumede', position: 'Educator', subject: 'Mathematical Literacy', categories: ['Subject Teachers'] },
  { name: 'LH Kheswa', position: 'Educator', subject: 'Life Sciences', categories: ['Subject Teachers'] },
  { name: 'M Lukhozi', position: 'Educator', subject: 'Life Orientation', categories: ['Subject Teachers'], image: '/assets/staff/m-lukhozi.jpg' },
  { name: 'N Madikizela', position: 'Educator', subject: 'English First Additional Language', categories: ['Subject Teachers'], image: '/assets/staff/n-madikizela.jpg' },
  { name: 'LT Malishe', position: 'Educator', subject: 'Geography', categories: ['Subject Teachers'], image: '/assets/staff/lt-malishe.jpg' },
  { name: 'Y Mbuzi', position: 'Educator', subject: 'Mathematics', categories: ['Subject Teachers'], image: '/assets/staff/y-mbuzi.jpg' },
  { name: 'BP Mdleko', position: 'Educator', subject: 'Mathematics', categories: ['Subject Teachers'], image: '/assets/staff/bp-mdleko.jpg' },
  { name: 'A Mdunjane', position: 'Educator', subject: 'isiZulu First Additional Language', categories: ['Subject Teachers'], image: '/assets/staff/a-mdunjane.jpg' },
  { name: 'A Mgcinwa', position: 'Educator', subject: 'Economics', categories: ['Subject Teachers'], image: '/assets/staff/a-mgcinwa.jpg' },
  { name: 'O Mgcwaba', position: 'Educator', subject: 'Physical Sciences', categories: ['Subject Teachers'], image: '/assets/staff/o-mgcwaba.jpg' },
  { name: 'NS Mhlongo', position: 'Educator', subject: 'Business Studies', categories: ['Subject Teachers'], image: '/assets/staff/ns-mhlongo.jpg' },
  { name: 'S Mjwara', position: 'Educator', subject: 'isiZulu First Additional Language', categories: ['Subject Teachers'] },
  { name: 'S Mkhize', position: 'Educator', subject: 'Afrikaans First Additional Language', categories: ['Subject Teachers'], image: '/assets/staff/s-mkhize.jpg' },
  { name: 'A Mkize', position: 'Educator', subject: 'English Home Language', categories: ['Subject Teachers'], image: '/assets/staff/a-mkize.jpg' },
  { name: 'AP Mlambo', position: 'Educator', subject: 'Geography', categories: ['Subject Teachers'], image: '/assets/staff/ap-mlambo.jpg' },
  { name: 'M Mthembu', position: 'Educator', subject: 'History', categories: ['Subject Teachers'], image: '/assets/staff/m-mthembu.jpg' },
  { name: 'A Mtolo', position: 'Educator', subject: 'Afrikaans First Additional Language', categories: ['Subject Teachers'], image: '/assets/staff/a-mtolo.jpg' },
  { name: 'E Musariri', position: 'Educator', subject: 'Mathematical Literacy', categories: ['Subject Teachers'], image: '/assets/staff/e-musariri.jpg' },
  { name: 'N Mvundla', position: 'Educator', subject: 'English Home Language', categories: ['Subject Teachers'], image: '/assets/staff/n-mvundla.jpg' },
  { name: 'B Ndabani', position: 'Educator', subject: 'Mathematics', categories: ['Subject Teachers'], image: '/assets/staff/b-ndabani.jpg' },
  { name: 'K Ndlwana', position: 'Educator', subject: 'Natural Sciences', categories: ['Subject Teachers'], image: '/assets/staff/k-ndlwana.jpg' },
  { name: 'JB Nkonza-Grimett', position: 'Educator', subject: 'Life Orientation', categories: ['Subject Teachers'], image: '/assets/staff/jb-nkonza-grimett.jpg' },
  { name: 'DS Ntshangase', position: 'Educator', subject: 'Mathematics', categories: ['Subject Teachers'], image: '/assets/staff/ds-ntshangase.jpg' },
  { name: 'M Shabangu', position: 'Educator', subject: 'English Home Language', categories: ['Subject Teachers'], image: '/assets/staff/m-shabangu.jpg' },
  { name: 'MR Sikhosane', position: 'Educator', subject: 'isiZulu Home Language', categories: ['Subject Teachers'], image: '/assets/staff/mr-sikhosane.jpg' },
  { name: 'TA Swartling', position: 'Educator', subject: 'English Home Language', categories: ['Subject Teachers'], image: '/assets/staff/ta-swartling.jpg' },
  { name: 'P Wetshe', position: 'Educator', subject: 'Technology', categories: ['Subject Teachers'], image: '/assets/staff/p-wetshe.jpg' },
  { name: 'S Xaba', position: 'Educator', subject: 'Consumer Studies', categories: ['Subject Teachers'], image: '/assets/staff/s-xaba.jpg' },
  { name: 'V Zithutha', position: 'Educator', subject: 'Business Studies', categories: ['Subject Teachers'], image: '/assets/staff/v-zithutha.jpg' },
  { name: 'M Jackson', position: 'Supervisor: Support Staff', categories: ['Support Staff'], supportOrder: 1, image: '/assets/staff/m-jackson.jpg' },
  { name: 'L Govender', position: 'Administration Staff', categories: ['Support Staff'], supportOrder: 2, image: '/assets/staff/l-govender.jpg' },
];
export const getStaff = () => getItems<StaffMember>('admin_staff').length ? getItems<StaffMember>('admin_staff') : defaultStaff;
export const setStaff = (items: StaffMember[]) => setItems('admin_staff', items);

// Student number generator: YEAR-000001, YEAR-000002, ...
export function generateStudentNumber(year?: string): string {
  const yr = year || new Date().getFullYear().toString();
  const key = `harding_student_counter_${yr}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10) + 1;
  localStorage.setItem(key, current.toString());
  return `${yr}-${current.toString().padStart(6, '0')}`;
}
