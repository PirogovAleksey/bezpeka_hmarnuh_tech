const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
const menuIcon = '<svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>';

// Dynamic navigation rendering
function renderNav() {
  const nav = document.querySelector('aside nav');
  if (!nav) return;

  // Determine base path for nested pages (e.g., lectures/1/conspect.html)
  const path = window.location.pathname;
  let base = '';
  if (path.includes('/lectures/')) {
    base = '../../';
  }

  // Determine active page
  const href = window.location.href;
  const getActive = (page) => {
    if (page === 'index.html') {
      return (href.endsWith('/') || href.includes('index.html') || href.includes('lecture.html')) && !href.includes('module') ? ' class="active"' : '';
    }
    return href.includes(page) ? ' class="active"' : '';
  };

  const navItems = [
    { href: 'index.html', label: 'Лекції', icon: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>' },
    { href: 'practicals.html', label: 'Семінари', icon: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { href: 'tests.html', label: 'Тести', icon: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' },
    { href: 'module1.html', label: 'Модулі', icon: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>' },
    { href: 'materials.html', label: 'Матеріали', icon: '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>' }
  ];

  // Also handle test.html as active for "Тести"
  const isTestPage = href.includes('test.html') && !href.includes('tests.html');

  nav.innerHTML = navItems.map(item => {
    let active = getActive(item.href);
    if (isTestPage && item.href === 'tests.html') active = ' class="active"';
    return `<a href="${base}${item.href}"${active}>
        <span class="nav-icon" aria-hidden="true">${item.icon}</span>
        ${item.label}
      </a>`;
  }).join('\n');
}

function toggleTheme() {
  const isDark = !document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-icon').innerHTML = isDark ? sunIcon : moonIcon;
  document.getElementById('theme-label').textContent = isDark ? 'Світла тема' : 'Темна тема';
}

// Apply theme on page load (for elements that need body.dark class)
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
  document.getElementById('theme-icon').innerHTML = sunIcon;
  document.getElementById('theme-label').textContent = 'Світла тема';
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuToggle = document.getElementById('menu-toggle');

  if (mobileNav && menuToggle) {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.innerHTML = isOpen ? closeIcon : menuIcon;
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const mobileNav = document.getElementById('mobile-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const aside = document.querySelector('aside');

  if (mobileNav && mobileNav.classList.contains('open')) {
    if (!aside.contains(e.target)) {
      mobileNav.classList.remove('open');
      if (menuToggle) {
        menuToggle.innerHTML = menuIcon;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Відкрити меню');
      }
    }
  }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const mobileNav = document.getElementById('mobile-nav');
    const menuToggle = document.getElementById('menu-toggle');

    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      if (menuToggle) {
        menuToggle.innerHTML = menuIcon;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    }
  }
});

// Reusable footer component
function renderFooter() {
  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-content">
        <div>
          <strong>Безпека хмарних технологій</strong><br>
          Викладач: Пирогов Олексій Олександрович<br>
          <a href="mailto:oleksii.pyrohov@uzhnu.edu.ua">oleksii.pyrohov@uzhnu.edu.ua</a>
        </div>
        <div class="footer-right">
          Кафедра твердотільної електроніки та інформаційної безпеки (ТЕІБ)<br>
          Ужгородський національний університет<br>
          <a href="https://teib.info/" target="_blank" rel="noopener">teib.info</a>
        </div>
      </div>
    `;
  }
}

// Add skip link for accessibility
function addSkipLink() {
  const main = document.querySelector('main');
  if (main && !document.querySelector('.skip-link')) {
    main.id = main.id || 'main-content';
    const skipLink = document.createElement('a');
    skipLink.href = '#' + main.id;
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Перейти до контенту';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Initialize mobile menu structure
function initMobileMenu() {
  const aside = document.querySelector('aside');
  if (!aside || window.innerWidth > 768) return;

  // Check if already initialized
  if (aside.querySelector('.mobile-header')) return;

  const logo = aside.querySelector('.logo');
  const nav = aside.querySelector('nav');
  const search = aside.querySelector('.search-container');
  const footer = aside.querySelector('.sidebar-footer');

  if (logo && nav) {
    // Create mobile header
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';

    // Clone logo for header
    const logoClone = logo.cloneNode(true);
    mobileHeader.appendChild(logoClone);

    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.id = 'menu-toggle';
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = menuIcon;
    menuToggle.setAttribute('aria-label', 'Відкрити меню');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'mobile-nav');
    menuToggle.onclick = toggleMobileMenu;
    mobileHeader.appendChild(menuToggle);

    // Create mobile nav container
    const mobileNav = document.createElement('div');
    mobileNav.id = 'mobile-nav';
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('role', 'navigation');
    mobileNav.setAttribute('aria-label', 'Головне меню');

    // Move elements into mobile nav
    if (search) mobileNav.appendChild(search);
    mobileNav.appendChild(nav);
    if (footer) mobileNav.appendChild(footer);

    // Hide original logo, insert header and nav
    logo.style.display = 'none';
    aside.insertBefore(mobileHeader, aside.firstChild);
    aside.appendChild(mobileNav);
  }
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 768) {
      const mobileNav = document.getElementById('mobile-nav');
      if (mobileNav) {
        mobileNav.classList.remove('open');
      }
    }
  }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
  addSkipLink();
  initMobileMenu();
});
