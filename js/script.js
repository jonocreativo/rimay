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

  // Speech bubble tooltip interval logic
  let tooltipTimer;
  let tooltipCycle;

  function showTooltip() {
    if (chatTooltip && !chatWindow.classList.contains('open')) {
      chatTooltip.classList.add('visible');
    }
  }

  function hideTooltip() {
    if (chatTooltip) {
      chatTooltip.classList.remove('visible');
    }
  }

  function startTooltipCycle() {
    // Initial display after 3 seconds
    tooltipTimer = setTimeout(() => {
      showTooltip();
      
      // Toggle state every 10s: 10s visible, 10s hidden, etc.
      tooltipCycle = setInterval(() => {
        if (chatTooltip.classList.contains('visible')) {
          hideTooltip();
        } else {
          if (!chatWindow.classList.contains('open')) {
            showTooltip();
          }
        }
      }, 10000);
    }, 3000);
  }

  function stopTooltipCycle() {
    clearTimeout(tooltipTimer);
    clearInterval(tooltipCycle);
    hideTooltip();
  }

  // Start cycle initially
  if (chatTooltip) {
    startTooltipCycle();
  }

  // Toggle chat window
  chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    // Hide the red badge on first open
    const badge = chatButton.querySelector('.chat-badge-pulse');
    if (badge) badge.style.display = 'none';
    
    // Stop tooltip cycle and hide it
    stopTooltipCycle();
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Close speech bubble tooltip when clicking the tiny close button
  if (chatTooltip && chatTooltipClose) {
    chatTooltipClose.addEventListener('click', (e) => {
      e.stopPropagation();
      stopTooltipCycle();
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
    const mensaje = form.mensaje ? form.mensaje.value : '';

    const wrapper = form.closest('.chat-form-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
        <div style="font-size:0.75rem; color:var(--text-main); font-style:italic;">
          Enviando formulario...
        </div>
      `;
    }

    fetch('https://formsubmit.co/ajax/viajemos@rimayviajes.cl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "Nombre Completo": nombre,
        "Correo Electrónico": email,
        "WhatsApp / Teléfono": telefono,
        "Programa de Interés": programa,
        "Mensaje / Consulta": mensaje,
        "_subject": `Nueva consulta de chatbot: ${nombre}`,
        "_captcha": "false"
      })
    })
    .then(() => {
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
    })
    .catch(error => {
      console.error('Error submitting chat form:', error);
      // Fallback
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
    });
  };

  // --- MAIN RESERVATION FORM SUBMISSION ---
  window.submitMainReservaForm = function(form) {
    const formBox = form.closest('.reserva-form-box');
    const successMsg = formBox ? formBox.querySelector('#reserva-success-message') : null;
    
    // Disable submit button during submit
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'ENVIANDO...';
    }

    const formData = new FormData(form);
    const nombre = formData.get('nombre') || '';
    const email = formData.get('email') || '';
    const telefono = formData.get('telefono') || '';
    const programa = formData.get('programa') || '';
    const fecha = formData.get('fecha') || '';
    const viajeros = formData.get('viajeros') || '';
    const mensaje = formData.get('mensaje') || '';

    const payload = {
      "Nombre Completo": nombre,
      "Correo Electrónico": email,
      "WhatsApp / Teléfono": telefono,
      "Programa de Interés": programa,
      "Fecha Estimada de Viaje": fecha,
      "Número de Viajeros": viajeros,
      "Mensaje / Requerimientos Especiales": mensaje,
      "_subject": `Nueva cotización/reserva: ${nombre}`,
      "_captcha": "false"
    };

    fetch('https://formsubmit.co/ajax/viajemos@rimayviajes.cl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      if (form && successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      // Fallback: show success anyway so UI is not broken
      if (form && successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      }
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  };

  // --- BLOG LOGIC AND MODAL RENDERING ---
  const blogGrid = document.getElementById('blog-grid-container');
  const blogModal = document.getElementById('blog-modal');
  const blogModalClose = document.getElementById('blog-modal-close');
  const modalHeaderImg = document.getElementById('modal-header-img');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalDate = document.getElementById('modal-date');
  const modalBodyContent = document.getElementById('modal-body-content');
  const modalSuggestedContainer = document.getElementById('modal-suggested-posts');

  // Sharing elements
  const shareWhatsapp = document.getElementById('share-whatsapp');
  const shareFacebook = document.getElementById('share-facebook');
  const shareTwitter = document.getElementById('share-twitter');
  const shareCopyLink = document.getElementById('share-copy-link');
  const copySuccessTooltip = document.getElementById('copy-success-tooltip');

  // Default mock blog articles
  const defaultBlogPosts = [
    {
      id: '1',
      title: 'Cómo practicar Slow Tourism en el Valle Sagrado',
      subtitle: 'Viajar sin prisas para reconectar con el latido real de los Andes y sus tradiciones ancestrales.',
      author: 'Mónica Carrión',
      date: '2026-06-10',
      publishDate: '2026-06-10T12:00',
      image: 'assets/images/img-nosotros3.jpeg',
      content: '<h3>El arte de viajar sin prisa</h3><p>En el corazón de los Andes peruanos, el Valle Sagrado se extiende como un lienzo de vegetación, terrazas incas y comunidades locales que guardan costumbres milenarias. Hoy en día, la velocidad del turismo moderno suele pasarnos la cuenta, impidiéndonos captar la esencia espiritual de estos lugares. Por eso, en Rimay Viajes promovemos fervientemente el <strong>Slow Tourism</strong> o Turismo Lento.</p><p>Practicar Slow Tourism en el Valle Sagrado significa hospedarse en posadas locales, saborear comidas preparadas con ingredientes de la chacra comunitaria, y pasar horas conversando con los artesanos locales. No se trata de cuántos monumentos visitas en un día, sino de la profundidad del vínculo que generas con el lugar.</p>'
    },
    {
      id: '2',
      title: 'El significado espiritual de Machu Picchu',
      subtitle: 'Un recorrido consciente más allá de las fotos clásicas, explorando la energía de la gran ciudadela inca.',
      author: 'Mónica Carrión',
      date: '2026-06-12',
      publishDate: '2026-06-12T12:00',
      image: 'assets/images/placeholder_machupicchu.svg',
      content: '<h3>Más allá del monumento</h3><p>Machu Picchu es mundialmente famosa como una obra maestra de la arquitectura incaica. Sin embargo, para los antiguos pobladores y para quienes nos acercamos con una mirada consciente, representa un gran observatorio astronómico y un centro de sanación espiritual.</p><p>Al ingresar temprano a la ciudadela, te invitamos a buscar un espacio tranquilo, respirar profundo y contemplar la alineación de los templos principales con los Apus (montañas sagradas). Conectar con la tierra (Pachamama) en este rincón sagrado es una experiencia que transforma el alma y nos ayuda a regresar a casa con el corazón renovado.</p>'
    }
  ];

  let cachedBlogPosts = [];

  function getPosts() {
    return cachedBlogPosts;
  }

  function initBlogPosts() {
    if (typeof db === 'undefined') {
      console.warn("Firebase db not initialized, falling back to local defaults");
      cachedBlogPosts = defaultBlogPosts;
      renderBlogGrid();
      checkUrlQueryParam();
      return;
    }

    db.collection('posts').get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("Firestore posts collection is empty. Seeding defaults...");
          const promises = defaultBlogPosts.map(post => {
            return db.collection('posts').doc(post.id).set(post);
          });
          Promise.all(promises)
            .then(() => {
              console.log("Database seeded successfully.");
              cachedBlogPosts = defaultBlogPosts;
              renderBlogGrid();
              checkUrlQueryParam();
            })
            .catch(err => {
              console.error("Error seeding defaults:", err);
              cachedBlogPosts = defaultBlogPosts;
              renderBlogGrid();
              checkUrlQueryParam();
            });
        } else {
          cachedBlogPosts = [];
          snapshot.forEach(doc => {
            cachedBlogPosts.push(doc.data());
          });
          renderBlogGrid();
          checkUrlQueryParam();
        }
      })
      .catch(err => {
        console.error("Error fetching posts from Firestore:", err);
        cachedBlogPosts = defaultBlogPosts;
        renderBlogGrid();
        checkUrlQueryParam();
      });
  }

  function checkUrlQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const postIdParam = urlParams.get('post');
    if (postIdParam) {
      setTimeout(() => {
        openPostModal(postIdParam);
      }, 500);
    }
  }

  let blogSliderIndex = 0;
  let blogAutoScrollInterval = null;
  const slideGap = 20; // 20px space between cards

  function getVisibleCardsCount() {
    if (window.innerWidth > 991) return 3;
    if (window.innerWidth > 767) return 2;
    return 1;
  }

  function getPublishedPosts() {
    const posts = getPosts();
    const now = new Date();
    // Filter posts that are scheduled for now or the past
    return posts.filter(post => {
      const pubDate = new Date(post.publishDate || post.date);
      return pubDate <= now;
    }).sort((a, b) => new Date(b.publishDate || b.date) - new Date(a.publishDate || a.date));
  }

  function renderBlogGrid() {
    if (!blogGrid) return;
    const published = getPublishedPosts();
    
    // Take up to 5 most recent posts
    const displayPosts = published.slice(0, 5);
    blogGrid.innerHTML = '';

    if (displayPosts.length === 0) {
      const outerSlider = document.querySelector('.blog-slider-outer');
      if (outerSlider) outerSlider.style.display = 'none';
      const dotsContainer = document.getElementById('blog-dots');
      if (dotsContainer) dotsContainer.style.display = 'none';
      blogGrid.innerHTML = '<div style="width: 100%; text-align: center; color: var(--text-muted); padding: 40px 0;">No hay artículos publicados en el blog.</div>';
      return;
    }

    const outerSlider = document.querySelector('.blog-slider-outer');
    if (outerSlider) outerSlider.style.display = 'flex';
    const dotsContainer = document.getElementById('blog-dots');
    if (dotsContainer) dotsContainer.style.display = 'flex';

    displayPosts.forEach(post => {
      const card = document.createElement('div');
      card.classList.add('blog-card');
      card.innerHTML = `
        <div class="blog-card-img">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </div>
        <div class="blog-card-content">
          <div class="blog-card-date">${formatPostDate(post.publishDate || post.date)}</div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-desc">${post.subtitle}</p>
          <button class="blog-card-btn" data-id="${post.id}">LEER MÁS &rarr;</button>
        </div>
      `;
      blogGrid.appendChild(card);
    });

    // Attach click listeners to "Leer más" buttons
    const readMoreBtns = blogGrid.querySelectorAll('.blog-card-btn');
    readMoreBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openPostModal(id);
      });
    });

    // Init or update slider sizing and controls
    initBlogSlider();
  }

  function initBlogSlider() {
    blogSliderIndex = 0;
    updateBlogSlider();
    startBlogAutoScroll();

    // Remove previous listener if registered before (to prevent multiple event handles)
    window.removeEventListener('resize', updateBlogSlider);
    window.addEventListener('resize', updateBlogSlider);
  }

  function updateBlogSlider() {
    if (!blogGrid) return;
    const cards = blogGrid.querySelectorAll('.blog-card');
    if (cards.length === 0) return;

    const visibleCount = getVisibleCardsCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);

    if (blogSliderIndex > maxIndex) {
      blogSliderIndex = maxIndex;
    }
    if (blogSliderIndex < 0) {
      blogSliderIndex = 0;
    }

    // Apply translation using the calculated formula W + G = (100% + G) / V
    blogGrid.style.transform = `translateX(calc(-${blogSliderIndex} * (100% + ${slideGap}px) / ${visibleCount}))`;

    // Render slider dots
    const dotsContainer = document.getElementById('blog-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      const dotsCount = Math.max(1, cards.length - visibleCount + 1);
      // Only show dots if there's actual scrolling
      if (dotsCount > 1) {
        dotsContainer.style.display = 'flex';
        for (let i = 0; i < dotsCount; i++) {
          const dot = document.createElement('span');
          dot.classList.add('blog-slider-dot');
          if (i === blogSliderIndex) dot.classList.add('active');
          dot.addEventListener('click', () => {
            blogSliderIndex = i;
            updateBlogSlider();
            resetBlogAutoScroll();
          });
          dotsContainer.appendChild(dot);
        }
      } else {
        dotsContainer.style.display = 'none';
      }
    }

    // Hide or show arrow buttons based on item counts
    const prevArrow = document.getElementById('blog-prev');
    const nextArrow = document.getElementById('blog-next');
    if (prevArrow && nextArrow) {
      if (cards.length <= visibleCount) {
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
      } else {
        prevArrow.style.display = 'flex';
        nextArrow.style.display = 'flex';
      }
    }
  }

  function nextBlogSlide() {
    const cards = blogGrid.querySelectorAll('.blog-card');
    if (!cards || cards.length === 0) return;
    const visibleCount = getVisibleCardsCount();
    const dotsCount = Math.max(1, cards.length - visibleCount + 1);
    if (dotsCount <= 1) return;
    blogSliderIndex = (blogSliderIndex + 1) % dotsCount;
    updateBlogSlider();
  }

  function prevBlogSlide() {
    const cards = blogGrid.querySelectorAll('.blog-card');
    if (!cards || cards.length === 0) return;
    const visibleCount = getVisibleCardsCount();
    const dotsCount = Math.max(1, cards.length - visibleCount + 1);
    if (dotsCount <= 1) return;
    blogSliderIndex = (blogSliderIndex - 1 + dotsCount) % dotsCount;
    updateBlogSlider();
  }

  function startBlogAutoScroll() {
    stopBlogAutoScroll();
    blogAutoScrollInterval = setInterval(nextBlogSlide, 5000); // Shift every 5 seconds
  }

  function stopBlogAutoScroll() {
    if (blogAutoScrollInterval) {
      clearInterval(blogAutoScrollInterval);
      blogAutoScrollInterval = null;
    }
  }

  function resetBlogAutoScroll() {
    startBlogAutoScroll();
  }

  // Set up slide controls click listeners globally
  const blogPrevBtn = document.getElementById('blog-prev');
  const blogNextBtn = document.getElementById('blog-next');
  if (blogPrevBtn) {
    blogPrevBtn.addEventListener('click', () => {
      prevBlogSlide();
      resetBlogAutoScroll();
    });
  }
  if (blogNextBtn) {
    blogNextBtn.addEventListener('click', () => {
      nextBlogSlide();
      resetBlogAutoScroll();
    });
  }

  let currentOpenPostId = null;

  function openPostModal(id) {
    if (!blogModal) return;
    const posts = getPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;

    currentOpenPostId = id;

    modalHeaderImg.style.backgroundImage = `url('${post.image}')`;
    modalTitle.innerText = post.title;
    modalAuthor.innerText = `Por ${post.author}`;
    modalDate.innerText = formatPostDate(post.publishDate || post.date);
    modalBodyContent.innerHTML = post.content;

    // Populate suggested posts sidebar
    populateSuggestedPosts(id);

    // Setup social share links
    setupShareLinks(post);

    blogModal.classList.add('open');
    blogModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable page scroll when open

    // Scroll modal contents back to the top
    const modalContent = document.querySelector('.blog-modal-content');
    if (modalContent) modalContent.scrollTop = 0;
  }

  function populateSuggestedPosts(currentId) {
    if (!modalSuggestedContainer) return;
    const published = getPublishedPosts();
    // Filter out current post
    const suggestions = published.filter(p => p.id !== currentId).slice(0, 3);

    modalSuggestedContainer.innerHTML = '';

    if (suggestions.length === 0) {
      modalSuggestedContainer.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">No hay otros artículos sugeridos.</p>';
      return;
    }

    suggestions.forEach(post => {
      const item = document.createElement('div');
      item.classList.add('suggested-post-card');
      item.innerHTML = `
        <img class="suggested-post-img" src="${post.image}" alt="${post.title}">
        <div class="suggested-post-info">
          <div class="suggested-post-date">${formatPostDate(post.publishDate || post.date)}</div>
          <h5 class="suggested-post-title">${post.title}</h5>
        </div>
      `;
      item.addEventListener('click', () => {
        openPostModal(post.id);
      });
      modalSuggestedContainer.appendChild(item);
    });
  }

  function setupShareLinks(post) {
    const postUrl = window.location.origin + window.location.pathname + '?post=' + post.id;
    const encodedUrl = encodeURIComponent(postUrl);
    const encodedText = encodeURIComponent(post.title);

    if (shareWhatsapp) {
      shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
    }
    if (shareFacebook) {
      shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
    if (shareTwitter) {
      shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Avoid scrolling
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopyTooltip();
    } catch (err) {
      console.error('Error en fallback de copia: ', err);
    }
    document.body.removeChild(textarea);
  }

  function showCopyTooltip() {
    if (copySuccessTooltip) {
      copySuccessTooltip.style.display = 'block';
      setTimeout(() => {
        copySuccessTooltip.style.display = 'none';
      }, 2000);
    }
  }

  function closePostModal() {
    if (blogModal) {
      blogModal.classList.remove('open');
      blogModal.style.display = 'none';
      document.body.style.overflow = ''; // Restore scroll
    }
  }

  // Bind close buttons and copy actions globally (no cloning)
  if (blogModalClose) {
    blogModalClose.addEventListener('click', closePostModal);
  }

  if (blogModal) {
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) closePostModal();
    });
  }

  if (shareCopyLink) {
    shareCopyLink.addEventListener('click', () => {
      if (!currentOpenPostId) return;
      const postUrl = window.location.origin + window.location.pathname + '?post=' + currentOpenPostId;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(postUrl).then(showCopyTooltip).catch(err => {
          console.error('No se pudo copiar el enlace: ', err);
          fallbackCopy(postUrl);
        });
      } else {
        fallbackCopy(postUrl);
      }
    });
  }

  // Helper date formatter
  function formatPostDate(dateStr) {
    if (!dateStr) return 'Hoy';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const cleanDateStr = typeof dateStr === 'string' && dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const date = new Date(cleanDateStr + 'T00:00:00'); // Prevent timezone shift
    return isNaN(date.getTime()) ? 'Hoy' : date.toLocaleDateString('es-ES', options);
  }

  // Render on load: fetch from Firestore first
  initBlogPosts();
});


