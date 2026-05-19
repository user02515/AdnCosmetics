// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EditCarousel.jsx — VDN Cosmetics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EditCarousel.css";
import { API_URL } from "../../config/api";
import { getImageUrl } from "../../config/api";

export default function EditCarousel() {
  const navigate = useNavigate();


  const [slides, setSlides] = useState([]);
  const [caption, setCaption] = useState("");
  const [sub, setSub] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(true);
  const fileInputRef = useRef(null);
  const [savingSlideId, setSavingSlideId] = useState(null);

  useEffect(() => {

    fetch(`${API_URL}/get_carrusel_imagenes.php`)
      .then((res) => res.json())
      .then((data) => {

        const formattedSlides = data.map((slide) => ({
          id: slide.id,

          src: getImageUrl(slide.imagen_url),

          caption: slide.titulo,

          sub: slide.subtitulo,

          enlace: slide.enlace,

          orden: slide.orden,
        }));

        setSlides(formattedSlides);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);



  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    setPreview(URL.createObjectURL(file));

    setSelectedFile(file);
  };

  const addSlide = async () => {

    if (!selectedFile) {
      alert("Selecciona una imagen");
      return;
    }

    try {

      const form = new FormData();

      form.append("titulo", caption);

      form.append("subtitulo", sub);

      form.append("imagen", selectedFile);

      form.append("orden", slides.length);

      const res = await fetch(
        `${API_URL}/create_carousel_slide.php`,
        {
          method: "POST",
          body: form,
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text();
        console.log("Respuesta no JSON:", text);
        alert("Error del servidor");
        return;
      }

      if (data.success) {

        const newSlide = {
          id: data.id,

          src: getImageUrl(data.imagen_url),

          caption,

          sub,
        };

        setSlides([...slides, newSlide]);

        setPreview(null);

        setSelectedFile(null);

        setCaption("");

        setSub("");

        setFileName("");

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

      } else {

        alert(data.message || "Error");

      }

    } catch (err) {

      console.error(err);

      alert("Error del servidor");

    }

  };

  const removeSlide = async (id) => {
    const res = await fetch(`${API_URL}/delete_carousel_slide.php`, {
      method: "POST",
      body: new URLSearchParams({ id }),
    });

    const data = await res.json();

    if (data.success) {
      setSlides(slides.filter(s => s.id !== id));
    } else {
      alert(data.message);
    }
  };

  const updateSlide = async (id, field, value) => {

    // actualiza instantáneamente en frontend
    const updatedSlides = slides.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );

    setSlides(updatedSlides);

    // obtiene slide actualizado
    const slide = updatedSlides.find((s) => s.id === id);

    if (!slide) return;

    try {
      setSavingSlideId(id);

      const payload = new FormData();

      payload.append("id", id);
      payload.append(
        "titulo",
        field === "caption" ? value : slide.caption
      );

      payload.append(
        "subtitulo",
        field === "sub" ? value : slide.sub
      );

      payload.append("orden", slides.findIndex((s) => s.id === id));

      const res = await fetch(
        "https://vdncosmetics.com/api/update_carousel_slide.php",
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setSavingSlideId(null);
    }
  };

  const moveSlide = async (index, direction) => {
    const newSlides = [...slides];

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= slides.length) return;

    [newSlides[index], newSlides[newIndex]] =
      [newSlides[newIndex], newSlides[index]];

    // recalcular orden
    const reordered = newSlides.map((s, i) => ({
      id: s.id,
      orden: i
    }));

    setSlides(newSlides);

    await fetch(`${API_URL}/update_carousel_order.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered),
    });
  };

  const handleSaveAndGoHome = () => {
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
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
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
          disabled={!preview || loading}
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
                    onChange={(e) =>
                      updateSlide(s.id, "caption", e.target.value)
                    }
                    placeholder="Titulo"
                  />
                  <input
                    className="inline-edit sub"
                    value={s.sub}
                    onChange={(e) =>
                      updateSlide(s.id, "sub", e.target.value)
                    }
                    placeholder="Subtitulo"
                  />
                  {savingSlideId === s.id && (
                    <span className="saving-indicator">
                      Guardando...
                    </span>
                  )}
                </div>
                <div className="order-buttons">
                  <button
                    className="move-btn"
                    onClick={() => moveSlide(idx, -1)}
                    disabled={idx === 0}
                  >
                    ↑
                  </button>

                  <button
                    className="move-btn"
                    onClick={() => moveSlide(idx, 1)}
                    disabled={idx === slides.length - 1}
                  >
                    ↓
                  </button>
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
              {!saved ? " Guardar cambios y volver al inicio" : "✓ Todo guardado — Volver al inicio"}
            </button>

          </div>

          <div className="backButton">

            <button
              className="back-btn"
              onClick={() => navigate("/admin/configuracion")}
            >
              Volver al panel
            </button>
          </div>
        </>
      )}
    </div>
  );
}