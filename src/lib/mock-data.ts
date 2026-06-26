export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  type: "software" | "web" | "graphic" | "uiux";
  description: string;
  tags: string[];
  image?: string;
  url?: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  budget_range?: string;
  message: string;
  created_at: string;
};

export const services: Service[] = [
  {
    id: "web-dev",
    title: "تطوير المواقع والتطبيقات",
    description:
      "نبني مواقع وتطبيقات سريعة، آمنة، وقابلة للتوسع باستخدام أحدث التقنيات.",
    icon: "code",
    category: "تطوير",
  },
  {
    id: "graphic",
    title: "التصميم الجرافيكي",
    description:
      "تصاميم بصرية احترافية للحملات، السوشيال ميديا، والمطبوعات الرقمية.",
    icon: "palette",
    category: "تصميم",
  },
  {
    id: "branding",
    title: "الهوية البصرية",
    description:
      "نصنع هويات بصرية متكاملة تعكس شخصية علامتك وتترك أثراً لا يُنسى.",
    icon: "sparkles",
    category: "هوية",
  },
  {
    id: "uiux",
    title: "تصميم واجهات UI/UX",
    description:
      "تجارب مستخدم سلسة وواجهات عصرية تجمع بين الجمال والوظيفة.",
    icon: "layout",
    category: "تجربة",
  },
  {
    id: "consulting",
    title: "حلول واستشارات رقمية",
    description:
      "استشارات استراتيجية وحلول ذكية لتحويل رؤيتك الرقمية إلى واقع.",
    icon: "brain",
    category: "استشارات",
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "sakannu",
    title: "سكنّو — منصة سكن طلابي",
    category: "تطوير مواقع",
    type: "web",
    description:
      "منصة فلسطينية متخصصة في توفير سكن آمن وموثّق لطلاب جامعة النجاح الوطنية في نابلس.",
    tags: ["Next.js", "سكن طلابي", "نابلس"],
    image: "/portfolio/sakannu.png",
    url: "https://www.sakannu.com/",
  },
  {
    id: "mindar",
    title: "MINDAR — منصة اختبارات ذكية",
    category: "تطوير مواقع",
    type: "web",
    description:
      "منصة تعليمية ذكية ترفع ملفاتك وتُنشئ أسئلة اختبار مخصصة لك في ثوانٍ.",
    tags: ["AI", "تعليم", "اختبارات"],
    image: "/portfolio/mindar.png",
    url: "https://www.mindar.tech/",
  },
  {
    id: "malamih",
    title: "ملامح — دليل طبي وتجميلي",
    category: "تطوير مواقع",
    type: "web",
    description:
      "منصة فلسطينية شاملة لحجز الأطباء والعيادات والخدمات الصحية والتجميلية.",
    tags: ["حجز مواعيد", "صحة", "فلسطين"],
    image: "/portfolio/malamih.png",
    url: "https://www.malamih.ps/",
  },
  {
    id: "flora-style",
    title: "Flora Style — متجر فاخر",
    category: "تطوير مواقع",
    type: "web",
    description:
      "متجر إلكتروني فاخر لمنتجات مختارة — حقائب، ساعات، وإكسسوارات بأناقة عالمية.",
    tags: ["E-commerce", "متجر", "فاخر"],
    image: "/portfolio/flora-style.png",
    url: "https://www.flora-style.shop/",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "الفكرة",
    description: "نستمع لرؤيتك ونفهم أهدافك ونحوّلها إلى خطة واضحة.",
    icon: "idea",
  },
  {
    number: "02",
    title: "الاستراتيجية",
    description: "نرسم خارطة الطريق ونحدد الأولويات والجدول الزمني.",
    icon: "strategy",
  },
  {
    number: "03",
    title: "التصميم",
    description: "نصمم واجهات وهوية بصرية تعكس شخصية مشروعك.",
    icon: "design",
  },
  {
    number: "04",
    title: "التطوير",
    description: "نبرمج الحل بكود نظيف وأداء عالٍ ومعايير أمان حديثة.",
    icon: "development",
  },
  {
    number: "05",
    title: "الإطلاق",
    description: "نطلق المشروع ونقدم دعماً مستمراً لضمان نجاحه.",
    icon: "launch",
  },
];

export const serviceTypes = [
  "تطوير المواقع والتطبيقات",
  "التصميم الجرافيكي",
  "الهوية البصرية",
  "تصميم واجهات UI/UX",
  "حلول واستشارات رقمية",
  "أخرى",
];

export const budgetRanges = [
  "أقل من $1,000",
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000 – $15,000",
  "أكثر من $15,000",
  "غير محدد",
];

// In-memory mock store for contact submissions
export const mockContactStore: ContactRequest[] = [];
