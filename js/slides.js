const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress');
const counter = document.getElementById('counter');
let current = 0;

// Theme toggle
const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

function toggleTheme() {
  const isLight = !document.body.classList.contains('light');
  document.body.classList.toggle('light', isLight);
  localStorage.setItem('slides-theme', isLight ? 'light' : 'dark');
  updateThemeButton(isLight);
}

function updateThemeButton(isLight) {
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  if (themeIcon) themeIcon.innerHTML = isLight ? moonIcon : sunIcon;
  if (themeLabel) themeLabel.textContent = isLight ? 'Темна' : 'Світла';
}

// Apply saved theme
if (localStorage.getItem('slides-theme') === 'light') {
  document.body.classList.add('light');
  updateThemeButton(true);
}

// Seamless navigation between slide files
function getSlideFileNumber() {
  const match = window.location.pathname.match(/\/(\d+)\.html$/);
  return match ? parseInt(match[1]) : null;
}

function goToSlideFile(fileNum, startFromLast) {
  const url = fileNum + '.html' + (startFromLast ? '#last' : '');
  fetch(fileNum + '.html', { method: 'HEAD' })
    .then(function(res) {
      if (res.ok) window.location.href = url;
    })
    .catch(function() {});
}

function show(index) {
  if (index < 0 || index >= slides.length) return;
  slides[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  updateProgress();
}

function next() {
  if (current >= slides.length - 1) {
    var fileNum = getSlideFileNumber();
    if (fileNum) goToSlideFile(fileNum + 1, false);
    return;
  }
  show(current + 1);
}

function prev() {
  if (current <= 0) {
    var fileNum = getSlideFileNumber();
    if (fileNum && fileNum > 1) goToSlideFile(fileNum - 1, true);
    return;
  }
  show(current - 1);
}

function updateProgress() {
  const percent = ((current + 1) / slides.length) * 100;
  progressBar.style.width = percent + '%';
  counter.textContent = (current + 1) + ' / ' + slides.length;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    next();
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prev();
  }
});

// Start at last slide if coming from next presentation via prev
if (window.location.hash === '#last') {
  current = slides.length - 1;
  slides[0].classList.remove('active');
  slides[current].classList.add('active');
}

updateProgress();
