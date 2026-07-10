/* ============================================
   SAINATH SALES & SERVICES – MAIN JAVASCRIPT
   ============================================ */

(function () {
  'use strict';

  /* ---- DOM READY ---- */
  document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initScrollReveal();
    initCounterAnimation();
    initGoToTop();
    initEnquirySidebar();
    initFormSubmission();
    initLanguageToggler();
    initBrochureDownload();
    initHeroTypingEffect();
    initNavActiveOnScroll();
  });

  /* ============================================
     1. NAVBAR – SCROLL BEHAVIOUR
  ============================================ */
  function initNavbar() {
    var nav = document.getElementById('mainNav');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide navbar on fast scroll down, reveal on scroll up
      // if (currentScroll > 200) {
      //   if (currentScroll > lastScroll + 6) {
      //     nav.style.transform = 'translateY(-100%)';
      //   } else if (currentScroll < lastScroll - 2) {
      //     nav.style.transform = 'translateY(0)';
      //   }
      // } else {
      //   nav.style.transform = 'translateY(0)';
      // }

      lastScroll = currentScroll;
    });

    // Smooth close mobile nav on link click
    var navLinks = document.querySelectorAll('#navMenu .nav-link');
    var navCollapse = document.getElementById('navMenu');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  /* ============================================
     2. ACTIVE NAV LINK ON SCROLL
  ============================================ */
  function initNavActiveOnScroll() {
    var sections = document.querySelectorAll('section[id], div[id]');
    var navLinks = document.querySelectorAll('#navMenu .nav-link');

    window.addEventListener('scroll', function () {
      var scrollPos = window.scrollY + 120;
      sections.forEach(function (section) {
        if (
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          var id = section.getAttribute('id');
          navLinks.forEach(function (link) {
            // link.classList.remove('active');
            // if (link.getAttribute('href') === '#' + id) {
              // link.classList.add('active');
            // }
          });
        }
      });
    });
  }

  /* ============================================
     3. SCROLL REVEAL
  ============================================ */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if (!revealEls.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================
     4. COUNTER ANIMATION
  ============================================ */
  function initCounterAnimation() {
    var counters = document.querySelectorAll('.stat-num');
    var animated = false;

    function animateCounters() {
      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-count'), 10);
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
          counter.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            counter.textContent = target;
          }
        }
        requestAnimationFrame(step);
      });
    }

    var statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;

    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsBar);
  }

  /* ============================================
     5. GO TO TOP BUTTON
  ============================================ */
  function initGoToTop() {
    var btn = document.getElementById('goToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     6. ENQUIRY SIDEBAR (FIXED RIGHT)
  ============================================ */
  function initEnquirySidebar() {
    var tab = document.getElementById('enquiryTab');
    var panel = document.getElementById('enquiryPanel');
    var closeBtn = document.getElementById('closeEnquiry');

    if (!tab || !panel) return;

    tab.addEventListener('click', function () {
      panel.classList.toggle('open');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        panel.classList.remove('open');
      });
    }

    // Quick enquiry form submit
    var qForm = document.getElementById('quickEnquiryForm');
    if (qForm) {
      qForm.addEventListener('submit', function (e) {
        e.preventDefault();
        showToast('Enquiry submitted! We will contact you shortly.');
        qForm.reset();
        panel.classList.remove('open');
      });
    }
  }

  /* ============================================
     7. MAIN CONTACT FORM SUBMISSION
  ============================================ */


document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll("form[data-netlify='true']");

    forms.forEach(form => {

        form.addEventListener("submit", function () {

            sessionStorage.setItem("returnPage", window.location.href);

        });

    });

});

  // function initFormSubmission() {
  //   var form = document.getElementById('contactForm');
  //   if (!form) return;

  //   form.addEventListener('submit', function (e) {
  //     e.preventDefault();

  //     // Basic validation
  //     var inputs = form.querySelectorAll('[required]');
  //     var valid = true;
  //     inputs.forEach(function (input) {
  //       if (!input.value.trim()) {
  //         valid = false;
  //         input.classList.add('is-invalid');
  //       } else {
  //         input.classList.remove('is-invalid');
  //       }
  //     });

  //     if (!valid) return;

  //     // Simulate submission
  //     var btn = form.querySelector('button[type="submit"]');
  //     var originalText = btn.innerHTML;
  //     btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  //     btn.disabled = true;

  //     setTimeout(function () {
  //       btn.innerHTML = '<i class="fas fa-check me-2"></i>Enquiry Sent!';
  //       btn.style.background = '#27ae60';
  //       showToast('Your enquiry has been submitted! We\'ll reach out within 24 hours.');
  //       form.reset();

  //       setTimeout(function () {
  //         btn.innerHTML = originalText;
  //         btn.disabled = false;
  //         btn.style.background = '';
  //       }, 4000);
  //     }, 1800);
  //   });

  //   // Live validation
  //   form.querySelectorAll('[required]').forEach(function (el) {
  //     el.addEventListener('input', function () {
  //       if (this.value.trim()) {
  //         this.classList.remove('is-invalid');
  //         this.classList.add('is-valid');
  //       }
  //     });
  //   });
  // }

  /* ============================================
     8. LANGUAGE TOGGLER
  ============================================ */
  var translations = {
    EN: {
      heroTag1: 'Trusted Since 2005',
      heroH1: 'Integrated Facility<br/><span>Management</span> Excellence',
      heroP: 'Delivering world-class housekeeping, facility & maintenance services across India\'s top corporations.',
      explore: 'Explore Services',
      quote: 'Get Free Quote'
    },
    HI: {
      heroTag1: '2005 से विश्वसनीय',
      heroH1: 'एकीकृत सुविधा<br/><span>प्रबंधन</span> उत्कृष्टता',
      heroP: 'भारत की शीर्ष कंपनियों में विश्व स्तरीय हाउसकीपिंग और सुविधा सेवाएं।',
      explore: 'सेवाएं देखें',
      quote: 'मुफ्त कोटेशन'
    },
    MR: {
      heroTag1: '2005 पासून विश्वासार्ह',
      heroH1: 'एकात्मिक सुविधा<br/><span>व्यवस्थापन</span> उत्कृष्टता',
      heroP: 'भारतातील अग्रगण्य कंपन्यांमध्ये जागतिक दर्जाच्या सुविधा सेवा.',
      explore: 'सेवा पहा',
      quote: 'विनामूल्य कोट'
    }
  };

  function initLanguageToggler() {
    // console.log("hi");
    var items = document.querySelectorAll('.lang-item');
    var currentLangEl = document.getElementById('currentLang');

    items.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang');
        var name = this.getAttribute('data-name');

        // Update button label
        if (currentLangEl) currentLangEl.textContent = lang;

        // Remove active from all
        items.forEach(function (i) { i.classList.remove('active'); });
        this.classList.add('active');

        // RTL for Arabic
        if (lang === 'AR') {
          document.documentElement.setAttribute('dir', 'rtl');
        } else {
          document.documentElement.setAttribute('dir', 'ltr');
        }
console.loog(name);
        showToast('Language changed to ' + name);
      });
    });
  }

  /* ============================================
     9. DOWNLOAD BROCHURE
  ============================================ */
  function initBrochureDownload() {
    var btns = [
      document.getElementById('downloadBrochure'),
      document.getElementById('brochureFloat')
    ];

    btns.forEach(function (btn) {
      if (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          showToast('📄 Brochure download started!');

          // Create a simple PDF-like download simulation
          var link = document.createElement('a');
          link.href = './Sainath Professional Company Profile.pdf';
          link.download = './Sainath Professional Company Profile.pdf';
          // In production, replace with actual PDF URL
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          showToast('Brochure Downloaded Successfully');
        });
      }
    });
  }

  /* ============================================
     10. HERO TYPING TAGLINE EFFECT
  ============================================ */
  function initHeroTypingEffect() {
    // Animate hero badge tags
    var heroCarousel = document.getElementById('heroCarousel');
    if (!heroCarousel) return;

    heroCarousel.addEventListener('slid.bs.carousel', function (e) {
      var activeSlide = e.relatedTarget;
      var content = activeSlide.querySelector('.hero-content');
      if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(30px)';
        requestAnimationFrame(function () {
          setTimeout(function () {
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
          }, 50);
        });
      }
    });
  }

  /* ============================================
     11. TOAST NOTIFICATION
  ============================================ */
  function showToast(message) {
    var toastEl = document.getElementById('successToast');
    if (!toastEl) return;

    var body = toastEl.querySelector('.toast-body');
    if (body) body.textContent = message;

    var toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4000 });
    toast.show();
  }

  /* ============================================
     12. PARALLAX EFFECT ON HERO
  ============================================ */
  var hero = document.getElementById('hero');
  if (hero) {
    window.addEventListener('scroll', function () {
      var scrolled = window.pageYOffset;
      var slides = hero.querySelectorAll('.hero-slide');
      slides.forEach(function (slide) {
        slide.style.backgroundPositionY = 'calc(50% + ' + (scrolled * 0.3) + 'px)';
      });
    }, { passive: true });
  }

  /* ============================================
     13. SMOOTH ANCHOR SCROLLING WITH OFFSET
  ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = document.getElementById('mainNav')
          ? document.getElementById('mainNav').offsetHeight + 10
          : 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     14. SERVICE CARD TILT ON HOVER
  ============================================ */
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -6;
      var rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = 'translateY(-8px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  /* ============================================
     15. PRELOADER
  ============================================ */
  window.addEventListener('load', function () {
    // Add a quick fade-in to the body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function () {
      document.body.style.opacity = '1';
    }, 50);
  });

})();
