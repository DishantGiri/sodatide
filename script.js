// Sodatide Interactive Features
document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar scroll backdrop ---
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 40;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // --- Hamburger menu toggle ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('mobile-overlay');

  function openMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- Smooth scroll for internal links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- Feature Cards Stagger Entrance ---
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, idx * 40);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(card);
    });
  }

  // --- Soft Hover Parallax on Hero Image ---
  const stage = document.querySelector('.hero-image-stage');
  const heroImg = document.querySelector('.hero-main-img');

  if (stage && heroImg && window.innerWidth > 768) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroImg.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    });

    stage.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  // --- FAQ Accordion Dropdown Toggle ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      
      // Close all other open FAQ items
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          const openAns = openItem.querySelector('.faq-answer');
          if (openAns) openAns.style.maxHeight = null;
          const openBtn = openItem.querySelector('.faq-question');
          if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      if (isOpen) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
});
