import type { Course, Module } from "@/lib/types";

const safetyCourseModules: Module[] = [
  {
    id: "m-1",
    title: "Введение и нормативная база",
    titleUz: "Kirish va me'yoriy baza",
    lessons: [
      {
        id: "l-1-1",
        title: "Зачем нужен инструктаж на участке",
        titleUz: "Uchastkada instruktaj nima uchun kerak",
        kind: "text",
        durationMin: 6,
        body:
          "Безопасность труда — это система мер, которая защищает жизнь и здоровье работника. На производственном участке источники риска: подвижные механизмы, электричество, химические агенты, пыль, шум, тепловые воздействия. Цель этого урока — научиться распознавать риски до того, как они приведут к травме.\n\nКлючевые принципы:\n— Опасность — это потенциал. Риск — вероятность × тяжесть.\n— Каждый инцидент имеет цепочку причин: техническая, организационная, поведенческая.\n— Сообщать о near-miss обязательно: это профилактика, а не наказание.",
        bodyUz:
          "Mehnat xavfsizligi — bu xodimning hayoti va sog'lig'ini himoya qiluvchi chora-tadbirlar tizimi. Ishlab chiqarish uchastkasidagi xavf manbalari: harakatlanuvchi mexanizmlar, elektr, kimyoviy moddalar, chang, shovqin, issiqlik ta'siri. Ushbu darsning maqsadi — jarohatga olib kelmasdan oldin xavflarni tanib olishni o'rganish.\n\nAsosiy printsiplar:\n— Xavf — bu potensial. Risk — ehtimollik × jiddiylik.\n— Har bir hodisaning sabablar zanjiri bor: texnik, tashkiliy, xulq-atvor.\n— Near-miss haqida xabar berish majburiy: bu profilaktika, jazo emas.",
      },
      {
        id: "l-1-2",
        title: "Иерархия контроля рисков",
        titleUz: "Risklarni nazorat qilish iyerarxiyasi",
        kind: "text",
        durationMin: 8,
        body:
          "В порядке убывания эффективности: устранение → замена → инженерный контроль → административный контроль → СИЗ. Полагаться только на СИЗ — последняя линия обороны, а не первая.\n\nПрактика: на каждом рабочем месте сначала спросите «можно ли убрать источник риска?», и только потом — «какие СИЗ применяем?».",
        bodyUz:
          "Samaradorlik kamayish tartibida: bartaraf etish → almashtirish → muhandislik nazorati → ma'muriy nazorat → SHIV (shaxsiy himoya vositalari). Faqat SHIV ga tayanish — bu oxirgi mudofaa chizig'i, birinchisi emas.\n\nAmaliyot: har bir ish o'rnida avval \"xavf manbasini olib tashlash mumkinmi?\" deb so'rang, va shundan keyingina — \"qaysi SHIV ni qo'llaymiz?\".",
      },
      {
        id: "l-1-3",
        title: "Проверка знаний: нормативная база",
        titleUz: "Bilimlarni tekshirish: me'yoriy baza",
        kind: "quiz",
        durationMin: 5,
        questions: [
          {
            id: "q-1",
            type: "multiple_choice",
            prompt:
              "Какой из перечисленных методов считается наиболее эффективным в иерархии контроля рисков?",
            promptUz:
              "Quyidagi usullardan qaysi biri risklarni nazorat qilish iyerarxiyasida eng samarali hisoblanadi?",
            options: [
              "Использование средств индивидуальной защиты",
              "Административные меры — инструкции и обучение",
              "Устранение источника опасности",
              "Инженерные ограждения и блокировки",
            ],
            optionsUz: [
              "Shaxsiy himoya vositalaridan foydalanish",
              "Ma'muriy choralar — yo'riqnomalar va o'qitish",
              "Xavf manbasini bartaraf etish",
              "Muhandislik to'siqlari va bloklash",
            ],
            correct: 2,
            explanation:
              "Устранение источника опасности всегда предпочтительнее: оно убирает риск целиком. СИЗ — последняя мера.",
            explanationUz:
              "Xavf manbasini bartaraf etish har doim afzal: u xavfni butunlay olib tashlaydi. SHIV — eng oxirgi chora.",
          },
          {
            id: "q-2",
            type: "multiple_answer",
            prompt:
              "Какие признаки указывают на повышенный риск на рабочем месте? Выберите все верные.",
            promptUz:
              "Qaysi belgilar ish o'rnida yuqori xavfni ko'rsatadi? Barcha to'g'rilarini tanlang.",
            options: [
              "Отсутствие ограждений у движущихся частей",
              "Свободный доступ к аварийной кнопке",
              "Превышение уровня шума выше 85 дБ",
              "Скользкое покрытие пола в зоне работ",
            ],
            optionsUz: [
              "Harakatlanuvchi qismlarda to'siqlarning yo'qligi",
              "Avariya tugmasiga erkin kirish",
              "85 dB dan yuqori shovqin darajasi",
              "Ish hududida sirpanchiq pol qoplamasi",
            ],
            correct: [0, 2, 3],
            explanation: "Свободный доступ к аварийной кнопке — это требование, а не риск.",
            explanationUz: "Avariya tugmasiga erkin kirish — bu talab, xavf emas.",
          },
        ],
      },
    ],
  },
  {
    id: "m-2",
    title: "Средства индивидуальной защиты",
    titleUz: "Shaxsiy himoya vositalari",
    lessons: [
      {
        id: "l-2-1",
        title: "Категории СИЗ и их применение",
        titleUz: "SHIV toifalari va qo'llanilishi",
        kind: "text",
        durationMin: 10,
        body:
          "СИЗ делятся по защищаемой части тела: голова, глаза, слух, органы дыхания, корпус, руки, ноги, страховочные системы. Каждое СИЗ подбирается по конкретному фактору риска и сертифицируется.",
        bodyUz:
          "SHIV himoyalanadigan tana qismiga ko'ra bo'linadi: bosh, ko'z, eshitish, nafas olish organlari, tanasi, qo'llar, oyoqlar, sug'urta tizimlari. Har bir SHIV aniq xavf omiliga qarab tanlanadi va sertifikatlanadi.",
      },
      {
        id: "l-2-2",
        title: "Когда СИЗ не работает",
        titleUz: "SHIV qachon ishlamaydi",
        kind: "text",
        durationMin: 7,
        body:
          "Самые частые причины отказа СИЗ: неправильный размер, износ, неверное применение, отсутствие проверки перед сменой. Каска без подбородочного ремня не защищает.",
        bodyUz:
          "SHIV ishdan chiqishining eng tez-tez sabablari: noto'g'ri o'lcham, eskirish, noto'g'ri qo'llanilishi, smenadan oldin tekshiruvning yo'qligi. Iyak tasmasiz kaska himoya qilmaydi.",
      },
      {
        id: "l-2-3",
        title: "Аттестация по СИЗ",
        titleUz: "SHIV bo'yicha attestatsiya",
        kind: "quiz",
        durationMin: 6,
        questions: [
          {
            id: "q-3",
            type: "multiple_choice",
            prompt: "С какой периодичностью оператор обязан проверять исправность каски?",
            promptUz: "Operator kaskaning soz holatini qancha vaqtda tekshirib turishi shart?",
            options: [
              "Раз в год при аттестации",
              "Только при выдаче новой",
              "Перед каждой сменой",
              "Раз в месяц",
            ],
            optionsUz: [
              "Yiliga bir marta attestatsiyada",
              "Faqat yangisini berishda",
              "Har bir smenadan oldin",
              "Oyiga bir marta",
            ],
            correct: 2,
            explanation:
              "Проверка СИЗ — ежесменная процедура. Раз в год проводится плановая аттестация, но это не отменяет ежедневной проверки.",
            explanationUz:
              "SHIV tekshiruvi — har bir smena protsedurasi. Yiliga bir marta rejali attestatsiya o'tkaziladi, lekin bu kunlik tekshiruvni bekor qilmaydi.",
          },
        ],
      },
    ],
  },
  {
    id: "m-3",
    title: "Действия в аварийной ситуации",
    titleUz: "Avariya holatida harakatlar",
    lessons: [
      {
        id: "l-3-1",
        title: "Алгоритм первичных действий",
        titleUz: "Birlamchi harakatlar algoritmi",
        kind: "text",
        durationMin: 9,
        body:
          "1. Оценить ситуацию, не подвергая себя риску.\n2. Сообщить руководителю смены и диспетчеру.\n3. Оградить зону, эвакуировать персонал.\n4. Оказать первую помощь, если безопасно.\n5. Зафиксировать в журнале.",
        bodyUz:
          "1. Vaziyatni o'zingizni xavf ostiga qo'ymasdan baholang.\n2. Smena boshlig'i va dispetcherga xabar bering.\n3. Hududni o'rab oling, xodimlarni evakuatsiya qiling.\n4. Xavfsiz bo'lsa, birinchi yordam ko'rsating.\n5. Jurnalda qayd eting.",
      },
      {
        id: "l-3-2",
        title: "Итоговый тест по безопасности участка",
        titleUz: "Uchastka xavfsizligi bo'yicha yakuniy test",
        kind: "quiz",
        durationMin: 12,
        questions: [
          {
            id: "q-4",
            type: "multiple_choice",
            prompt: "Что является первым действием при обнаружении задымления в цехе?",
            promptUz: "Sexda tutun aniqlanganda birinchi harakat nima?",
            options: [
              "Самостоятельно пытаться найти источник",
              "Сообщить руководителю смены и нажать кнопку оповещения",
              "Продолжить работу до конца смены",
              "Открыть окна для проветривания",
            ],
            optionsUz: [
              "Mustaqil ravishda manbani topishga urinish",
              "Smena boshlig'iga xabar berish va ogohlantirish tugmasini bosish",
              "Smena oxirigacha ishni davom ettirish",
              "Shamollatish uchun derazalarni ochish",
            ],
            correct: 1,
            explanation:
              "При задымлении приоритет — оповещение и эвакуация, а не самостоятельный поиск источника.",
            explanationUz:
              "Tutun paydo bo'lganda ustuvorlik — ogohlantirish va evakuatsiya, mustaqil ravishda manbani izlash emas.",
          },
        ],
      },
    ],
  },
];

