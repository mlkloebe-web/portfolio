// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on Escape and return focus to the toggle
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}
