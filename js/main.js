function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('theme-icon').textContent = isDark ? '☀️' : '🌙';
  document.getElementById('theme-label').textContent = isDark ? 'Світла тема' : 'Темна тема';
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  document.getElementById('theme-icon').textContent = '☀️';
  document.getElementById('theme-label').textContent = 'Світла тема';
}
