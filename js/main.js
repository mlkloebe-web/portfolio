// Mobile menu: full-screen overlay (native modal <dialog>)
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobile-menu');

if (menuToggle && menu && typeof menu.showModal === 'function') {
  const closeMenu = () => menu.close();

  menuToggle.addEventListener('click', () => {
    menu.showModal();
    menu.focus();   // focus the panel, not the first control, so no ring shows on tap
    menuToggle.setAttribute('aria-expanded', 'true');
  });
  menu.querySelector('.menu-close').addEventListener('click', closeMenu);

  // Same-page links (e.g. #featured-work) would otherwise leave it open
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  // Escape closes the dialog natively; either way, sync state and return focus
  menu.addEventListener('close', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  });

  // Don't leave the page inert if the window grows past the phone layout
  window.matchMedia('(min-width: 641px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

// Work gallery filters
const filters = document.querySelector('.filters');
const gridItems = document.querySelectorAll('.work-grid__item');
const filterStatus = document.getElementById('filter-status');

if (filters && gridItems.length) {
  filters.hidden = false;
  const buttons = filters.querySelectorAll('[data-filter]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let shown = 0;

      buttons.forEach((b) => b.setAttribute('aria-pressed', b === button));
      gridItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.hidden = !match;
        if (match) shown++;
      });

      // Announce the result to screen readers
      if (filterStatus) {
        filterStatus.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}`;
      }
    });
  });
}

// Contact form: open the visitor's email app with the message filled in
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = `Portfolio inquiry from ${data.get('name')}`;
    const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;
    window.location.href = `mailto:studio@madisonkloeber.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
