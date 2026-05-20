// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Navbar.jsx — VDN Cosmetics
//  Componente: Barra de navegación superior
//  Uso: <Navbar />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTiendaConfig } from "../config/TiendaConfigContext.jsx";
import { API_URL, BASE_URL } from "../config/api";

const navLinks = [
  { label: "Inicio", to: "/", section: null },
  { label: "Categorías", to: "/categorias", section: null },
  { label: "Productos", to: "/productos", section: null },
  { label: "Marcas", to: "/marcas", section: null },
  { label: "Acerca de Nosotros", to: "/sobre-nosotros", section: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const { config } = useTiendaConfig();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Si la URL cambió y tiene hash, hace scroll a la sección
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [location]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);

    // Si tiene sección y ya estamos en el index, scroll directo
    if (link.section && location.pathname === "/") {
      const el = document.getElementById(link.section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navega a la ruta (con o sin hash)
      navigate(link.to);
    }
  };

  const handleCotizar = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("contacto");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#contacto");
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root {
  --pink-hot:   #ff3d8b;
  --pink-soft:  #ff80b5;
  --blue-vivid: #2547e0;
  --blue-sky:   #4e78ff;
  --dark:       #07091f;
}

.vdn-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  z-index: 1000;
  padding: 18px 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,61,139,0.2);
  transition: background 0.4s ease;
  font-family: 'DM Sans', sans-serif;
  box-sizing: border-box;
}

.vdn-nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  text-decoration: none;
}

.vdn-nav-brand-logo {
  height: 80px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(255,61,139,0.35));
  transition: filter 0.3s, transform 0.3s;
}
.vdn-nav-brand-logo:hover {
  filter: drop-shadow(0 0 16px rgba(255,61,139,0.6));
  transform: scale(1.04);
}

.vdn-nav-menu {
  display: flex;
  gap: 36px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.vdn-nav-menu a {
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;
  cursor: pointer;
}
.vdn-nav-menu a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(to right, var(--pink-hot), var(--blue-sky));
  transition: width 0.4s;
}
.vdn-nav-menu a:hover { color: white; }
.vdn-nav-menu a:hover::after { width: 100%; }
.vdn-nav-menu a.active { color: white; }
.vdn-nav-menu a.active::after { width: 100%; }

.vdn-nav-pill {
  background: linear-gradient(135deg, var(--pink-hot), var(--blue-vivid));
  color: white;
  border: none;
  padding: 11px 28px;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 20px rgba(255,61,139,0.4);
  white-space: nowrap;
  text-decoration: none;
  display: inline-block;
}
.vdn-nav-pill:hover {
  box-shadow: 0 0 40px rgba(255,61,139,0.7);
  transform: translateY(-2px);
}

.vdn-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.vdn-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--pink-soft);
  border-radius: 2px;
  transition: all 0.3s;
}

.vdn-mobile-menu {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 112px;
  background: rgba(7,9,31,0.98);
  border-bottom: 1px solid rgba(255,61,139,0.2);
  padding: 24px 32px;
  flex-direction: column;
  gap: 20px;
  z-index: 999;
  box-sizing: border-box;
  max-width: 100vw;
  overflow: hidden;
}
.vdn-mobile-menu.open { display: flex; }
.vdn-mobile-menu a {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: color 0.3s;
}
.vdn-mobile-menu a:hover { color: var(--pink-soft); }

@media (max-width: 900px) {
  .vdn-nav { padding: 16px 24px; }
  .vdn-nav-menu { display: none; }
  .vdn-nav-pill { display: none; }
  .vdn-hamburger { display: flex; }
  .vdn-nav-brand-logo { height: 56px; }
  .vdn-mobile-menu { top: 88px; }
}
      `}</style>

      <nav className="vdn-nav">
        {/* Logo — siempre va al inicio */}
        <Link to="/" className="vdn-nav-brand">
          <img
            src={BASE_URL + config?.logo_url}
            alt="VDN Cosmetics Import & Export"
            className="vdn-nav-brand-logo"
          />
        </Link>

        {/* Links desktop */}
        <ul className="vdn-nav-menu">
          {navLinks.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className={location.pathname === link.to ? "active" : ""}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón WhatsApp */}
        <a
          className="vdn-nav-pill"
          href={`https://wa.me/${config?.numero_whatsapp?.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp →
        </a>

        <button
          className="vdn-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span
            style={
              menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}
            }
          />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span
            style={
              menuOpen
                ? { transform: "rotate(-45deg) translate(5px,-5px)" }
                : {}
            }
          />
        </button>
      </nav>

      <div className={`vdn-mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.to}
            href={link.to}
            onClick={(e) => handleNavClick(e, link)}
          >
            {link.label}
          </a>
        ))}

        {/* Botón WhatsApp Mobile */}
        <a
          className="vdn-nav-pill"
          style={{ alignSelf: "flex-start", marginTop: 8 }}
          href={`https://wa.me/${config?.numero_whatsapp?.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp →
        </a>
      </div>
    </>
  );
}