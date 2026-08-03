const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const navigationItems = document.querySelectorAll('.nav-links a');
navigationItems.forEach((link) => {
  link.addEventListener('click', () => {
    navigationItems.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
  });
});


const revealItems = document.querySelectorAll('.reveal, .skill-card, .project-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  if (!item.classList.contains('reveal')) {
    item.classList.add('reveal');
    item.style.transitionDelay = `${(index % 6) * 65}ms`;
  }
  observer.observe(item);
});

document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light-mode');

function updateThemeButton() {
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.textContent = isLight ? '☾' : '☀';
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeToggle.title = themeToggle.getAttribute('aria-label');
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  updateThemeButton();
});
updateThemeButton();

const form = document.getElementById('contactForm');
const statusBox = document.getElementById('formStatus');
const sendButton = document.getElementById('sendButton');

if (form && window.emailjs) {
  emailjs.init({ publicKey: 'SLAGcefcWj2Hqba-K' });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendButton.disabled = true;
    sendButton.innerHTML = 'Sending...';
    statusBox.textContent = 'Sending your message…';
    emailjs.sendForm('service_aftdt9e', 'template_90g7vxl', form)
      .then(() => {
        form.reset();
        statusBox.textContent = 'Thanks! Your message was sent.';
      })
      .catch(() => {
        statusBox.textContent = 'Message could not be sent. Please try again.';
      })
      .finally(() => {
        sendButton.disabled = false;
        sendButton.innerHTML = 'Let\'s<br>talk <span>↗</span>';
      });
  });
}
