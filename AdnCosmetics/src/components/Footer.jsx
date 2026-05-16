// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Footer.jsx — VDN Cosmetics
//  Componente: Barra inferior / pie de página
//  Uso: <Footer />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { Link, useNavigate, useLocation } from "react-router-dom";

const footerLinks = [
  { label: "Inicio",             to: "/",               section: null },
  { label: "Categorías",         to: "/#productos",     section: "productos" },
  { label: "Marcas",             to: "/#marcas",        section: "marcas" },
  { label: "Acerca de Nosotros", to: "/sobre-nosotros", section: null },
  { label: "Contacto",           to: "/#contacto",      section: "contacto" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const year = new Date().getFullYear();

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.section && location.pathname === "/") {
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link.to);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --pink-hot:   #ff3d8b;
          --pink-soft:  #ff80b5;
          --blue-glow:  #7aa0ff;
          --dark:       #07091f;
        }

        .vdn-footer {
          background: #030712;
          padding: 48px 56px;
          border-top: 1px solid rgba(255,61,139,0.18);
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }

        .vdn-footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 40px;
        }

        .vdn-footer-brand-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700;
          color: var(--pink-soft);
          letter-spacing: 1px; line-height: 1;
        }
        .vdn-footer-brand-text span { color: var(--blue-glow); }
        .vdn-footer-brand-sub {
          font-size: 9px; letter-spacing: 4px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase; margin-top: 6px; display: block;
        }
        .vdn-footer-brand-desc {
          font-size: 13px; color: rgba(255,255,255,0.3);
          margin-top: 14px; max-width: 240px; line-height: 1.6;
        }

        .vdn-footer-links-title {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.2); margin-bottom: 16px; font-weight: 600;
        }
        .vdn-footer-links {
          display: flex; flex-direction: column; gap: 10px;
          list-style: none; padding: 0; margin: 0;
        }
        .vdn-footer-links a {
          color: rgba(255,255,255,0.35); text-decoration: none;
          font-size: 13px; letter-spacing: 1px;
          transition: color 0.3s; cursor: pointer;
        }
        .vdn-footer-links a:hover { color: var(--pink-soft); }

        .vdn-footer-contact-title {
          font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
          color: rgba(255,255,255,0.2); margin-bottom: 16px; font-weight: 600;
        }
        .vdn-footer-contact-item {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
        }
        .vdn-footer-contact-item .icon { font-size: 14px; }
        .vdn-footer-contact-item span { font-size: 13px; color: rgba(255,255,255,0.35); }

        .vdn-footer-divider {
          width: 100%; height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255,61,139,0.3),
            rgba(78,120,255,0.3),
            transparent
          );
          margin-bottom: 28px;
        }

        .vdn-footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .vdn-footer-copy { font-size: 12px; color: rgba(255,255,255,0.18); }

        .vdn-footer-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,61,139,0.08);
          border: 1px solid rgba(255,61,139,0.2);
          padding: 6px 16px; border-radius: 100px;
          font-size: 11px; color: rgba(255,255,255,0.3); letter-spacing: 1px;
        }
        .vdn-footer-badge::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: var(--pink-hot); box-shadow: 0 0 6px var(--pink-hot);
        }

        /* ── Link discreto de acceso admin ── */
        .vdn-footer-admin-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(255,255,255,0.15);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }
        .vdn-footer-admin-link:hover {
          color: rgba(255,255,255,0.4);
        }
        .vdn-footer-admin-link .admin-icon {
          font-size: 11px;
        }

        @media (max-width: 768px) {
          .vdn-footer { padding: 40px 24px; }
          .vdn-footer-top { flex-direction: column; gap: 32px; }
          .vdn-footer-bottom { flex-direction: column; text-align: center; align-items: center; }
        }
      `}</style>

      <footer className="vdn-footer">
        <div className="vdn-footer-top">
          {/* Columna 1: Marca */}
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="vdn-footer-brand-text">
                <span>VDN</span> Cosmetics
              </div>
            </Link>
            <div className="vdn-footer-brand-sub">Import &amp; Export</div>
            <p className="vdn-footer-brand-desc">
              Importadora de cosméticos premium. Productos 100% originales para
              mayor y menor en Bolivia.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <div className="vdn-footer-links-title">Navegación</div>
            <ul className="vdn-footer-links">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <a href={link.to} onClick={(e) => handleLinkClick(e, link)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <div className="vdn-footer-contact-title">Contacto</div>
            <div className="vdn-footer-contact-item">
              <span className="icon">📍</span>
              <span>La Paz, Bolivia</span>
            </div>
            <div className="vdn-footer-contact-item">
              <span className="icon">📱</span>
              <span>+591 XXX XXXX</span>
            </div>
            <div className="vdn-footer-contact-item">
              <span className="icon">📧</span>
              <span>info@vdncosmetics.com</span>
            </div>
          </div>
        </div>

        <div className="vdn-footer-divider" />

        <div className="vdn-footer-bottom">
          <p className="vdn-footer-copy">
            © {year} VDN Cosmetics Import &amp; Export · La Paz, Bolivia
          </p>

          <div className="vdn-footer-badge">Productos 100% Originales</div>

          {/* Acceso admin — discreto, solo para quien lo busca */}
          <Link to="/admin/login" className="vdn-footer-admin-link">
            <span className="admin-icon">🔒</span>
            ¿Eres administrador? Inicia sesión aquí
          </Link>
        </div>
      </footer>
    </>
  );
}