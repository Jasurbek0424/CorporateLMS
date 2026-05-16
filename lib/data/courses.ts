import type { Course, Module } from "@/lib/types";

const safetyCourseModules: Module[] = [
  {
    id: "m-1",
    title: "Введение и нормативная база",
    lessons: [
      {
        id: "l-1-1",
        title: "Зачем нужен инструктаж на участке",
        kind: "text",
        durationMin: 6,
        body:
          "Безопасность труда — это система мер, которая защищает жизнь и здоровье работника. На производственном участке источники риска: подвижные механизмы, электричество, химические агенты, пыль, шум, тепловые воздействия. Цель этого урока — научиться распознавать риски до того, как они приведут к травме.\n\nКлючевые принципы:\n— Опасность — это потенциал. Риск — вероятность × тяжесть.\n— Каждый инцидент имеет цепочку причин: техническая, организационная, поведенческая.\n— Сообщать о near-miss обязательно: это профилактика, а не наказание.",
      },
      {
        id: "l-1-2",
        title: "Иерархия контроля рисков",
        kind: "text",
        durationMin: 8,
        body:
          "В порядке убывания эффективности: устранение → замена → инженерный контроль → административный контроль → СИЗ. Полагаться только на СИЗ — последняя линия обороны, а не первая.\n\nПрактика: на каждом рабочем месте сначала спросите «можно ли убрать источник риска?», и только потом — «какие СИЗ применяем?».",
      },
      {
        id: "l-1-3",
        title: "Проверка знаний: нормативная база",
        kind: "quiz",
        durationMin: 5,
        questions: [
          {
            id: "q-1",
            type: "multiple_choice",
            prompt:
              "Какой из перечисленных методов считается наиболее эффективным в иерархии контроля рисков?",
            options: [
              "Использование средств индивидуальной защиты",
              "Административные меры — инструкции и обучение",
              "Устранение источника опасности",
              "Инженерные ограждения и блокировки",
            ],
            correct: 2,
            explanation:
              "Устранение источника опасности всегда предпочтительнее: оно убирает риск целиком. СИЗ — последняя мера.",
          },
          {
            id: "q-2",
            type: "multiple_answer",
            prompt:
              "Какие признаки указывают на повышенный риск на рабочем месте? Выберите все верные.",
            options: [
              "Отсутствие ограждений у движущихся частей",
              "Свободный доступ к аварийной кнопке",
              "Превышение уровня шума выше 85 дБ",
              "Скользкое покрытие пола в зоне работ",
            ],
            correct: [0, 2, 3],
            explanation:
              "Свободный доступ к аварийной кнопке — это требование, а не риск.",
          },
        ],
      },
    ],
  },
  {
    id: "m-2",
    title: "Средства индивидуальной защиты",
    lessons: [
      {
        id: "l-2-1",
        title: "Категории СИЗ и их применение",
        kind: "text",
        durationMin: 10,
        body:
          "СИЗ делятся по защищаемой части тела: голова, глаза, слух, органы дыхания, корпус, руки, ноги, страховочные системы. Каждое СИЗ подбирается по конкретному фактору риска и сертифицируется.",
      },
      {
        id: "l-2-2",
        title: "Когда СИЗ не работает",
        kind: "text",
        durationMin: 7,
        body:
          "Самые частые причины отказа СИЗ: неправильный размер, износ, неверное применение, отсутствие проверки перед сменой. Каска без подбородочного ремня не защищает.",
      },
      {
        id: "l-2-3",
        title: "Аттестация по СИЗ",
        kind: "quiz",
        durationMin: 6,
        questions: [
          {
            id: "q-3",
            type: "multiple_choice",
            prompt:
              "С какой периодичностью оператор обязан проверять исправность каски?",
            options: [
              "Раз в год при аттестации",
              "Только при выдаче новой",
              "Перед каждой сменой",
              "Раз в месяц",
            ],
            correct: 2,
            explanation:
              "Проверка СИЗ — ежесменная процедура. Раз в год проводится плановая аттестация, но это не отменяет ежедневной проверки.",
          },
        ],
      },
    ],
  },
  {
    id: "m-3",
    title: "Действия в аварийной ситуации",
    lessons: [
      {
        id: "l-3-1",
        title: "Алгоритм первичных действий",
        kind: "text",
        durationMin: 9,
        body:
          "1. Оценить ситуацию, не подвергая себя риску.\n2. Сообщить руководителю смены и диспетчеру.\n3. Оградить зону, эвакуировать персонал.\n4. Оказать первую помощь, если безопасно.\n5. Зафиксировать в журнале.",
      },
      {
        id: "l-3-2",
        title: "Итоговый тест по безопасности участка",
        kind: "quiz",
        durationMin: 12,
        questions: [
          {
            id: "q-4",
            type: "multiple_choice",
            prompt:
              "Что является первым действием при обнаружении задымления в цехе?",
            options: [
              "Самостоятельно пытаться найти источник",
              "Сообщить руководителю смены и нажать кнопку оповещения",
              "Продолжить работу до конца смены",
              "Открыть окна для проветривания",
            ],
            correct: 1,
            explanation:
              "При задымлении приоритет — оповещение и эвакуация, а не самостоятельный поиск источника.",
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
    lessons: [
      {
        id: "el-1-1",
        title: "Архитектура и роли пользователей",
        kind: "text",
        durationMin: 7,
        body:
          "ERP — единая система, которая объединяет производство, склад, закупки, финансы и HR. Каждая роль видит только свой сегмент данных. Базовая навигация: модули → документы → действия.",
      },
      {
        id: "el-1-2",
        title: "Первый вход и настройка профиля",
        kind: "text",
        durationMin: 5,
      },
      {
        id: "el-1-3",
        title: "Проверка: основы навигации",
        kind: "quiz",
        durationMin: 4,
        questions: [
          {
            id: "eq-1",
            type: "multiple_choice",
            prompt: "Где в интерфейсе ERP находится переключатель ролей?",
            options: [
              "В правом верхнем углу, под аватаром",
              "В левой панели навигации",
              "Только в админ-панели",
              "Роли в этой ERP не переключаются",
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
    lessons: [
      { id: "el-2-1", title: "Жизненный цикл заявки на приёмку", kind: "text", durationMin: 9 },
      { id: "el-2-2", title: "Согласование и подписи", kind: "text", durationMin: 6 },
    ],
  },
  {
    id: "em-3",
    title: "Оформление документов",
    lessons: [
      { id: "el-3-1", title: "Виды первичных документов", kind: "text", durationMin: 8 },
      { id: "el-3-2", title: "Электронная подпись и архив", kind: "text", durationMin: 7 },
    ],
  },
];

export const courses: Course[] = [
  {
    id: "c-safety-area",
    title: "Безопасность труда на участке",
    category: "Безопасность",
    description:
      "Базовый курс по охране труда для производственного персонала: распознавание рисков, применение СИЗ, действия в аварийных ситуациях.",
    modules: safetyCourseModules,
    totalLessons: 8,
    durationHours: 3,
    required: true,
    progress: 100,
    status: "completed",
    score: 95,
    completedAt: "2026-03-02",
    authorTeam: "Безопасность · Mars Forge",
    tags: ["ОТиПБ", "обязательный"],
  },
  {
    id: "c-erp-prod",
    title: "ERP «Производство» — модуль линии",
    category: "ERP и софт",
    description:
      "Работа в корпоративной ERP: создание заявок, оформление документов, инвентаризация, отчёты по линии.",
    modules: erpCourseModules,
    totalLessons: 24,
    durationHours: 6,
    required: true,
    progress: 42,
    status: "in_progress",
    dueDate: "2026-06-15",
    authorTeam: "ИТ · Mars Forge",
    tags: ["ERP", "обязательный"],
  },
  {
    id: "c-comp-lit",
    title: "Компьютерная грамотность",
    category: "Базовая грамотность",
    description:
      "Основы работы на ПК: файловая система, безопасные пароли, корпоративная почта, базовый Excel и Word.",
    modules: [],
    totalLessons: 36,
    durationHours: 12,
    required: true,
    progress: 18,
    status: "overdue",
    dueDate: "2026-05-30",
    authorTeam: "HR · Mars Forge",
    tags: ["базовая", "обязательный"],
  },
  {
    id: "c-ai-lit",
    title: "ИИ-грамотность для сотрудников",
    category: "Базовая грамотность",
    description:
      "Что такое LLM, как формулировать запросы, где ИИ помогает в рабочих задачах, как не передавать конфиденциальные данные.",
    modules: [],
    totalLessons: 18,
    durationHours: 5,
    required: false,
    progress: 0,
    status: "not_started",
    authorTeam: "HR · Mars Forge",
    tags: ["ИИ", "из коробки"],
  },
  {
    id: "c-excel",
    title: "Microsoft Excel — продвинутый",
    category: "Офисный софт",
    description:
      "Сводные таблицы, формулы массивов, Power Query, базовая автоматизация, дашборды.",
    modules: [],
    totalLessons: 18,
    durationHours: 5,
    required: false,
    progress: 30,
    status: "in_progress",
    authorTeam: "Методология · Mars Forge",
    tags: ["офис", "Excel"],
  },
  {
    id: "c-warehouse-1c",
    title: "Управление складом · 1С",
    category: "ERP и софт",
    description:
      "Приёмка, инвентаризация, перемещения, отчётность по остаткам в 1С:Склад.",
    modules: [],
    totalLessons: 28,
    durationHours: 9,
    required: false,
    progress: 0,
    status: "recommended",
    authorTeam: "ИТ · Mars Forge",
    tags: ["1С", "склад"],
  },
  {
    id: "c-incoming",
    title: "Регламент приёмки сырья",
    category: "Производство",
    description:
      "Стандарт приёмки сырья на участке: проверка качества, оформление, действия при отклонениях.",
    modules: [],
    totalLessons: 9,
    durationHours: 2,
    required: true,
    progress: 100,
    status: "completed",
    score: 88,
    completedAt: "2026-02-21",
    authorTeam: "Производство · Mars Forge",
    tags: ["регламент"],
  },
  {
    id: "c-safe-net",
    title: "Безопасная работа в сети",
    category: "Информационная безопасность",
    description:
      "Фишинг, безопасные пароли, корпоративная почта, работа с внешними носителями.",
    modules: [],
    totalLessons: 12,
    durationHours: 3,
    required: true,
    progress: 0,
    status: "required",
    dueDate: "2026-07-01",
    authorTeam: "ИБ · Mars Forge",
    tags: ["ИБ", "обязательный"],
  },
  {
    id: "c-norm-exam",
    title: "Экзамен по нормам безопасности",
    category: "Аттестация",
    description:
      "Итоговая аттестация по охране труда: 40 вопросов, таймер 60 минут, проходной балл 80%.",
    modules: [],
    totalLessons: 1,
    durationHours: 1,
    required: true,
    progress: 100,
    status: "overdue",
    score: 54,
    completedAt: "2026-03-08",
    authorTeam: "Безопасность · Mars Forge",
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
