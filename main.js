  // Language Management
  class LanguageManager {
    constructor() {
      this.currentLang = localStorage.getItem('evsei_lang') || 'lt';
      this.init();
    }

    init() {
      this.updateUI();
      this.applyTranslations();
      this.bindEvents();
    }

    bindEvents() {
      document.querySelectorAll('.nav-lang span:not(.sep)').forEach(span => {
        span.addEventListener('click', () => {
          const lang = span.textContent.trim().toLowerCase() === 'english' || span.textContent.trim() === 'EN' ? 'en' : 'lt';
          this.setLanguage(lang);
        });
      });
    }

    setLanguage(lang) {
      if (this.currentLang === lang) return;
      this.currentLang = lang;
      localStorage.setItem('evsei_lang', lang);
      this.updateUI();
      this.applyTranslations();
    }

    updateUI() {
      document.querySelectorAll('.nav-lang span:not(.sep)').forEach(span => {
        const isEn = span.textContent.trim().toLowerCase() === 'english' || span.textContent.trim() === 'EN';
        const targetLang = isEn ? 'en' : 'lt';
        
        if (targetLang === this.currentLang) {
          span.classList.add('active');
          span.classList.remove('inactive');
        } else {
          span.classList.add('inactive');
          span.classList.remove('active');
        }
      });
      document.documentElement.lang = this.currentLang;
    }

    applyTranslations() {
      const texts = translations[this.currentLang];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = texts[key];
          } else if (key.includes('title') || key.includes('h2') || key.includes('h3') || key.includes('desc')) {
            el.innerHTML = texts[key];
          } else {
            el.textContent = texts[key];
          }
        }
      });

      // Handle attribute translations (like links)
      document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attrMapping = el.getAttribute('data-i18n-attr').split(':');
        const attrName = attrMapping[0];
        const translationKey = attrMapping[1];
        if (texts[translationKey]) {
          if (attrName === 'onclick') {
            el.setAttribute(attrName, `location.href='${texts[translationKey]}'`);
          } else {
            el.setAttribute(attrName, texts[translationKey]);
          }
        }
      });
    }
  }

  // Initialize Language Manager
  const langManager = new LanguageManager();

  // Tab Navigation
  function openTab(id) {
    document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.service-panel').forEach(p => p.classList.remove('active'));
    document.querySelector('[onclick="openTab(\'' + id + '\')"]').classList.add('active');
    document.getElementById('panel-' + id).classList.add('active');
  }

  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  function closeMobile() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Cookie Banner
  const banner = document.getElementById('cookie-banner');
  document.getElementById('cookieAccept').addEventListener('click', () => {
    banner.style.opacity = '0'; banner.style.transform = 'translateY(20px)';
    setTimeout(() => banner.remove(), 400);
  });
  document.getElementById('cookieDetails').addEventListener('click', () => {
    const details = {
        lt: 'Naudojame analitinius slapukus, kad suprastume, kaip lankytojai bendrauja su mūsų svetaine. Jokie asmens duomenys nėra parduodami. Bet kada galite jų atsisakyti.',
        en: 'We use analytics cookies to understand how visitors interact with our site. No personal data is sold. You can opt out at any time.'
    };
    alert(details[langManager.currentLang]);
  });

  // Form Submission
  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    
    // Get form data
    const formData = new FormData(this);
    const leadData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      project_details: formData.get('project_details')
    };

    try {
      btn.innerHTML = langManager.currentLang === 'lt' ? 'Siunčiama...' : 'Sending...';
      btn.disabled = true;

      const { error } = await supabaseClient
        .from('leads')
        .insert([leadData]);

      if (error) throw error;

      const successText = langManager.currentLang === 'lt' ? 'Žinutė Išsiųsta ✓' : 'Message Sent ✓';
      btn.innerHTML = successText;
      this.reset();
    } catch (err) {
      console.error('Supabase error:', err);
      btn.innerHTML = langManager.currentLang === 'lt' ? 'Klaida! Bandykite vėl' : 'Error! Try again';
    } finally {
      setTimeout(() => { 
        btn.innerHTML = originalText; 
        btn.disabled = false;
      }, 3000);
    }
  });

  // Intersection Observer for Active Nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const activeNavLinks = document.querySelectorAll(`a[href="#${entry.target.id}"]`);
        activeNavLinks.forEach(a => a.classList.add('active'));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));

  // Scroll to Top visibility
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => { scrollBtn.classList.toggle('visible', window.scrollY > 600); });
  }