const erpCourseModules: Module[] = [
  {
    id: "em-1",
    title: "Введение в систему ERP",
    titleUz: "ERP tizimiga kirish",
    lessons: [
      {
        id: "el-1-1",
        title: "Архитектура и роли пользователей",
        titleUz: "Arxitektura va foydalanuvchi rollari",
        kind: "text",
        durationMin: 7,
        body:
          "ERP — единая система, которая объединяет производство, склад, закупки, финансы и HR. Каждая роль видит только свой сегмент данных. Базовая навигация: модули → документы → действия.",
        bodyUz:
          "ERP — ishlab chiqarish, ombor, xaridlar, moliya va HR ni birlashtiruvchi yagona tizim. Har bir rol faqat o'z ma'lumotlar segmentini ko'radi. Asosiy navigatsiya: modullar → hujjatlar → harakatlar.",
      },
      {
        id: "el-1-2",
        title: "Первый вход и настройка профиля",
        titleUz: "Birinchi kirish va profilni sozlash",
        kind: "text",
        durationMin: 5,
      },
      {
        id: "el-1-3",
        title: "Проверка: основы навигации",
        titleUz: "Tekshirish: navigatsiya asoslari",
        kind: "quiz",
        durationMin: 4,
        questions: [
          {
            id: "eq-1",
            type: "multiple_choice",
            prompt: "Где в интерфейсе ERP находится переключатель ролей?",
            promptUz: "ERP interfeysida rol o'zgartirgich qayerda joylashgan?",
            options: [
              "В правом верхнем углу, под аватаром",
              "В левой панели навигации",
              "Только в админ-панели",
              "Роли в этой ERP не переключаются",
            ],
            optionsUz: [
              "O'ng yuqori burchakda, avatar ostida",
              "Chap navigatsiya panelida",
              "Faqat admin panelda",
              "Bu ERP da rollar almashtirilmaydi",
            ],
            correct: 0,
          },
        ],
      },
    ],
  },
  {
    id: "em-2",
    title: "Создание и обработка заявок",
    titleUz: "Arizalarni yaratish va qayta ishlash",
    lessons: [
      { id: "el-2-1", title: "Жизненный цикл заявки на приёмку", titleUz: "Qabul arizasining hayot sikli", kind: "text", durationMin: 9 },
      { id: "el-2-2", title: "Согласование и подписи", titleUz: "Kelishuv va imzolar", kind: "text", durationMin: 6 },
    ],
  },
  {
    id: "em-3",
    title: "Оформление документов",
    titleUz: "Hujjatlarni rasmiylashtirish",
    lessons: [
      { id: "el-3-1", title: "Виды первичных документов", titleUz: "Birlamchi hujjat turlari", kind: "text", durationMin: 8 },
      { id: "el-3-2", title: "Электронная подпись и архив", titleUz: "Elektron imzo va arxiv", kind: "text", durationMin: 7 },
    ],
  },
];

