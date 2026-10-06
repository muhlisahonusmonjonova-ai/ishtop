export const CATEGORIES = ['IT', 'Savdo', 'Marketing', 'Ta’lim', 'Dizayn', 'Logistika', 'Moliya', 'Xizmat ko‘rsatish'];
export const CITIES = ['Toshkent', 'Andijon', 'Farg‘ona', 'Namangan', 'Samarqand', 'Buxoro', 'Nukus'];
export const JOB_TYPES = ['To‘liq ish kuni', 'Yarim stavka', 'Masofaviy', 'Amaliyot'];

const day = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString();
};

export const DEMO_JOBS = [
  { id: 'demo-1', title: 'Frontend dasturchi', company: 'Uzum', category: 'IT', city: 'Toshkent', salary: 12000000, type: 'To‘liq ish kuni', description: 'Mahsulotlarimiz uchun zamonaviy va tezkor web interfeyslar yarating. React va JavaScript bilan amaliy tajriba, jamoada ishlash va sifatli kod yozishga qiziqish muhim.', contact: 'hr@uzum.uz', postedAt: day(0), isUserPosted: false },
  { id: 'demo-2', title: 'Sotuv bo‘yicha menejer', company: 'Techno House', category: 'Savdo', city: 'Samarqand', salary: 6500000, type: 'To‘liq ish kuni', description: 'Mijozlarga maishiy texnika mahsulotlarini tanlashda yordam bering. Muloqot qobiliyati va savdo sohasidagi tajriba ustunlik beradi.', contact: '+998 90 123 45 67', postedAt: day(1), isUserPosted: false },
  { id: 'demo-3', title: 'SMM mutaxassisi', company: 'Green Market', category: 'Marketing', city: 'Toshkent', salary: 8000000, type: 'Masofaviy', description: 'Ijtimoiy tarmoqlar uchun kontent reja tuzing, post va videolarni tayyorlang, sahifalar o‘sishini tahlil qiling.', contact: 'jobs@greenmarket.uz', postedAt: day(1), isUserPosted: false },
  { id: 'demo-4', title: 'Grafik dizayner', company: 'Pixel Creative', category: 'Dizayn', city: 'Farg‘ona', salary: 7000000, type: 'To‘liq ish kuni', description: 'Brendlar uchun vizual materiallar va raqamli reklama dizaynlarini yarating. Portfolio va grafik dasturlarni bilish talab etiladi.', contact: 'hello@pixel.uz', postedAt: day(2), isUserPosted: false },
  { id: 'demo-5', title: 'Ingliz tili o‘qituvchisi', company: 'Bright Academy', category: 'Ta’lim', city: 'Andijon', salary: 5500000, type: 'Yarim stavka', description: 'Turli yoshdagi o‘quvchilarga ingliz tilidan dars bering. Darslarni qiziqarli va natijaga yo‘naltirilgan tarzda olib boring.', contact: '+998 93 456 78 90', postedAt: day(3), isUserPosted: false },
  { id: 'demo-6', title: 'Ombor logistika koordinatori', company: 'Express Cargo', category: 'Logistika', city: 'Namangan', salary: 6000000, type: 'To‘liq ish kuni', description: 'Buyurtmalar harakatini muvofiqlashtiring, ombor hisobini nazorat qiling va yetkazib berish jarayonini yaxshilang.', contact: 'hr@expresscargo.uz', postedAt: day(4), isUserPosted: false },
  { id: 'demo-7', title: 'Backend dasturchi (Node.js)', company: 'PayWay', category: 'IT', city: 'Toshkent', salary: 16000000, type: 'Masofaviy', description: 'To‘lov xizmatlari uchun ishonchli API va server yechimlarini ishlab chiqing. Node.js, ma’lumotlar bazalari va REST API tajribasi kerak.', contact: 'careers@payway.uz', postedAt: day(5), isUserPosted: false },
  { id: 'demo-8', title: 'Buxgalter yordamchisi', company: 'Baraka Group', category: 'Moliya', city: 'Buxoro', salary: 4500000, type: 'To‘liq ish kuni', description: 'Birlamchi hujjatlarni tayyorlash, hisob-kitoblarni yuritish va moliya jamoasiga kundalik vazifalarda ko‘maklashish.', contact: '+998 91 234 56 78', postedAt: day(6), isUserPosted: false },
  { id: 'demo-9', title: 'Mijozlar bilan ishlash operatori', company: 'Aloqa Plus', category: 'Xizmat ko‘rsatish', city: 'Toshkent', salary: 5000000, type: 'Yarim stavka', description: 'Mijozlarning savollariga telefon va chat orqali javob bering. O‘zbek tilida ravon muloqot va mas’uliyatlilik muhim.', contact: 'team@aloqaplus.uz', postedAt: day(7), isUserPosted: false },
  { id: 'demo-10', title: 'Junior QA muhandisi', company: 'Cloud Nine', category: 'IT', city: 'Samarqand', salary: 6500000, type: 'Amaliyot', description: 'Web va mobil ilovalarni sinovdan o‘tkazing, xatolarni hujjatlashtiring va mahsulot sifatini oshirishga hissa qo‘shing.', contact: 'jobs@cloudnine.uz', postedAt: day(8), isUserPosted: false },
];

const JOBS_KEY = 'ishtop.jobs.v1';
const PROFILE_KEY = 'ishtop.profile.v1';

export function loadJobs() {
  const saved = localStorage.getItem(JOBS_KEY);
  if (saved === null) {
    localStorage.setItem(JOBS_KEY, JSON.stringify(DEMO_JOBS));
    return DEMO_JOBS;
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error('Saqlangan e’lonlar formati noto‘g‘ri.');
    return parsed;
  } catch (error) {
    console.error('Ish e’lonlarini o‘qib bo‘lmadi:', error);
    localStorage.setItem(JOBS_KEY, JSON.stringify(DEMO_JOBS));
    return DEMO_JOBS;
  }
}

export function saveJobs(jobs) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : { name: '', email: '' };
  } catch (error) {
    console.error('Profil ma’lumotlarini o‘qib bo‘lmadi:', error);
    return { name: '', email: '' };
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function formatSalary(amount) {
  return `${Number(amount).toLocaleString('uz-UZ')} so‘m`;
}

export function formatDate(value) {
  const date = new Date(value);
  const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}
