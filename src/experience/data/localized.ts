import type { Locale } from "@/i18n/types";
import { loc, type Localized } from "@/i18n/types";
import { capabilities, type Capability } from "./services";
import { methodSteps, type ProcessStep } from "./process";
import { projects, type ExperienceProject } from "./projects";

const capAr: Record<
  string,
  {
    title: string;
    line: string;
    items: string[];
    audience: string;
    includes: string[];
  }
> = {
  web: {
    title: "تطوير الويب",
    line: "منتجات سريعة وبنيوية وقابلة للتوسع — منصات ومتاجر وتطبيقات.",
    items: ["منصات رقمية", "تجارة إلكترونية", "تطبيقات ويب", "تجارب تفاعلية"],
    audience: "شركات ناشئة ومؤسسات وعلامات تحتاج منتج ويب جاد — لا قالباً جاهزاً.",
    includes: [
      "منصات منتجات ومواقع تسويقية",
      "تجارة إلكترونية وأسواق",
      "لوحات تحكم وأدوات داخلية",
      "أساس الأداء وتحسين محركات البحث وإمكانية الوصول",
    ],
  },
  mobile: {
    title: "تطبيقات الموبايل",
    line: "واجهات أصلية سلسة لـ iOS وAndroid من رؤية منتج واحدة.",
    items: ["iOS + Android", "تطبيقات منتج", "عمل دون اتصال", "إطلاق المتاجر"],
    audience: "فرق تُطلق تجارب منتج يجب أن تبدو أصلية على كل جهاز.",
    includes: [
      "تطبيقات متعددة المنصات",
      "تدفقات الترحيب والاحتفاظ",
      "هندسة واعية بالعمل دون اتصال",
      "جاهزية App Store وPlay Store",
    ],
  },
  uiux: {
    title: "واجهات وتجربة",
    line: "واجهات بإيقاع — بحث وأنظمة وحركة وتفاصيل.",
    items: ["بحث", "أنظمة تصميم", "نماذج أولية", "تصميم حركة"],
    audience: "مؤسسون وفرق منتج يريدون وضوحاً وحرفة وأنظمة قابلة للاستخدام.",
    includes: [
      "بحث وهندسة معلومات",
      "تصميم واجهات وأنظمة تصميم",
      "نماذج تفاعلية",
      "حركة وتفاعلات دقيقة",
    ],
  },
  branding: {
    title: "الهوية البصرية",
    line: "هويات برأي واضح — من العلامة إلى الصوت.",
    items: ["هوية علامة", "طباعة", "صوت", "إرشادات"],
    audience: "منظمات تحدد كيف تبدو وتتكلم وتتصرف عبر كل سطح.",
    includes: [
      "استراتيجية وتموضع العلامة",
      "أنظمة هوية بصرية",
      "طباعة وإخراج فني",
      "إرشادات للرقمي والمطبوع",
    ],
  },
  ai: {
    title: "حلول الذكاء",
    line: "ذكاء مربوط بمنتجات حقيقية — مفيد ومركّز وجاهز للإنتاج.",
    items: ["ذكاء المنتج", "أتمتة", "أنظمة معرفة", "سير عمل"],
    audience: "منتجات تحتاج ذكاءً مدمجاً — لا ملحقاً شكلياً.",
    includes: [
      "ميزات منتج مدعومة بالذكاء",
      "أتمتة سير العمل",
      "أنظمة محتوى ومعرفة",
      "أنماط نشر آمن",
    ],
  },
};

const procAr: Record<string, { title: string; line: string }> = {
  "01": {
    title: "اكتشاف",
    line: "نصغي للرؤية والقيود والهدف الحقيقي — ثم نحوّلها إلى خطة.",
  },
  "02": {
    title: "تصميم",
    line: "واجهات وهوية برأي واضح — أنظمة وحركة وتفاصيل.",
  },
  "03": {
    title: "بناء",
    line: "هندسة نظيفة. سريعة وآمنة وجاهزة للتوسع.",
  },
  "04": {
    title: "إطلاق",
    line: "نُشحن، نراقب المستخدمين الأوائل، ونبقى مع المنتج عند انطلاقه.",
  },
  "05": {
    title: "تطوير",
    line: "العمل يستمر بعد الإطلاق — تكرار وعناية والنسخة التالية.",
  },
};

const projectAr: Record<
  string,
  {
    summary: string;
    overview: string;
    challenge: string;
    approach: string;
    disciplines: string[];
    industry: string;
  }
