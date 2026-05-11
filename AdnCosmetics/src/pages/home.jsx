// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Home.jsx — VDN Cosmetics
//  Componente: Página principal
//  Uso: <Home />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef } from "react";
import "../styles/Home.css";

export default function Home() {
  

  useEffect(() => {
    

    // ── Hover en elementos interactivos ──
    const interactives = document.querySelectorAll(
      "button, a, .bento-card, .c-card, .why-card"
    );
    const onEnter = () => { cur.style.background = "#2547e0"; };
    const onLeave = () => { cur.style.background = "var(--pink-hot)"; };
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // ── Scroll reveal ──
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 70);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="hero-grid"></div>

        {/* Orbit ring */}
        <div className="orbit-ring">
          <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="260" cy="260" r="250" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="8 16" />
            <circle cx="260" cy="260" r="180" stroke="rgba(255,61,139,0.15)" strokeWidth="1" />
            <circle cx="260" cy="10"  r="6" fill="#ff3d8b" />
            <circle cx="510" cy="260" r="4" fill="#4e78ff" />
            <circle cx="260" cy="510" r="5" fill="rgba(255,128,181,0.6)" />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="520" y2="520">
                <stop offset="0%"   stopColor="rgba(255,61,139,0.4)" />
                <stop offset="50%"  stopColor="rgba(37,71,224,0.4)" />
                <stop offset="100%" stopColor="rgba(255,61,139,0.4)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-tag">
            <div className="hero-tag-dot"></div>
            <span>Importadora de Cosméticos · Bolivia</span>
          </div>

          <h1>
            Tu belleza,<br />
            <span className="line2">sin fronteras</span>
          </h1>

          <p className="hero-desc">
            Importamos y exportamos cosméticos premium de las mejores marcas del
            mundo. Venta al por mayor y menor. Atención personalizada para
            distribuidoras y clientes finales.
          </p>

          <div className="hero-actions">
            <button className="btn-glow" onClick={() => scrollTo("productos")}>
              Ver Catálogo
            </button>
            <button className="btn-outline-hero" onClick={() => scrollTo("comprar")}>
              Precios Mayorista
            </button>
          </div>
        </div>

        {/* Floating pills */}
        <div className="hero-pills">
          <div className="hero-pill">
            <span className="hero-pill-icon">💄</span>
            <div className="hero-pill-text"><strong>500+</strong> Productos</div>
          </div>
          <div className="hero-pill">
            <span className="hero-pill-icon">🌍</span>
            <div className="hero-pill-text"><strong>Importación</strong> Directa</div>
          </div>
          <div className="hero-pill">
            <span className="hero-pill-icon">🚚</span>
            <div className="hero-pill-text"><strong>Envíos</strong> a Bolivia</div>
          </div>
        </div>

        <div className="scroll-line">Descubrir</div>
      </section>

      {/* ══════════════════════════════════════
          STRIP
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
          ].map((item, i) => (
            <span key={i} className="strip-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--off-white)", padding: 0 }} id="nosotros">
        <div className="about">
          {/* Izquierda — imagen decorativa */}
          <div className="about-left reveal">
            <div className="deco-letter">V</div>
            <div className="img-stack">
              <div className="img-main">
                <div className="img-main-inner">
                  <span className="img-main-icon">💄</span>
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

          {/* Derecha — texto */}
          <div className="about-right reveal">
            <span className="section-eyebrow">Quiénes Somos</span>
            <h2>Belleza de clase mundial<br />al alcance de <em>Bolivia</em></h2>
            <p>
              VDN Cosmetics es una importadora y exportadora especializada en
              cosméticos de alta calidad. Llevamos años trayendo las mejores
              marcas del mundo directamente a tus manos, con precios justos y
              productos 100% garantizados.
            </p>
            <p>
              Somos el puente entre las tendencias internacionales de belleza y el
              mercado boliviano, ofreciendo una experiencia de compra confiable,
              moderna y cercana.
            </p>

            <div className="divider"></div>

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
          CATEGORÍAS
      ══════════════════════════════════════ */}
      <section className="cats-section" id="productos">
        <div className="cats-header reveal">
          <span className="section-eyebrow" style={{ WebkitTextFillColor: "transparent" }}>
            Nuestro Catálogo
          </span>
          <h2>Todo lo que tu <span>piel merece</span></h2>
          <p>Líneas completas de belleza, importadas con cuidado para ti</p>
        </div>

        <div className="bento">
          <div className="bento-card reveal">
            <div className="bc-bg"><div className="bc-gradient g1"></div></div>
            <div className="bc-overlay"></div>
            <span className="bc-tag">Bestseller</span>
            <div className="bc-info">
              <span className="bc-emoji">💄</span>
              <h3>Maquillaje</h3>
              <p>Bases, labiales, sombras, correctores y más</p>
            </div>
          </div>
          <div className="bento-card reveal">
            <div className="bc-bg"><div className="bc-gradient g2"></div></div>
            <div className="bc-overlay"></div>
            <span className="bc-tag blue">Premium</span>
            <div className="bc-info">
              <span className="bc-emoji">🧴</span>
              <h3>Skincare</h3>
              <p>Hidratantes, serums y tratamientos</p>
            </div>
          </div>
          <div className="bento-card reveal">
            <div className="bc-bg"><div className="bc-gradient g3"></div></div>
            <div className="bc-overlay"></div>
            <div className="bc-info">
              <span className="bc-emoji">🌸</span>
              <h3>Perfumes</h3>
              <p>Fragancias exclusivas</p>
            </div>
          </div>
          <div className="bento-card reveal">
            <div className="bc-bg"><div className="bc-gradient g4"></div></div>
            <div className="bc-overlay"></div>
            <div className="bc-info">
              <span className="bc-emoji">💅</span>
              <h3>Nail Art</h3>
              <p>Esmaltes, geles y accesorios</p>
            </div>
          </div>
          <div className="bento-card reveal">
            <div className="bc-bg"><div className="bc-gradient g5"></div></div>
            <div className="bc-overlay"></div>
            <div className="bc-info">
              <span className="bc-emoji">💇</span>
              <h3>Cuidado Capilar</h3>
              <p>Shampoos, mascarillas y aceites</p>
            </div>
          </div>
          <div className="bento-card reveal">
            <div className="bc-bg"><div className="bc-gradient g6"></div></div>
            <div className="bc-overlay"></div>
            <div className="bc-info">
              <span className="bc-emoji">✨</span>
              <h3>Accesorios</h3>
              <p>Pinceles, esponjas, herramientas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY
      ══════════════════════════════════════ */}
      <section className="why-section">
        <div className="deco-bg">VDN</div>
        <div className="why-inner">
          <div className="why-hdr reveal">
            <span className="section-eyebrow">Nuestras Ventajas</span>
            <h2>¿Por qué somos tu mejor opción?</h2>
          </div>
          <div className="why-grid">
            <div className="why-card reveal">
              <div className="why-icon-wrap">🌍</div>
              <h3>Importación Directa</h3>
              <p>Sin intermediarios. Traemos los productos directo del fabricante para darte el mejor precio.</p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon-wrap">✅</div>
              <h3>100% Originales</h3>
              <p>Todos nuestros cosméticos tienen certificado de autenticidad. Cero falsificaciones.</p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon-wrap">🚀</div>
              <h3>Envíos Rápidos</h3>
              <p>Despachamos a todo Bolivia de manera rápida, segura y con seguimiento en tiempo real.</p>
            </div>
            <div className="why-card reveal">
              <div className="why-icon-wrap">💎</div>
              <h3>Precios Mayoristas</h3>
              <p>Accede a precios especiales por volumen ideal para distribuidoras y revendedoras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRANDS
      ══════════════════════════════════════ */}
      <div className="brands-strip" id="marcas">
        <p className="brands-strip-label">Marcas que importamos</p>
        <div className="brands-track">
          {[
            "MAC Cosmetics", "·", "L'Oréal Paris", "·", "Maybelline", "·",
            "NYX Professional", "·", "Revlon", "·", "Neutrogena", "·",
            "Nivea", "·", "Essence", "·", "OPI", "·", "Rimmel London", "·",
            "MAC Cosmetics", "·", "L'Oréal Paris", "·", "Maybelline", "·",
            "NYX Professional", "·", "Revlon", "·", "Neutrogena", "·",
            "Nivea", "·", "Essence", "·", "OPI", "·", "Rimmel London", "·",
          ].map((brand, i) => (
            <span key={i} className="brand-name">{brand}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRICING
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
                  Para quienes buscan productos para uso personal o regalos especiales.
                </p>
                <ul className="p-features">
                  <li><span className="check">✓</span> Sin cantidad mínima</li>
                  <li><span className="check">✓</span> Pago en efectivo o transferencia</li>
                  <li><span className="check">✓</span> Envío a domicilio</li>
                  <li><span className="check">✓</span> Asesoría personalizada gratis</li>
                  <li><span className="check">✓</span> Catálogo completo disponible</li>
                </ul>
                <button className="btn-retail" onClick={() => scrollTo("contacto")}>
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
                  Para distribuidoras, tiendas y emprendedoras que quieren crecer con nosotras.
                </p>
                <ul className="p-features">
                  <li><span className="check">✓</span> Precios especiales por volumen</li>
                  <li><span className="check">✓</span> Descuentos desde 6 unidades</li>
                  <li><span className="check">✓</span> Catálogo exclusivo mayorista</li>
                  <li><span className="check">✓</span> Atención dedicada 24/7</li>
                  <li><span className="check">✓</span> Despachos prioritarios</li>
                </ul>
                <button className="btn-wholesale" onClick={() => scrollTo("contacto")}>
                  Quiero ser Distribuidora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA / CONTACTO
      ══════════════════════════════════════ */}
      <section className="cta" id="contacto">
        <span className="section-eyebrow" style={{ justifyContent: "center" }}>
          Contáctanos
        </span>
        <h2>¿Lista para brillar<br /><span>con VDN?</span></h2>
        <p>
          Escríbenos ahora y te ayudamos a encontrar los productos perfectos para
          ti o tu negocio.
        </p>

        <div className="contact-row">
          <div className="c-card">
            <div className="c-icon">📍</div>
            <div className="c-text">
              <div className="type">Ubicación</div>
              <div className="val">La Paz, Bolivia</div>
            </div>
          </div>
          <div className="c-card">
            <div className="c-icon">📱</div>
            <div className="c-text">
              <div className="type">WhatsApp</div>
              <div className="val">+591 XXX XXXX</div>
            </div>
          </div>
          <div className="c-card">
            <div className="c-icon">📧</div>
            <div className="c-text">
              <div className="type">Email</div>
              <div className="val">info@vdncosmetics.com</div>
            </div>
          </div>
        </div>

        <button
          className="wa-btn"
          onClick={() =>
            window.open(
              "https://wa.me/591XXXXXXXX?text=Hola VDN Cosmetics! Me interesa conocer sus productos y precios 💄",
              "_blank"
            )
          }
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escribir por WhatsApp
        </button>
      </section>
    </>
  );
}