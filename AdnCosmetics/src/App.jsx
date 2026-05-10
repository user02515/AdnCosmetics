// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  App.jsx — VDN Cosmetics
//  Importa: Navbar y Footer del equipo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar"; // ← componente del equipo
import Footer from "./components/Footer"; // ← componente del equipo
import "./App.css";

// ── Imágenes del carrusel — reemplaza src con tus imágenes reales ──
const slides = [
  {
    id: 1,
    src: null,
    label: "Imagen 1",
    caption: "Nueva colección de maquillaje",
    sub: "Hasta 30% de descuento",
  },
  {
    id: 2,
    src: null,
    label: "Imagen 2",
    caption: "Skincare premium importado",
    sub: "Productos 100% originales",
  },
  {
    id: 3,
    src: null,
    label: "Imagen 3",
    caption: "Perfumes internacionales",
    sub: "Fragancias exclusivas",
  },
  {
    id: 4,
    src: null,
    label: "Imagen 4",
    caption: "Venta mayorista disponible",
    sub: "Precio especial para distribuidoras",
  },
];

function CarouselSlider() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const timerRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleDragStart = (e) => {
    setDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX);
  };
  const handleDragEnd = (e) => {
    if (!dragging) return;
    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    if (startX - endX > 60) {
      next();
      resetTimer();
    }
    if (endX - startX > 60) {
      prev();
      resetTimer();
    }
    setDragging(false);
  };

  return (
    <div
      className="carousel"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      {/* Slides */}
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={s.id} className="carousel-slide">
            {/* Si hay imagen real la muestra, si no muestra placeholder */}
            {s.src ? (
              <img src={s.src} alt={s.label} className="carousel-img" />
            ) : (
              <div className="carousel-placeholder">
                <div className="carousel-placeholder-icon">🖼️</div>
                <div className="carousel-placeholder-label">{s.label}</div>
                <div className="carousel-placeholder-hint">
                  Reemplaza src en el array slides[]
                </div>
              </div>
            )}
            {/* Caption sobre la imagen */}
            <div className="carousel-caption">
              <div className="carousel-caption-num">0{i + 1}</div>
              <h3>{s.caption}</h3>
              <p>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button
        className="carousel-btn carousel-btn-prev"
        onClick={() => {
          prev();
          resetTimer();
        }}
        aria-label="Anterior"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="carousel-btn carousel-btn-next"
        onClick={() => {
          next();
          resetTimer();
        }}
        aria-label="Siguiente"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => {
              setCurrent(i);
              resetTimer();
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="carousel-progress">
        <div key={current} className="carousel-progress-bar" />
      </div>
    </div>
  );
}

