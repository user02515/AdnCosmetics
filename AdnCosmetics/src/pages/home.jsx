import { useEffect, useState, useRef } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../App.css";

import imagen1 from "../assets/imagen1.png";
import imagen2 from "../assets/imagen2.png";
import imagen3 from "../assets/imagen3.png";
import imagen4 from "../assets/imagen4.png";

// ── Slides del carrusel ──
const slides = [
  {
    id: 1,
    src: imagen1,
    label: "Imagen 1",
    caption: "Nueva colección de maquillaje",
    sub: "Hasta 30% de descuento",
  },
  {
    id: 2,
    src: imagen2,
    label: "Imagen 2",
    caption: "Skincare premium importado",
    sub: "Productos 100% originales",
  },
  {
    id: 3,
    src: imagen3,
    label: "Imagen 3",
    caption: "Perfumes internacionales",
    sub: "Fragancias exclusivas",
  },
  {
    id: 4,
    src: imagen4,
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

  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

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
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="carousel-slide"
          >
            <img
              src={s.src}
              alt={s.label}
              className="carousel-img"
            />

            <div className="carousel-caption">
              <div className="carousel-caption-num">0{i + 1}</div>

              <h3>{s.caption}</h3>

              <p>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-btn carousel-btn-prev"
        onClick={() => {
          prev();
          resetTimer();
        }}
      >
        ❮
      </button>

      <button
        className="carousel-btn carousel-btn-next"
        onClick={() => {
          next();
          resetTimer();
        }}
      >
        ❯
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => {
              setCurrent(i);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.classList.add("visible");
            }, i * 70);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section
          className="hero"
          id="inicio"
        >
          <div className="hero-content">
            <div className="hero-tag">
              <span>Importadora de Cosméticos · Bolivia</span>
            </div>

            <h1>
              Tu belleza,
              <br />
              <span className="line2">sin fronteras</span>
            </h1>

            <p className="hero-desc">
              Importamos y exportamos cosméticos premium de las mejores marcas
              del mundo.
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
        </section>

        {/* CARRUSEL */}
        <section className="carousel-section">
          <div className="carousel-wrapper">
            <div className="carousel-header reveal">
              <h2>Últimas ofertas</h2>
            </div>

            <CarouselSlider />
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section
          className="cats-section"
          id="productos"
        >
          <div className="cats-header reveal">
            <h2>Nuestro Catálogo</h2>

            <p>Todo lo que tu piel merece</p>
          </div>

          <div className="bento">
            {[
              {
                emoji: "💄",
                title: "Maquillaje",
                desc: "Bases, labiales y sombras",
              },
              {
                emoji: "🧴",
                title: "Skincare",
                desc: "Serums y tratamientos",
              },
              {
                emoji: "🌸",
                title: "Perfumes",
                desc: "Fragancias exclusivas",
              },
              {
                emoji: "💅",
                title: "Nail Art",
                desc: "Esmaltes y accesorios",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bento-card reveal"
              >
                <div className="bc-info">
                  <span className="bc-emoji">{c.emoji}</span>

                  <h3>{c.title}</h3>

                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NOSOTROS */}
        <section id="nosotros">
          <div className="about">
            <div className="about-left reveal">
              <img
                src={imagen4}
                alt="VDN Cosmetics"
              />
            </div>

            <div className="about-right reveal">
              <h2>Quiénes Somos</h2>

              <p>
                VDN Cosmetics es una importadora y exportadora especializada en
                cosméticos de alta calidad.
              </p>

              <div className="about-nums">
                <div className="about-num-item">
                  <div className="n">500+</div>

                  <div className="l">Productos</div>
                </div>

                <div className="about-num-item">
                  <div className="n">50+</div>

                  <div className="l">Marcas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          className="cta"
          id="contacto"
        >
          <h2>Contáctanos</h2>

          <p>Escríbenos y recibe atención personalizada.</p>

          <button
            className="wa-btn"
            onClick={() =>
              window.open(
                "https://wa.me/591XXXXXXXX",
                "_blank",
              )
            }
          >
            WhatsApp
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}