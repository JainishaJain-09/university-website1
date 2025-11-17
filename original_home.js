document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle (persist in localStorage)
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
    // respect user OS preference by default
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

  // Mobile panel: auto-close when a link inside is clicked
  const mobileToggle = document.getElementById('mobileToggle');
  const mobilePanel = document.getElementById('mobilePanel');
  if (mobilePanel && mobileToggle) {
    mobilePanel.addEventListener('click', function (e) {
      const target = e.target.closest('a');
      if (target && mobileToggle.checked) {
        mobileToggle.checked = false; // close
      }
    });
  }

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // allow if href is exactly '#'
      if (href && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // update focus for accessibility
          el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        }
      }
    });
  });

  // Basic email validation for the small 'Get Invite' form
  const applyForm = document.querySelector('#apply form') || document.querySelector('form[action="#"]');
  if (applyForm) {
    applyForm.addEventListener('submit', function (e) {
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput) {
        const val = emailInput.value.trim();
        // very small email check
        const valid = /\S+@\S+\.\S+/.test(val);
        if (!valid) {
          e.preventDefault();
          emailInput.focus();
          // minimal feedback - prefer your CSS to style .invalid
          emailInput.classList.add('invalid');
          alert('Please enter a valid email address');
        }
      }
    });
  }

  // Simple video rotator: play one video at a time, cycle every 6s
  (function videoRotator() {
    const carousel = document.getElementById('videoCarousel');
    if (!carousel) return;
    const videos = Array.from(carousel.querySelectorAll('video'));
    if (videos.length <= 1) return;
    let index = 0;

    function show(i) {
      videos.forEach((v, idx) => {
        if (idx === i) {
          v.style.display = '';
          // try to play; some browsers block autoplay but videos are muted which helps
          v.play().catch(() => {});
        } else {
          v.pause();
          v.style.display = 'none';
        }
      });
    }

    // initialize
    videos.forEach(v => v.style.display = 'none');
    show(index);

    setInterval(() => {
      index = (index + 1) % videos.length;
      show(index);
    }, 6000);
  })();

});

// End of file
