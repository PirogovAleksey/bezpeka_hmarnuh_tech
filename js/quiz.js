// Quiz functionality for cloud security course

// Quiz state
let currentQuiz = null;
let currentQuestion = 0;
let answers = [];
let startTime = null;

// Load quiz data
async function loadQuiz(lectureId) {
  try {
    const response = await fetch(`data/quiz-${lectureId}.json`);
    if (!response.ok) throw new Error('Quiz not found');
    return await response.json();
  } catch (error) {
    console.error('Error loading quiz:', error);
    return null;
  }
}

// Initialize quiz
async function initQuiz(lectureId) {
  currentQuiz = await loadQuiz(lectureId);
  if (!currentQuiz) {
    showError('Тест для цієї лекції ще не готовий');
    return;
  }

  currentQuestion = 0;
  answers = new Array(currentQuiz.questions.length).fill(null);
  startTime = Date.now();

  renderQuizInfo();
  renderQuestion();
  updateProgress();
}

// Render quiz info
function renderQuizInfo() {
  const infoEl = document.getElementById('quiz-info');
  if (infoEl && currentQuiz) {
    infoEl.innerHTML = `
      <h1>${currentQuiz.title}</h1>
      <p>${currentQuiz.description}</p>
      <div class="quiz-meta">
        <span><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg> ${currentQuiz.questions.length} питань</span>
        <span><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ${currentQuiz.timeLimit} хв</span>
        <span><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg> Мін. ${currentQuiz.passingScore}%</span>
      </div>
    `;
  }
}

// Render current question
function renderQuestion() {
  const container = document.getElementById('question-container');
  if (!container || !currentQuiz) return;

  const q = currentQuiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  let optionsHtml = '';
  q.options.forEach((option, index) => {
    const isSelected = selectedAnswer === index;
    const letter = String.fromCharCode(65 + index); // A, B, C, D
    optionsHtml += `
      <label class="quiz-option ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${index})">
        <span class="option-letter">${letter}</span>
        <span class="option-text">${option}</span>
        <span class="option-check">
          ${isSelected ? '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
        </span>
      </label>
    `;
  });

  container.innerHTML = `
    <div class="question-header">
      <span class="question-number">Питання ${currentQuestion + 1} з ${currentQuiz.questions.length}</span>
    </div>
    <h2 class="question-text">${q.question}</h2>
    <div class="quiz-options">
      ${optionsHtml}
    </div>
  `;
}

// Select answer
function selectAnswer(index) {
  answers[currentQuestion] = index;
  renderQuestion();
  updateProgress();
}

// Navigate to next question
function nextQuestion() {
  if (currentQuestion < currentQuiz.questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateProgress();
  }
}

// Navigate to previous question
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    updateProgress();
  }
}

// Go to specific question
function goToQuestion(index) {
  if (index >= 0 && index < currentQuiz.questions.length) {
    currentQuestion = index;
    renderQuestion();
    updateProgress();
  }
}

