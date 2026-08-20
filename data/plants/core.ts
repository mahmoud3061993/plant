import { pest } from "@/data/pests";
import type { Plant } from "@/data/types";

export const CORE_PLANTS: Plant[] = [
  {
    id: "pothos",
    slug: "pothos",
    arabicName: "البوتس",
    englishName: "Pothos",
    scientificName: "Epipremnum aureum",
    alsoKnownAs: ["مالتي بارا", "المالتيه", "البوتوس", "Devil's Ivy", "Golden Pothos"],
    category: "trailing",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "نبات متسلق سهل جدًا، بيعيش في إضاءة متوسطة وحتى القليلة، ومناسب لو أنت لسه بتبدأ.",
    visual: { emoji: "🌿", hue: 142, leafStyle: "heart" },
    light: {
      level: "medium",
      directSunTolerance: false,
      explanation:
        "بيحب ضوء ساطع غير مباشر. في الإضاءة القليلة بيعيش، لكن النمو بيبطأ والخطوط الصفراء على الورق ممكن تخف. الشمس المباشرة القوية بتحرق الورق.",
      bestPlacement:
        "جنب شباك شرق أو شمال، أو على رف بعيد شوية عن شباك قبلي. لو الورق أخضر غامق من غير تخطيط، غالبًا محتاج ضوء أحسن.",
    },
    watering: {
      need: "moderate",
      generalGuidance:
        "ما تسقيش بمواعيد ثابتة. البوتس بيتعفن لو التربة فضلت مبلولة، وبيضعف لو اتنسيت فترات طويلة جدًا.",
      howToCheck:
        "ادخل صباعك في أول 3 سم من التربة. لو ناشفة، اسقِ كويس لحد ما المياه تنزل من فتحات الصرف. لو لسه ندية، استنى.",
      overwateringSigns: [
        "ورق أصفر من تحت وبـيقع بسهولة",
        "سيقان طرية أو سودا عند التربة",
        "ريحة تربة تخميرة",
      ],
      underwateringSigns: [
        "ورق ناشف ومنكمش",
        "الأطراف بنية",
        "السيقان رفيعة وضعيفة",
      ],
      summerNotes:
        "في الحر، التربة بتنشف أسرع، خصوصًا لو النبات في أصيص صغير أو جنب تكييف. افحص أكتر، من غير ما تخلي التربة مستنقع.",
      winterNotes:
        "في الشتا قلل الري. النمو بيبطأ والتربة بتفضل ندية أطول. أسوأ غلط في الشتا هو السقي من غير فحص.",
      droughtTolerance: "medium",
    },
    soil: {
      type: "تربة خفيفة للأصص الداخلية",
      drainage: "good",
      suggestedMix:
        "خلطة أصص جاهزة جيدة الصرف + شوية بيرلايت أو رمل خشن عشان المياه ما تقعدش.",
      alternatives: [
        "تربة سحلبية خفيفة مخلوطة بنصف تربة أصص",
        "لو التربة عندك تقيلة، زوّد بيرلايت بوضوح",
      ],
    },
    fertilizing: {
      frequency: "تقريبًا مرة كل 4–6 أسابيع في موسم النمو، بتركيز خفيف",
      season: "الربيع والصيف",
      notes:
        "التسميد مش هيصلح إضاءة وحشة أو ري زيادة. في الشتا غالبًا مش محتاج سماد. لو الورق اتحرق من الأطراف بعد السماد، خفف التركيز.",
    },
    environment: {
      temperature: "تقريبًا 18–29°م. يبعد عن موجات صقيع أو شباك شتوي قارص.",
      humidity: "medium",
      humidityNotes:
        "مش من النباتات الحساسة جدًا للرطوبة، بس الجو الجاف جدًا ممكن يخلي الأطراف نشفة.",
      ventilation:
        "يحب هواية خفيفة. ما تحطوش في ركن مقفول رطب من غير صرف كويس.",
    },
    care: {
      pruning:
        "قص السيقان الطويلة لو حابب شكل أكتر كثافة. القص فوق عقدة ورق بيخلي النبات يتفرع.",
      repotting:
        "غالبًا كل سنة–سنتين، أو لما الجذور تطلع من تحت. اختار أصيص أكبر بدرجة واحدة بس وفيه صرف.",
      propagation:
        "سهل جدًا بالعقل: قص جزء فيه عقدة، حطه في مياه نظيفة لحد ما تظهر جذور، بعدين انقله لتربة خفيفة. غيّر المياه كل كام يوم.",
    },
    problems: {
      commonProblems: [
        {
          id: "yellow-leaves",
          arabicName: "ورق أصفر",
          symptoms: ["ورق سفلي أصفر", "تربة ندية طول الوقت"],
          likelyCauses: ["ري زيادة", "صرف ضعيف", "إضاءة قليلة جدًا مع تربة مبلولة"],
          whatToDo: [
            "افحص الصرف ووقف الري لحد ما أول طبقة تربة تنشف",
            "شيل الورق الأصفر الضعيف",
            "لو الجذور طرية وسودا، شوف قسم تعفن الجذور",
          ],
          severity: "mild",
        },
        {
          id: "leggy-growth",
          arabicName: "سيقان طويلة وورق متباعد",
          symptoms: ["مسافات كبيرة بين الورق", "لون باهت"],
          likelyCauses: ["إضاءة أضعف من احتياجه"],
          whatToDo: ["قرّبه من ضوء ساطع غير مباشر", "قص السيقان الطويلة عشان يتكثف"],
          severity: "mild",
        },
      ],
      commonPests: [
        pest("mealybugs", "دور عليه عند تفرع السيقان وفي قواعد الورق."),
        pest("spiderMites", "لو الجو جاف والورق بقى مغبر ومنقط."),
        pest("fungusGnats"),
      ],
      rootRotSigns: [
        "سيقان طرية عند سطح التربة",
        "جذور بنية أو سودا وسهلة تتقطع",
        "تربة ريحتها وحشة حتى بعد ما تنشف شوية",
      ],
    },
    safety: {
      children: {
        status: "toxic",
        notes:
          "فيه بلورات بتسبب حرقة في الفم لو اتأكل. خليه بعيد عن متناول الأطفال الصغيرين.",
      },
      cats: {
        status: "toxic",
        notes: "القطط لو مضغت الورق ممكن يحصل لها تهيج في الفم وقيء. مش علاج بيطري.",
      },
      dogs: {
        status: "toxic",
        notes: "نفس التحذير للكلاب. لو حصل بلع، راجع بيطري.",
      },
    },
    commonMistakes: [
      "الري لمجرد إن عدى عدد معين من الأيام من غير ما تفحص التربة",
      "ترك المياه متجمعة في الصحن تحت الأصيص",
      "وضع النبات فجأة تحت شمس مباشرة قوية",
      "زراعته في تربة حدائق تقيلة من غير صرف",
    ],
    dangerSigns: [
      "الساق كله بقى طري وأسود عند القاعدة",
      "سقوط ورق كتير مرة واحدة مع ريحة تعفن",
      "الجذور باينة وطريّة مش بيضا وثابتة",
    ],
    quickTips: [
      "لو مش عارف تسقي امتى: افحص التربة، متتابعش التقويم.",
      "البوتس بيغفر النسيان أكتر مما بيغفر الغرق.",
      "لو حابب ورق مخطط حلو، اديله ضوء أحسن من ركن مظلم.",
    ],
    quickCard: {
      light: "ضوء متوسط إلى ساطع غير مباشر",
      water: "اسقِ لما أول 3 سم من التربة تنشف",
      soil: "خلطة أصص خفيفة + بيرلايت",
      temperature: "18–29°م",
      humidity: "متوسطة",
      topWarning: "الغرق أخطر عليه من العطش",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: true,
    },
  },
  {
    id: "snake-plant",
    slug: "snake-plant",
    arabicName: "جلد النمر",
    englishName: "Snake Plant",
    scientificName: "Dracaena trifasciata",
    alsoKnownAs: ["نبات الثعبان", "لسان الحماة", "سانسيفيريا", "Sansevieria"],
    category: "upright",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "من أصعب النباتات إنها تموت من الإهمال، وأسهل حاجة تموّته هي الري الزيادة.",
    visual: { emoji: "🗡️", hue: 88, leafStyle: "sword" },
    light: {
      level: "low",
      directSunTolerance: true,
      explanation:
        "بيتحمل الإضاءة القليلة، وبيكون شكله أقوى في ضوء ساطع غير مباشر. شمس الصباح الخفيفة غالبًا مقبولة، أما شمس الظهر القوية من شباك قبلي ممكن تحرق الورق.",
      bestPlacement:
        "ركن صالة، مدخل، أو جنب شباك شرق. مناسب للأوض اللي إضاءتها مش قوية، بشرط التربة تنشف بين الريات.",
    },
    watering: {
      need: "low",
      generalGuidance:
        "النبات ده بيجمع مياه في الورق. الري الزيادة هو السبب الأشهر لتعفنه، خصوصًا في الشتا.",
      howToCheck:
        "افحص التربة لعمق أكبر من المعتاد، حوالي 5–7 سم أو لحد ما تحس إن أغلب الأصيص ناشف. اسقِ بعمق، وبعدين صرّف المياه الزيادة تمامًا.",
      overwateringSigns: [
        "ورق طري من القاعدة ومصفر",
        "الورق بينثني وبيقع",
        "بقع بنية طرية مش نشفة",
      ],
      underwateringSigns: [
        "ورق مجعد وشاحب شوية",
        "نمو واقف لفترات طويلة",
        "الأطراف نشفة رفيعة",
      ],
      summerNotes:
        "في الصيف ممكن يحتاج ري أكتر حسب الحر وحجم الأصيص، بس برضه بعد ما التربة تنشف فعلًا.",
      winterNotes:
        "في الشتا ممكن يفضل أسابيع من غير ري. لو البيت بارد، قلل جدًا. التربة الندية مع البرد وصفة تعفن.",
      droughtTolerance: "high",
    },
    soil: {
      type: "تربة سريعة الصرف، أقرب لخلطات الصبار",
      drainage: "sharp",
      suggestedMix:
        "نصف تربة أصص + نصف بيرلايت أو رمل خشن/حصى بركاني. المهم إن المياه تنزل بسرعة.",
      alternatives: [
        "خلطة صبار جاهزة",
        "تربة أصص عادية لو زودت صرف كتير وفتحت الأصيص من تحت كويس",
      ],
    },
    fertilizing: {
      frequency: "مرة كل شهرين في موسم النمو بتركيز خفيف جدًا، أو بلاش خالص لو النمو كويس",
      season: "الربيع وأول الصيف",
      notes: "مش نبات جوعان. السماد الزيادة بيضعف الجذور أكتر مما بينفع.",
    },
    environment: {
      temperature: "تقريبًا 16–30°م. ما يحبش البرد القارس ولا التيارات الباردة.",
      humidity: "low",
      humidityNotes: "ما يحتاجش رطوبة عالية. الجو العادي في البيت مناسب.",
      ventilation: "تهوية عادية كافية. تجنّب الحمام الرطب جدًا لو الصرف ضعيف.",
    },
    care: {
      pruning:
        "قص الورق التالف من القاعدة بمقص نظيف. الورقة المتشققة مش بترجع زي الأولى، فالأحسن تشيلها لو شكلها وحش.",
      repotting:
        "بيحب الأصيص الضيق شوية. غيّر الأصيص كل سنتين–ثلاث، أو لما يكسر الأصيص. استخدم أصيص ثقيل لأن الورق الطويل ممكن يوقع الأصيص الخفيف.",
      propagation:
        "بتقسيم الخلفات من الجذر، أو بقص ورقة إلى أجزاء وزراعتها في تربة جافة نسبيًا. التقسيم أوضح للمبتدئ.",
    },
    problems: {
      commonProblems: [
        {
          id: "mushy-base",
          arabicName: "قاعدة الورق طرية",
          symptoms: ["ورق بيقع من تحت", "لون أصفر مع ليونة"],
          likelyCauses: ["ري زيادة", "تربة تقيلة", "صحن فيه مياه واقفة"],
          whatToDo: [
            "وقف الري",
            "طلع النبات وافحص الجذور",
            "شيل الأجزاء الطرية، وازرع السليم في تربة أسرع صرف",
          ],
          severity: "urgent",
        },
      ],
      commonPests: [
        pest("mealybugs", "دور في قلب الورق من جوه عند القاعدة."),
        pest("spiderMites"),
      ],
      rootRotSigns: [
        "الريزوم أو القاعدة بقوا طريين",
        "ريحة تربة وحشة",
        "ورق سليم من فوق وفاسد من تحت",
      ],
    },
    safety: {
      children: {
        status: "mildly-toxic",
        notes: "لو اتأكل ممكن يسبب تهيج في الفم ومعدة. مش نبات للعب أو التذوق.",
      },
      cats: {
        status: "toxic",
        notes: "سام للقطط لو اتأكل. خليه في مكان صعب يتشاف عليه.",
      },
      dogs: {
        status: "toxic",
        notes: "سام للكلاب لو اتأكل. لو حصل بلع، راجع بيطري.",
      },
    },
    commonMistakes: [
      "الري بمواعيد ثابتة حتى لو التربة لسه ندية",
      "ترك المياه متجمعة في الأصيص أو الصحن",
      "زراعته في تربة بتحفظ مياه زي تربة الحديقة",
      "تغيير الأصيص كل شوية من غير حاجة",
      "حطه في حمام مظلم ورطب مع ري منتظم",
    ],
    dangerSigns: [
      "انهيار الورق من القاعدة",
      "بقع طرية بتنتشر لأعلى الورقة",
      "تعفن واضح في القلب الداخلي",
    ],
    quickTips: [
      "لو شككت تسقي: استنى.",
      "أصيص فيه فتحة صرف مش اختيار، ده أساسي.",
      "الإضاءة القليلة مش مشكلة قد التربة المبلولة.",
    ],
    quickCard: {
      light: "قليلة إلى ساطعة غير مباشرة",
      water: "اسقِ لما أغلب التربة تنشف، خصوصًا في الشتا",
      soil: "خلطة سريعة الصرف زي تربة الصبار",
      temperature: "16–30°م",
      humidity: "منخفضة إلى عادية",
      topWarning: "الري الزيادة بيقتل جلد النمر أسرع من أي حاجة",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: true,
    },
  },
  {
    id: "monstera",
    slug: "monstera",
    arabicName: "المونستيرا",
    englishName: "Monstera",
    scientificName: "Monstera deliciosa",
    alsoKnownAs: ["القشطة السويسرية", "Swiss Cheese Plant"],
    category: "upright",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    shortDescription:
      "نبات داخلي مشهور بورقه الكبير المتقبوب. عايز ضوء كويس، دعم للتسلق، وري بعد فحص التربة.",
    visual: { emoji: "🍃", hue: 152, leafStyle: "split" },
    light: {
      level: "bright-indirect",
      directSunTolerance: false,
      explanation:
        "الضوء الساطع غير المباشر هو اللي بيخلي الورق يتقب ويكبر. في الإضاءة الضعيفة الورق بيطلع صغير ومن غير شقوق. الشمس المباشرة القوية بتحرق الورق.",
      bestPlacement:
        "جنب شباك شرق أو على بعد متر من شباك مضيء بستارة خفيفة. سيخ طحلب أو دعامة خلف النبات بتساعده يطلع رأسي.",
    },
    watering: {
      need: "moderate",
      generalGuidance:
        "حب تربة تتندى بعدين تنشف من فوق. لا تسيبها ناشفة تمامًا أسابيع، ولا مبلولة كل يوم.",
      howToCheck:
        "افحص أول 4–5 سم. لو ناشفة، اسقِ ببطء لحد الصرف. صفي الصحن بعد ربع ساعة.",
      overwateringSigns: [
        "ورق أصفر كتير",
        "بقع بنية طرية",
        "تربة تفضل باردة ومبلولة",
      ],
      underwateringSigns: [
        "ورق نازل لتحت",
        "حواف ناشفة",
        "نمو جديد صغير ومتأخر",
      ],
      summerNotes: "في الحر بتشرب أسرع، خصوصًا لو الحجم كبير وفي ضوء قوي.",
      winterNotes: "قلل الري. الورق الكبير بيخدعك؛ التربة ممكن تفضل ندية أيام.",
      droughtTolerance: "medium",
    },
    soil: {
      type: "خلطة آرويد خفيفة وهوائية",
      drainage: "good",
      suggestedMix:
        "تربة أصص + بيرلايت + شوية قشور أوركيد أو قطع لحاء، عشان الجذور تاخد هوا.",
      alternatives: [
        "خلطة سحلبية مخلوطة بتربة أصص",
        "لو مش لاقي لحاء: بيرلايت أكتر وتربة أقل",
      ],
    },
    fertilizing: {
      frequency: "كل 4 أسابيع تقريبًا في موسم النمو بسماد متوازن خفيف",
      season: "الربيع والصيف",
      notes:
        "التسميد مش هيخلّي الورق يتقب لو الإضاءة ضعيفة. التقوب مرتبطة بالضوء والعمر أكتر من السماد.",
    },
    environment: {
      temperature: "18–30°م تقريبًا. يكره البرد والتيار البارد من التكييف على الورق مباشرة.",
      humidity: "medium",
      humidityNotes:
        "رطوبة متوسطة إلى عالية بتساعد الورق الجديد يتفتح من غير لزوجة. رش عشوائي من غير تهوية مش حل سحري.",
      ventilation: "هوا خفيف مهم. ازدحام نباتات من غير صرف بيزود العفن.",
    },
    care: {
      pruning:
        "قص الورق الأصفر أو التالف من العنق. لو النبات اتمدد، قص الساق فوق عقدة عشان يتفرع. السيقان الهوائية متتشالش كلها؛ ممكن توجيهها للدعامة.",
      repotting:
        "كل سنة–سنتين حسب النمو. ما تكبرش الأصيص قفزة كبيرة عشان التربة الزيادة تفضل مبلولة.",
      propagation:
        "عقلة فيها عقدة وجذر هوائي في مياه أو تربة خفيفة. استنى جذور واضحة قبل النقل النهائي.",
    },
    problems: {
      commonProblems: [
        {
          id: "no-fenestration",
          arabicName: "ورق من غير شقوق",
          symptoms: ["ورق صغير كامل الحواف"],
          likelyCauses: ["إضاءة ضعيفة", "نبات لسه صغير", "نقص دعم للتسلق"],
          whatToDo: [
            "زوّد ضوء ساطع غير مباشر",
            "حط دعامة",
            "استنى؛ الورق المتقبوب بيجي مع النضج",
          ],
          severity: "mild",
        },
        {
          id: "brown-patches",
          arabicName: "بقع بنية على الورق",
          symptoms: ["بقع ناشفة أو طرية حسب السبب"],
          likelyCauses: ["حرق شمس", "ري غير منتظم", "أملاح سماد"],
          whatToDo: [
            "فرّق: البقع الناشفة مع شمس مباشرة غالبًا حرق",
            "الثقوب الطرية مع تربة مبلولة أقرب للتعفن",
            "اشطف التربة لو سمادت بتركيز عالي",
          ],
          severity: "serious",
        },
      ],
      commonPests: [pest("spiderMites"), pest("thrips"), pest("mealybugs")],
      rootRotSigns: [
        "سيقان طرية عند التربة",
        "ورق بيقع وهو لسه أخضر نسبيًا",
        "جذور غامقة وريحة كريهة",
      ],
    },
    safety: {
      children: {
        status: "toxic",
        notes: "كل أجزاء النبات بتسبب حرقة لو اتأكلت. الثمار الناضجة في الطبيعة قصة تانية ومش موضوع بيت.",
      },
      cats: { status: "toxic", notes: "سام للقطط لو اتأكل." },
      dogs: { status: "toxic", notes: "سام للكلاب لو اتأكل." },
    },
    commonMistakes: [
      "حطه في ركن مظلم واستغرب إن الورق مش بيتقب",
      "ري غزير لأن الورق كبير فتخيّلت إنه عطشان",
      "قطع كل الجذور الهوائية",
      "شمس ظهيرة مباشرة على الورق",
      "أصيص ضخم والتربة تفضل مبلولة في النص",
    ],
    dangerSigns: [
      "انهيار الساق الرئيسي",
      "بقع سودا طرية بتنتشر بسرعة",
      "سقوط ورق متعدد مع تربة نتنة",
    ],
    quickTips: [
      "لو عايز الشكل المشهور: ضوء أحسن + دعامة.",
      "امسح الغبار عن الورق الكبير بقطعة ناعمة نديّة.",
      "الجذر الهوائي مش مرض؛ ده طريقة النبات يتسلق.",
    ],
    quickCard: {
      light: "ساطع غير مباشر",
      water: "اسقِ لما أول 4–5 سم تنشف",
      soil: "خلطة هوائية خفيفة للآرويد",
      temperature: "18–30°م",
      humidity: "متوسطة إلى عالية شوية",
      topWarning: "من غير ضوء كويس مش هتشوف الشقوق المشهورة",
    },
    matcher: {
      lowLightOk: false,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: false,
      compact: false,
    },
  },
  {
    id: "zz-plant",
    slug: "zz-plant",
    arabicName: "الزاميا",
    englishName: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    alsoKnownAs: ["نبات زد زد", "Zamioculcas"],
    category: "upright",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "نبات لامع وصبور جدًا على الإضاءة القليلة والعطش، بس بيتأثر بسرعة من الغرق.",
    visual: { emoji: "✨", hue: 128, leafStyle: "oval" },
    light: {
      level: "low",
      directSunTolerance: false,
      explanation:
        "بيعيش في إضاءة مكتبية أو ركن بعيد عن الشباك. في الضوء الساطع غير المباشر لونه بيكون أحلى. الشمس المباشرة ممكن تحرق الورق اللامع.",
      bestPlacement:
        "مكاتب، ممرات، أوض نوم بإضاءة متوسطة. لو المكان ظلام دامس طول اليوم، النمو هيقف تقريبًا.",
    },
    watering: {
      need: "low",
      generalGuidance:
        "تحت الأرض فيه درنات بتخزن مياه. يعني النبات ده معدّ عشان يتحمل الجفاف، مش الرطوبة الدائمة.",
      howToCheck:
        "استنى لحد ما التربة تنشف في معظم الأصيص، مش بس السطح. اسقِ بعمق وصرّف كويس.",
      overwateringSigns: [
        "ورق أصفر فجأة",
        "سيقان طرية من تحت",
        "درنات طرية لما تطلع النبات",
      ],
      underwateringSigns: [
        "ورق بيلمع أقل وناشف من الأطراف",
        "سقوط وريقات سفلية بعد جفاف طويل",
      ],
      summerNotes: "حتى في الصيف، افحص قبل ما تسقي. الحر مش معناه جدول أسبوعي ثابت.",
      winterNotes: "ري نادر. كتير من الناس بتغرق الزاميا في الشتا من غير ما يلاحظوا.",
      droughtTolerance: "high",
    },
    soil: {
      type: "تربة سريعة الصرف",
      drainage: "sharp",
      suggestedMix: "تربة أصص + بيرلايت كتير، أو خلطة صبار.",
      alternatives: ["أي خلطة خفيفة ما تمسكش مياه زي الطين"],
    },
    fertilizing: {
      frequency: "مرة كل شهرين في موسم النمو بتركيز خفيف، أو أقل",
      season: "الربيع والصيف",
      notes: "نمو الزاميا بطيء بطبعه. السماد مش هيخليه يطلع بسرعة غير طبيعية.",
    },
    environment: {
      temperature: "18–30°م. ما يحبش البرد.",
      humidity: "low",
      humidityNotes: "رطوبة البيت العادية كفاية.",
      ventilation: "عادية. تجنّب التربة المبلولة في مكان زبالة التهوية.",
    },
    care: {
      pruning: "قص السيقان الصفراء من القاعدة. الورق اللامع ينمسح من الغبار بقطعة جافة أو ندية خفيفة.",
      repotting:
        "كل سنتين–ثلاث. الدرنات بتحتاج مساحة، بس أصيص أكبر بكتير بيخلي الري أصعب.",
      propagation: "بتقسيم الدرنات، أو بورقة في تربة (بطيء جدًا). التقسيم أوضح.",
    },
    problems: {
      commonProblems: [
        {
          id: "yellow-stems",
          arabicName: "سيقان صفراء طرية",
          symptoms: ["اصفرار من تحت", "ليونة"],
          likelyCauses: ["ري زيادة"],
          whatToDo: ["جفّف التربة", "افحص الدرنات وشيل الفاسد", "ازرع في خلطة أسرع صرف"],
          severity: "serious",
        },
      ],
      commonPests: [pest("mealybugs"), pest("scale")],
      rootRotSigns: ["درنات طرية ومائية", "ريحة تعفن", "سقوط سيقان كاملة"],
    },
    safety: {
      children: {
        status: "toxic",
        notes: "كل الأجزاء سامة لو اتأكلت وبتسبب تهيج. العصارة ممكن تهيج الجلد عند بعض الناس.",
      },
      cats: { status: "toxic", notes: "سام للقطط." },
      dogs: { status: "toxic", notes: "سام للكلاب." },
    },
    commonMistakes: [
      "تسقيه زي نبات عطشان لأن الورق لامع وكبير",
      "تسيبه في تربة مبلولة لأنك خايف يموت من العطش",
      "شمس مباشرة قوية على الورق",
      "تغرقه بعد ما تشتريه مباشرة من غير ما تفحص التربة",
    ],
    dangerSigns: ["انهيار أكثر من ساق من القاعدة", "درنات مهروسة", "عفن منتشر"],
    quickTips: [
      "لو نسيت تسقيه أسبوعين، غالبًا هيسامحك.",
      "لو سقيته مرتين في أسبوع من غير فحص، دي البداية الغلط.",
      "امسح الغبار عشان الورق يفضل لامع.",
    ],
    quickCard: {
      light: "قليلة إلى متوسطة",
      water: "اسقِ لما أغلب التربة تنشف",
      soil: "صرف سريع",
      temperature: "18–30°م",
      humidity: "عادية",
      topWarning: "الدورنات بتخزن مياه؛ الغرق بيخليها تتعفن",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: true,
    },
  },
  {
    id: "peace-lily",
    slug: "peace-lily",
    arabicName: "زنبق السلام",
    englishName: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    alsoKnownAs: ["سباثيفيلوم", "Spathiphyllum"],
    category: "flowering",
    difficulty: "intermediate",
    indoorOutdoor: "indoor",
    shortDescription:
      "ورق أخضر غامق ونورة بيضا. بيدلّى بوضوح لما يعطش، بس برضه بيتعفن لو اتساب في مياه.",
    visual: { emoji: "🤍", hue: 160, leafStyle: "oval" },
    light: {
      level: "medium",
      directSunTolerance: false,
      explanation:
        "ضوء متوسط إلى ساطع غير مباشر. في الإضاءة الضعيفة ممكن يعيش بس التزهير بيقل. الشمس المباشرة بتحرق الورق.",
      bestPlacement:
        "جنب شباك شرق أو شمال مضيء. بعيد عن شمس الظهر. لو عايز نورات، ما تخبيوش في ركن مظلم.",
    },
    watering: {
      need: "moderate",
      generalGuidance:
        "بيحب تربة ندية باعتدال، مش مستنقع. دلع الورق علامة عطش شائعة، لكن لو اتكررت كل يومين فالأصيص صغير أو الجو حر جدًا.",
      howToCheck:
        "افحص أول 2–3 سم. لو ناشفة، اسقِ كويس وصرّف. لو النبات دلقان والتربة مبلولة، المشكلة مش عطش.",
      overwateringSigns: ["ورق أصفر", "بقع بنية", "تربة باردة ريحتها وحشة"],
      underwateringSigns: ["ورق واقع لتحت بقوة", "حواف بنية ناشفة", "نورات بنية بدري"],
      summerNotes: "بيشرب أسرع. افحص بانتظام، من غير جدول أعمى.",
      winterNotes: "قلل. التدفئة بتخلي الأطراف تنشف حتى لو التربة ندية؛ دي رطوبة هوا مش ري.",
      droughtTolerance: "low",
    },
    soil: {
      type: "تربة أصص تحتفظ بندى خفيف مع صرف",
      drainage: "moisture-retentive",
      suggestedMix: "تربة أصص جيدة + شوية بيرلايت عشان ما تمسكش زي الطين.",
      alternatives: ["خلطة بيتموس خفيفة لو الصرف موجود"],
    },
    fertilizing: {
      frequency: "كل 4–6 أسابيع في موسم النمو بتركيز خفيف",
      season: "الربيع والصيف",
      notes: "السماد القوي بيحرق الأطراف. لو مش مزهر، شوف الإضاءة قبل السماد.",
    },
    environment: {
      temperature: "18–28°م. يكره البرد المفاجئ.",
      humidity: "medium",
      humidityNotes: "بيستفيد من رطوبة أعلى. بعيد عن تكييف مباشر.",
      ventilation: "هوا خفيف من غير تيار بارد على الورق.",
    },
    care: {
      pruning: "قص النورات البنية من قاعدتها، وقص الورق الأصفر كاملًا.",
      repotting: "لما الجذور تملا الأصيص أو المياه تنزل بسرعة غريبة. درجة واحدة أكبر.",
      propagation: "بتقسيم الخلفات أثناء التشتيل. كل جزء لازم يكون فيه جذور.",
    },
    problems: {
      commonProblems: [
        {
          id: "no-flowers",
          arabicName: "مش بيزهر",
          symptoms: ["ورق بس من غير نورات"],
          likelyCauses: ["إضاءة ضعيفة", "نبات صغير", "سماد نيتروجين عالي جدًا أحيانًا"],
          whatToDo: ["زوّد ضوء غير مباشر", "ما تستعجلش التزهير في الشتا"],
          severity: "mild",
        },
        {
          id: "brown-tips",
          arabicName: "أطراف بنية",
          symptoms: ["حواف الورق نشفة"],
          likelyCauses: ["هواء جاف", "أملاح في المياه أو السماد", "عطش متكرر"],
          whatToDo: [
            "ثبّت الري بالفحص مش بالغريق",
            "استخدم مياه أقل أملاح إن قدرت",
            "ابعده عن التكييف",
          ],
          severity: "mild",
        },
      ],
      commonPests: [pest("spiderMites"), pest("mealybugs"), pest("fungusGnats")],
      rootRotSigns: ["تاج النبات طري", "ورق أصفر مع تربة مبلولة دائمًا", "جذور داكنة"],
    },
    safety: {
      children: { status: "toxic", notes: "سام لو اتأكل وبيسبب حرقة في الفم." },
      cats: { status: "toxic", notes: "سام للقطط." },
      dogs: { status: "toxic", notes: "سام للكلاب." },
    },
    commonMistakes: [
      "تسقيه كل ما تلاقيه دلقان من غير ما تفحص لو التربة أصلًا مبلولة",
      "تسيبه في صحن مياه طول اليوم",
      "تحطه في شمس قوية عشان يزهر أسرع",
      "تسميد قوي عشان النورات",
    ],
    dangerSigns: ["التاج طري في النص", "سقوط ورق جماعي", "عفن قاعدي"],
    quickTips: [
      "الدلع علامة مفيدة، بس مش دايمًا معناها اسقِ فورًا لو التربة مبلولة.",
      "عشان يزهر: ضوء أحسن أهم من سماد أكتر.",
      "قص النورة لما تبقى خضراء/بنية؛ مش هترجع بيضا.",
    ],
    quickCard: {
      light: "متوسطة إلى ساطعة غير مباشرة",
      water: "اسقِ لما أول 2–3 سم تنشف، وصرّف كويس",
      soil: "تربة أصص نديّة خفيفة",
      temperature: "18–28°م",
      humidity: "متوسطة إلى عالية",
      topWarning: "التربة المبلولة الدائمة بتعفن التاج",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: false,
      compact: true,
    },
  },
  {
    id: "spider-plant",
    slug: "spider-plant",
    arabicName: "نبات العنكبوت",
    englishName: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    alsoKnownAs: ["كلوروفيتم", "الكلوروفايتم", "Chlorophytum"],
    category: "trailing",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "نبات سهل، بيطلع خلفات معلقة زي العنكبوت، وغالبًا من الخيارات الأأمن مع الحيوانات مقارنة بنباتات البيت التانية.",
    visual: { emoji: "🕷️", hue: 98, leafStyle: "sword" },
    light: {
      level: "medium",
      directSunTolerance: false,
      explanation:
        "ضوء ساطع غير مباشر ممتاز. في الشمس القوية الورق يبهت أو يحترق. في الإضاءة الضعيفة الخطوط بتبهت والنمو بيقل.",
      bestPlacement: "معلق جنب شباك شرق، أو على رف مضيء بعيد عن شمس الظهر.",
    },
    watering: {
      need: "moderate",
      generalGuidance: "يحب رطوبة معتدلة في التربة مع جفاف خفيف بين الريات.",
      howToCheck: "افحص أول 3 سم. اسقِ لما تنشف، وصرّف المياه الزيادة.",
      overwateringSigns: ["ورق أصفر من القلب", "قاعدة طرية"],
      underwateringSigns: ["ورق باهت ومنكمش", "الأطراف بنية أكتر من المعتاد"],
      summerNotes: "الأصص المعلقة بتنشف أسرع؛ افحص أكتر.",
      winterNotes: "قلل الري. التدفئة بتنشف الأطراف حتى مع تربة كويسة.",
      droughtTolerance: "medium",
    },
    soil: {
      type: "تربة أصص عادية جيدة الصرف",
      drainage: "good",
      suggestedMix: "تربة أصص + شوية بيرلايت.",
      alternatives: ["أي خلطة خفيفة للبيت"],
    },
    fertilizing: {
      frequency: "كل 4–6 أسابيع في موسم النمو بتركيز خفيف",
      season: "الربيع والصيف",
      notes: "السماد الزيادة والأطراف البنية غالبًا مرتبطين. خفف.",
    },
    environment: {
      temperature: "16–27°م تقريبًا.",
      humidity: "medium",
      humidityNotes: "رطوبة عادية كويسة. الهواء الجاف جدًا بيزود الأطراف البنية.",
      ventilation: "عادية.",
    },
    care: {
      pruning: "قص الأطراف البنية لو شكلك مش عاجبها. قص الخلفات لو حابب النبات الأم يتركز.",
      repotting: "لما الجذور تبقى كثيفة جدًا أو الأصيص يشق. النبات ده بيحب يكون مليان شوية.",
      propagation: "الخلفات تتحط في مياه أو تربة وهي لسه متوصلة، وبعدين تتفصل. سهل جدًا.",
    },
    problems: {
      commonProblems: [
        {
          id: "brown-tips-fluoride",
          arabicName: "أطراف بنية",
          symptoms: ["رؤوس الورق نشفة بنية"],
          likelyCauses: [
            "هواء جاف",
            "أملاح أو كلور/فلورايد في بعض مصادر المياه",
            "ري غير منتظم",
          ],
          whatToDo: [
            "ثبّت الري بالفحص",
            "لو المياه عندك قاسية، جرّب مياه أهدى أو سيّب الميه المغلية تبرد",
            "ما تسمدش زيادة",
          ],
          severity: "mild",
        },
      ],
      commonPests: [pest("spiderMites"), pest("aphids"), pest("mealybugs")],
      rootRotSigns: ["قلب النبات طري", "جذور بنية", "ورق أصفر مع تربة غرقانة"],
    },
    safety: {
      children: {
        status: "safe",
        notes: "من النباتات اللي عادةً بتتصنف غير سامة. ده مش دعوة للأكل أو اللعب في التربة.",
      },
      cats: {
        status: "safe",
        notes:
          "غالبًا غير سام للقطط، بس المضغ ممكن يسبب قيء لأن الألياف كتير. لو القطة بتاكل نباتات، راقبها.",
      },
      dogs: {
        status: "safe",
        notes: "غالبًا غير سام للكلاب، مع نفس ملاحظة المضغ والقيء.",
      },
    },
    commonMistakes: [
      "شمس مباشرة حارقة على الورق المخطط",
      "ري زيادة لأنك شايفه نبات 'بيحب المياه'",
      "تسميد تقيل عشان الخلفات",
      "إهمال الصرف في الأصص المعلقة",
    ],
    dangerSigns: ["القلب الداخلي طري", "انهيار التاج", "عفن قاعدي"],
    quickTips: [
      "لو عايز خلفات أكتر: ضوء كويس ونبات ناضج.",
      "الأطراف البنية شائعة ومش نهاية النبات.",
      "من الخيارات الأنسب لو في حيوانات في البيت، مع إن مفيش نبات بيت 100% بلا مراقبة.",
    ],
    quickCard: {
      light: "متوسطة إلى ساطعة غير مباشرة",
      water: "اسقِ لما أول 3 سم تنشف",
      soil: "تربة أصص خفيفة",
      temperature: "16–27°م",
      humidity: "متوسطة",
      topWarning: "الأطراف البنية غالبًا مياه/هواء جاف، مش نقص سماد",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: true,
      beginnerFriendly: true,
      compact: true,
    },
  },
  {
    id: "aloe-vera",
    slug: "aloe-vera",
    arabicName: "الألوفيرا",
    englishName: "Aloe Vera",
    scientificName: "Aloe vera",
    alsoKnownAs: ["صبار الألوفيرا", "ألوي"],
    category: "succulent",
    difficulty: "beginner",
    indoorOutdoor: "both",
    shortDescription:
      "نبات عصاري بيحب الضوء والصرف السريع. الجيل مش بديل طبي، والعناية غلط بتخليه يطرى ويتعفن.",
    visual: { emoji: "🌵", hue: 118, leafStyle: "rosette" },
    light: {
      level: "bright-indirect",
      directSunTolerance: true,
      explanation:
        "محتاج ضوء قوي. شمس الصباح ممتازة. شمس الظهر القوية فجأة بعد ظل ممكن تحرق الورق. في الإضاءة الضعيفة بيفرفح ويضعف.",
      bestPlacement:
        "شباك شرق أو جنوب بستارة خفيفة. الشرفة المشرقة أحسن من حمام مظلم.",
    },
    watering: {
      need: "low",
      generalGuidance:
        "اسقِ بعمق بعد ما التربة تنشف، وبعدين سيبه. الورق التخين معناه إنه خازن مياه، مش إنه عايز كوباية كل شوية.",
      howToCheck:
        "افحص لعمق أصبعين أو أكتر. لو لسه ندي، استنى. بعد الري، صرّف كل نقطة زيادة.",
      overwateringSigns: ["ورق طري ومائي", "اصفرار", "قاعدة سودا"],
      underwateringSigns: ["ورق رفيع ومجعد", "لون باهت بعد جفاف طويل"],
      summerNotes: "في الحر ممكن يشرب أكتر، بس بعد الجفاف الفعلي.",
      winterNotes: "ري نادر جدًا. البرد + تربة مبلولة = تعفن سريع.",
      droughtTolerance: "high",
    },
    soil: {
      type: "خلطة صبار/عصاريات",
      drainage: "sharp",
      suggestedMix: "تربة صبار جاهزة، أو تربة أصص مع نسبة كبيرة بيرلايت ورمل خشن.",
      alternatives: ["ما تستخدمش تربة حديقة ثقيلة"],
    },
    fertilizing: {
      frequency: "مرة أو مرتين في موسم النمو بتركيز خفيف جدًا",
      season: "الربيع",
      notes: "نادرة ما يكون السماد هو المحتاج. الضوء والصرف أهم.",
    },
    environment: {
      temperature: "16–30°م. يبعد عن صقيع.",
      humidity: "low",
      humidityNotes: "يحب جو جاف نسبيًا.",
      ventilation: "تهوية كويسة عشان الورق ينشف بعد الري.",
    },
    care: {
      pruning: "شيل الورق التالف من القاعدة. متقطعش نص ورقة وتسيبها مفتوحة إلا لو هتستخدمها فورًا.",
      repotting: "لما الخلفات تزحم أو الجذور تطلع. أصيص فيه صرف أكيد.",
      propagation: "افصل الخلفات اللي ليها جذور وازرعها في تربة جافة نسبيًا، واستنى كام يوم قبل أول ري.",
    },
    problems: {
      commonProblems: [
        {
          id: "etiolation",
          arabicName: "تفرفيح وضعف",
          symptoms: ["ساق تطول", "ورق متباعد وفاتح"],
          likelyCauses: ["إضاءة ضعيفة"],
          whatToDo: ["انقل لمكان أسطع تدريجيًا", "ما ترميهوش في شمس حارقة فجأة"],
          severity: "mild",
        },
      ],
      commonPests: [pest("mealybugs"), pest("scale")],
      rootRotSigns: ["قاعدة طرية", "ورق ينفصل بسهولة وهو مائي", "جذور بنية"],
    },
    safety: {
      children: {
        status: "mildly-toxic",
        notes:
          "الجل الداخلي مش أكل، والعصارة الصفراء ممكن تسبب ضيق هضمي. ما تستخدمهوش كعلاج طبي من الصفحة دي.",
      },
      cats: {
        status: "toxic",
        notes: "سام للقطط لو اتأكل. مش بديل لأي علاج بيطري.",
      },
      dogs: {
        status: "toxic",
        notes: "سام للكلاب لو اتأكل.",
      },
    },
    commonMistakes: [
      "ري أسبوعي ثابت كأن النبات مش عصاري",
      "تربة بتحفظ مياه",
      "حطه في ركن مظلم لأنه 'صبار وبيستحمل'",
      "تسييب المياه في الصحن",
      "نقله من ظل لشمس حارقة في يوم واحد",
    ],
    dangerSigns: ["الوردة كلها طرية من القلب", "عفن قاعدي", "انهيار مفاجئ بعد ري غزير"],
    quickTips: [
      "الضوء القوي والصرف السريع أهم من أي سماد.",
      "الورقة الطرية المائية غالبًا غرق مش عطش.",
      "الخلفيات الصغيرة تستنى لحد ما يكون ليها جذور قبل الفصل.",
    ],
    quickCard: {
      light: "قوية، مع شمس صباح إن وجدت",
      water: "اسقِ بعد ما التربة تنشف بعمق، وصرّف تمامًا",
      soil: "خلطة صبار سريعة الصرف",
      temperature: "16–30°م",
      humidity: "منخفضة",
      topWarning: "الشتاء المبلول بيقتل الألوفيرا",
    },
    matcher: {
      lowLightOk: false,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: true,
    },
  },
  {
    id: "rubber-plant",
    slug: "rubber-plant",
    arabicName: "فيكس المطاط",
    englishName: "Rubber Plant",
    scientificName: "Ficus elastica",
    alsoKnownAs: ["الفيكس المطاطي", "Rubber Fig"],
    category: "upright",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "شجرة داخلية بورق سميك لامع. بتحب الاستقرار والضوء الكويس، وبتسقط ورق لو اتنقلت كتير أو اتغرقت.",
    visual: { emoji: "🟤", hue: 355, leafStyle: "oval" },
    light: {
      level: "bright-indirect",
      directSunTolerance: false,
      explanation:
        "ضوء ساطع غير مباشر هو المثالي. الأصناف الغامقة تتحمل أقل من الأصناف الملونة. شمس قوية مباشرة ممكن تحرق.",
      bestPlacement: "جنب شباك مضيء بستارة. ما تحركوش كل أسبوع لمكان جديد.",
    },
    watering: {
      need: "moderate",
      generalGuidance: "اسقِ لما الطبقة العليا تنشف، وبعدين ري عميق مع صرف.",
      howToCheck: "أول 3–5 سم ناشفة؟ اسقِ. لسه ندية؟ استنى.",
      overwateringSigns: ["سقوط ورق أصفر", "تربة ريحتها وحشة"],
      underwateringSigns: ["ورق ناشف ومنحني", "سقوط ورق سفلي بعد جفاف"],
      summerNotes: "بيشرب أكتر مع الضوء القوي.",
      winterNotes: "قلل جدًا. سقوط ورق الشتا غالبًا ري أو برد.",
      droughtTolerance: "medium",
    },
    soil: {
      type: "تربة أصص جيدة الصرف",
      drainage: "good",
      suggestedMix: "تربة أصص + بيرلايت. ممكن شوية لحاء لو خلطة تقيلة.",
      alternatives: ["خلطة شجر داخلي جاهزة لو فيها صرف"],
    },
    fertilizing: {
      frequency: "كل 4 أسابيع في موسم النمو بتركيز خفيف",
      season: "الربيع والصيف",
      notes: "ما تسمدش نبات لسه متنقل أو ساقط ورق من صدمة.",
    },
    environment: {
      temperature: "18–29°م. يكره تيارات باردة.",
      humidity: "medium",
      humidityNotes: "امسح الورق من الغبار. الرطوبة المتوسطة مناسبة.",
      ventilation: "عادية، من غير باب مفتوح على برد.",
    },
    care: {
      pruning:
        "قص القمة لو حابب يتفرع. العصارة ممكن تهيج الجلد؛ البس جوانتي خفيف ونظّف المقص.",
      repotting: "كل سنتين تقريبًا. ما تكبرش الأصيص جدًا.",
      propagation: "عقلة قمية في تربة خفيفة أو مياه، مع صبر. العقدة مهمة.",
    },
    problems: {
      commonProblems: [
        {
          id: "leaf-drop",
          arabicName: "سقوط ورق مفاجئ",
          symptoms: ["ورق بيقع وهو لسه شبه سليم"],
          likelyCauses: ["تغيير مكان", "ري زيادة أو نقص حاد", "برد"],
          whatToDo: ["ثبّت المكان والري", "افحص التربة قبل أي ري جديد"],
          severity: "serious",
        },
      ],
      commonPests: [pest("scale"), pest("spiderMites"), pest("mealybugs")],
      rootRotSigns: ["سقوط ورق مع تربة مبلولة", "جذور غامقة", "ساق لين عند التربة"],
    },
    safety: {
      children: {
        status: "mildly-toxic",
        notes: "العصارة بتسبب تهيج. مش للأكل.",
      },
      cats: { status: "toxic", notes: "سام للقطط لو اتأكل." },
      dogs: { status: "toxic", notes: "سام للكلاب لو اتأكل." },
    },
    commonMistakes: [
      "تحريك الأصيص كل شوية عشان 'ياخد هوا'",
      "غسل الورق بمنظفات قوية",
      "ري زيادة في الشتا",
      "شمس حارقة بعد شراء النبات من مشتل مظلل",
    ],
    dangerSigns: ["سقوط ورق جماعي مستمر", "ساق طري", "عفن"],
    quickTips: [
      "الثبات أهم من العناية المعقدة.",
      "امسح الغبار؛ الورق السميك بيتوسخ وبيضعف الضوء.",
      "العصارة لزجة؛ ابتعد عن العين والجلد الحساس.",
    ],
    quickCard: {
      light: "ساطع غير مباشر",
      water: "اسقِ لما أول 3–5 سم تنشف",
      soil: "تربة أصص + صرف",
      temperature: "18–29°م",
      humidity: "متوسطة",
      topWarning: "التنقل الكتير بيسقط الورق",
    },
    matcher: {
      lowLightOk: false,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: false,
    },
  },
  {
    id: "dracaena",
    slug: "dracaena",
    arabicName: "الدراسينا",
    englishName: "Dracaena",
    scientificName: "Dracaena fragrans",
    alsoKnownAs: ["شجرة الذرة", "Corn Plant", "دراسينا فراجرانس"],
    category: "upright",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "شكلها شجري وسهلة نسبيًا، بس حساسة لزيادة الري ولبعض مكونات المياه اللي بتحرق أطراف الورق.",
    visual: { emoji: "🌽", hue: 72, leafStyle: "sword" },
    light: {
      level: "medium",
      directSunTolerance: false,
      explanation:
        "ضوء متوسط إلى ساطع غير مباشر. الأصناف الملونة محتاجة ضوء أحسن عشان الألوان تبان. شمس مباشرة حارقة.",
      bestPlacement: "صالة مضيئة بعيد عن الشباك القبلي المباشر.",
    },
    watering: {
      need: "moderate",
      generalGuidance: "سيّب السطح ينشف قبل الري. الغرق بيخلي الساق يتعفن من جوه بهدوء.",
      howToCheck: "أول 3–4 سم ناشفة ثم ري عميق مع صرف.",
      overwateringSigns: ["ورق أصفر ناعم", "ساق لين", "بقع بنية طرية"],
      underwateringSigns: ["ورق ناشف من الأطراف للداخل", "انحناء الأوراق"],
      summerNotes: "افحص بانتظام مع الحر.",
      winterNotes: "قلل. الأطراف النشفة في الشتا ممكن تبقى هوا جاف مش عطش.",
      droughtTolerance: "medium",
    },
    soil: {
      type: "تربة أصص جيدة الصرف",
      drainage: "good",
      suggestedMix: "تربة أصص + بيرلايت.",
      alternatives: ["خلطة نخيل خفيفة لو متوفرة"],
    },
    fertilizing: {
      frequency: "كل 4–6 أسابيع في موسم النمو بتركيز خفيف",
      season: "الربيع والصيف",
      notes: "ما تسمدش على تربة ناشفة جدًا.",
    },
    environment: {
      temperature: "18–28°م.",
      humidity: "medium",
      humidityNotes:
        "بعض الناس بتلاحظ أطراف بنية مع مياه الصنبور القاسية أو الكلور. لو حصل، جرّب مياه أهدى وثبات ري.",
      ventilation: "عادية.",
    },
    care: {
      pruning: "ممكن تقص الساق لو طول زيادة؛ هينبت من العين اللي تحت القص غالبًا.",
      repotting: "كل سنتين. الجذور بتلف أحيانًا؛ فكها بلطف.",
      propagation: "عقل ساق في مياه أو تربة. صبر.",
    },
    problems: {
      commonProblems: [
        {
          id: "brown-tips-water",
          arabicName: "أطراف بنية",
          symptoms: ["رؤوس الورق نشفة"],
          likelyCauses: ["جفاف هوا", "أملاح/حساسية لبعض المياه", "ري غير ثابت"],
          whatToDo: ["ثبّت الري", "ابعد عن التكييف", "جرّب مصدر مياه ألطف لو المشكلة مستمرة"],
          severity: "mild",
        },
      ],
      commonPests: [pest("spiderMites"), pest("mealybugs"), pest("scale")],
      rootRotSigns: ["ساق أجوف أو لين", "ورق أصفر مع تربة مبلولة", "ريحة عفن"],
    },
    safety: {
      children: { status: "toxic", notes: "سام لو اتأكل." },
      cats: { status: "toxic", notes: "سام للقطط. ابعده عن القطط اللي بتمضغ ورق." },
      dogs: { status: "toxic", notes: "سام للكلاب." },
    },
    commonMistakes: [
      "ري زيادة لأن شكلها استوائي",
      "حطها في رواق مظلم تمامًا",
      "تجاهل الصرف",
      "تسميد عشان الأطراف البنية تروح (غالبًا هتسوء)",
    ],
    dangerSigns: ["لين في الساق الخشبي", "سقوط ورق كثيف", "عفن قاعدي"],
    quickTips: [
      "الأطراف البنية شائعة؛ قص الطرف الناشف بمقص نظيف لو الشكل مهم.",
      "الإضاءة المتوسطة تكفي للأنواع الخضراء.",
      "القطط والدراسينا مش خلطه موفقة.",
    ],
    quickCard: {
      light: "متوسطة إلى ساطعة غير مباشرة",
      water: "اسقِ لما أول 3–4 سم تنشف",
      soil: "تربة أصص خفيفة",
      temperature: "18–28°م",
      humidity: "متوسطة",
      topWarning: "الساق بيتعفن من جوّه لو الري زيادة",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: false,
    },
  },
  {
    id: "aglaonema",
    slug: "aglaonema",
    arabicName: "الأجلونيما",
    englishName: "Aglaonema",
    scientificName: "Aglaonema commutatum",
    alsoKnownAs: ["أغلونيميا", "Chinese Evergreen"],
    category: "foliage",
    difficulty: "beginner",
    indoorOutdoor: "indoor",
    shortDescription:
      "ورق ملون وجميل، وسهلة في الإضاءة المتوسطة. الأصناف الفاتحة محتاجة ضوء أحسن من الخضرا الغامقة.",
    visual: { emoji: "🎨", hue: 8, leafStyle: "oval" },
    light: {
      level: "low",
      directSunTolerance: false,
      explanation:
        "الأنواع الخضراء الغامقة تتحمل إضاءة قليلة. الأنواع الحمراء والفاتحة محتاجة ضوء ساطع غير مباشر عشان الألوان تفضل واضحة. شمس مباشرة بتحرق.",
      bestPlacement: "أوض داخلية مضيئة. لو الصنف أحمر، قرّبه من شباك بستارة.",
    },
    watering: {
      need: "moderate",
      generalGuidance: "سيّب السطح ينشف شوية بين الريات. ما تحبش رجلها في مياه.",
      howToCheck: "أول 2–3 سم ناشفة ثم ري مع صرف.",
      overwateringSigns: ["ورق أصفر", "بقع بنية", "ساق طري"],
      underwateringSigns: ["ورق نازل", "حواف ناشفة"],
      summerNotes: "افحص أكتر في الحر.",
      winterNotes: "قلل. النبات بطيء وما يحبش البرد مع تربة مبلولة.",
      droughtTolerance: "medium",
    },
    soil: {
      type: "تربة أصص خفيفة",
      drainage: "good",
      suggestedMix: "تربة أصص + بيرلايت.",
      alternatives: ["خلطة آرويد خفيفة"],
    },
    fertilizing: {
      frequency: "كل 4–6 أسابيع في موسم النمو بتركيز خفيف",
      season: "الربيع والصيف",
      notes: "الألوان بتيجي من الضوء أكتر من السماد.",
    },
    environment: {
      temperature: "18–30°م. حساسة للبرد تحت حوالي 15°م.",
      humidity: "medium",
      humidityNotes: "رطوبة متوسطة مناسبة. الهواء الجاف جدًا ممكن يخلي الحواف ناشفة.",
      ventilation: "من غير تيار بارد.",
    },
    care: {
      pruning: "شيل الورق القديم من تحت. ممكن تقص القمة لو اتمددت.",
      repotting: "كل سنة–سنتين. جذورها مش عدوانية جدًا.",
      propagation: "تقسيم أو عقل طرفية في تربة دافية.",
    },
    problems: {
      commonProblems: [
        {
          id: "faded-color",
          arabicName: "بهتان الألوان",
          symptoms: ["الورق الأحمر/الفضي بقى باهت"],
          likelyCauses: ["إضاءة أضعف من احتياج الصنف"],
          whatToDo: ["زوّد ضوء غير مباشر", "ما تحطوش في شمس حارقة كحل"],
          severity: "mild",
        },
      ],
      commonPests: [pest("mealybugs"), pest("spiderMites"), pest("scale")],
      rootRotSigns: ["ساق طري عند التربة", "ورق أصفر مع تربة مبلولة", "جذور داكنة"],
    },
    safety: {
      children: { status: "toxic", notes: "سام لو اتأكل وبيسبب حرقة." },
      cats: { status: "toxic", notes: "سام للقطط." },
      dogs: { status: "toxic", notes: "سام للكلاب." },
    },
    commonMistakes: [
      "حط صنف أحمر في ركن مظلم واستغرب اللون راح",
      "ري زيادة في الشتا",
      "تعريضه لتكييف بارد مباشر",
      "ترك المياه في الصحن",
    ],
    dangerSigns: ["تعفن الساق", "انهيار التاج", "بقع طرية منتشرة"],
    quickTips: [
      "اختار صنف أخضر غامق لو بيتك إضاءته قليلة.",
      "البرد أخطر عليها من عطش يوم زيادة.",
      "امسح الورق بلطف؛ الألوان بتظهر أحلى من غير غبار.",
    ],
    quickCard: {
      light: "قليلة إلى متوسطة، وأسطع للأصناف الملونة",
      water: "اسقِ لما أول 2–3 سم تنشف",
      soil: "تربة أصص خفيفة",
      temperature: "18–30°م",
      humidity: "متوسطة",
      topWarning: "البرد مع تربة مبلولة بيخلي الساق يتعفن",
    },
    matcher: {
      lowLightOk: true,
      brightLightOk: true,
      petFriendly: false,
      beginnerFriendly: true,
      compact: true,
    },
  },
];
