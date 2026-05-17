// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AdminDashboard.jsx — VDN Cosmetics
//  Componente: Panel principal de administración
//  Uso: <AdminDashboard />
//  Ruta: /admin/dashboard
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useNavigate, Link } from "react-router-dom";

const menuItems = [
  {
    label: "Administrar Productos",
    to: "/admin/productos",
    icon: "💄",
    desc: "Agregar, editar y eliminar productos del catálogo",
    gradient: "linear-gradient(145deg, #1a0533 0%, #6b1054 45%, #e8186d 75%, #ff80b5 100%)",
  },
  {
    label: "Administrar Categorías",
    to: "/admin/categorias",
    icon: "🗂️",
    desc: "Organizar y gestionar las categorías de productos",
    gradient: "linear-gradient(145deg, #050b30 0%, #1630a8 50%, #4e78ff 85%, #7aa0ff 100%)",
  },
  {
    label: "Administrar Marcas",
    to: "/admin/marcas",
    icon: "✨",
    desc: "Gestionar las marcas disponibles en la tienda",
    gradient: "linear-gradient(145deg, #0a0820 0%, #3d1060 45%, #e8186d 75%, #ffd166 100%)",
  },
  {
    label: "Información de la Página",
    to: "/admin/configuracion",
    icon: "⚙️",
    desc: "WhatsApp, logo, colores y datos de contacto",
    gradient: "linear-gradient(145deg, #061028 0%, #0b1560 40%, #2547e0 70%, #ff3d8b 100%)",
  },
];

export default function AdminDashboard() {
  const navigate  = useNavigate();

  // Obtener nombre del admin desde localStorage
  const adminNombre = localStorage.getItem("vdn_admin_nombre") || "Administrador";

  const handleLogout = () => {
    localStorage.removeItem("vdn_admin_token");
    localStorage.removeItem("vdn_admin_nombre");
    navigate("/admin/login");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --pink-hot:   #ff3d8b;
          --pink-soft:  #ff80b5;
          --blue-deep:  #0b1560;
          --blue-vivid: #2547e0;
          --blue-sky:   #4e78ff;
          --blue-glow:  #7aa0ff;
          --dark:       #07091f;
        }

        .ad-page {
          min-height: 100vh;
          background: var(--dark);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* ── Fondo ── */
        .ad-bg {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 10% 10%, rgba(11,21,96,0.7) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 80%, rgba(255,61,139,0.15) 0%, transparent 55%),
            #07091f;
          z-index: 0;
          pointer-events: none;
        }
        .ad-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Topbar ── */
        .ad-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid rgba(255,61,139,0.15);
          background: rgba(7,9,31,0.8);
          backdrop-filter: blur(20px);
        }

        .ad-topbar-brand {
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .ad-topbar-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          background: linear-gradient(90deg, var(--blue-glow), var(--pink-soft));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .ad-topbar-brand-sub {
          font-size: 8px;
          letter-spacing: 3.5px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          margin-top: 3px;
        }

        .ad-topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .ad-topbar-admin {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ad-topbar-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--pink-hot), var(--blue-vivid));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        .ad-topbar-name {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        .ad-logout-btn {
          background: rgba(255,61,139,0.08);
          border: 1px solid rgba(255,61,139,0.2);
          color: rgba(255,255,255,0.4);
          padding: 8px 18px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ad-logout-btn:hover {
          background: rgba(255,61,139,0.15);
          border-color: rgba(255,61,139,0.4);
          color: var(--pink-soft);
        }

        /* ── Contenido ── */
        .ad-content {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          padding: 72px 32px 80px;
        }

        /* ── Header ── */
        .ad-header {
          margin-bottom: 64px;
        }
        .ad-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--pink-soft);
          font-weight: 600;
          margin-bottom: 16px;
          opacity: 0.8;
        }
        .ad-eyebrow::before {
          content: '';
          width: 20px; height: 1.5px;
          background: var(--pink-hot);
          flex-shrink: 0;
        }
        .ad-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5vw, 60px);
          font-weight: 700;
          color: white;
          line-height: 1.0;
          margin-bottom: 14px;
        }
        .ad-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--pink-soft), var(--pink-hot), var(--blue-sky));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ad-subtitle {
          font-size: 15px;
          color: rgba(255,255,255,0.3);
          font-weight: 300;
        }

        /* ── Grid de botones ── */
        .ad-grid-menu {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .ad-menu-card {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s, border-color 0.3s;
          text-decoration: none;
          display: block;
        }
        .ad-menu-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(255,61,139,0.3);
          box-shadow: 0 24px 60px rgba(255,61,139,0.15), 0 8px 24px rgba(0,0,0,0.3);
        }

        /* Barra de color top */
        .ad-menu-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, var(--pink-hot), var(--blue-vivid));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
          z-index: 2;
        }
        .ad-menu-card:hover::before { transform: scaleX(1); }

        .ad-card-bg {
          position: absolute;
          inset: 0;
          transition: transform 0.5s ease;
        }
        .ad-menu-card:hover .ad-card-bg { transform: scale(1.06); }

        .ad-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
        }

        .ad-card-body {
          position: relative;
          z-index: 2;
          padding: 36px 32px;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .ad-card-icon {
          font-size: 38px;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 12px rgba(255,61,139,0.4));
          display: block;
        }
        .ad-card-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          line-height: 1.1;
        }
        .ad-card-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-weight: 300;
          line-height: 1.5;
        }

        .ad-card-arrow {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          transition: background 0.3s, color 0.3s, transform 0.3s;
          z-index: 2;
        }
        .ad-menu-card:hover .ad-card-arrow {
          background: rgba(255,61,139,0.2);
          border-color: rgba(255,61,139,0.4);
          color: var(--pink-soft);
          transform: translate(2px,-2px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .ad-topbar { padding: 16px 20px; }
          .ad-topbar-name { display: none; }
          .ad-content { padding: 48px 20px 60px; }
          .ad-grid-menu { grid-template-columns: 1fr; }
          .ad-card-body { min-height: 160px; padding: 28px 24px; }
        }
      `}</style>

      <div className="ad-page">
        <div className="ad-bg" />
        <div className="ad-grid" />

        {/* ── Topbar ── */}
        <div className="ad-topbar">
          <Link to="/" className="ad-topbar-brand">
            <div className="ad-topbar-brand-name">VDN Cosmetics</div>
            <div className="ad-topbar-brand-sub">Panel de administración</div>
          </Link>

          <div className="ad-topbar-right">
            <div className="ad-topbar-admin">
              <div className="ad-topbar-avatar">
                {adminNombre.charAt(0).toUpperCase()}
              </div>
              <span className="ad-topbar-name">{adminNombre}</span>
            </div>
            <button className="ad-logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="ad-content">
          <div className="ad-header">
            <div className="ad-eyebrow">Dashboard</div>
            <h1 className="ad-title">
              Bienvenido, <em>{adminNombre}</em>
            </h1>
            <p className="ad-subtitle">
              ¿Qué deseas administrar hoy?
            </p>
          </div>

          {/* ── Grid de acciones ── */}
          <div className="ad-grid-menu">
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} className="ad-menu-card">
                <div
                  className="ad-card-bg"
                  style={{ background: item.gradient }}
                />
                <div className="ad-card-overlay" />
                <div className="ad-card-arrow">→</div>
                <div className="ad-card-body">
                  <span className="ad-card-icon">{item.icon}</span>
                  <div className="ad-card-label">{item.label}</div>
                  <div className="ad-card-desc">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}