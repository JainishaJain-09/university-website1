
export function initSite() {
  // Theme toggle (persist in localStorage)
  try {
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('site-theme');
    const root = document.documentElement;
    function applyTheme(value) {
      if (value === 'dark') {
        root.classList.add('dark');
        if (themeToggle) themeToggle.checked = true;
      } else {
        root.classList.remove('dark');
        if (themeToggle) themeToggle.checked = false;
      }
    }
    if (storedTheme) applyTheme(storedTheme);
    else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
    if (themeToggle) {
      themeToggle.addEventListener('change', function () {
        const mode = this.checked ? 'dark' : 'light';
        applyTheme(mode);
        localStorage.setItem('site-theme', mode);
      });
    }
  } catch(e){ console.warn(e) }

  // Mobile panel: auto-close when a link inside is clicked
  try {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobilePanel = document.getElementById('mobilePanel');
    if (mobilePanel && mobileToggle) {
      mobilePanel.addEventListener('click', function (e) {
        const target = e.target.closest('a');
        if (target && mobileToggle.checked) {
          mobileToggle.checked = false;
        }
      });
    }
  } catch(e){ console.warn(e) }

  // Smooth scroll for same-page anchors
  try {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.setAttribute('tabindex', '-1');
            el.focus({ preventScroll: true });
          }
        }
      });
    });
  } catch(e){ console.warn(e) }

  // Basic email validation for forms
  try {
    const applyForm = document.querySelector('#apply form') || document.querySelector('form[action="#"]');
    if (applyForm) {
      applyForm.addEventListener('submit', function (e) {
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput) {
          const val = emailInput.value.trim();
          const valid = /\S+@\S+\.\S+/.test(val);
          if (!valid) {
            e.preventDefault();
            emailInput.focus();
            emailInput.classList.add('invalid');
            alert('Please enter a valid email address');
          }
        }
      });
    }
  } catch(e){ console.warn(e) }

  // Simple video rotator
  try {
    const carousel = document.getElementById('videoCarousel');
    if (carousel) {
      const videos = Array.from(carousel.querySelectorAll('video'));
      if (videos.length > 1) {
        let index = 0;
        function show(i) {
          videos.forEach((v, idx) => {
            if (idx === i) {
              v.style.display = '';
              v.play().catch(()=>{});
            } else {
              v.pause();
              v.style.display = 'none';
            }
          });
        }
        videos.forEach(v => v.style.display = 'none');
        show(index);
        setInterval(() => { index = (index + 1) % videos.length; show(index); }, 6000);
      }
    }
  } catch(e){ console.warn(e) }
}
