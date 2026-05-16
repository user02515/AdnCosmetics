// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EditCarousel.jsx — VDN Cosmetics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditCarousel.css";

const STORAGE_KEY = "vdn_slides";

export default function EditCarousel() {
  const navigate = useNavigate();

  const loadSlides = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.log("Error loading slides:", e);
    }
    return [];
  };

  const [slides, setSlides] = useState(loadSlides);
  const [caption, setCaption] = useState("");
  const [sub, setSub] = useState("");
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSlides(loadSlides());
  }, []);

  const saveToStorage = (newSlides) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlides));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
      setPreview(reader.result);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const addSlide = () => {
    if (!base64) return alert("Selecciona una imagen primero");

    const newSlide = {
      id: Date.now(),
      src: base64,
      label: `Imagen ${slides.length + 1}`,
      caption: caption.trim() || "Sin título",
      sub: sub.trim() || "",
    };

    const updated = [...slides, newSlide];
    setSlides(updated);
    setSaved(false);

    setBase64(null);
    setPreview(null);
    setFileName("");
    setCaption("");
    setSub("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeSlide = (id) => {
    const updated = slides.filter((s) => s.id !== id);
    setSlides(updated);
    setSaved(false);
  };

  const updateSlide = (id, field, value) => {
    const updated = slides.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    setSlides(updated);
    setSaved(false);
  };

  const handleSaveAndGoHome = () => {
    saveToStorage(slides);
    setSaved(true);
    navigate("/");
  };

  return (
    <div className="edit-carousel-container">
      <div className="edit-header">
        <h2>Editar Carrusel</h2>
        <span className="slide-count">
          {slides.length} slide{slides.length !== 1 ? "s" : ""}
        </span>


      </div>

      {/* ── FORMULARIO AGREGAR ── */}
      <div className="form-card">
        <h3 className="form-title">Agregar nuevo slide</h3>

        <div
          className={`drop-zone ${preview ? "has-preview" : ""}`}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Vista previa" className="drop-preview" />
          ) : (
            <div className="drop-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
              <p>Click para seleccionar imagen</p>
              <small>JPG, PNG, WEBP — Max 5MB</small>
            </div>
          )}
          {loading && <div className="drop-loading">Procesando...</div>}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {fileName && <p className="file-name-label">{fileName}</p>}

        <div className="form-fields">
          <div className="form-field">
            <label>Titulo del slide</label>
            <input
              type="text"
              placeholder="Ej: Nueva coleccion de maquillaje"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={60}
            />
            <span className="char-count">{caption.length}/60</span>
          </div>

          <div className="form-field">
            <label>Subtitulo</label>
            <input
              type="text"
              placeholder="Ej: Hasta 30% de descuento"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              maxLength={80}
            />
            <span className="char-count">{sub.length}/80</span>
          </div>
        </div>

        <button
          className="add-btn"
          onClick={addSlide}
          disabled={!base64 || loading}
        >
          + Agregar al carrusel
        </button>
      </div>

      {/* ── LISTA DE SLIDES ── */}
      {slides.length === 0 ? (
        <div className="empty-state">
          <p>No hay slides. Agrega el primero arriba.</p>
        </div>
      ) : (
        <>
          <div className="slides-row">
            {slides.map((s, idx) => (
              <div key={s.id} className="slide-card">
                <div className="slide-number">#{idx + 1}</div>

                {s.src ? (
                  <img src={s.src} alt={s.label} />
                ) : (
                  <div className="slide-no-img">Sin imagen</div>
                )}

                <div className="info">
                  <input
                    className="inline-edit"
                    value={s.caption}
                    onChange={(e) => updateSlide(s.id, "caption", e.target.value)}
                    placeholder="Titulo"
                  />
                  <input
                    className="inline-edit sub"
                    value={s.sub}
                    onChange={(e) => updateSlide(s.id, "sub", e.target.value)}
                    placeholder="Subtitulo"
                  />
                </div>

                <button
                  className="delete-btn"
                  onClick={() => removeSlide(s.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="save-footer">
            <button
              className={`save-footer-btn ${!saved ? "save-footer-btn--pending" : ""}`}
              onClick={handleSaveAndGoHome}
            >
              {!saved ? "💾 Guardar cambios y volver al inicio" : "✓ Todo guardado — Volver al inicio"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
