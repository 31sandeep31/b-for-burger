// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('bfb-theme') || 'dark';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('bfb-theme', theme);
}

applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});


const reveals = document.querySelectorAll('.story, .menu-card, .step, .order-text, .story-card');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ===== NAV SCROLL EFFECT =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const style = getComputedStyle(document.documentElement);
  if (window.scrollY > 60) {
    nav.style.background = style.getPropertyValue('--nav-bg-solid').trim();
  } else {
    nav.style.background = style.getPropertyValue('--nav-bg').trim();
  }
});

// ===== MOBILE NAV TOGGLE =====
const burgerBtn = document.querySelector('.nav-burger');
const navLinks = document.querySelector('.nav-links');

burgerBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burgerBtn.textContent = isOpen ? '✕' : '☰';
  if (isOpen) {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'var(--nav-bg-solid)';
    navLinks.style.padding = '20px 32px 28px';
    navLinks.style.gap = '20px';
    navLinks.style.borderBottom = '1px solid var(--border-green)';
  } else {
    navLinks.style.display = '';
  }
});

// close nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navLinks.style.display = '';
    burgerBtn.textContent = '☰';
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--green)';
      } else {
        link.style.color = '';
      }
    }
  });
});