export default function App() {
  // Cursor personalizado
  useEffect(() => {
    const cur = document.getElementById("cur");
    const ring = document.getElementById("curRing");
    if (!cur || !ring) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const moveCursor = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    };
    document.addEventListener("mousemove", moveCursor);

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animRing);
    };
    animRing();

    const hoverEls = document.querySelectorAll(
      "button, a, .bento-card, .c-card, .why-card",
    );
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cur.style.background = "#2547e0";
        cur.style.transform += " scale(1.8)";
      });
      el.addEventListener("mouseleave", () => {
        cur.style.background = "var(--pink-hot)";
      });
    });

    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting)
            setTimeout(() => e.target.classList.add("visible"), i * 70);
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Cursor */}
      <div className="cursor" id="cur" />
      <div className="cursor-ring" id="curRing" />

      {/* ── NAVBAR — importado del equipo ── */}
      <Navbar />

      <main>
        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section className="hero" id="inicio">
          <div className="hero-bg" />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="hero-grid" />

          {/* Anillo orbital */}
          <div className="orbit-ring">
            <svg
              viewBox="0 0 520 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="260"
                cy="260"
                r="250"
                stroke="url(#ringGrad)"
                strokeWidth="1"
                strokeDasharray="8 16"
              />
              <circle
                cx="260"
                cy="260"
                r="180"
                stroke="rgba(255,61,139,0.15)"
                strokeWidth="1"
              />
              <circle cx="260" cy="10" r="6" fill="#ff3d8b" />
              <circle cx="510" cy="260" r="4" fill="#4e78ff" />
              <circle cx="260" cy="510" r="5" fill="rgba(255,128,181,0.6)" />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="520" y2="520">
                  <stop offset="0%" stopColor="rgba(255,61,139,0.4)" />
                  <stop offset="50%" stopColor="rgba(37,71,224,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,61,139,0.4)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="hero-content">
            <div className="hero-tag">
              <div className="hero-tag-dot" />
              <span>Importadora de Cosméticos · Bolivia</span>
            </div>
            <h1>
              Tu belleza,
              <br />
              <span className="line2">sin fronteras</span>
            </h1>
            <p className="hero-desc">
              Importamos y exportamos cosméticos premium de las mejores marcas
              del mundo. Venta al por mayor y menor. Atención personalizada para
              distribuidoras y clientes finales.
            </p>
            <div className="hero-actions">
              <button
                className="btn-glow"
                onClick={() => scrollTo("#productos")}
              >
                Ver Catálogo
              </button>
              <button
                className="btn-outline-hero"
                onClick={() => scrollTo("#comprar")}
              >
                Precios Mayorista
              </button>
            </div>
          </div>

          <div className="hero-pills">
            <div className="hero-pill">
              <span className="hero-pill-icon">💄</span>
              <div className="hero-pill-text">
                <strong>500+</strong> Productos
              </div>
            </div>
            <div className="hero-pill">
              <span className="hero-pill-icon">🌍</span>
              <div className="hero-pill-text">
                <strong>Importación</strong> Directa
              </div>
            </div>
            <div className="hero-pill">
              <span className="hero-pill-icon">🚚</span>
              <div className="hero-pill-text">
                <strong>Envíos</strong> a Bolivia
              </div>
            </div>
          </div>

          <div className="scroll-line">Descubrir</div>
        </section>

        {/* ══════════════════════════════════════
            STRIP ANIMADO
        ══════════════════════════════════════ */}
        <div className="strip">
          <div className="strip-track">
            {[
              "Cosméticos Originales",
              "Importación Directa",
              "Venta Mayor & Menor",
              "Marcas Internacionales",
              "Envíos a Bolivia",
              "Asesoría Personalizada",
              "Distribuidoras Bienvenidas",
              "Cosméticos Originales",
              "Importación Directa",
              "Venta Mayor & Menor",
              "Marcas Internacionales",
              "Envíos a Bolivia",
              "Asesoría Personalizada",
              "Distribuidoras Bienvenidas",
            ].map((t, i) => (
              <span key={i} className="strip-item">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            QUIÉNES SOMOS
        ══════════════════════════════════════ */}
        <section
          style={{ background: "var(--off-white)", padding: 0 }}
          id="nosotros"
        >
          <div className="about">
            {/* Columna imagen */}
            <div className="about-left reveal">
              <div className="deco-letter">V</div>
              <div className="img-stack">
                <div className="img-main">
                  <div className="img-main-inner">
                    {/* Ilustración SVG mujer con cabello */}
                    <svg
                      viewBox="0 0 320 420"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        inset: 0,
                      }}
                    >
                      <defs>
                        <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
                          <stop offset="0%" stopColor="#f5cba7" />
                          <stop offset="100%" stopColor="#e8a87c" />
                        </radialGradient>
                        <radialGradient id="hairGrad" cx="50%" cy="0%" r="90%">
                          <stop offset="0%" stopColor="#2c1a0e" />
                          <stop offset="60%" stopColor="#1a0d06" />
                          <stop offset="100%" stopColor="#0d0600" />
                        </radialGradient>
                        <radialGradient
                          id="hairShine"
                          cx="35%"
                          cy="20%"
                          r="40%"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(255,180,120,0.35)"
                          />
                          <stop offset="100%" stopColor="rgba(255,100,60,0)" />
                        </radialGradient>
                        <linearGradient
                          id="dressGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#ff3d8b" />
                          <stop offset="50%" stopColor="#c4186d" />
                          <stop offset="100%" stopColor="#1630a8" />
                        </linearGradient>
                        <linearGradient
                          id="svgBgGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#0b1560" />
                          <stop offset="40%" stopColor="#1630a8" />
                          <stop offset="80%" stopColor="#6b2070" />
                          <stop offset="100%" stopColor="#c0186e" />
                        </linearGradient>
                      </defs>
                      <rect width="320" height="420" fill="url(#svgBgGrad)" />
                      <circle
                        cx="160"
                        cy="210"
                        r="130"
                        fill="rgba(255,61,139,0.07)"
                      />
                      <path
                        d="M 60 340 Q 60 290 80 270 Q 100 255 130 248 L 160 260 L 190 248 Q 220 255 240 270 Q 260 290 260 340 L 260 420 L 60 420 Z"
                        fill="url(#dressGrad)"
                        opacity="0.95"
                      />
                      <rect
                        x="143"
                        y="228"
                        width="34"
                        height="28"
                        rx="8"
                        fill="url(#skinGrad)"
                      />
                      <ellipse
                        cx="160"
                        cy="185"
                        rx="58"
                        ry="66"
                        fill="url(#skinGrad)"
                      />
                      <ellipse
                        cx="160"
                        cy="225"
                        rx="40"
                        ry="20"
                        fill="url(#skinGrad)"
                      />
                      <ellipse
                        cx="103"
                        cy="188"
                        rx="9"
                        ry="13"
                        fill="#e8a87c"
                      />
                      <ellipse
                        cx="217"
                        cy="188"
                        rx="9"
                        ry="13"
                        fill="#e8a87c"
                      />
                      <ellipse
                        cx="128"
                        cy="205"
                        rx="18"
                        ry="10"
                        fill="rgba(255,100,130,0.18)"
                      />
                      <ellipse
                        cx="192"
                        cy="205"
                        rx="18"
                        ry="10"
                        fill="rgba(255,100,130,0.18)"
                      />
                      <path
                        d="M 130 166 Q 142 160 154 163"
                        stroke="#3d1f0a"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 166 163 Q 178 160 190 166"
                        stroke="#3d1f0a"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <ellipse cx="142" cy="182" rx="15" ry="11" fill="white" />
                      <ellipse cx="178" cy="182" rx="15" ry="11" fill="white" />
                      <circle cx="142" cy="184" r="9" fill="#2c1a0e" />
                      <circle cx="178" cy="184" r="9" fill="#2c1a0e" />
                      <circle cx="142" cy="184" r="5.5" fill="#0d0600" />
                      <circle cx="178" cy="184" r="5.5" fill="#0d0600" />
                      <circle
                        cx="145"
                        cy="181"
                        r="2.5"
                        fill="white"
                        opacity="0.9"
                      />
                      <circle
                        cx="181"
                        cy="181"
                        r="2.5"
                        fill="white"
                        opacity="0.9"
                      />
                      <ellipse
                        cx="142"
                        cy="177"
                        rx="14"
                        ry="6"
                        fill="rgba(255,61,139,0.12)"
                      />
                      <ellipse
                        cx="178"
                        cy="177"
                        rx="14"
                        ry="6"
                        fill="rgba(255,61,139,0.12)"
                      />
                      <path
                        d="M 160 188 Q 154 200 150 207 Q 155 210 160 209 Q 165 210 170 207 Q 166 200 160 188 Z"
                        fill="rgba(0,0,0,0.08)"
                      />
                      <path
                        d="M 140 217 Q 147 213 153 215 Q 157 212 160 213 Q 163 212 167 215 Q 173 213 180 217 Q 173 220 160 219 Q 147 220 140 217 Z"
                        fill="#d4185a"
                      />
                      <path
                        d="M 140 217 Q 150 225 160 226 Q 170 225 180 217 Q 173 220 160 219 Q 147 220 140 217 Z"
                        fill="#e8206a"
                      />
                      <ellipse
                        cx="157"
                        cy="221"
                        rx="8"
                        ry="3"
                        fill="rgba(255,150,180,0.4)"
                      />
                      <path
                        d="M 102 148 Q 68 120 60 90 Q 52 55 70 30 Q 90 8 120 5 Q 155 0 185 8 Q 215 15 232 40 Q 252 68 248 100 Q 244 130 218 148"
                        fill="url(#hairGrad)"
                        opacity="0.9"
                      />
                      <path
                        d="M 68 160 Q 40 200 32 260 Q 24 320 38 380 Q 50 420 60 420 L 60 340 Q 55 300 62 260 Q 68 220 80 185 Z"
                        fill="url(#hairGrad)"
                      />
                      <path
                        d="M 252 160 Q 280 200 288 260 Q 296 320 282 380 Q 270 420 260 420 L 260 340 Q 265 300 258 260 Q 252 220 240 185 Z"
                        fill="url(#hairGrad)"
                      />
                      <path
                        d="M 102 148 Q 96 130 100 110 Q 105 80 120 60 Q 140 38 160 36 Q 180 38 200 60 Q 215 80 220 110 Q 224 130 218 148 Q 195 138 160 136 Q 125 138 102 148 Z"
                        fill="url(#hairGrad)"
                      />
                      <path
                        d="M 102 148 Q 88 165 84 190 Q 80 215 86 240 Q 72 220 65 195 Q 58 168 68 148 Q 82 140 102 148 Z"
                        fill="url(#hairGrad)"
                      />
                      <path
                        d="M 218 148 Q 232 165 236 190 Q 240 215 234 240 Q 248 220 255 195 Q 262 168 252 148 Q 238 140 218 148 Z"
                        fill="url(#hairGrad)"
                      />
                      <path
                        d="M 62 220 Q 44 250 40 290 Q 36 330 45 370"
                        stroke="rgba(80,40,10,0.5)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 258 220 Q 276 250 280 290 Q 284 330 275 370"
                        stroke="rgba(80,40,10,0.5)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 102 148 Q 108 120 120 95 Q 130 72 145 58"
                        stroke="rgba(255,61,139,0.15)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 218 148 Q 212 120 200 95 Q 190 72 175 58"
                        stroke="rgba(78,120,255,0.12)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="135"
                        cy="52"
                        r="2"
                        fill="rgba(255,200,150,0.6)"
                      />
                      <circle
                        cx="200"
                        cy="58"
                        r="2"
                        fill="rgba(255,200,150,0.55)"
                      />
                      <text
                        x="44"
                        y="130"
                        fontSize="12"
                        fill="rgba(255,61,139,0.7)"
                        textAnchor="middle"
                      >
                        ✦
                      </text>
                      <text
                        x="276"
                        y="110"
                        fontSize="10"
                        fill="rgba(78,120,255,0.6)"
                        textAnchor="middle"
                      >
                        ✦
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="float-badge">
                  <div className="float-badge-icon">✨</div>
                  <div className="float-badge-text">
                    <div className="val">100%</div>
                    <div className="lbl">Productos Originales</div>
                  </div>
                </div>
                <div className="float-mini">
                  <div className="val">50+</div>
                  <div className="lbl">Marcas importadas</div>
                </div>
              </div>
            </div>

            {/* Columna texto */}
            <div className="about-right reveal">
              <span className="section-eyebrow">Quiénes Somos</span>
              <h2>
                Belleza de clase mundial
                <br />
                al alcance de <em>Bolivia</em>
              </h2>
              <p>
                VDN Cosmetics es una importadora y exportadora especializada en
                cosméticos de alta calidad. Llevamos años trayendo las mejores
                marcas del mundo directamente a tus manos, con precios justos y
                productos 100% garantizados.
              </p>
              <p>
                Somos el puente entre las tendencias internacionales de belleza
                y el mercado boliviano.
              </p>
              <div className="divider" />
              <div className="about-nums">
                <div className="about-num-item">
                  <div className="n">500+</div>
                  <div className="l">Productos</div>
                </div>
                <div className="about-num-item">
                  <div className="n">50+</div>
                  <div className="l">Marcas</div>
                </div>
                <div className="about-num-item">
                  <div className="n">★★★★★</div>
                  <div className="l">Reputación</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CARRUSEL PUBLICITARIO + REDES SOCIALES
        ══════════════════════════════════════ */}
        <section className="carousel-section">
          {/* Barra lateral de redes sociales */}
          <div className="social-sidebar">
            <div className="social-label">Síguenos</div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon fb"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://wa.me/591XXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="social-icon wa"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon tt"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
              </svg>
              <span>TikTok</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon ig"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          {/* Carrusel */}
          <div className="carousel-wrapper">
            <div className="carousel-header reveal">
              <span className="section-eyebrow">
                Publicidad &amp; Novedades
              </span>
              <h2>
                Descubre nuestras <span>últimas ofertas</span>
              </h2>
            </div>
            <CarouselSlider />
          </div>
        </section>

        {/* ══════════════════════════════════════
            CATEGORÍAS
        ══════════════════════════════════════ */}
        <section className="cats-section" id="productos">
          <div className="cats-header reveal">
            <span
              className="section-eyebrow"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Nuestro Catálogo
            </span>
            <h2>
              Todo lo que tu <span>piel merece</span>
            </h2>
            <p>Líneas completas de belleza, importadas con cuidado para ti</p>
          </div>
          <div className="bento">
            {[
              {
                g: "g1",
                tag: "Bestseller",
                tagType: "",
                emoji: "💄",
                title: "Maquillaje",
                desc: "Bases, labiales, sombras, correctores y más",
              },
              {
                g: "g2",
                tag: "Premium",
                tagType: "blue",
                emoji: "🧴",
                title: "Skincare",
                desc: "Hidratantes, serums y tratamientos",
              },
              {
                g: "g3",
                tag: "",
                tagType: "",
                emoji: "🌸",
                title: "Perfumes",
                desc: "Fragancias exclusivas",
              },
              {
                g: "g4",
                tag: "",
                tagType: "",
                emoji: "💅",
                title: "Nail Art",
                desc: "Esmaltes, geles y accesorios",
              },
              {
                g: "g5",
                tag: "",
                tagType: "",
                emoji: "💇",
                title: "Cuidado Capilar",
                desc: "Shampoos, mascarillas y aceites",
              },
              {
                g: "g6",
                tag: "",
                tagType: "",
                emoji: "✨",
                title: "Accesorios",
                desc: "Pinceles, esponjas, herramientas",
              },
            ].map((c, i) => (
              <div key={i} className="bento-card reveal">
                <div className="bc-bg">
                  <div className={`bc-gradient ${c.g}`} />
                </div>
                <div className="bc-overlay" />
                {c.tag && (
                  <span className={`bc-tag ${c.tagType}`}>{c.tag}</span>
                )}
                <div className="bc-info">
                  <span className="bc-emoji">{c.emoji}</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            POR QUÉ ELEGIRNOS
        ══════════════════════════════════════ */}
        <section className="why-section">
          <div className="deco-bg">VDN</div>
          <div className="why-inner">
            <div className="why-hdr reveal">
              <span className="section-eyebrow">Nuestras Ventajas</span>
              <h2>¿Por qué somos tu mejor opción?</h2>
            </div>
            <div className="why-grid">
              {[
                {
                  icon: "🌍",
                  title: "Importación Directa",
                  desc: "Sin intermediarios. Traemos los productos directo del fabricante para darte el mejor precio.",
                },
                {
                  icon: "✅",
                  title: "100% Originales",
                  desc: "Todos nuestros cosméticos tienen certificado de autenticidad. Cero falsificaciones.",
                },
                {
                  icon: "🚀",
                  title: "Envíos Rápidos",
                  desc: "Despachamos a todo Bolivia de manera rápida, segura y con seguimiento en tiempo real.",
                },
                {
                  icon: "💎",
                  title: "Precios Mayoristas",
                  desc: "Accede a precios especiales por volumen ideal para distribuidoras y revendedoras.",
                },
              ].map((w, i) => (
                <div key={i} className="why-card reveal">
                  <div className="why-icon-wrap">{w.icon}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MARCAS
        ══════════════════════════════════════ */}
        <div className="brands-strip" id="marcas">
          <p className="brands-strip-label">Marcas que importamos</p>
          <div className="brands-track">
            {[
              "MAC Cosmetics",
              "·",
              "L'Oréal Paris",
              "·",
              "Maybelline",
              "·",
              "NYX Professional",
              "·",
              "Revlon",
              "·",
              "Neutrogena",
              "·",
              "Nivea",
              "·",
              "Essence",
              "·",
              "OPI",
              "·",
              "Rimmel London",
              "·",
              "MAC Cosmetics",
              "·",
              "L'Oréal Paris",
              "·",
              "Maybelline",
              "·",
              "NYX Professional",
              "·",
              "Revlon",
              "·",
              "Neutrogena",
              "·",
              "Nivea",
              "·",
              "Essence",
              "·",
              "OPI",
              "·",
              "Rimmel London",
              "·",
            ].map((b, i) => (
              <span key={i} className="brand-name">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            PRECIOS MAYOR / MENOR
        ══════════════════════════════════════ */}
        <section className="pricing-section" id="comprar">
          <div className="pricing-inner">
            <div className="pricing-hdr reveal">
              <span className="section-eyebrow">Modalidades</span>
              <h2>Compra a tu medida</h2>
            </div>
            <div className="pricing-grid">
              {/* Minorista */}
              <div className="p-card retail reveal">
                <div className="p-inner">
                  <div className="p-badge">Al Detalle</div>
                  <h3>Minorista</h3>
                  <p className="p-desc">
                    Para quienes buscan productos para uso personal o regalos
                    especiales.
                  </p>
                  <ul className="p-features">
                    {[
                      "Sin cantidad mínima",
                      "Pago en efectivo o transferencia",
                      "Envío a domicilio",
                      "Asesoría personalizada gratis",
                      "Catálogo completo disponible",
                    ].map((f, i) => (
                      <li key={i}>
                        <span className="check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn-retail"
                    onClick={() => scrollTo("#contacto")}
                  >
                    Consultar Precios
                  </button>
                </div>
              </div>
              {/* Mayorista */}
              <div className="p-card wholesale reveal">
                <div className="p-inner">
                  <div className="p-badge">
                    <span className="p-badge-star">⭐</span> Más Popular
                  </div>
                  <h3>Mayorista</h3>
                  <p className="p-desc">
                    Para distribuidoras, tiendas y emprendedoras que quieren
                    crecer con nosotras.
                  </p>
                  <ul className="p-features">
                    {[
                      "Precios especiales por volumen",
                      "Descuentos desde 6 unidades",
                      "Catálogo exclusivo mayorista",
                      "Atención dedicada 24/7",
                      "Despachos prioritarios",
                    ].map((f, i) => (
                      <li key={i}>
                        <span className="check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn-wholesale"
                    onClick={() => scrollTo("#contacto")}
                  >
                    Quiero ser Distribuidora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONTACTO / CTA
        ══════════════════════════════════════ */}
        <section className="cta" id="contacto">
          <span
            className="section-eyebrow"
            style={{ justifyContent: "center" }}
          >
            Contáctanos
          </span>
          <h2>
            ¿Lista para brillar
            <br />
            <span>con VDN?</span>
          </h2>
          <p>
            Escríbenos ahora y te ayudamos a encontrar los productos perfectos
            para ti o tu negocio.
          </p>

          <div className="contact-row">
            {[
              { icon: "📍", type: "Ubicación", val: "La Paz, Bolivia" },
              { icon: "📱", type: "WhatsApp", val: "+591 XXX XXXX" },
              { icon: "📧", type: "Email", val: "info@vdncosmetics.com" },
            ].map((c, i) => (
              <div key={i} className="c-card">
                <div className="c-icon">{c.icon}</div>
                <div className="c-text">
                  <div className="type">{c.type}</div>
                  <div className="val">{c.val}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="wa-btn"
            onClick={() =>
              window.open(
                "https://wa.me/591XXXXXXXX?text=Hola VDN Cosmetics! Me interesa conocer sus productos 💄",
                "_blank",
              )
            }
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribir por WhatsApp
          </button>
        </section>
      </main>

      {/* ── FOOTER — importado del equipo ── */}
      <Footer />
    </>
  );
}
