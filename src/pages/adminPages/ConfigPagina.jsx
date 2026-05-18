// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ConfigPagina.jsx — VDN Cosmetics
//  Componente: Configuración de la página
//  Uso: <ConfigPagina />
//  Ruta: /admin/configuracion
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Editar carrusel de la página de inicio",
    to: "/admin/configuracion/carrusel",
    icon: "🖼️",
    desc: "Gestiona las imágenes y textos del carrusel principal",
    gradient: "linear-gradient(145deg, #050b30 0%, #1630a8 50%, #4e78ff 85%, #7aa0ff 100%)",
  },
  {
    label: "Editar información de la página",
    to: "/admin/configuracion/editar-info",
    icon: "⚙️",
    desc: "WhatsApp, nombre de la tienda, logo, colores y contacto",
    gradient: "linear-gradient(145deg, #1a0533 0%, #6b1054 45%, #e8186d 75%, #ff80b5 100%)",
  },
];

export default function ConfigPagina() {
  const navigate = useNavigate();
  const adminNombre = localStorage.getItem("vdn_admin_nombre") || "Administrador";

  const handleLogout = () => {
    localStorage.removeItem("vdn_admin_token");
    localStorage.removeItem("vdn_admin_nombre");
    navigate("/admin/login");
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/update_configuracion.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          numero_whatsapp,
          mensaje_whatsapp_plantilla,
          logo_url,
          color_primario,
          meta_descripcion
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Configuración actualizada");
    } catch (err) {
      alert(err.message || "Error al actualizar");
    }
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

        .cp-page {
          min-height: 100vh;
          background: var(--dark);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .cp-bg {
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 10% 10%, rgba(11,21,96,0.7) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 80%, rgba(255,61,139,0.15) 0%, transparent 55%),
            #07091f;
          z-index: 0; pointer-events: none;
        }
        .cp-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none; z-index: 0;
        }

        /* ── Topbar ── */
        .cp-topbar {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid rgba(255,61,139,0.15);
          background: rgba(7,9,31,0.8);
          backdrop-filter: blur(20px);
        }
        .cp-topbar-brand { display: flex; flex-direction: column; text-decoration: none; }
        .cp-topbar-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          background: linear-gradient(90deg, var(--blue-glow), var(--pink-soft));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .cp-topbar-brand-sub {
          font-size: 8px; letter-spacing: 3.5px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase; margin-top: 3px;
        }
        .cp-topbar-right { display: flex; align-items: center; gap: 20px; }
        .cp-topbar-admin { display: flex; align-items: center; gap: 10px; }
        .cp-topbar-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--pink-hot), var(--blue-vivid));
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; font-weight: 700; color: white; flex-shrink: 0;
        }
        .cp-topbar-name { font-size: 13px; color: rgba(255,255,255,0.6); font-weight: 500; }
        .cp-logout-btn {
          background: rgba(255,61,139,0.08);
          border: 1px solid rgba(255,61,139,0.2);
          color: rgba(255,255,255,0.4);
          padding: 8px 18px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500; letter-spacing: 1px;
          cursor: pointer; transition: all 0.3s;
        }
        .cp-logout-btn:hover {
          background: rgba(255,61,139,0.15);
          border-color: rgba(255,61,139,0.4);
          color: var(--pink-soft);
        }

        /* ── Contenido ── */
        .cp-content {
          position: relative; z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          padding: 72px 32px 80px;
        }

        /* ── Breadcrumb ── */
        .cp-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: rgba(255,255,255,0.25);
          letter-spacing: 1px; margin-bottom: 36px;
        }
        .cp-breadcrumb a {
          color: rgba(255,255,255,0.25); text-decoration: none;
          transition: color 0.3s;
        }
        .cp-breadcrumb a:hover { color: var(--pink-soft); }
        .cp-breadcrumb span { color: rgba(255,255,255,0.12); }

        /* ── Header ── */
        .cp-header { margin-bottom: 56px; }
        .cp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
          color: var(--pink-soft); font-weight: 600; margin-bottom: 16px; opacity: 0.8;
        }
        .cp-eyebrow::before {
          content: ''; width: 20px; height: 1.5px;
          background: var(--pink-hot); flex-shrink: 0;
        }
        .cp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 700; color: white; line-height: 1.0; margin-bottom: 12px;
        }
        .cp-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--pink-soft), var(--pink-hot), var(--blue-sky));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cp-subtitle {
          font-size: 14px; color: rgba(255,255,255,0.3); font-weight: 300;
        }

        /* ── Botones horizontales ── */
        .cp-menu {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cp-menu-card {
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s, border-color 0.3s;
          text-decoration: none;
          display: flex;
          align-items: center;
          min-height: 110px;
        }
        .cp-menu-card:hover {
          transform: translateX(6px);
          border-color: rgba(255,61,139,0.3);
          box-shadow: 0 16px 48px rgba(255,61,139,0.12), 0 4px 16px rgba(0,0,0,0.3);
        }
        .cp-menu-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--pink-hot), var(--blue-vivid));
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s ease;
          z-index: 2;
        }
        .cp-menu-card:hover::before { transform: scaleY(1); }

        .cp-card-bg {
          position: absolute; inset: 0;
          transition: transform 0.5s ease;
          opacity: 0.85;
        }
        .cp-menu-card:hover .cp-card-bg { transform: scale(1.04); }

        .cp-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
        }

        .cp-card-body {
          position: relative; z-index: 2;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          width: 100%;
        }

        .cp-card-icon {
          font-size: 34px;
          filter: drop-shadow(0 0 10px rgba(255,61,139,0.4));
          flex-shrink: 0;
        }
        .cp-card-text { flex: 1; }
        .cp-card-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: white; margin-bottom: 6px; line-height: 1.1;
        }
        .cp-card-desc {
          font-size: 12px; color: rgba(255,255,255,0.45);
          font-weight: 300; line-height: 1.5;
        }
        .cp-card-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; color: rgba(255,255,255,0.4);
          transition: all 0.3s; flex-shrink: 0;
        }
        .cp-menu-card:hover .cp-card-arrow {
          background: rgba(255,61,139,0.2);
          border-color: rgba(255,61,139,0.4);
          color: var(--pink-soft);
          transform: translateX(3px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .cp-topbar { padding: 16px 20px; }
          .cp-topbar-name { display: none; }
          .cp-content { padding: 48px 20px 60px; }
          .cp-card-body { padding: 22px 20px; gap: 16px; }
          .cp-card-icon { font-size: 28px; }
          .cp-card-label { font-size: 18px; }
        }
      `}</style>

      <div className="cp-page">
        <div className="cp-bg" />
        <div className="cp-grid" />

        {/* ── Topbar ── */}
        <div className="cp-topbar">
          <Link to="/" className="cp-topbar-brand">
            <div className="cp-topbar-brand-name">VDN Cosmetics</div>
            <div className="cp-topbar-brand-sub">Panel de administración</div>
          </Link>
          <div className="cp-topbar-right">
            <div className="cp-topbar-admin">
              <div className="cp-topbar-avatar">
                {adminNombre.charAt(0).toUpperCase()}
              </div>
              <span className="cp-topbar-name">{adminNombre}</span>
            </div>
            <button className="cp-logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="cp-content">

          {/* Breadcrumb */}
          <div className="cp-breadcrumb">
            <Link to="/admin/dashboard">Dashboard</Link>
            <span>/</span>
            Configuración
          </div>

          {/* Header */}
          <div className="cp-header">
            <div className="cp-eyebrow">Configuración</div>
            <h1 className="cp-title">
              Información de <em>la página</em>
            </h1>
            <p className="cp-subtitle">
              Personaliza el contenido y la apariencia de tu tienda
            </p>
          </div>

          {/* Botones */}
          <div className="cp-menu">
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} className="cp-menu-card">
                <div className="cp-card-bg" style={{ background: item.gradient }} />
                <div className="cp-card-overlay" />
                <div className="cp-card-body">
                  <span className="cp-card-icon">{item.icon}</span>
                  <div className="cp-card-text">
                    <div className="cp-card-label">{item.label}</div>
                    <div className="cp-card-desc">{item.desc}</div>
                  </div>
                  <div className="cp-card-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}