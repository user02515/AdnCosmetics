// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Home.jsx — VDN Cosmetics
//  Importa: Navbar y Footer del equipo
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import imagen1 from "../assets/imagen1.png";
import imagen2 from "../assets/imagen2.png";
import imagen3 from "../assets/imagen3.png";
import imagen4 from "../assets/imagen4.png";

import "../styles/App.css";

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
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div key={s.id} className="carousel-slide">
            {s.src ? (
              <img src={s.src} alt={s.label} className="carousel-img" />
            ) : (
              <div className="carousel-placeholder">
                <div>🖼️</div>
                <div>{s.label}</div>
                <small>Reemplaza la imagen</small>
              </div>
            )}

            <div className="carousel-caption">
              <div>0{i + 1}</div>
              <h3>{s.caption}</h3>
              <p>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-btn-prev" onClick={prev}>
        ‹
      </button>

      <button className="carousel-btn carousel-btn-next" onClick={next}>
        ›
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === current ? "active" : ""}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const scrollTo = (id) =>
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    });

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="inicio">
          <h1>VDN Cosmetics</h1>
          <p>Tu belleza sin fronteras</p>
        </section>

        <section id="productos">
          <CarouselSlider />
        </section>

        <section id="contacto">
          <h2>Contacto</h2>
        </section>
      </main>

      <Footer />
    </>
  );
}