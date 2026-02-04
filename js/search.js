// Search functionality for cloud security course

// Search index - contains searchable content
const searchIndex = [
  // Lectures
  {
    type: 'lecture',
    id: 1,
    title: 'Вступ до хмарних обчислень та еталонна архітектура NIST',
    keywords: ['NIST', 'хмарні обчислення', 'SaaS', 'PaaS', 'IaaS', 'Shared Responsibility', 'multi-tenancy', 'cloud provider', 'cloud consumer'],
    url: 'lecture.html?id=1',
    description: 'Основні визначення, моделі обслуговування, моделі розгортання та Shared Responsibility Model.'
  },
  {
    type: 'lecture',
    id: 2,
    title: 'Стандартизація та управління ризиками',
    keywords: ['ISO 27017', 'ризики', 'SLA', 'Cloud Auditor', 'compliance', 'GDPR', 'CSA', 'risk management'],
    url: 'lecture.html?id=2',
    description: 'ISO/IEC 27017, ключові контроли для хмари, угоди SLA та роль хмарного аудитора.'
  },
  {
    type: 'lecture',
    id: 3,
    title: 'Архітектура нульової довіри (Zero Trust)',
    keywords: ['Zero Trust', 'ZTA', 'PEP', 'Identity', 'мікросегментація', 'MFA', 'ZTNA', 'never trust always verify'],
    url: 'lecture.html?id=3',
    description: 'Компоненти ZTA: PEP, Identity Governance, мікросегментація та використання ШІ.'
  },
  {
    type: 'lecture',
    id: 4,
    title: 'Безпека віртуалізації та контейнеризації',
    keywords: ['Docker', 'Kubernetes', 'VM', 'контейнери', 'гіпервізор', 'CWPP', 'container security', 'namespace'],
    url: 'lecture.html?id=4',
    description: 'Загрози для VM та гіпервізорів, безпека Docker/Kubernetes, CWPP.'
  },
  {
    type: 'lecture',
    id: 5,
    title: 'Безпека безсерверних обчислень (Serverless)',
    keywords: ['Serverless', 'FaaS', 'Lambda', 'Firecracker', 'gVisor', 'event injection', 'cold start'],
    url: 'lecture.html?id=5',
    description: 'Архітектура FaaS/BaaS, специфічні загрози Serverless, технології ізоляції.'
  },
  {
    type: 'lecture',
    id: 6,
    title: 'Блокчейн у розподілених системах безпеки',
    keywords: ['блокчейн', 'blockchain', 'smart contract', 'DID', 'SSI', 'Verifiable Credentials', 'consensus'],
    url: 'lecture.html?id=6',
    description: 'Блокчейн для кібербезпеки, децентралізоване управління ідентифікацією та смарт-контракти.'
  },
  {
    type: 'lecture',
    id: 7,
    title: 'Управління станом безпеки (CSPM)',
    keywords: ['CSPM', 'configuration drift', 'CIS Benchmarks', 'compliance monitoring', 'misconfiguration'],
    url: 'lecture.html?id=7',
    description: 'Проблема конфігураційного дрейфу, інструменти CSPM, моніторинг відповідності.'
  },
  {
    type: 'lecture',
    id: 8,
    title: 'Комплексний захист додатків (CNAPP)',
    keywords: ['CNAPP', 'CWPP', 'CIEM', 'DevSecOps', 'Shift-Left', 'attack path analysis'],
    url: 'lecture.html?id=8',
    description: 'Еволюція до CNAPP, інтеграція CSPM/CWPP/CIEM, підхід Shift-Left.'
  },
  {
    type: 'lecture',
    id: 9,
    title: 'ШІ та машинне навчання в хмарній безпеці',
    keywords: ['AI', 'ML', 'UEBA', 'anomaly detection', 'автоматизація', 'threat detection', 'machine learning'],
    url: 'lecture.html?id=9',
    description: 'ML для виявлення аномалій (UEBA), автоматизоване реагування на інциденти.'
  },
  {
    type: 'lecture',
    id: 10,
    title: 'Захист даних та криптографія у хмарі',
    keywords: ['шифрування', 'encryption', 'KMS', 'HSM', 'Confidential Computing', 'TEE', 'криптографія'],
    url: 'lecture.html?id=10',
    description: 'Шифрування at rest та in transit, управління ключами, Confidential Computing.'
  },
  {
    type: 'lecture',
    id: 11,
    title: 'Актуальні загрози та аналіз інцидентів',
    keywords: ['Capital One', 'SolarWinds', 'Log4Shell', 'breach', 'інцидент', 'SSRF', 'supply chain'],
    url: 'lecture.html?id=11',
    description: 'Топ загроз 2024-2025, кейси Snowflake/Microsoft/CrowdStrike, специфіка загроз в Україні.'
  },
  {
    type: 'lecture',
    id: 12,
    title: 'Ринок хмарної безпеки та стратегія впровадження',
    keywords: ['міграція', 'landing zone', 'AWS', 'Azure', 'Google Cloud', '6 Rs', 'cloud adoption'],
    url: 'lecture.html?id=12',
    description: 'Огляд ринку в Україні, побудова стратегії міграції в хмару.'
  },

  // Concepts
  {
    type: 'concept',
    title: 'Shared Responsibility Model',
    keywords: ['відповідальність', 'responsibility', 'провайдер', 'клієнт'],
    url: 'lecture.html?id=1',
    description: 'Модель розподілу відповідальності між провайдером та клієнтом у хмарі.'
  },
  {
    type: 'concept',
    title: 'Zero Trust Architecture',
    keywords: ['zero trust', 'ZTA', 'never trust', 'verify'],
    url: 'lecture.html?id=3',
    description: 'Архітектура безпеки за принципом "ніколи не довіряй, завжди перевіряй".'
  },
  {
    type: 'concept',
    title: 'Multi-Factor Authentication (MFA)',
    keywords: ['MFA', '2FA', 'автентифікація', 'біометрія', 'OTP'],
    url: 'lecture.html?id=3',
    description: 'Багатофакторна автентифікація з використанням кількох методів перевірки.'
  },
  {
    type: 'concept',
    title: 'Container Security',
    keywords: ['контейнер', 'Docker', 'image scanning', 'runtime protection'],
    url: 'lecture.html?id=4',
    description: 'Безпека контейнерів: сканування образів, runtime захист, ізоляція.'
  },
  {
    type: 'concept',
    title: 'CSPM vs CNAPP',
    keywords: ['CSPM', 'CNAPP', 'posture management', 'cloud native'],
    url: 'lecture.html?id=8',
    description: 'Порівняння CSPM та CNAPP платформ для хмарної безпеки.'
  },

  // Pages
  {
    type: 'page',
    title: 'Семінари',
    keywords: ['семінар', 'практика', 'завдання', 'теми'],
    url: 'practicals.html',
    description: '60 тем семінарських занять з курсу.'
  },
  {
    type: 'page',
    title: 'Тести',
    keywords: ['тест', 'quiz', 'перевірка', 'екзамен'],
    url: 'tests.html',
    description: 'Тести для перевірки знань після кожної лекції.'
  },
  {
    type: 'page',
    title: 'Матеріали',
    keywords: ['матеріали', 'ресурси', 'документи', 'презентації'],
    url: 'materials.html',
    description: 'Додаткові матеріали та ресурси курсу.'
  }
];

