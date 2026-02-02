const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress');
const counter = document.getElementById('counter');
let current = 0;

function show(index) {
  slides[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  updateProgress();
}

function next() {
  show(current + 1);
}

function prev() {
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

updateProgress();