export const courses: Course[] = [
  {
    id: "c-safety-area",
    title: "Безопасность труда на участке",
    titleUz: "Uchastkada mehnat xavfsizligi",
    category: "Безопасность",
    categoryUz: "Xavfsizlik",
    description:
      "Базовый курс по охране труда для производственного персонала: распознавание рисков, применение СИЗ, действия в аварийных ситуациях.",
    descriptionUz:
      "Ishlab chiqarish xodimlari uchun mehnat muhofazasi bo'yicha asosiy kurs: xavflarni tanib olish, SHIV ni qo'llash, avariya holatidagi harakatlar.",
    modules: safetyCourseModules,
    totalLessons: 8,
    durationHours: 3,
    required: true,
    progress: 100,
    status: "completed",
    score: 95,
    completedAt: "2026-03-02",
    authorTeam: "Безопасность · Mars Forge",
    authorTeamUz: "Xavfsizlik · Mars Forge",
    tags: ["ОТиПБ", "обязательный"],
  },
  {
    id: "c-erp-prod",
    title: "ERP «Производство» — модуль линии",
    titleUz: "ERP «Ishlab chiqarish» — liniya moduli",
    category: "ERP и софт",
    categoryUz: "ERP va dasturlar",
    description:
      "Работа в корпоративной ERP: создание заявок, оформление документов, инвентаризация, отчёты по линии.",
    descriptionUz:
      "Korporativ ERP da ishlash: arizalar yaratish, hujjatlarni rasmiylashtirish, inventarizatsiya, liniya bo'yicha hisobotlar.",
    modules: erpCourseModules,
    totalLessons: 24,
    durationHours: 6,
    required: true,
    progress: 42,
    status: "in_progress",
    dueDate: "2026-06-15",
    authorTeam: "ИТ · Mars Forge",
    authorTeamUz: "AT · Mars Forge",
    tags: ["ERP", "обязательный"],
  },
  {
    id: "c-comp-lit",
    title: "Компьютерная грамотность",
    titleUz: "Kompyuter savodxonligi",
    category: "Базовая грамотность",
    categoryUz: "Asosiy savodxonlik",
    description:
      "Основы работы на ПК: файловая система, безопасные пароли, корпоративная почта, базовый Excel и Word.",
    descriptionUz:
      "PC da ishlash asoslari: fayl tizimi, xavfsiz parollar, korporativ pochta, asosiy Excel va Word.",
    modules: [],
    totalLessons: 36,
    durationHours: 12,
    required: true,
    progress: 18,
    status: "overdue",
    dueDate: "2026-05-30",
    authorTeam: "HR · Mars Forge",
    authorTeamUz: "HR · Mars Forge",
    tags: ["базовая", "обязательный"],
  },
  {
    id: "c-ai-lit",
    title: "ИИ-грамотность для сотрудников",
    titleUz: "Xodimlar uchun AI-savodxonlik",
    category: "Базовая грамотность",
    categoryUz: "Asosiy savodxonlik",
    description:
      "Что такое LLM, как формулировать запросы, где ИИ помогает в рабочих задачах, как не передавать конфиденциальные данные.",
    descriptionUz:
      "LLM nima, so'rovlarni qanday tuzish, AI ish vazifalarida qayerda yordam beradi, maxfiy ma'lumotlarni qanday himoya qilish.",
    modules: [],
    totalLessons: 18,
    durationHours: 5,
    required: false,
    progress: 0,
    status: "not_started",
    authorTeam: "HR · Mars Forge",
    authorTeamUz: "HR · Mars Forge",
    tags: ["ИИ", "из коробки"],
  },
  {
    id: "c-excel",
    title: "Microsoft Excel — продвинутый",
    titleUz: "Microsoft Excel — ilg'or",
    category: "Офисный софт",
    categoryUz: "Ofis dasturlari",
    description:
      "Сводные таблицы, формулы массивов, Power Query, базовая автоматизация, дашборды.",
    descriptionUz:
      "Pivot jadvallar, massiv formulalari, Power Query, asosiy avtomatlashtirish, dashboardlar.",
    modules: [],
    totalLessons: 18,
    durationHours: 5,
    required: false,
    progress: 30,
    status: "in_progress",
    authorTeam: "Методология · Mars Forge",
    authorTeamUz: "Metodologiya · Mars Forge",
    tags: ["офис", "Excel"],
  },
  {
    id: "c-warehouse-1c",
    title: "Управление складом · 1С",
    titleUz: "Omborni boshqarish · 1C",
    category: "ERP и софт",
    categoryUz: "ERP va dasturlar",
    description: "Приёмка, инвентаризация, перемещения, отчётность по остаткам в 1С:Склад.",
    descriptionUz:
      "Qabul qilish, inventarizatsiya, ko'chirishlar, 1C:Skladda qoldiqlar bo'yicha hisobotlar.",
    modules: [],
    totalLessons: 28,
    durationHours: 9,
    required: false,
    progress: 0,
    status: "recommended",
    authorTeam: "ИТ · Mars Forge",
    authorTeamUz: "AT · Mars Forge",
    tags: ["1С", "склад"],
  },
  {
    id: "c-incoming",
    title: "Регламент приёмки сырья",
    titleUz: "Xom ashyoni qabul qilish reglamenti",
    category: "Производство",
    categoryUz: "Ishlab chiqarish",
    description:
      "Стандарт приёмки сырья на участке: проверка качества, оформление, действия при отклонениях.",
    descriptionUz:
      "Uchastkada xom ashyoni qabul qilish standarti: sifatni tekshirish, rasmiylashtirish, og'ishlarda harakatlar.",
    modules: [],
    totalLessons: 9,
    durationHours: 2,
    required: true,
    progress: 100,
    status: "completed",
    score: 88,
    completedAt: "2026-02-21",
    authorTeam: "Производство · Mars Forge",
    authorTeamUz: "Ishlab chiqarish · Mars Forge",
    tags: ["регламент"],
  },
  {
    id: "c-safe-net",
    title: "Безопасная работа в сети",
    titleUz: "Tarmoqda xavfsiz ishlash",
    category: "Информационная безопасность",
    categoryUz: "Axborot xavfsizligi",
    description:
      "Фишинг, безопасные пароли, корпоративная почта, работа с внешними носителями.",
    descriptionUz:
      "Fishing, xavfsiz parollar, korporativ pochta, tashqi tashuvchilar bilan ishlash.",
    modules: [],
    totalLessons: 12,
    durationHours: 3,
    required: true,
    progress: 0,
    status: "required",
    dueDate: "2026-07-01",
    authorTeam: "ИБ · Mars Forge",
    authorTeamUz: "AX · Mars Forge",
    tags: ["ИБ", "обязательный"],
  },
  {
    id: "c-norm-exam",
    title: "Экзамен по нормам безопасности",
    titleUz: "Xavfsizlik me'yorlari imtihoni",
    category: "Аттестация",
    categoryUz: "Attestatsiya",
    description:
      "Итоговая аттестация по охране труда: 40 вопросов, таймер 60 минут, проходной балл 80%.",
    descriptionUz:
      "Mehnat muhofazasi bo'yicha yakuniy attestatsiya: 40 savol, 60 daqiqa taymer, o'tish bali 80%.",
    modules: [],
    totalLessons: 1,
    durationHours: 1,
    required: true,
    progress: 100,
    status: "overdue",
    score: 54,
    completedAt: "2026-03-08",
    authorTeam: "Безопасность · Mars Forge",
    authorTeamUz: "Xavfsizlik · Mars Forge",
    tags: ["экзамен", "пересдача"],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCoursesByStatus(status: Course["status"]): Course[] {
  return courses.filter((c) => c.status === status);
}

export function getCourseCategories(): string[] {
  return Array.from(new Set(courses.map((c) => c.category)));
}
