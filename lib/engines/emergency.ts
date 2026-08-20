import type { Plant } from "@/data/types";
import { rootRotRisk } from "@/lib/plant-fields";

export type EmergencyAnswers = {
  soil: "wet" | "damp" | "dry";
  roots: "not-seen" | "firm" | "mushy" | "crowded";
  stem: "firm" | "mushy" | "wrinkled";
  smell: "no" | "yes";
  leaves: "ok" | "wilt" | "yellow" | "crisp" | "drop";
  pests: "no" | "yes";
  event: "none" | "repot" | "move" | "sun" | "travel" | "fertilizer" | "fall";
};

export function rescuePlan(plant: Plant, a: EmergencyAnswers) {
  const rotLikely =
    a.stem === "mushy" || a.smell === "yes" || a.roots === "mushy" || (a.soil === "wet" && a.leaves === "wilt");
  const thirsty = a.soil === "dry" && (a.leaves === "wilt" || a.leaves === "crisp" || a.stem === "wrinkled");
  const shock = a.event === "repot" || a.event === "move";
  const burn = a.event === "sun" || a.leaves === "crisp";
  const pests = a.pests === "yes";

  const now: string[] = [];
  const later: string[] = [];
  const dont: string[] = [];
  const better: string[] = [];
  const worse: string[] = [];
  let headline = "ثبّت الوضع وراقب بهدوء";

  if (rotLikely) {
    headline = "الأولوية: إيقاف العفن";
    now.push("وقّف الري فورًا وفرّغ أي مية تحت الأصيص.");
    now.push("لو قدرت، اطلع النبات وافحص الجذور. اقطع الطري البني بمقص نظيف.");
    now.push("انقل لتربة جديدة سريعة التصريف وأصيص فيه فتحات — من غير سماد.");
    later.push("ري خفيف جدًا بعد النقل، وبعدين انتظر حسب جفاف التربة.");
    later.push("ضوء لطيف غير مباشر. متكترش تنقيل.");
    dont.push("متسقيش «علشان يخف».", "متسمّدش.", "متغطّيش بكيس بلاستيك.");
    worse.push("الساق بتطري أكتر", "ريحة أزيد", "سقوط سريع لمعظم الأوراق");
  } else if (thirsty) {
    headline = "الأولوية: ري عميق مرة واحدة";
    now.push("اسقي ببطء لحد ما المية تخرج من تحت.");
    now.push("بعد ١٥–٢٠ دقيقة فرّغ الطبق.");
    now.push("لو التربة انفصلت عن جدار الأصيص، اسقي على مراحل.");
    later.push(plant.watering.howToCheck);
    dont.push("متتسقيش كل ساعة.", "متنقلش المكان دلوقتي.");
    worse.push("الساق ناشفة تمامًا ومفيش مرونة", "معظم الأوراق بقت ورق ناشف");
  } else if (pests) {
    headline = "الأولوية: عزل وتنظيف";
    now.push("اعزل النبات عن الباقي.");
    now.push("امسح الورق والساق بقطعة مبلولة.");
    now.push("افتح أداة الحشرات لو لسه مش عارف النوع.");
    later.push("كرّر المسح يوم بعد يوم.");
    dont.push("مترشّشش مبيد قوي وأنت مستعجل.", "متشيلش كل الورق.");
    worse.push("الإصابة بتنتشر لنبات تاني", "الورق بيسود بسرعة");
  } else if (burn) {
    headline = "الأولوية: إبعاد الشمس الحارقة";
    now.push("انقل لضوء قوي غير مباشر.");
    now.push("متقطعش كل الأوراق المحروقة لو فيها أخضر.");
    now.push("افحص التربة: لو ناشفة اسقي مرة واحدة بهدوء.");
    later.push("استنى نمو جديد قبل أي تسميد.");
    dont.push("متنقلش من شمس لضلام دامس.", "مترشّشش مية على ورق سخن.");
    worse.push("حرق بيزيد بعد النقل", "ذبول عام");
  } else if (shock) {
    headline = "الأولوية: ثبات، مش تدخل زيادة";
    now.push("سيّب النبات في مكان ضوء لطيف ثابت.");
    now.push("ري حسب التربة فقط.");
    now.push("لو الأصيص اتغيّر، متسمّدش.");
    later.push("أسبوعين مراقبة من غير تغييرات.");
    dont.push("متغيّرش الأصيص تاني.", "متتسقيش زيادة من الخوف.");
    worse.push("ذبول بيزيد بعد أسبوع", "ساق طرية");
  } else if (a.event === "fertilizer") {
    headline = "الأولوية: شطف السماد";
    now.push("لو في تصريف، اشطف التربة بري غزير وفرّغ الزيادة.");
    now.push("وقف السماد.");
    now.push("أبعد عن شمس قوية.");
    later.push("رجع للتسميد الخفيف بعد ما النبات يثبت.");
    dont.push("متزودش سماد تاني.");
    worse.push("حواف محروقة بتزيد", "ذبول مع تربة مبلولة");
  } else if (a.event === "fall") {
    headline = "الأولوية: تثبيت الأجزاء السليمة";
    now.push("قص الأجزاء المكسورة القصبة بمقص نظيف.");
    now.push("ثبّت الساق لو محتاجة دعم.");
    now.push("افحص التربة والجذور لو الأصيص اتكسر.");
    later.push("سيّب الجروح تنشف. متسمّدش.");
    dont.push("متحاولش تلزق الساق بمادة غريبة.");
    worse.push("عفن عند مكان الكسر");
  } else {
    now.push(`افحص التربة: ${plant.watering.howToCheck}`);
    now.push("أبعد النبات عن تكييف مباشر وشمس حارقة.");
    now.push(a.leaves === "drop" ? "تساقط الأوراق لوحده مش كافي للذعر — ركّز على الساق والتربة." : "ما تغيّرش أكتر من حاجة واحدة.");
    later.push("لو مفيش تحسن، استخدم أداة التشخيص خطوة بخطوة.");
    dont.push("متسمّدش وأنت مش عارف السبب.", "متتسقيش بالعادة.");
    worse.push("ساق طرية", "ريحة عفن", "سقوط معظم الأوراق");
  }

  if (rootRotRisk(plant) === "high" && a.soil === "wet") {
    later.push("النبات ده حسّاس للعفن — خليك صارم مع التصريف.");
  }

  better.push("الساق ثابتة مش طرية");
  better.push("الذبلان واقف عن الزيادة");
  better.push("الأوراق الجديدة (لو ظهرت) سليمة");

  return { headline, now: now.slice(0, 3), later, dont, better, worse };
}
