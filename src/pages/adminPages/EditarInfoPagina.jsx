// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EditarInfoPagina.jsx — VDN Cosmetics
//  Componente: Formulario de edición de info
//  Uso: <EditarInfoPagina />
//  Ruta: /admin/configuracion/informacion
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import { BASE_URL } from "../../config/api";

const EMPTY = {
  numero_whatsapp: "",
  mensaje_whatsapp_plantilla: "",
  logo_url: "",
  meta_descripcion: "",
};

export default function EditarInfoPagina() {
  const navigate    = useNavigate();
  const fileRef     = useRef(null);
  const adminNombre = localStorage.getItem("vdn_admin_nombre") || "Administrador";

  // Estado original (lo que vino del servidor)
  const [original, setOriginal] = useState(EMPTY);
  // Estado actual (lo que el usuario está editando)
  const [form, setForm]         = useState(EMPTY);
  // Preview de imagen
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile]       = useState(null);

  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState("");

  // ── Detectar cambios ──
  const hasChanges =
    logoFile !== null ||
    Object.keys(EMPTY).some((k) => form[k] !== original[k]);

  // ── Cargar datos actuales ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("vdn_admin_token");
        const res   = await fetch(`${API_URL}/get_info_pagina.php`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data) {
          const loaded = {
            numero_whatsapp:             data.numero_whatsapp             || "",
            mensaje_whatsapp_plantilla:  data.mensaje_whatsapp_plantilla  || "",
            logo_url:                    data.logo_url                    || "",
            meta_descripcion:            data.meta_descripcion            || "",
          };
          setOriginal(loaded);
          setForm(loaded);
          if (loaded.logo_url) setLogoPreview(loaded.logo_url);
        }
      } catch {
        setError("No se pudo cargar la información actual.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Cambios en inputs de texto ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSuccess(false);
    setError("");
  };

  // ── Selección de imagen ──
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setSuccess(false);
    setError("");
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    setSuccess(false);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(original.logo_url || null);
    if (fileRef.current) fileRef.current.value = "";
    setSuccess(false);
  };

  // ── Guardar ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const token   = localStorage.getItem("vdn_admin_token");
      const payload = new FormData();

      payload.append("numero_whatsapp",            form.numero_whatsapp);
      payload.append("mensaje_whatsapp_plantilla", form.mensaje_whatsapp_plantilla);
      payload.append("meta_descripcion",           form.meta_descripcion);
      if (logoFile) payload.append("logo",         logoFile);

      const res  = await fetch(`${API_URL}/update_config.php`, {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}` },
        body:    payload,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Error al guardar los cambios.");
      } else {
        const updated = {
          ...form,
          logo_url: data.logo_url || form.logo_url,
        };
        setOriginal(updated);
        setForm(updated);
        setLogoFile(null);
        setSuccess(true);
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

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
          --pink-mid:   #e8186d;
          --pink-soft:  #ff80b5;
          --pink-pale:  #ffe0ef;
          --pink-blush: #fdf0f6;
          --blue-vivid: #2547e0;
          --blue-sky:   #4e78ff;
          --blue-glow:  #7aa0ff;
          --dark:       #07091f;
          --gray:       #6b7280;
          --gray-light: #f3f4f6;
          --border:     #e5e7eb;
        }

        .eip-page {
          min-height: 100vh;
          background: #f8f7fc;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Topbar ── */
        .eip-topbar {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 48px;
          background: var(--dark);
          border-bottom: 1px solid rgba(255,61,139,0.18);
          backdrop-filter: blur(20px);
        }
        .eip-topbar-brand { display: flex; flex-direction: column; text-decoration: none; }
        .eip-topbar-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          background: linear-gradient(90deg, var(--blue-glow), var(--pink-soft));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          line-height: 1;
        }
        .eip-topbar-brand-sub {
          font-size: 8px; letter-spacing: 3.5px;
          color: rgba(255,255,255,0.25); text-transform: uppercase; margin-top: 3px;
        }
        .eip-topbar-right { display: flex; align-items: center; gap: 16px; }
        .eip-topbar-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, var(--pink-hot), var(--blue-vivid));
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: white;
        }
        .eip-topbar-name { font-size: 13px; color: rgba(255,255,255,0.5); }
        .eip-logout-btn {
          background: rgba(255,61,139,0.08); border: 1px solid rgba(255,61,139,0.2);
          color: rgba(255,255,255,0.4); padding: 7px 16px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 12px; cursor: pointer;
          transition: all 0.3s;
        }
        .eip-logout-btn:hover {
          background: rgba(255,61,139,0.15); border-color: rgba(255,61,139,0.4);
          color: var(--pink-soft);
        }

        /* ── Contenido ── */
        .eip-content {
          max-width: 720px; margin: 0 auto;
          padding: 60px 32px 100px;
        }

        /* ── Breadcrumb ── */
        .eip-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; color: #aaa; letter-spacing: 1px; margin-bottom: 40px;
        }
        .eip-breadcrumb a {
          color: #aaa; text-decoration: none; transition: color 0.3s;
        }
        .eip-breadcrumb a:hover { color: var(--pink-hot); }
        .eip-breadcrumb span { color: #ddd; }

        /* ── Título ── */
        .eip-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 700; color: var(--dark);
          line-height: 1.0; margin-bottom: 10px;
        }
        .eip-title em {
          font-style: italic; color: var(--pink-hot);
        }
        .eip-subtitle {
          font-size: 14px; color: var(--gray);
          font-weight: 300; margin-bottom: 52px;
        }

        /* ── Separador ── */
        .eip-divider {
          width: 100%; height: 1px;
          background: linear-gradient(to right, var(--pink-pale), rgba(37,71,224,0.1), transparent);
          margin: 40px 0;
        }

        /* ── Formulario ── */
        .eip-form { display: flex; flex-direction: column; gap: 32px; }

        .eip-field { display: flex; flex-direction: column; gap: 8px; }

        .eip-label {
          font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;
          font-weight: 600; color: var(--dark);
        }
        .eip-label-hint {
          font-size: 12px; color: var(--gray); font-weight: 300;
          letter-spacing: 0; text-transform: none; margin-top: 2px;
        }

        .eip-input, .eip-textarea {
          width: 100%; background: white;
          border: 1.5px solid var(--border);
          border-radius: 12px; padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: var(--dark);
          outline: none; transition: border-color 0.3s, box-shadow 0.3s;
          box-sizing: border-box;
        }
        .eip-input::placeholder, .eip-textarea::placeholder { color: #ccc; }
        .eip-input:focus, .eip-textarea:focus {
          border-color: var(--pink-hot);
          box-shadow: 0 0 0 3px rgba(255,61,139,0.08);
        }
        .eip-textarea { resize: vertical; min-height: 110px; line-height: 1.65; }

        /* ── Campo de plantilla con variables ── */
        .eip-template-vars {
          display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;
        }
        .eip-var-badge {
          background: rgba(255,61,139,0.07);
          border: 1px solid rgba(255,61,139,0.2);
          color: var(--pink-mid);
          font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 6px;
          cursor: pointer; transition: all 0.2s; font-family: 'Courier New', monospace;
          user-select: none;
        }
        .eip-var-badge:hover {
          background: rgba(255,61,139,0.14);
          border-color: var(--pink-hot);
        }
        .eip-var-badge:active { transform: scale(0.96); }

        /* ── Logo dropzone ── */
        .eip-dropzone {
          border: 2px dashed var(--border);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.3s, background 0.3s;
          background: white;
          position: relative;
        }
        .eip-dropzone:hover, .eip-dropzone.drag-over {
          border-color: var(--pink-hot);
          background: var(--pink-blush);
        }
        .eip-dropzone input[type="file"] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
        }
        .eip-dropzone-icon { font-size: 36px; margin-bottom: 10px; display: block; }
        .eip-dropzone-text { font-size: 13px; color: var(--gray); line-height: 1.6; }
        .eip-dropzone-text strong { color: var(--pink-hot); }

        /* Preview del logo */
        .eip-logo-preview {
          display: flex; align-items: center; gap: 20px;
          background: white; border: 1.5px solid var(--border);
          border-radius: 14px; padding: 16px 20px; margin-top: 12px;
        }
        .eip-logo-preview img {
          width: 70px; height: 70px; object-fit: contain;
          border-radius: 10px; border: 1px solid var(--border);
          background: var(--gray-light);
        }
        .eip-logo-preview-info { flex: 1; }
        .eip-logo-preview-name {
          font-size: 13px; font-weight: 500; color: var(--dark); margin-bottom: 3px;
        }
        .eip-logo-preview-hint { font-size: 11px; color: var(--gray); }
        .eip-logo-remove {
          background: none; border: 1px solid var(--border);
          border-radius: 8px; padding: 6px 12px;
          font-size: 12px; color: var(--gray);
          cursor: pointer; transition: all 0.2s;
        }
        .eip-logo-remove:hover { border-color: var(--pink-hot); color: var(--pink-hot); }

        /* ── Alertas ── */
        .eip-alert {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 12px;
          font-size: 13px; font-weight: 500;
        }
        .eip-alert.error {
          background: rgba(255,61,139,0.08);
          border: 1px solid rgba(255,61,139,0.25);
          color: var(--pink-mid);
          animation: eipShake 0.4s ease;
        }
        .eip-alert.success {
          background: rgba(16,185,129,0.07);
          border: 1px solid rgba(16,185,129,0.25);
          color: #059669;
        }
        @keyframes eipShake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-5px); }
          40%      { transform: translateX(5px); }
          60%      { transform: translateX(-3px); }
          80%      { transform: translateX(3px); }
        }

        /* ── Botones de acción ── */
        .eip-actions {
          display: flex; gap: 14px; align-items: center;
          flex-wrap: wrap; padding-top: 8px;
        }

        .eip-btn-save {
          padding: 15px 40px;
          background: linear-gradient(135deg, var(--pink-hot), var(--pink-mid) 40%, var(--blue-vivid));
          background-size: 200% 200%;
          animation: eipGradient 4s ease infinite;
          border: none; border-radius: 100px;
          color: white; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 13px; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer;
          transition: box-shadow 0.3s, transform 0.3s, opacity 0.3s;
          box-shadow: 0 8px 28px rgba(255,61,139,0.3);
          display: flex; align-items: center; gap: 10px;
        }
        .eip-btn-save:hover:not(:disabled) {
          box-shadow: 0 14px 40px rgba(255,61,139,0.5);
          transform: translateY(-2px);
        }
        .eip-btn-save:disabled {
          opacity: 0.4; cursor: not-allowed; transform: none;
          box-shadow: none; animation: none;
          background: #ccc;
        }
        @keyframes eipGradient {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        .eip-btn-back {
          padding: 15px 32px;
          background: transparent;
          border: 1.5px solid var(--border);
          border-radius: 100px; color: var(--gray);
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 13px; letter-spacing: 1px;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.3s; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .eip-btn-back:hover {
          border-color: var(--pink-hot); color: var(--pink-hot);
        }

        /* Spinner */
        .eip-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white; border-radius: 50%;
          animation: eipSpin 0.7s linear infinite; flex-shrink: 0;
        }
        @keyframes eipSpin { to { transform: rotate(360deg); } }

        /* Loading skeleton */
        .eip-skeleton {
          display: flex; flex-direction: column; gap: 32px;
        }
        .eip-skel-block {
          height: 56px; border-radius: 12px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: eipSkelShimmer 1.4s ease infinite;
        }
        .eip-skel-block.tall { height: 110px; }
        .eip-skel-block.short { height: 36px; width: 40%; }
        @keyframes eipSkelShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 640px) {
          .eip-topbar { padding: 14px 20px; }
          .eip-topbar-name { display: none; }
          .eip-content { padding: 40px 20px 80px; }
          .eip-actions { flex-direction: column-reverse; align-items: stretch; }
          .eip-btn-save, .eip-btn-back { text-align: center; justify-content: center; }
        }
      `}</style>

      <div className="eip-page">

        {/* ── Topbar ── */}
        <div className="eip-topbar">
          <Link to="/" className="eip-topbar-brand">
            <div className="eip-topbar-brand-name">VDN Cosmetics</div>
            <div className="eip-topbar-brand-sub">Panel de administración</div>
          </Link>
          <div className="eip-topbar-right">
            <div className="eip-topbar-avatar">
              {adminNombre.charAt(0).toUpperCase()}
            </div>
            <span className="eip-topbar-name">{adminNombre}</span>
            <button className="eip-logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="eip-content">

          {/* Breadcrumb */}
          <div className="eip-breadcrumb">
            <Link to="/admin/dashboard">Dashboard</Link>
            <span>/</span>
            <Link to="/admin/configuracion">Configuración</Link>
            <span>/</span>
            Información de la página
          </div>

          {/* Título */}
          <h1 className="eip-title">
            Editar información<br />de la <em>página</em>
          </h1>
          <p className="eip-subtitle">
            Los cambios se reflejan en toda la tienda al guardar
          </p>

          <div className="eip-divider" />

          {/* ── Loading skeleton ── */}
          {loading ? (
            <div className="eip-skeleton">
              <div className="eip-skel-block short" />
              <div className="eip-skel-block" />
              <div className="eip-skel-block short" />
              <div className="eip-skel-block tall" />
              <div className="eip-skel-block short" />
              <div className="eip-skel-block tall" />
              <div className="eip-skel-block short" />
              <div className="eip-skel-block" />
            </div>
          ) : (
            <form className="eip-form" onSubmit={handleSubmit}>

              {/* ── Número de teléfono ── */}
              <div className="eip-field">
                <label className="eip-label" htmlFor="numero_whatsapp">
                  Número de teléfono / WhatsApp
                </label>
                <span className="eip-label-hint">
                  Incluye el código de país. Ej: +591 78901234
                </span>
                <input
                  id="numero_whatsapp"
                  name="numero_whatsapp"
                  className="eip-input"
                  type="tel"
                  placeholder="+591 XXXXXXXX"
                  value={form.numero_whatsapp}
                  onChange={handleChange}
                />
              </div>

              {/* ── Plantilla de mensaje ── */}
              <div className="eip-field">
                <label className="eip-label" htmlFor="mensaje_whatsapp_plantilla">
                  Plantilla de mensaje automático de WhatsApp
                </label>
                <span className="eip-label-hint">
                  Este mensaje se envía cuando un cliente hace clic en "Comprar". Usa las variables de abajo.
                </span>
                <textarea
                  id="mensaje_whatsapp_plantilla"
                  name="mensaje_whatsapp_plantilla"
                  className="eip-textarea"
                  placeholder="Ej: Hola! Me interesa el producto {nombre_producto} (Bs. {precio}). ¿Tienen disponibilidad?"
                  value={form.mensaje_whatsapp_plantilla}
                  onChange={handleChange}
                />
                {/* Variables disponibles */}
                <div className="eip-template-vars">
                  {["{nombre_producto}", "{precio}", "{marca}", "{categoria}"].map((v) => (
                    <span
                      key={v}
                      className="eip-var-badge"
                      title="Clic para insertar"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          mensaje_whatsapp_plantilla:
                            prev.mensaje_whatsapp_plantilla + v,
                        }))
                      }
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Logo ── */}
              <div className="eip-field">
                <label className="eip-label">Logo de la tienda</label>
                <span className="eip-label-hint">
                  PNG o SVG recomendado. Tamaño máximo 2 MB.
                </span>

                {!logoPreview ? (
                  <div
                    className="eip-dropzone"
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag-over"); }}
                    onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
                    onDrop={(e) => { e.currentTarget.classList.remove("drag-over"); handleLogoDrop(e); }}
                    onClick={() => fileRef.current?.click()}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      style={{ display: "none" }}
                    />
                    <span className="eip-dropzone-icon">🖼️</span>
                    <p className="eip-dropzone-text">
                      <strong>Haz clic</strong> o arrastra una imagen aquí<br />
                      PNG, JPG, SVG, WEBP
                    </p>
                  </div>
                ) : (
                  <div className="eip-logo-preview">
                    <img src={logoPreview} alt="Logo preview" />
                    <div className="eip-logo-preview-info">
                      <div className="eip-logo-preview-name">
                        {logoFile ? logoFile.name : "Logo actual"}
                      </div>
                      <div className="eip-logo-preview-hint">
                        {logoFile
                          ? `${(logoFile.size / 1024).toFixed(1)} KB · Listo para guardar`
                          : "Logo guardado en el servidor"}
                      </div>
                    </div>
                    <button type="button" className="eip-logo-remove" onClick={removeLogo}>
                      {logoFile ? "Quitar" : "Cambiar"}
                    </button>
                  </div>
                )}
              </div>

              {/* ── Meta descripción ── */}
              <div className="eip-field">
                <label className="eip-label" htmlFor="meta_descripcion">
                  Meta descripción
                </label>
                <span className="eip-label-hint">
                  Aparece en resultados de Google. Máximo 160 caracteres recomendado.
                </span>
                <textarea
                  id="meta_descripcion"
                  name="meta_descripcion"
                  className="eip-textarea"
                  style={{ minHeight: "80px" }}
                  placeholder="Ej: VDN Cosmetics — Importadora de cosméticos premium en Bolivia. Productos 100% originales, venta mayor y menor."
                  maxLength={200}
                  value={form.meta_descripcion}
                  onChange={handleChange}
                />
                <span style={{ fontSize: "11px", color: form.meta_descripcion.length > 160 ? "var(--pink-hot)" : "#bbb", marginTop: "4px" }}>
                  {form.meta_descripcion.length} / 160 caracteres recomendados
                </span>
              </div>

              {/* ── Alertas ── */}
              {error   && <div className="eip-alert error">⚠️ {error}</div>}
              {success && <div className="eip-alert success">✅ Cambios guardados correctamente.</div>}

              {/* ── Botones ── */}
              <div className="eip-actions">
                <button
                  type="submit"
                  className="eip-btn-save"
                  disabled={!hasChanges || saving}
                >
                  {saving ? (
                    <><span className="eip-spinner" /> Guardando...</>
                  ) : (
                    "Guardar cambios"
                  )}
                </button>

                <Link to="/admin/configuracion" className="eip-btn-back">
                  ← Volver
                </Link>
              </div>

            </form>
          )}
        </div>
      </div>
    </>
  );
}