> = {
  sakannu: {
    summary: "سكن طلابي موثّق لجامعة النجاح — نابلس، بضغطة واحدة.",
    overview:
      "منصة فلسطينية تساعد الطلاب على إيجاد سكن موثّق قرب جامعة النجاح في نابلس — مبنية على الثقة والسرعة والوضوح.",
    challenge:
      "احتاج الطلاب طريقة موثوقة لإيجاد سكن آمن دون إعلانات مبعثرة أو ملكية غير واضحة أو تحقق ضعيف.",
    approach:
      "صممنا تجربة منتج مركّزة حول التحقق والبحث والثقة — ثم بنينا منصة ويب سريعة جاهزة للاستخدام الحقيقي.",
    disciplines: ["ويب", "منصة", "منتج"],
    industry: "سكن / تعليم",
  },
  mindar: {
    summary: "ارفع ملفاتك واحصل على أسئلة اختبار مخصصة خلال ثوانٍ.",
    overview:
      "منصة دراسية ذكية تحوّل المواد المرفوعة إلى أسئلة اختبار مخصصة — بتجهيز أقل احتكاكاً.",
    challenge:
      "يقضي الطلاب وقتاً طويلاً في تحويل مواد المقرر إلى تدريب مفيد. كتابة الأسئلة يدوياً لا تتوسع.",
    approach:
      "شكّلنا تدفقاً هادئاً حول رفع ← توليد ← مراجعة، وربطنا قدرات الذكاء بواجهة تعلّم قابلة للاستخدام.",
    disciplines: ["ويب", "ذكاء", "تعليم"],
    industry: "تعليم / ذكاء",
  },
  malamih: {
    summary: "دليل فلسطين للعيادات والأطباء والرعاية الجمالية.",
    overview:
      "دليل فلسطيني شامل للعيادات والأطباء والخدمات الجمالية — يجعل الاكتشاف والحجز أوضح.",
    challenge:
      "كانت خدمات الرعاية والصحة الجمالية مبعثرة عبر قنوات غير رسمية، مما يصعّب الاكتشاف والثقة.",
    approach:
      "بنينا دليلاً منظماً بتجربة واضحة للاكتشاف والثقة، مع أساس قابل للتوسع للحجز لاحقاً.",
    disciplines: ["ويب", "سوق", "صحة"],
    industry: "صحة / سوق",
  },
  "flora-style": {
    summary: "متجر فاخر لحقائب وساعات وإكسسوارات مختارة.",
    overview:
      "متجر إلكتروني فاخر يعرض حقائب وساعات وإكسسوارات مختارة — بهوية واضحة وتجربة شراء أنيقة.",
    challenge:
      "احتاجت العلامة حضوراً رقمياً يطابق جودة منتجاتها دون أن يبدو كقالب تجارة جاهز.",
    approach:
      "صممنا هوية رقمية وتجربة شراء هادئة وفاخرة، ثم بنينا متجراً سريعاً جاهزاً للنمو.",
    disciplines: ["تجارة", "ويب", "علامة"],
    industry: "تجارة / أزياء",
  },
};

export type LocalizedCapability = Capability & {
  title: string;
  line: string;
  items: string[];
  audience: string;
  includes: string[];
};

export function getCapabilities(locale: Locale): LocalizedCapability[] {
  return capabilities.map((c) => {
    const ar = capAr[c.id];
    if (locale !== "ar" || !ar) return { ...c };
    return {
      ...c,
      title: ar.title,
      line: ar.line,
      items: ar.items,
      audience: ar.audience,
      includes: ar.includes,
    };
  });
}

export function getMethodSteps(locale: Locale): ProcessStep[] {
  return methodSteps.map((s) => {
    const ar = procAr[s.index];
    if (locale !== "ar" || !ar) return s;
    return { ...s, title: ar.title, line: ar.line };
  });
}

export function getProjects(locale: Locale): ExperienceProject[] {
  return projects.map((p) => {
    const ar = projectAr[p.id];
    if (locale !== "ar" || !ar) return p;
    const arName = p.arabicTitle.split(/[—–-]/)[0]?.trim() || p.name;
    return {
      ...p,
      name: arName,
      summary: ar.summary,
      overview: ar.overview,
      challenge: ar.challenge,
      approach: ar.approach,
      disciplines: ar.disciplines,
      industry: ar.industry,
      media:
        p.media.type === "image"
          ? { ...p.media, alt: `${arName} — ${p.arabicTitle}` }
          : p.media.type === "none"
            ? { ...p.media, label: arName }
            : p.media,
    };
  });
}

export function getFeaturedProjects(locale: Locale) {
  return getProjects(locale).filter((p) => p.featured).slice(0, 4);
}

export function getProjectLocalized(locale: Locale, id: string) {
  return getProjects(locale).find((p) => p.id === id);
}

export function getAdjacentLocalized(locale: Locale, id: string) {
  const list = getProjects(locale);
  const i = list.findIndex((p) => p.id === id);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

export const STAGE_LABELS: Record<Locale, string[]> = {
  en: ["EMBROIDERY", "GEOMETRY", "GRID", "CIRCUITS", "CODE", "PARTICLES", "ZERIV"],
  ar: ["تطريز", "هندسة", "شبكة", "دوائر", "شفرة", "جسيمات", "زيريف"],
};

export function L(locale: Locale, value: Localized | string) {
  return loc(locale, value);
}
