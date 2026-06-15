# Rimay Viajes - Project Documentation & Architecture

Welcome to the **Rimay Viajes** project. This document provides a detailed overview of the website's architecture, components, scripts, and deployment configurations. It is designed to help language models (such as NotebookLM) understand the context, flow, and structural layout of the codebase.

---

## 1. Project Overview
**Rimay Viajes** is a single-page website for a conscious, slow-tourism travel agency based in Cusco, Peru, tailored primarily for Chilean travelers. 

* **Founder & Tour Leader:** Mónica Carrión (a Chilean living in Cusco).
* **Key Concept:** *Rimay* is a Quechua word meaning "communication from the soul" (comunicación desde el alma).
* **Core Offerings:** Custom, slow-paced itineraries through Cusco, Machu Picchu, Sacred Valley, and Lake Titicaca (Puno).

---

## 2. Technical Stack
* **Frontend:** Standard Semantic HTML5, Vanilla JavaScript (ES6), and Custom Responsive CSS3.
* **Hosting & Deployment:** Firebase Hosting.
* **Architecture:** Static single-page application (SPA) with a custom JSON structure describing page sections, style tokens, and content.

---

## 3. Directory & File Structure

```text
Rimay/
├── .firebase/                  # Firebase CLI cache directory
├── .github/workflows/          # GitHub Actions for automated hosting deployments
│   └── firebase-hosting-pull-request.yml
├── assets/                     # Assets folder containing media and vector graphics
│   └── images/                 # SVGs (placeholders) and compressed images (.webp, .png, .jpeg)
├── css/
│   └── style.css               # Core CSS containing layout, themes, components, and animations
├── js/
│   └── script.js               # Main javascript containing animations, sliders, form controls, and chatbot
├── index.html                  # Main entry point (fully optimized with SEO meta tags, navigation, content, forms)
├── 404.html                    # Custom 404 page for hosting redirections
├── estructura_rimay.json       # JSON specification of the page layout, content, assets, and design tokens
├── firebase.json               # Firebase Hosting routing and redirect rules
├── package.json                # Project node packages, script utilities, and devDependencies (e.g. repomix)
└── repomix.config.json         # Repomix packaging configuration
```

---

## 4. Detailed Component & Section Analysis

### 4.1 Index Page (`index.html`)
The main page contains standard semantic HTML sections:
1. **Header / Navigation (`#header`):** Includes the brand logo, navigation links (`#hero`, `#nosotros`, `#viajes`, `#resenas`, `#reserva`, `#contacto`), and a CTA button "COTIZA TU VIAJE". It supports a hamburger icon for mobile viewport drawers.
2. **Hero Section (`#hero`):** A fullscreen image slider carousel with an overlay, high-impact headings, navigation arrows, and slide indicators.
3. **Nosotros / About (`#nosotros`):** A split section with brand story text (left) and an asymmetrical mosaic of image collages (right).
4. **Pilares / Philosophy (`#pilares`):** A features grid showcasing the 3 pillars of Rimay:
   - *Experiencias Curadas* (Curated experiences)
   - *Oficina en Cusco* (Local presence)
   - *Slow Tourism* (Unhurried connection)
5. **Viajes / Destinations (`#viajes`):** A showcase card containing an auto-sliding background image gallery and detailed descriptions of Cusco and Machu Picchu.
6. **Programas Recomendados (`#programas`):** A card grid displaying the three main preset travel itineraries:
   - *Aventura Andina* (5 days / 4 nights) - Cusco, Sacred Valley, Machu Picchu, Rainbow Mountain.
   - *Esencia Inca* (6 days / 5 nights) - Cusco, Sacred Valley, Machu Picchu, Humantay Lake.
   - *Rutas Ancestrales* (7 days / 6 nights) - Cusco, Puno, Lake Titicaca, Sacred Valley, Machu Picchu.
   Each card has a link to an individual PDF itinerary download.
7. **Reseñas / Testimonials (`#resenas`):** Displays aggregated rating statistics (5.0 stars from 120+ reviews on Google Maps) and scrolling testimonial cards from actual travelers.
8. **Reserva / Booking Form (`#reserva`):** A comprehensive request form capture (Name, Email, WhatsApp, Program, Date, Travelers, Message).
9. **Footer (`#contacto`):** Structured contact columns containing company info, office addresses in Cusco and Santiago, phone numbers, email addresses, and social links.

### 4.2 Styling (`css/style.css`)
Contains design variables, utility styles, and custom themes:
* **Colors:**
  - `--primary-dark`: `#2c3e2d` (Deep forest green representing Andean nature)
  - `--background-light`: `#fdfbf7` (Warm cream white)
  - `--accent-gold`: `#d4af37` (Muted gold representing Inca heritage)
  - `--text-main`: `#333333`
* **Typography:** Montserrat or Lato for body copy, and elegant Serif typeface for headings (Playfair Display).
* **Key Styles:** Glassmorphism overlay panels, flexbox/grid alignments, responsive media queries (`@media`), custom transitions, hover micro-animations, and styled sliders.

### 4.3 Scripts & Interactivity (`js/script.js`)
Handles all dynamic behaviors:
1. **Sticky Header & Active Link Highlight:** Adds the `.scrolled` class to the header on page scroll and updates the active nav link based on scroll position offset.
2. **Mobile Menu:** Controls the toggling of the hamburger button and opening/closing of the drawer.
3. **Hero Slider:** Auto-scrolls slide backgrounds every 6 seconds, manages indicator dots and manual previous/next buttons.
4. **Viajes Gallery:** Auto-toggles slide image transitions in the destination section.
5. **Interactive Chatbot Widget (`#chatbot-widget`):**
   - Renders a floating chat bubble with a pulsing notification badge.
   - Triggers an automated periodic speech bubble tooltip after 3 seconds.
   - Welcomes users and responds to predefined clicks/keywords:
     - `quien` / `monica` / `historia` -> Tells Mónica's background.
     - `significado` / `rimay` -> Explains the Quechua meaning.
     - `pilares` / `filosofia` -> Highlights the 3 pillars.
     - `viajes` / `destinos` -> Details travel destinations.
     - `reservar` / `contacto` / `cotizar` -> Dynamically embeds an interactive HTML form inside the chat window.
   - Simulates human typing delay with a typing indicator.
6. **Form Submissions:** Overrides default actions to mock success dialogs locally (`window.submitMainReservaForm` and `window.submitChatForm`).

### 4.4 Data Specification (`estructura_rimay.json`)
A structured configuration JSON file. It contains configuration properties mapping to all variables, sections, content copy, navigation links, testimonials, and contact list items featured across the site. This facilitates CMS parsing and future site content management.

---

## 5. Setup & Packaging Details
The codebase uses `repomix` to bundle its files into a single, cohesive file (`repomix-output.md`) optimized for prompt ingestion.
* Output formatting uses markdown styles with parsable-styles enabled (escaping special character sets).
* Excluded paths include large caches (`.firebase/**`, `node_modules/**`), binary lock files, and intermediate generated logs.
