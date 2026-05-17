// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  AdminLogin.jsx — VDN Cosmetics
//  Componente: Inicio de sesión de administrador
//  Uso: <AdminLogin />
//  Ruta: /admin/login
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res = await fetch("https://green-buffalo-260842.hostingersite.com/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Credenciales incorrectas");
        setLoading(false);
        return;
      }

      localStorage.setItem("vdn_admin_token", data.token);

      navigate("/admin/dashboard");

    } catch {

      setError("No se pudo conectar con el servidor.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --pink-hot:   #ff3d8b;
          --pink-mid:   #e8186d;
          --pink-soft:  #ff80b5;
          --blue-deep:  #0b1560;
          --blue-mid:   #1630a8;
          --blue-vivid: #2547e0;
          --blue-sky:   #4e78ff;
          --blue-glow:  #7aa0ff;
          --dark:       #07091f;
          --off-white:  #fdfafe;
        }

        .al-page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: var(--dark);
          overflow: hidden;
          position: relative;
        }

        /* ── Fondo animado ── */
        .al-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 70% at 10% 50%, rgba(11,21,96,0.9) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 20%, rgba(37,71,224,0.3) 0%, transparent 55%),
            radial-gradient(ellipse 40% 50% at 80% 90%, rgba(255,61,139,0.2) 0%, transparent 55%),
            #07091f;
        }
        .al-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .al-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          animation: alBlob 10s ease-in-out infinite;
        }
        .al-blob-1 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(255,61,139,0.18), transparent);
          top: -80px; right: -60px;
        }
        .al-blob-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(37,71,224,0.2), transparent);
          bottom: -60px; left: -40px;
          animation-delay: 4s;
          animation-direction: reverse;
        }
        @keyframes alBlob {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.06); }
          66%      { transform: translate(-15px,30px) scale(0.95); }
        }

        /* ── Panel izquierdo decorativo ── */
        .al-left {
          display: none;
          position: relative;
          z-index: 2;
          width: 44%;
          padding: 60px 56px;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: 960px) {
          .al-left { display: flex; }
        }

        .al-left-brand {
          display: flex;
          flex-direction: column;
        }
        .al-left-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 1px;
          background: linear-gradient(90deg, var(--blue-glow), var(--pink-soft));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .al-left-brand-sub {
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          margin-top: 6px;
        }

        .al-left-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 0;
        }
        .al-left-eyebrow {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--pink-soft);
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .al-left-eyebrow::before {
          content: '';
          width: 24px; height: 1.5px;
          background: var(--pink-hot);
          flex-shrink: 0;
        }
        .al-left-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 4vw, 58px);
          font-weight: 700;
          color: white;
          line-height: 1.0;
          margin-bottom: 24px;
        }
        .al-left-heading em {
          font-style: italic;
          background: linear-gradient(135deg, var(--pink-soft), var(--pink-hot), var(--blue-sky));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }
        .al-left-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.35);
          line-height: 1.8;
          font-weight: 300;
          max-width: 320px;
        }

        .al-left-footer {
          font-size: 11px;
          color: rgba(255,255,255,0.15);
          letter-spacing: 1px;
        }

        /* ── Separador vertical ── */
        .al-divider {
          display: none;
          position: relative;
          z-index: 2;
          width: 1px;
          margin: 60px 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255,61,139,0.3) 30%,
            rgba(78,120,255,0.3) 70%,
            transparent
          );
        }
        @media (min-width: 960px) {
          .al-divider { display: block; }
        }

        /* ── Panel derecho — formulario ── */
        .al-right {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
        }

        .al-card {
          width: 100%;
          max-width: 420px;
        }

        /* Header del card (solo mobile) */
        .al-card-brand {
          display: flex;
          flex-direction: column;
          margin-bottom: 40px;
        }
        @media (min-width: 960px) {
          .al-card-brand { display: none; }
        }
        .al-card-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(90deg, var(--blue-glow), var(--pink-soft));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .al-card-brand-sub {
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
          margin-top: 4px;
        }

        .al-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          line-height: 1;
        }
        .al-card-title em {
          font-style: italic;
          background: linear-gradient(135deg, var(--pink-soft), var(--pink-hot));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .al-card-subtitle {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 40px;
          font-weight: 300;
        }

        /* ── Formulario ── */
        .al-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .al-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .al-label {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          font-weight: 600;
        }
        .al-input-wrap {
          position: relative;
        }
        .al-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: white;
          outline: none;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }
        .al-input::placeholder { color: rgba(255,255,255,0.2); }
        .al-input:focus {
          border-color: rgba(255,61,139,0.5);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(255,61,139,0.08);
        }
        .al-input.has-toggle { padding-right: 52px; }

        .al-toggle-pass {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          font-size: 16px;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.3s;
        }
        .al-toggle-pass:hover { color: rgba(255,255,255,0.7); }

        /* ── Error ── */
        .al-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,61,139,0.1);
          border: 1px solid rgba(255,61,139,0.3);
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 13px;
          color: var(--pink-soft);
          animation: alShake 0.4s ease;
        }
        .al-error-icon { font-size: 15px; flex-shrink: 0; }

        @keyframes alShake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }

        /* ── Botón submit ── */
        .al-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, var(--pink-hot), var(--pink-mid) 40%, var(--blue-vivid));
          background-size: 200% 200%;
          animation: alGradient 4s ease infinite;
          border: none;
          border-radius: 100px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: box-shadow 0.3s, transform 0.3s, opacity 0.3s;
          box-shadow: 0 8px 28px rgba(255,61,139,0.35);
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .al-btn:hover:not(:disabled) {
          box-shadow: 0 14px 40px rgba(255,61,139,0.55);
          transform: translateY(-2px);
        }
        .al-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        @keyframes alGradient {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* Spinner */
        .al-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: alSpin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes alSpin {
          to { transform: rotate(360deg); }
        }

        /* ── Volver ── */
        .al-back {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 28px;
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.3s;
          letter-spacing: 0.5px;
        }
        .al-back:hover { color: rgba(255,255,255,0.5); }
      `}</style>

      <div className="al-page">
        <div className="al-bg" />
        <div className="al-grid" />
        <div className="al-blob al-blob-1" />
        <div className="al-blob al-blob-2" />

        {/* ── Panel izquierdo (solo desktop) ── */}
        <div className="al-left">
          <div className="al-left-brand">
            <div className="al-left-brand-name">VDN Cosmetics</div>
            <div className="al-left-brand-sub">Import &amp; Export</div>
          </div>

          <div className="al-left-center">
            <div className="al-left-eyebrow">Panel de administración</div>
            <h1 className="al-left-heading">
              Gestiona tu<br />
              <em>catálogo</em>
            </h1>
            <p className="al-left-desc">
              <br></br>
              Acceso exclusivo para administradores. Desde aquí puedes gestionar
              productos, marcas, categorías y la configuración de la tienda.
            </p>
          </div>

          <div className="al-left-footer">
            © {new Date().getFullYear()} VDN Cosmetics · Área privada
          </div>
        </div>

        <div className="al-divider" />

        {/* ── Panel derecho — formulario ── */}
        <div className="al-right">
          <div className="al-card">

            {/* Brand solo en mobile */}
            <div className="al-card-brand">
              <div className="al-card-brand-name">VDN Cosmetics</div>
              <div className="al-card-brand-sub">Import &amp; Export</div>
            </div>

            <h2 className="al-card-title">
              Iniciar <em>sesión</em>
            </h2>
            <p className="al-card-subtitle">
              Ingresa tus credenciales de administrador
            </p>

            <form className="al-form" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="al-field">
                <label className="al-label" htmlFor="email">
                  Correo electrónico
                </label>
                <div className="al-input-wrap">
                  <input
                    id="email"
                    className="al-input"
                    type="email"
                    placeholder="admin@vdncosmetics.com"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="al-field">
                <label className="al-label" htmlFor="password">
                  Contraseña
                </label>
                <div className="al-input-wrap">
                  <input
                    id="password"
                    className="al-input has-toggle"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="al-toggle-pass"
                    onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="al-error">
                  <span className="al-error-icon">⚠️</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button className="al-btn" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="al-spinner" />
                    Verificando...
                  </>
                ) : (
                  "Ingresar al panel"
                )}
              </button>
            </form>

            {/* Volver */}
            <Link to="/" className="al-back">
              ← Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}