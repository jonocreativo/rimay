document.addEventListener('DOMContentLoaded', () => {
  // --- STICKY NAV && ACTIVE LINK SELECTION ON SCROLL ---
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('.section, #hero');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Sticky navigation background transition
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link highlight on scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- MOBILE HAMBURGER MENU ---
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // --- HERO SLIDER CAROUSEL ---
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 6000; // 6 seconds

  // Initialize dots
  if (dotsContainer && slides.length > 0) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.slider-dot');

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (dots.length > 0) {
      dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
  }

  function startTimer() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  // Event Listeners for manual controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });
  }

  // Initialize Hero Carousel Timer
  if (slides.length > 0) {
    startTimer();
  }

  // --- VIAJES SECTION SLIDER ---
  const viajesSlides = document.querySelectorAll('.viajes-slide');
  let currentViajesSlide = 0;
  const viajesSlideDuration = 4000; // 4 seconds

  if (viajesSlides.length > 1) {
    setInterval(() => {
      viajesSlides[currentViajesSlide].classList.remove('active');
      currentViajesSlide = (currentViajesSlide + 1) % viajesSlides.length;
      viajesSlides[currentViajesSlide].classList.add('active');
    }, viajesSlideDuration);
  }
});