// Update progress indicators
function updateProgress() {
  // Progress bar
  const progressBar = document.getElementById('quiz-progress-bar');
  if (progressBar) {
    const answered = answers.filter(a => a !== null).length;
    const percent = (answered / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Progress text
  const progressText = document.getElementById('quiz-progress-text');
  if (progressText) {
    const answered = answers.filter(a => a !== null).length;
    progressText.textContent = `${answered} з ${currentQuiz.questions.length} відповідей`;
  }

  // Question dots
  const dotsContainer = document.getElementById('question-dots');
  if (dotsContainer) {
    let dotsHtml = '';
    for (let i = 0; i < currentQuiz.questions.length; i++) {
      const isAnswered = answers[i] !== null;
      const isCurrent = i === currentQuestion;
      dotsHtml += `<button class="question-dot ${isAnswered ? 'answered' : ''} ${isCurrent ? 'current' : ''}" onclick="goToQuestion(${i})">${i + 1}</button>`;
    }
    dotsContainer.innerHTML = dotsHtml;
  }

  // Navigation buttons
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const submitBtn = document.getElementById('btn-submit');

  if (prevBtn) prevBtn.disabled = currentQuestion === 0;
  if (nextBtn) nextBtn.style.display = currentQuestion === currentQuiz.questions.length - 1 ? 'none' : 'inline-flex';
  if (submitBtn) submitBtn.style.display = currentQuestion === currentQuiz.questions.length - 1 ? 'inline-flex' : 'none';
}

// Submit quiz
function submitQuiz() {
  const unanswered = answers.filter(a => a === null).length;
  if (unanswered > 0) {
    if (!confirm(`У вас ${unanswered} питань без відповіді. Все одно завершити тест?`)) {
      return;
    }
  }

  calculateResults();
}

// Calculate and show results
function calculateResults() {
  const endTime = Date.now();
  const timeSpent = Math.round((endTime - startTime) / 1000);

  let correct = 0;
  const results = [];

  currentQuiz.questions.forEach((q, i) => {
    const isCorrect = answers[i] === q.correct;
    if (isCorrect) correct++;
    results.push({
      question: q.question,
      userAnswer: answers[i] !== null ? q.options[answers[i]] : 'Без відповіді',
      correctAnswer: q.options[q.correct],
      isCorrect: isCorrect,
      explanation: q.explanation || null
    });
  });

  const score = Math.round((correct / currentQuiz.questions.length) * 100);
  const passed = score >= currentQuiz.passingScore;

  // Save result to localStorage
  saveResult(currentQuiz.lectureId, score, passed, timeSpent);

  // Show results
  showResults(score, correct, currentQuiz.questions.length, passed, timeSpent, results);
}

// Save result
function saveResult(lectureId, score, passed, timeSpent) {
  const key = `quiz-result-${lectureId}`;
  const result = {
    score,
    passed,
    timeSpent,
    date: new Date().toISOString(),
    attempts: (JSON.parse(localStorage.getItem(key))?.attempts || 0) + 1
  };
  localStorage.setItem(key, JSON.stringify(result));
}

// Show results page
function showResults(score, correct, total, passed, timeSpent, results) {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const timeStr = minutes > 0 ? `${minutes} хв ${seconds} сек` : `${seconds} сек`;

  let resultsHtml = '';
  results.forEach((r, i) => {
    resultsHtml += `
      <div class="result-item ${r.isCorrect ? 'correct' : 'incorrect'}">
        <div class="result-header">
          <span class="result-number">${i + 1}</span>
          <span class="result-icon">
            ${r.isCorrect
              ? '<svg viewBox="0 0 24 24" width="20" height="20" stroke="#22c55e" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
              : '<svg viewBox="0 0 24 24" width="20" height="20" stroke="#ef4444" stroke-width="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>'
            }
          </span>
        </div>
        <p class="result-question">${r.question}</p>
        <div class="result-answers">
          <p><strong>Ваша відповідь:</strong> ${r.userAnswer}</p>
          ${!r.isCorrect ? `<p><strong>Правильна відповідь:</strong> ${r.correctAnswer}</p>` : ''}
          ${r.explanation ? `<p class="result-explanation"><em>${r.explanation}</em></p>` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="quiz-results">
      <div class="results-header ${passed ? 'passed' : 'failed'}">
        <div class="results-icon">
          ${passed
            ? '<svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>'
            : '<svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
          }
        </div>
        <h1>${passed ? 'Вітаємо!' : 'Спробуйте ще раз'}</h1>
        <p>${passed ? 'Ви успішно склали тест' : 'На жаль, ви не набрали прохідний бал'}</p>
      </div>

      <div class="results-stats">
        <div class="stat">
          <div class="stat-value ${passed ? 'passed' : 'failed'}">${score}%</div>
          <div class="stat-label">Результат</div>
        </div>
        <div class="stat">
          <div class="stat-value">${correct}/${total}</div>
          <div class="stat-label">Правильних</div>
        </div>
        <div class="stat">
          <div class="stat-value">${timeStr}</div>
          <div class="stat-label">Час</div>
        </div>
      </div>

      <div class="results-actions">
        <a href="tests.html" class="btn-secondary">До списку тестів</a>
        <button onclick="retryQuiz()" class="btn-primary">Спробувати знову</button>
      </div>

      <h2>Детальні результати</h2>
      <div class="results-details">
        ${resultsHtml}
      </div>
    </div>
  `;
}

// Retry quiz
function retryQuiz() {
  if (currentQuiz) {
    initQuiz(currentQuiz.lectureId);
  }
}

// Show error
function showError(message) {
  const container = document.getElementById('quiz-container');
  if (container) {
    container.innerHTML = `
      <div class="quiz-error">
        <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </svg>
        <h2>Тест недоступний</h2>
        <p>${message}</p>
        <a href="tests.html" class="btn-primary">Повернутися до списку</a>
      </div>
    `;
  }
}

// Timer (optional, can be enabled in quiz settings)
let timerInterval = null;

function startTimer(minutes) {
  const endTime = Date.now() + minutes * 60 * 1000;

  timerInterval = setInterval(() => {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(timerInterval);
      alert('Час вийшов!');
      submitQuiz();
      return;
    }

    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) {
      timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
      if (remaining < 60000) {
        timerEl.classList.add('warning');
      }
    }
  }, 1000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (timerInterval) clearInterval(timerInterval);
});
