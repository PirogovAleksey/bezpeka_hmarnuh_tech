# Безпека хмарних технологій — Cloud Security Course

Навчальний веб-сайт курсу "Безпека хмарних технологій" для кафедри ТЕІБ Ужгородського національного університету.

## Технології

- **HTML5, CSS3, JavaScript** — чистий статичний сайт, без фреймворків
- **Google Fonts** — Plus Jakarta Sans
- **SVG іконки** — feather-style, inline
- Підтримка **темної/світлої теми** (localStorage)
- **Пошук** — клієнтський пошук по сайту (Ctrl+K)
- **Тести** — інтерактивна система тестування

## Структура проєкту

```
├── index.html          # Головна — список лекцій
├── lecture.html        # Сторінка лекції (динамічна через ?id=N)
├── test.html           # Сторінка проходження тесту (?lecture=N)
├── practicals.html     # Семінари (60 тем)
├── tests.html          # Список тестів
├── materials.html      # Матеріали
├── slides.html         # Презентації (список)
├── 404.html            # Сторінка помилки
│
├── css/
│   ├── style.css       # Основні стилі сайту
│   ├── slides.css      # Стилі для презентацій
│   ├── quiz.css        # Стилі для тестів
│   └── print.css       # Стилі для друку
│
├── js/
│   ├── main.js         # Перемикач теми, footer
│   ├── slides.js       # Навігація слайдів + тема
│   ├── quiz.js         # Функціонал тестування
│   └── search.js       # Пошук по сайту
│
├── lectures/           # Матеріали лекцій
│   ├── 1/
│   │   ├── conspect.html
│   │   └── slides/
│   │       └── 1.html ... 6.html
│   ├── 2/
│   │   ├── conspect.html
│   │   └── slides/
│   │       └── 1.html ... 4.html
│   └── ... (3-12)
│
├── data/
│   ├── quiz-1.json     # Питання для тесту 1
│   └── example.json    # Приклад формату слайдів
│
├── templates/
│   └── slide.html      # Шаблон для нових презентацій
│
├── scripts/
│   └── generate-slides.js
│
└── img/
    └── favicon.svg
```

## Функціонал

### Пошук
- Доступний на всіх сторінках у sidebar
- Гаряча клавіша: `Ctrl+K` або `Cmd+K`
- Шукає по лекціях, концепціях, сторінках
- Файл: `js/search.js`

### Тестування
- 20 питань для кожної лекції (формат quiz-N.json)
- Результати зберігаються в localStorage
- Показує правильні відповіді та пояснення
- Файли: `js/quiz.js`, `css/quiz.css`, `test.html`

### Друк
- Оптимізовані стилі для друку конспектів
- Автоматично приховує sidebar та навігацію
- Файл: `css/print.css`

### Презентації
- Стрілки ← → для навігації
- Клавіші Home/End для початку/кінця
- Прогрес-бар внизу
- SVG діаграми та візуалізації

## Генерація слайдів

### Вручну
Скопіюй `templates/slide.html` в `lectures/N/slides/M.html`, заміни:
- `{{LECTURE_ID}}` — номер лекції
- `{{TOPIC_TITLE}}` — заголовок в title
- `{{TOPIC_SUBTITLE}}` — підзаголовок
- `{{SLIDES}}` — HTML контент
- `{{NEXT_TOPIC}}` — текст фінального слайду

### Генератор
```bash
node scripts/generate-slides.js data/lecture-N.json
```

## Компоненти слайдів

```html
<!-- Grid з іконками -->
<div class="slide-grid">
  <div class="slide-grid-item">
    <div class="slide-icon"><svg>...</svg></div>
    <h3>Заголовок</h3>
    <p>Опис</p>
  </div>
</div>

<!-- Timeline -->
<div class="slide-timeline">
  <div class="timeline-item">
    <div class="timeline-dot"></div>
    <div class="timeline-year">1</div>
    <div class="timeline-text">Крок</div>
  </div>
  <div class="timeline-line"></div>
</div>

<!-- SVG діаграма -->
<div class="slide-diagram">
  <svg viewBox="0 0 400 200">...</svg>
</div>

<!-- Статистика -->
<div class="slide-stat">
  <div class="stat-value">99.9%</div>
  <div class="stat-label">Uptime</div>
</div>
```

## Конвенції коду

### HTML
- Мова: `lang="uk"`
- SVG: `fill="none" stroke="currentColor" stroke-width="2"`
- Семантичні теги: `<section>`, `<nav>`, `<main>`, `<article>`
- ARIA атрибути для accessibility

### CSS
- CSS змінні в `:root` та `.dark`
- Брейкпоінти: 1024px (планшет), 768px (мобільний)
- Класи теми: `.dark` на `<html>` та `<body>`

### JavaScript
- Vanilla JS, без залежностей
- localStorage для теми та результатів тестів

## Кольорова схема

| Елемент | Світла | Темна |
|---------|--------|-------|
| Background | `#f0f9ff` | `#0c1929` |
| Text | `#0c4a6e` | `#f0f9ff` |
| Accent | `#0ea5e9` | `#38bdf8` |
| Card | `#ffffff` | `#162d4a` |

## Контент курсу

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

## Статус контенту

- ✅ Лекції 1-12: конспекти + презентації
- ✅ 60 тем семінарських занять
- ✅ Тест для лекції 1 (20 питань)
- ✅ Пошук по сайту
- ✅ Print CSS для друку
- ⏳ Тести для лекцій 2-12
