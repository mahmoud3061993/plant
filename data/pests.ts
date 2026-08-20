import type { PestInfo } from "./types";

/**
 * Shared pest catalog. The future Pest Identifier should start from here
 * and then check which plants list the same pest ids.
 */
export const PESTS = {
  spiderMites: {
    id: "spider-mites",
    arabicName: "العنكبوت الأحمر",
    englishName: "Spider mites",
    signs: [
      "نقط صفراء أو باهتة صغيرة على الورق",
      "شبكة رفيعة جدًا بين الورق والعنق",
      "الورق ينشف من الأطراف كأن فيه تراب خفيف",
    ],
    nonChemicalTreatment: [
      "افصل النبات عن الباقي فورًا",
      "امسح الورق من فوق ومن تحت بقطعة قماش مبللة",
      "زد الرطوبة حوالين النبات، لأن الجو الجاف بيساعد الحشرة دي",
      "لو الإصابة منتشرة، قص الأوراق الأضعف وتابع يومين تلاتة",
    ],
    notes: "شائع في الجو الحار الجاف وتكييف قوي من غير رطوبة.",
  },
  mealybugs: {
    id: "mealybugs",
    arabicName: "البق الدقيقي",
    englishName: "Mealybugs",
    signs: [
      "كتل بيضا قطنية في تفرع العروق أو عند عنق الورقة",
      "مادة لزجة على الورق",
      "نمو بطيء وورق ضعيف",
    ],
    nonChemicalTreatment: [
      "امسح الحشرة بقطعة قطن مبللة بكحول طبي مخفف، بعيدًا عن الأطفال",
      "كرر المسح كل كام يوم لأن البيض بيظهر تاني",
      "افحص الأماكن المخفية: تحت الورق وجنب التربة",
    ],
    notes: "ما تستخدمش مبيدات قوية في البيت من غير معرفة. التنظيف اليدوي غالبًا يكفي لو لقطتها بدري.",
  },
  fungusGnats: {
    id: "fungus-gnats",
    arabicName: "ذباب التربة",
    englishName: "Fungus gnats",
    signs: [
      "حشرات صغيرة تطير حوالين الأصيص لما تسقيه",
      "تربة تفضل ندية طول الوقت",
      "أحيانًا ضعف في الشتلات الصغيرة",
    ],
    nonChemicalTreatment: [
      "خلّي سطح التربة ينشف بين الريات",
      "شيل أي أوراق ميتة من على التربة",
      "لو المشكلة مستمرة، غيّر السنتيمترات اللي فوق من التربة بخلطة أخشن",
    ],
    notes: "غالبًا علامة إن الري زيادة، مش إن النبات جعان.",
  },
  scale: {
    id: "scale",
    arabicName: "الحشرات القشرية",
    englishName: "Scale insects",
    signs: [
      "نتوءات بنية أو بيج ثابتة على العرق والساق",
      "ورق لزج أو باهت",
      "ضعف تدريجي من غير سبب واضح",
    ],
    nonChemicalTreatment: [
      "امسح الساق بقطعة قماش مبللة",
      "لو العدد قليل، انزع القشور بلطف بأظفرك أو بقطعة قطن",
      "تابع أسبوعيًا لأن الحشرة بتتخبى كويس",
    ],
    notes: "سهل تتفوت لأنها بتبان كجزء من الساق.",
  },
  aphids: {
    id: "aphids",
    arabicName: "المن",
    englishName: "Aphids",
    signs: [
      "حشرات صغيرة خضراء أو سوداء على النمو الجديد",
      "ورق ملتف أو مشوّه",
      "مادة لزجة على الأوراق",
    ],
    nonChemicalTreatment: [
      "اغسل النمو الجديد بمياه فاتر بلطف في الحوض",
      "امسح بقطعة قماش",
      "قص الأطراف المصابة بشدة لو النبات كبير",
    ],
    notes: "أكتر على النمو الطري في الربيع.",
  },
  thrips: {
    id: "thrips",
    arabicName: "التربس",
    englishName: "Thrips",
    signs: [
      "خطوط فضية رفيعة على الورق",
      "نقط سوداء صغيرة (مخلفات)",
      "نمو جديد باهت أو مشوه",
    ],
    nonChemicalTreatment: [
      "اعزل النبات",
      "امسح الورق وقص النمو المشوه",
      "حسّن التهوية وقلل ازدحام النباتات",
    ],
    notes: "صعب يتشاف بالعين في البداية. لو شكيت، افحص الورق الجديدة كويس.",
  },
} satisfies Record<string, PestInfo>;

export function pest(
  id: keyof typeof PESTS,
  notes?: string,
): PestInfo {
  const base = PESTS[id];
  return notes ? { ...base, notes } : base;
}
