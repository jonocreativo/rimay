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

  // --- CHATBOT WIDGET ---
  const chatWidget = document.getElementById('chatbot-widget');
  const chatButton = document.getElementById('chat-button');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const quickOptButtons = document.querySelectorAll('.quick-opt-btn');
  const chatTooltip = document.getElementById('chat-tooltip');
  const chatTooltipClose = document.getElementById('chat-tooltip-close');

  // Toggle chat window
  chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    // Hide the red badge on first open
    const badge = chatButton.querySelector('.chat-badge-pulse');
    if (badge) badge.style.display = 'none';
    // Hide speech bubble tooltip
    if (chatTooltip) chatTooltip.style.display = 'none';
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Close speech bubble tooltip when clicking the tiny close button
  if (chatTooltip && chatTooltipClose) {
    chatTooltipClose.addEventListener('click', (e) => {
      e.stopPropagation();
      chatTooltip.style.display = 'none';
    });
  }

  // Welcome message
  const welcomeText = "¡Hola! Te puedo ayudar a planificar y reservar tu viaje a Perú, o responder tus dudas sobre el significado de Rimay, nuestros pilares de servicio y los destinos que ofrecemos. ¿En qué te puedo ayudar hoy?";
  addBotMessage(welcomeText);

  // Quick option buttons
  quickOptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const questionText = btn.innerText;
      const questionKey = btn.getAttribute('data-question');
      
      addUserMessage(questionText);
      handleQuestion(questionKey);
    });
  });

  // Quick option buttons scroll arrows
  const chipsSlider = document.getElementById('chat-chips-slider');
  const arrowLeft = document.getElementById('chip-arrow-left');
  const arrowRight = document.getElementById('chip-arrow-right');
  if (chipsSlider && arrowLeft && arrowRight) {
    arrowLeft.addEventListener('click', () => {
      chipsSlider.scrollBy({ left: -100, behavior: 'smooth' });
    });
    arrowRight.addEventListener('click', () => {
      chipsSlider.scrollBy({ left: 100, behavior: 'smooth' });
    });
  }

  // Send message on click or enter
  chatSend.addEventListener('click', submitUserMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitUserMessage();
  });

  function submitUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatInput.value = '';

    // Simple keyword matching for natural response
    const lowercaseText = text.toLowerCase();
    let matchedKey = 'fallback';

    if (lowercaseText.includes('quien') || lowercaseText.includes('monica') || lowercaseText.includes('fundadora') || lowercaseText.includes('historia')) {
      matchedKey = 'quien';
    } else if (lowercaseText.includes('rimay') || lowercaseText.includes('significa') || lowercaseText.includes('quechua') || lowercaseText.includes('nombre')) {
      matchedKey = 'significado';
    } else if (lowercaseText.includes('pilar') || lowercaseText.includes('pilares') || lowercaseText.includes('filosofia')) {
      matchedKey = 'pilares';
    } else if (lowercaseText.includes('viaje') || lowercaseText.includes('destino') || lowercaseText.includes('donde') || lowercaseText.includes('cusco') || lowercaseText.includes('machu')) {
      matchedKey = 'viajes';
    } else if (lowercaseText.includes('reservar') || lowercaseText.includes('reserva') || lowercaseText.includes('contacto') || lowercaseText.includes('contactar') || lowercaseText.includes('cotizar') || lowercaseText.includes('formulario')) {
      matchedKey = 'reservar';
    }

    handleQuestion(matchedKey);
  }

  function handleQuestion(key) {
    showTypingIndicator();
    
    setTimeout(() => {
      removeTypingIndicator();
      
      let reply = "";
      if (key === 'quien') {
        reply = "Soy Mónica Carrión, fundadora y Tour Leader de Rimay Viajes. Dejé mi querido Chile hace años impulsada por un amor profundo y genuino hacia Perú, su cultura y su gente. Hoy vivo en Cusco, y desde aquí busco acercar a mis compatriotas chilenos a un Perú auténtico, profundo y transformador, lejos de los circuitos comerciales tradicionales.";
      } else if (key === 'significado') {
        reply = "Rimay es una palabra quechua que significa 'comunicación desde el alma'. Refleja a la perfección lo que buscamos en cada viaje: unir culturas, crear lazos humanos reales y convertir tu viaje en una experiencia espiritual e inolvidable.";
      } else if (key === 'pilares') {
        reply = "Nuestra filosofía se basa en 3 pilares:\n\n1. **Experiencias Curadas:** Itinerarios únicos diseñados con cercanía para viajeros chilenos.\n\n2. **Oficina en Cusco:** Operación propia en el corazón de los Andes para acompañarte confiablemente 24/7.\n\n3. **Slow Tourism:** Viajar sin prisa, conectando con las tradiciones locales, la naturaleza y contigo mismo.";
      } else if (key === 'viajes') {
        reply = "Nuestras rutas principales recorren el Cusco histórico, el mágico Valle Sagrado y la imponente ciudadela de Machu Picchu. También ofrecemos extensiones al Altiplano, Puno y el Lago Titicaca visitando las islas de Uros. ¿Te interesa alguno de estos destinos?";
      } else if (key === 'reservar') {
        reply = "¡Maravilloso! Completa este breve formulario y me comunicaré contigo directamente por WhatsApp o correo electrónico para ayudarte a planificar:";
        addBotMessage(reply);
        addReservationForm();
        return;
      } else {
        reply = "Qué buena pregunta. En Rimay Viajes nos especializamos en slow tourism por Cusco, Machu Picchu y el Lago Titicaca, con base local en Cusco y atención personalizada para chilenos. ¿Te gustaría saber más sobre Mónica, el significado de Rimay o prefieres reservar tu viaje?";
      }
      
      addBotMessage(reply);
    }, 1200);
  }

  function addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg', 'user');
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    scrollChat();
  }

  function addBotMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg', 'bot');
    // Enable simple formatting for newlines and bold markdown
    msgDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    chatMessages.appendChild(msgDiv);
    scrollChat();
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('chat-msg', 'bot', 'typing-indicator-wrapper');
    indicator.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatMessages.appendChild(indicator);
    scrollChat();
  }

  function removeTypingIndicator() {
    const indicator = chatMessages.querySelector('.typing-indicator-wrapper');
    if (indicator) indicator.remove();
  }

  function scrollChat() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addReservationForm() {
    const formDiv = document.createElement('div');
    formDiv.classList.add('chat-msg', 'bot', 'chat-form-wrapper');
    formDiv.style.width = '85%';
    formDiv.innerHTML = `
      <form class="chat-form" onsubmit="event.preventDefault(); window.submitChatForm(this);">
        <input type="text" placeholder="Nombre completo" required name="nombre">
        <input type="email" placeholder="Correo electrónico" required name="email">
        <input type="tel" placeholder="WhatsApp / Teléfono" required name="telefono">
        <select required name="programa">
          <option value="" disabled selected>Programa de interés</option>
          <option value="Aventura Andina">Aventura Andina (5 días)</option>
          <option value="Esencia Inca">Esencia Inca (6 días)</option>
          <option value="Rutas Ancestrales">Rutas Ancestrales (7 días)</option>
          <option value="Otro">Otro / Personalizado</option>
        </select>
        <textarea placeholder="Mensaje o fecha tentativa" rows="2" name="mensaje"></textarea>
        <button type="submit">Enviar solicitud</button>
      </form>
    `;
    chatMessages.appendChild(formDiv);
    scrollChat();
  }

  window.submitChatForm = function(form) {
    const nombre = form.nombre.value;
    const email = form.email.value;
    const telefono = form.telefono.value;
    const programa = form.programa.value;

    const wrapper = form.closest('.chat-form-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <div style="font-size:0.75rem; color:var(--text-main); font-style:italic;">
          Formulario enviado: ${nombre} (${programa})
        </div>
      `;
    }

    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const thanksText = `¡Muchísimas gracias, **${nombre}**! He recibido tu solicitud para el programa **${programa}**.\n\nMe pondré en contacto contigo hoy mismo a través de tu WhatsApp (**${telefono}**) o tu correo (**${email}**) para ayudarte a coordinar cada detalle de tu viaje a Perú. ¡Un abrazo!`;
      addBotMessage(thanksText);
    }, 1500);
  };

  // --- MAIN RESERVATION FORM SUBMISSION ---
  window.submitMainReservaForm = function(form) {
    const formBox = form.closest('.reserva-form-box');
    const successMsg = formBox ? formBox.querySelector('#reserva-success-message') : null;
    if (form && successMsg) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    }
  };
});
