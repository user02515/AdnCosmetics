// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Home.jsx — VDN Cosmetics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Categorias from "./Categorias.jsx";
import { useNavigate } from "react-router-dom";

import imagen4 from "../assets/imagen4.png";
import { API_URL, BASE_URL } from "../config/api";
import "../styles/App.css";

// ── CLAVE COMPARTIDA con EditCarousel ──




// ── Leer slides (localStorage tiene prioridad, sino usa los iniciales) ──


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CAROUSEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CarouselSlider({ slides }) {
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
    if (current >= slides.length) setCurrent(0);
  }, [slides]);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [slides]);

  const handleDragStart = (e) => {
    setDragging(true);
    setStartX(e.clientX || e.touches?.[0]?.clientX);
  };

  const handleDragEnd = (e) => {
    if (!dragging) return;
    const endX = e.clientX || e.changedTouches?.[0]?.clientX;
    if (startX - endX > 60) { next(); resetTimer(); }
    if (endX - startX > 60) { prev(); resetTimer(); }
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

      <button className="carousel-btn carousel-btn-prev" onClick={prev}>‹</button>
      <button className="carousel-btn carousel-btn-next" onClick={next}>›</button>

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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOME
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_URL}/get_carrusel_imagenes.php`)
      .then((res) => res.json())
      .then((data) => {
        const formattedSlides = data.map((slide) => ({
          id: slide.id,
          src: `${BASE_URL}${slide.imagen_url}`,
          label: slide.titulo,
          caption: slide.titulo,
          sub: slide.subtitulo,
        }));

        setSlides(formattedSlides);
      })
      .catch((err) => console.log(err));
  }, []);
  // ✅ Inicializa leyendo localStorage, SIN guardado automático
  const [slides, setSlides] = useState([]);

  

  // Intersection Observer para animaciones reveal
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="page-hero">
          <div className="page-hero-bg"></div>
          <div className="hero-grid-lines"></div>
          <div className="page-hero-blob phb1"></div>
          <div className="page-hero-blob phb2"></div>
          <div className="page-hero-content">
            <h1>VDN<br /><em>Cosmetics</em></h1>
            <div className="page-hero-line"></div>
          </div>
        </section>

        <div className="scroll-line">Descubrir</div>

        {/* STRIP */}
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
              <span key={i} className="strip-item">{t}</span>
            ))}
          </div>
        </div>

        {/* QUIÉNES SOMOS */}
        <section style={{ background: "var(--off-white)", padding: 0 }} id="nosotros">
          <div className="about">
            <div className="about-left reveal">
              <div className="deco-letter">V</div>
              <div className="img-stack">
                <div className="img-main">
                  <div className="img-main-inner">
                    <img src={imagen4} alt="Modelo VDN Cosmetics" className="imagen4" />
                  </div>
                </div>
                <div className="float-badge">
                  <div className="float-badge-icon">*</div>
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

        {/* CARRUSEL + REDES */}
        <section className="carousel-section">
          <div className="social-sidebar">
            <div className="social-label">Síguenos</div>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon fb" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a href="https://wa.me/591XXXXXXXX" target="_blank" rel="noreferrer" className="social-icon wa" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon tt" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
              </svg>
              <span>TikTok</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon ig" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          <div className="carousel-wrapper">
            <div className="carousel-header reveal">
              <span className="section-eyebrow">Publicidad &amp; Novedades</span>
              <h2>Descubre nuestras <span>últimas ofertas</span></h2>
            </div>

            <CarouselSlider slides={slides} />

            
          </div>
        </section>

        {/* CATEGORÍAS */}
        <Categorias />

        {/* POR QUÉ ELEGIRNOS */}
        <section className="why-section">
          <div className="deco-bg">VDN</div>
          <div className="why-inner">
            <div className="why-hdr reveal">
              <span className="section-eyebrow">Nuestras Ventajas</span>
              <h2>¿Por qué somos tu mejor opción?</h2>
            </div>
            <div className="why-grid">
              {[
                { icon: "🌍", title: "Importación Directa", desc: "Sin intermediarios. Traemos los productos directo del fabricante para darte el mejor precio." },
                { icon: "✅", title: "100% Originales", desc: "Todos nuestros cosméticos tienen certificado de autenticidad. Cero falsificaciones." },
                { icon: "🚀", title: "Envíos Rápidos", desc: "Despachamos a todo Bolivia de manera rápida, segura y con seguimiento en tiempo real." },
                { icon: "💎", title: "Precios Mayoristas", desc: "Accede a precios especiales por volumen ideal para distribuidoras y revendedoras." },
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

        {/* MARCAS */}
        <div className="brands-strip" id="marcas">
          <p className="brands-strip-label">Marcas que importamos</p>
          <div className="brands-track">
            {[
              "MAC Cosmetics","·","L'Oréal Paris","·","Maybelline","·",
              "NYX Professional","·","Revlon","·","Neutrogena","·",
              "Nivea","·","Essence","·","OPI","·","Rimmel London","·",
              "MAC Cosmetics","·","L'Oréal Paris","·","Maybelline","·",
              "NYX Professional","·","Revlon","·","Neutrogena","·",
              "Nivea","·","Essence","·","OPI","·","Rimmel London","·",
            ].map((b, i) => (
              <span key={i} className="brand-name">{b}</span>
            ))}
          </div>
        </div>

        {/* PRECIOS */}
        <section className="pricing-section" id="comprar">
          <div className="pricing-inner">
            <div className="pricing-hdr reveal">
              <span className="section-eyebrow">Modalidades</span>
              <h2>Compra a tu medida</h2>
            </div>
            <div className="pricing-grid">
              <div className="p-card retail reveal">
                <div className="p-inner">
                  <div className="p-badge">Al Detalle</div>
                  <h3>Minorista</h3>
                  <p className="p-desc">Para quienes buscan productos para uso personal o regalos especiales.</p>
                  <ul className="p-features">
                    {["Sin cantidad mínima","Pago en efectivo o transferencia","Envío a domicilio","Asesoría personalizada gratis","Catálogo completo disponible"].map((f, i) => (
                      <li key={i}><span className="check">✓</span>{f}</li>
                    ))}
                  </ul>
                  <button className="btn-retail">Consultar Precios</button>
                </div>
              </div>
              <div className="p-card wholesale reveal">
                <div className="p-inner">
                  <div className="p-badge"><span className="p-badge-star">★</span> Más Popular</div>
                  <h3>Mayorista</h3>
                  <p className="p-desc">Para distribuidoras, tiendas y emprendedoras que quieren crecer con nosotras.</p>
                  <ul className="p-features">
                    {["Precios especiales por volumen","Descuentos desde 6 unidades","Catálogo exclusivo mayorista","Atención dedicada 24/7","Despachos prioritarios"].map((f, i) => (
                      <li key={i}><span className="check">✓</span>{f}</li>
                    ))}
                  </ul>
                  <button className="btn-wholesale">Quiero ser Distribuidora</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="cta" id="contacto">
          <span className="section-eyebrow" style={{ justifyContent: "center" }}>Contáctanos</span>
          <h2>¿Lista para brillar<br /><span>con VDN?</span></h2>
          <p>Escríbenos ahora y te ayudamos a encontrar los productos perfectos para ti o tu negocio.</p>

          <div className="contact-row">
            {[
              { icon: "📍", type: "Ubicación", val: "La Paz, Bolivia" },
              { icon: "📱", type: "WhatsApp",  val: "+591 XXX XXXX" },
              { icon: "📧", type: "Email",     val: "info@vdncosmetics.com" },
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
            onClick={() => window.open("https://wa.me/591XXXXXXXX?text=Hola VDN Cosmetics! Me interesa conocer sus productos", "_blank")}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribir por WhatsApp
          </button>
        </section>
      </main>
    </>
  );
}