/**
 * Генератор слайдів для курсу "Безпека хмарних технологій"
 *
 * Використання:
 *   node scripts/generate-slides.js data/lecture-2.json
 *
 * Формат JSON файлу - див. data/example.json
 */

const fs = require('fs');
const path = require('path');

// Читаємо шаблон
const templatePath = path.join(__dirname, '..', 'templates', 'slide.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// Генерація HTML для одного слайду
function generateSlide(slide) {
  let content = `    <section class="slide">\n`;
  content += `      <h1>${slide.title}</h1>\n`;

  if (slide.text) {
    content += `      <p>${slide.text}</p>\n`;
  }

  if (slide.items && slide.items.length > 0) {
    content += `      <ul>\n`;
    for (const item of slide.items) {
      if (typeof item === 'string') {
        content += `        <li>${item}</li>\n`;
      } else if (item.bold && item.text) {
        content += `        <li><strong>${item.bold}</strong> — ${item.text}</li>\n`;
      } else if (item.bold) {
        content += `        <li><strong>${item.bold}</strong></li>\n`;
      }
    }
    content += `      </ul>\n`;
  }

  content += `    </section>\n`;
  return content;
}

// Генерація файлу презентації
function generatePresentation(data, outputPath) {
  const slidesHtml = data.slides.map(generateSlide).join('\n');

  let html = template
    .replace('{{LECTURE_ID}}', data.lectureId)
    .replace('{{TOPIC_TITLE}}', data.topicTitle)
    .replace('{{TOPIC_SUBTITLE}}', data.topicSubtitle)
    .replace('{{SLIDES}}', slidesHtml)
    .replace('{{NEXT_TOPIC}}', data.nextTopic || 'Кінець презентації');

  fs.writeFileSync(outputPath, html, 'utf-8');
  console.log(`✓ Створено: ${outputPath}`);
}

// Головна функція
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Використання: node scripts/generate-slides.js <data-file.json>');
    console.log('');
    console.log('Приклад:');
    console.log('  node scripts/generate-slides.js data/lecture-2.json');
    console.log('');
    console.log('Див. data/example.json для прикладу формату даних.');
    process.exit(1);
  }

  const dataFile = args[0];

  if (!fs.existsSync(dataFile)) {
    console.error(`Помилка: файл "${dataFile}" не знайдено`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  // Генеруємо всі презентації з файлу
  if (data.presentations) {
    for (const pres of data.presentations) {
      const outputDir = path.join(__dirname, '..', 'lectures', String(pres.lectureId), 'slides');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      const outputPath = path.join(outputDir, pres.outputFile);
      generatePresentation(pres, outputPath);
    }
  } else {
    // Один файл
    const outputDir = path.join(__dirname, '..', 'lectures', String(data.lectureId), 'slides');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputFile = data.outputFile || `${data.slideNumber || 'generated'}.html`;
    const outputPath = path.join(outputDir, outputFile);
    generatePresentation(data, outputPath);
  }

  console.log('');
  console.log('Готово!');
}

main();
