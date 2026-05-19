import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/acercade.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useTiendaConfig } from "../config/TiendaConfigContext.jsx";
import { BASE_URL, API_URL } from "../config/api";

function ACercaDe() {

  const { config } = useTiendaConfig();
  useEffect(() => {
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
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="hero-grid-lines"></div>
        <div className="page-hero-blob phb1"></div>
        <div className="page-hero-blob phb2"></div>
        <div className="page-hero-content">
          <div className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            Sobre Nosotros
          </div>
          <h1>
            ¿Quiénes
            <br />
            <em>somos?</em>
          </h1>
          <div className="page-hero-line"></div>
        </div>
      </section>

      <section
        id="nosotros"
        style={{
          background: "var(--off-white)",
          padding: 0,
        }}
      >
        <div className="quienes">
          <div className="quienes-left reveal">
            <span className="section-eyebrow">Nuestra Historia</span>
            <h2>
              Belleza sin
              <br />
              fronteras, <em>para Bolivia</em>
            </h2>
            <div className="quienes-stat-row">
              <div className="q-stat">
                <div className="n">4</div>
                <div className="l">Productos</div>
              </div>
              <div className="q-stat-divider"></div>
              <div className="q-stat">
                <div className="n">5+</div>
                <div className="l">Marcas</div>
              </div>
              <div className="q-stat-divider"></div>
              <div className="q-stat">
                <div className="n">★★★★★</div>
                <div className="l">Reputación</div>
              </div>
            </div>
          </div>

          <div className="quienes-right reveal">
            <p>
              {config?.meta_descripcion}
            </p>

            <p>
              Trabajamos con una amplia variedad de productos que van desde
              maquillaje diario hasta líneas profesionales, asegurando siempre
              autenticidad, buenos precios y una experiencia de compra confiable
              tanto para clientes individuales como para negocios.
            </p>

            <p>
              Nos apasiona la belleza y el bienestar, por eso buscamos brindar
              no solo productos, sino también asesoría y acompañamiento para que
              cada persona encuentre lo que mejor se adapta a su estilo y
              necesidades.
            </p>
            <div className="quienes-highlight">
              <p>
                "Somos el puente entre las tendencias internacionales de belleza
                y el mercado boliviano."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Con quiénes trabajamos */}
      <section className="conquienes">
        <div className="conquienes-bg-deco">VDN</div>
        <div className="conquienes-header reveal">
          <span
            className="section-eyebrow"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Nuestro Alcance
          </span>
          <h2>
            ¿Con quiénes
            <br />
            <span>trabajamos?</span>
          </h2>
          <p>Estas son los principales clientes con las que colaboramos.</p>
        </div>

        <div className="partner-cards">
          <div className="partner-card reveal">
            <div className="pc-img">
              <img
                src="https://trabajito.com.bo/uploads/0046/46017/2024/07/09/whatsapp-image-2024-07-09-at-92811-am1.jpeg"
                alt="nubalogo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="pc-body">
              <h3>Nuba Cosmeticos</h3>
              <p>
                Empresa con presencia en todo el país y una amplia gama de
                productos de alta calidad.
              </p>
            </div>
          </div>

          <div className="partner-card reveal">
            <div className="pc-img">
              <div className="pc-gradient pg2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Hipermaxi_logo.png"
                  alt="hipermaxiLogo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="pc-body">
              <h3>Hipermaxi</h3>
              <p>
                Red de supermercados con presencia en todo el país y una amplia
                gama de productos de alta calidad.
              </p>
            </div>
          </div>

          <div className="partner-card reveal">
            <div className="pc-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTend2lDj6MJcI_1nxFwGGKJ2o3i3NITNhRiA&s"
                alt="andysLogo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="pc-body">
              <h3>Andy's</h3>
              <p>Cadena de tiendas relevante alrededor de Peru y Bolivia.</p>
            </div>
          </div>

          <div className="partner-card reveal">
            <div className="pc-img">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5ca2a37c4d546e096b81722a/1686118284085-VDOJYEVAKEJ604J18OH2/YAO.jpg?format=1500w"
                alt="yaoCosmetics"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="pc-body">
              <h3>Yao Yao</h3>
              <p>Linea de cosméticos de alta calidad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section">
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
                <p className="p-desc">
                  Para quienes buscan productos para uso personal o regalos
                  especiales.
                </p>
                <ul className="p-features">
                  <li>
                    <span className="check">✓</span> Sin cantidad mínima
                  </li>
                  <li>
                    <span className="check">✓</span> Pago en efectivo o
                    transferencia
                  </li>
                  <li>
                    <span className="check">✓</span> Envío a domicilio
                  </li>
                  <li>
                    <span className="check">✓</span> Asesoría personalizada
                    gratis
                  </li>
                  <li>
                    <span className="check">✓</span> Catálogo completo
                    disponible
                  </li>
                </ul>
                <button
                  className="btn-retail"
                  onClick={() =>
                    document
                      .getElementById("contacto")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Consultar Precios
                </button>
              </div>
            </div>

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
                  <li>
                    <span className="check">✓</span> Precios especiales por
                    volumen
                  </li>
                  <li>
                    <span className="check">✓</span> Descuentos desde 6 unidades
                  </li>
                  <li>
                    <span className="check">✓</span> Catálogo exclusivo
                    mayorista
                  </li>
                  <li>
                    <span className="check">✓</span> Atención dedicada 24/7
                  </li>
                  <li>
                    <span className="check">✓</span> Despachos prioritarios
                  </li>
                </ul>
                <button
                  className="btn-wholesale"
                  onClick={() =>
                    document
                      .getElementById("contacto")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Quiero ser Distribuidora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact-section" id="contacto">
        <div className="contact-inner">
          <div className="contact-hdr reveal">
            <span className="section-eyebrow">Estamos aquí</span>
            <h2>
              ¿Cómo <em>contactarnos?</em>
            </h2>
          </div>

          <div className="contact-body">
            {/* Botones sociales */}
            <div className="social-buttons reveal">
              <a
                href={`https://wa.me/${config?.numero_whatsapp?.replace(/\D/g, "")}`+`?text=${encodeURIComponent(config?.mensaje_whatsapp_plantilla || "")}`}
                target="_blank"
                rel="noreferrer"
                className="social-btn sb-wa"
              >
                <div className="sb-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.772.463 3.438 1.276 4.882L2 22l5.273-1.245A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 0 1-4.043-1.099l-.289-.171-3.129.739.836-3.051-.188-.314A7.948 7.948 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.146-5.854c-.227-.113-1.342-.662-1.55-.736-.207-.076-.358-.113-.51.113-.151.227-.586.736-.718.887-.132.151-.264.17-.49.057-.227-.113-.957-.353-1.823-1.126-.674-.602-1.13-1.345-1.263-1.572-.132-.226-.014-.348.1-.461.102-.101.227-.264.34-.396.113-.132.151-.226.227-.377.075-.151.038-.283-.019-.396-.057-.113-.509-1.227-.698-1.68-.184-.441-.37-.381-.509-.388l-.434-.008c-.151 0-.396.057-.604.283-.207.227-.793.774-.793 1.887s.812 2.188.925 2.339c.113.151 1.595 2.436 3.867 3.417.54.233.961.372 1.289.476.541.172 1.033.148 1.422.09.434-.065 1.342-.548 1.531-1.076.189-.529.189-.982.132-1.076-.056-.094-.207-.151-.434-.264z" />
                  </svg>
                </div>
                <div className="sb-label">
                  <div className="sb-label-text">WhatsApp</div>
                  <div className="sb-label-sub">Respuesta inmediata</div>
                </div>
                <span className="sb-arrow">→</span>
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="social-btn sb-ig"
              >
                <div className="sb-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div className="sb-label">
                  <div className="sb-label-text">Instagram</div>
                  <div className="sb-label-sub">@vdncosmetics</div>
                </div>
                <span className="sb-arrow">→</span>
              </a>

              <a
                href="https://www.tiktok.com/@vdncosmetics?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noreferrer"
                className="social-btn sb-tt"
              >
                <div className="sb-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.83 1.56V6.79a4.85 4.85 0 01-1.06-.1z" />
                  </svg>
                </div>
                <div className="sb-label">
                  <div className="sb-label-text">TikTok</div>
                  <div className="sb-label-sub">@vdncosmetics</div>
                </div>
                <span className="sb-arrow">→</span>
              </a>

              <a
                href="https://www.facebook.com/share/1Dife4eLhK/"
                target="_blank"
                rel="noreferrer"
                className="social-btn sb-fb"
              >
                <div className="sb-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="sb-label">
                  <div className="sb-label-text">Facebook</div>
                  <div className="sb-label-sub">VDN Cosmetics Bolivia</div>
                </div>
                <span className="sb-arrow">→</span>
              </a>
            </div>

            {/* Info panel */}
            <div className="contact-info-panel reveal">
              <div className="contact-info-title">Información de contacto</div>
              <div className="cinfo-row">
                <div className="cinfo-icon">📍</div>
                <div className="cinfo-text">
                  <div className="cinfo-label">Ubicación</div>
                  <div className="cinfo-val">
                    La Paz, Bolivia
                    <br />
                    Oficina ciudad de El Alto
                    <br />
                    Zona Villa Dolores, Calle 6<br />
                    Edif. Wara, Piso 2
                  </div>
                </div>
              </div>
              <div className="cinfo-row">
                <div className="cinfo-icon">📱</div>
                <div className="cinfo-text">
                  <div className="cinfo-label">Teléfono / WhatsApp</div>
                  <div className="cinfo-val">{config?.numero_whatsapp}</div>
                </div>
              </div>
              <div className="cinfo-row">
                <div className="cinfo-icon">📧</div>
                <div className="cinfo-text">
                  <div className="cinfo-label">Correo electrónico</div>
                  <div className="cinfo-val">importadora@vndcosmetics.com</div>
                </div>
              </div>
              <div className="cinfo-row">
                <div className="cinfo-icon">🕐</div>
                <div className="cinfo-text">
                  <div className="cinfo-label">Horario de atención</div>
                  <div className="cinfo-val">
                    Lun – Vie: 8:00 – 12:30 y 14:00 – 18:00
                    <br />
                    Sábado: 8:00 – 12:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UBICACIÓN EN MAPA */}
      <section style={{ background: "#f9f0f5", padding: "60px 24px 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div className="contact-hdr reveal" style={{ marginBottom: 32 }}>
            <span className="section-eyebrow">Dónde encontrarnos</span>
            <h2>
              Nuestra <em>ubicación</em>
            </h2>
          </div>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <iframe
              title="VDN Cosmetics La Paz Bolivia"
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d269.27782149332154!2d-68.1594867!3d-16.5108654!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTbCsDMwJzM5LjMiUyA2OMKwMDknMzMuOSJX!5e1!3m2!1ses-419!2sbo!4v1779069386330!5m2!1ses-419!2sbo"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* BARRA DE REDES SOCIALES */}
      <section style={{ background: "#f9f0f5", padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#b07ab0",
              marginBottom: 24,
              fontWeight: 600,
            }}
          >
            Síguenos en redes
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.facebook.com/share/1Dife4eLhK/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#1877f2",
                color: "white",
                padding: "12px 22px",
                borderRadius: 50,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 14px rgba(24,119,242,0.35)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <a
              href={`https://wa.me/${config?.numero_whatsapp?.replace(/\D/g, "")}?text=${encodeURIComponent(config?.mensaje_whatsapp_plantilla || "")}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#25d366",
                color: "white",
                padding: "12px 22px",
                borderRadius: 50,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.tiktok.com/@vdncosmetics?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#010101",
                color: "white",
                padding: "12px 22px",
                borderRadius: 50,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.83 1.56V6.79a4.85 4.85 0 01-1.06-.1z" />
              </svg>
              TikTok
            </a>
            <a
              href="mailto:importadora@vndcosmetics.com"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#ea4335",
                color: "white",
                padding: "12px 22px",
                borderRadius: 50,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 4px 14px rgba(234,67,53,0.35)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Correo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ACercaDe;