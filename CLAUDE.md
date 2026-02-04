# Безпека хмарних технологій — Cloud Security Course

Навчальний веб-сайт курсу "Безпека хмарних технологій" для кафедри ТЕІБ Ужгородського національного університету.

## Технології

- **HTML5, CSS3, JavaScript** — чистий статичний сайт, без фреймворків
- **Google Fonts** — Plus Jakarta Sans
- **SVG іконки** — feather-style, inline
- Підтримка **темної/світлої теми** (localStorage)

## Структура проєкту

```
├── index.html          # Головна — список лекцій
├── lecture.html        # Сторінка лекції (динамічна через ?id=N)
├── practicals.html     # Семінари (60 тем)
├── tests.html          # Тести
├── materials.html      # Матеріали
├── slides.html         # Презентації (список)
├── 404.html            # Сторінка помилки
│
├── css/
│   ├── style.css       # Основні стилі сайту
│   └── slides.css      # Стилі для презентацій
│
├── js/
│   ├── main.js         # Перемикач теми для сайту
│   └── slides.js       # Навігація слайдів + тема
│
├── lectures/           # Матеріали лекцій (конспекти + слайди)
│   ├── 1/
│   │   ├── conspect.html
│   │   └── slides/
│   │       └── 1.html, 2.html, ... 6.html
│   ├── 2/
│   │   ├── conspect.html
│   │   └── slides/
│   │       └── 1.html, 2.html, 3.html, 4.html
│   └── ... (3-12)
│
├── templates/
│   └── slide.html      # Шаблон для нових презентацій
│
├── data/               # JSON дані для генератора
│   └── example.json    # Приклад формату
│
├── scripts/            # Утиліти
│   └── generate-slides.js  # Генератор слайдів з JSON
│
└── img/
    └── favicon.svg
```

## Генерація слайдів

### Варіант 1: Вручну
Скопіюй `templates/slide.html` в `lectures/N/slides/M.html`, заміни плейсхолдери:
- `{{LECTURE_ID}}` — номер лекції
- `{{TOPIC_TITLE}}` — заголовок в title
- `{{TOPIC_SUBTITLE}}` — підзаголовок на титульному слайді
- `{{SLIDES}}` — HTML контент слайдів
- `{{NEXT_TOPIC}}` — текст фінального слайду

### Варіант 2: Генератор
```bash
node scripts/generate-slides.js data/lecture-N.json
```

Формат JSON:
```json
{
  "outputFile": "1.html",
  "lectureId": 2,
  "topicTitle": "Тема 2.1 — Назва",
  "topicSubtitle": "Тема 2.1: Підзаголовок",
  "nextTopic": "Наступна тема: ...",
  "slides": [
    {
      "title": "Заголовок",
      "text": "Параграф (опціонально)",
      "items": [
        "Простий пункт",
        {"bold": "Жирний", "text": "пояснення"}
      ]
    }
  ]
}
```

Файли зберігаються в `lectures/{lectureId}/slides/{outputFile}`.

## Конвенції коду

### HTML
- Мова: українська (`lang="uk"`)
- SVG іконки: `fill="none" stroke="currentColor" stroke-width="2"`
- Семантичні теги: `<section>`, `<nav>`, `<main>`

### CSS
- CSS змінні для кольорів (визначені в `:root` та `.dark`)
- Responsive брейкпоінти:
  - Планшет: `max-width: 1024px`
  - Мобільний: `max-width: 768px`
- Класи теми: `.dark` на `<html>` та `<body>`

### JavaScript
- Vanilla JS, без залежностей
- Тема зберігається в `localStorage`:
  - Сайт: `theme` → `'dark'` | `'light'`
  - Слайди: `slides-theme` → `'dark'` | `'light'`

## Кольорова схема

### Світла тема
- Background: `#f0f9ff`
- Text: `#0c4a6e`
- Accent: `#0ea5e9`

### Темна тема
- Background: `#0c1929`
- Text: `#f0f9ff`
- Accent: `#38bdf8`

## Контент курсу

12 лекцій у 2 модулях:

**Модуль 1:** Архітектура, стандарти, основи безпеки
1. Вступ до хмарних обчислень та NIST
2. Стандартизація та управління ризиками
3. Zero Trust Architecture
4. Віртуалізація та контейнери
5. Serverless Security
6. Blockchain в безпеці

**Модуль 2:** Моніторинг, захист даних, реагування
7. CSPM
8. CNAPP
9. AI/ML в хмарній безпеці
10. Захист даних та криптографія
11. Аналіз реальних інцидентів
12. Ринок та стратегія міграції

## Готовий контент

- ✅ Лекції 1-12: конспекти + презентації (повний курс)
- ✅ 60 тем семінарських занять
- ⏳ Тести: структура готова, функціонал в розробці