// Search function
function search(query) {
  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/);

  const results = searchIndex.map(item => {
    let score = 0;

    // Check title
    const titleLower = item.title.toLowerCase();
    if (titleLower.includes(normalizedQuery)) {
      score += 10;
    }
    words.forEach(word => {
      if (titleLower.includes(word)) score += 3;
    });

    // Check keywords
    item.keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      if (keywordLower.includes(normalizedQuery)) {
        score += 8;
      }
      words.forEach(word => {
        if (keywordLower.includes(word) || word.includes(keywordLower)) {
          score += 2;
        }
      });
    });

    // Check description
    if (item.description) {
      const descLower = item.description.toLowerCase();
      if (descLower.includes(normalizedQuery)) {
        score += 4;
      }
      words.forEach(word => {
        if (descLower.includes(word)) score += 1;
      });
    }

    return { ...item, score };
  });

  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

// Render search results
function renderSearchResults(results, container) {
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-no-results">
        <p>Нічого не знайдено</p>
      </div>
    `;
    return;
  }

  const typeLabels = {
    lecture: 'Лекція',
    concept: 'Концепція',
    page: 'Сторінка'
  };

  const typeIcons = {
    lecture: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    concept: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
    page: '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>'
  };

  let html = '';
  results.forEach(item => {
    html += `
      <a href="${item.url}" class="search-result">
        <span class="search-result-icon">${typeIcons[item.type] || ''}</span>
        <div class="search-result-content">
          <span class="search-result-type">${typeLabels[item.type] || item.type}</span>
          <span class="search-result-title">${item.title}</span>
          <span class="search-result-desc">${item.description || ''}</span>
        </div>
      </a>
    `;
  });

  container.innerHTML = html;
}

// Initialize search
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchOverlay = document.getElementById('search-overlay');

  if (!searchInput || !searchResults) return;

  // Search on input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    const results = search(query);
    renderSearchResults(results, searchResults);

    if (query.length >= 2) {
      searchResults.classList.add('visible');
    } else {
      searchResults.classList.remove('visible');
    }
  });

  // Focus search input
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.length >= 2) {
      searchResults.classList.add('visible');
    }
  });

  // Close on overlay click
  if (searchOverlay) {
    searchOverlay.addEventListener('click', () => {
      closeSearch();
    });
  }

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
    }
    // Open search with Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    const searchContainer = document.getElementById('search-container');
    if (searchContainer && !searchContainer.contains(e.target)) {
      searchResults.classList.remove('visible');
    }
  });
}

// Open search modal
function openSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  if (searchModal) {
    searchModal.classList.add('visible');
    if (searchInput) searchInput.focus();
  }
}

// Close search modal
function closeSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchResults = document.getElementById('search-results');
  if (searchModal) searchModal.classList.remove('visible');
  if (searchResults) searchResults.classList.remove('visible');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initSearch);
