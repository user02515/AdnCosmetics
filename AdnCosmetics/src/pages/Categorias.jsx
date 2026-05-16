// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Categorias.jsx — VDN Cosmetics (v2)
//  Diseño: Filas horizontales estilo magazine
//  Uso: <Categorias />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const categoriasIniciales = [
  {
    id: 1, numero: "01", emoji: "💄",
    titulo: "Maquillaje", subtitulo: "Face & Color",
    descripcion: "Las mejores marcas internacionales en bases, labiales, sombras y todo lo que necesitas para un look perfecto.",
    tags: ["Bases", "Labiales", "Sombras", "Correctores", "Rubores"],
    acento: "#e8186d", acentoClaro: "rgba(232,24,109,0.08)",
  },
  {
    id: 2, numero: "02", emoji: "🧴",
    titulo: "Skincare", subtitulo: "Skin & Care",
    descripcion: "Tratamientos, hidratantes y serums importados directamente para que tu piel luzca radiante cada día.",
    tags: ["Hidratantes", "Serums", "Limpiadores", "Mascarillas", "SPF"],
    acento: "#2547e0", acentoClaro: "rgba(37,71,224,0.08)",
  },
  {
    id: 3, numero: "03", emoji: "🌸",
    titulo: "Perfumería", subtitulo: "Fragrance",
    descripcion: "Fragancias exclusivas de las casas más reconocidas del mundo. Encuentra tu esencia perfecta.",
    tags: ["Eau de Parfum", "Eau de Toilette", "Body Mist", "Sets Regalo"],
    acento: "#c0186e", acentoClaro: "rgba(192,24,110,0.08)",
  },
  {
    id: 4, numero: "04", emoji: "💅",
    titulo: "Nail Art", subtitulo: "Nails & Beauty",
    descripcion: "Esmaltes, geles y accesorios profesionales para uñas perfectas en casa o en el salón.",
    tags: ["Esmaltes", "Geles UV", "Acrílicos", "Nail Art", "Herramientas"],
    acento: "#4e78ff", acentoClaro: "rgba(78,120,255,0.08)",
  },
  {
    id: 5, numero: "05", emoji: "💇",
    titulo: "Cuidado Capilar", subtitulo: "Hair & Care",
    descripcion: "Shampoos, mascarillas y aceites premium para un cabello saludable, brillante y bien cuidado.",
    tags: ["Shampoos", "Mascarillas", "Aceites", "Tratamientos", "Styling"],
    acento: "#ff3d8b", acentoClaro: "rgba(255,61,139,0.08)",
  },
  {
    id: 6, numero: "06", emoji: "✨",
    titulo: "Accesorios", subtitulo: "Tools & Kits",
    descripcion: "Pinceles profesionales, esponjas, organizadores y kits completos para artistas de la belleza.",
    tags: ["Pinceles", "Esponjas", "Kits Pro", "Organizadores"],
    acento: "#7aa0ff", acentoClaro: "rgba(122,160,255,0.08)",
  },
  {
    id: 7, numero: "07", emoji: "🌿",
    titulo: "Sprites para Cabello", subtitulo: "Hair Sprites",
    descripcion: "Sprays capilares Sprite con fórmulas especializadas para hidratar, fortalecer y embellecer tu cabello desde la raíz hasta las puntas.",
    tags: ["Sprite Hidratación", "Sprite Brillo", "Sprite Sin Sal", "Sprite Keratina", "Sprite Rizos", "Sprite Liso"],
    beneficios: [
      { icono: "💧", texto: "Hidratación profunda sin residuo" },
      { icono: "✨", texto: "Brillo inmediato y duradero" },
      { icono: "🌱", texto: "Sin sulfatos ni parabenos" },
      { icono: "💪", texto: "Fortalece y reduce la caída" },
    ],
    acento: "#1a9e5c", acentoClaro: "rgba(26,158,92,0.08)",
  },
];

const styles = `
  .cats2-section {
    background: #fdfafe;
    padding: 120px 56px;
    position: relative;
  }
  .cats2-section::before {
    content: '';
    position: absolute;
    left: 140px; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(255,61,139,0.15) 20%, rgba(37,71,224,0.15) 80%, transparent);
  }
  .cats2-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    max-width: 1200px; margin: 0 auto 72px; gap: 32px;
  }
  .cats2-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600;
    margin-bottom: 16px;
    background: linear-gradient(to right, #ff3d8b, #2547e0);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .cats2-eyebrow::before {
    content: ''; width: 28px; height: 2px;
    background: linear-gradient(to right, #ff3d8b, #2547e0); flex-shrink: 0;
  }
  .cats2-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 5vw, 64px); font-weight: 700;
    color: #07091f; line-height: 1; margin: 0;
  }
  .cats2-header h2 em { font-style: italic; color: #ff3d8b; }
  .cats2-count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 72px; font-weight: 700; color: rgba(0,0,0,0.05); line-height: 1; display: block;
  }
  .cats2-header-right p {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #888; font-weight: 300; line-height: 1.6; max-width: 280px; margin: 0;
  }
  .cats2-list {
    max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column;
  }
  .cats2-row {
    display: grid; grid-template-columns: 80px 1fr auto;
    align-items: center; gap: 0;
    padding: 28px 0;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    cursor: pointer; position: relative;
    transition: padding 0.3s;
    border-radius: 4px;
  }
  .cats2-row:first-child { border-top: 1px solid rgba(0,0,0,0.06); }
  .cats2-row::before {
    content: ''; position: absolute; left: -56px; top: 0; bottom: 0;
    width: 3px; border-radius: 0 2px 2px 0;
    transition: transform 0.35s, opacity 0.35s;
    transform: scaleY(0); opacity: 0;
  }
  .cats2-row:hover::before, .cats2-row.active::before { transform: scaleY(1); opacity: 1; }
  .cats2-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px; font-weight: 600; letter-spacing: 2px;
    color: rgba(0,0,0,0.18); transition: color 0.3s; padding-left: 8px;
  }
  .cats2-center { padding: 0 32px; }
  .cats2-title-row {
    display: flex; align-items: baseline; gap: 16px;
    margin-bottom: 0; transition: margin 0.3s;
  }
  .cats2-row:hover .cats2-title-row, .cats2-row.active .cats2-title-row { margin-bottom: 14px; }
  .cats2-titulo {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 44px); font-weight: 700;
    color: #07091f; transition: color 0.3s; line-height: 1;
  }
  .cats2-subtitulo {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #ccc; font-weight: 500;
  }
  .cats2-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #666; line-height: 1.7; font-weight: 300;
    max-height: 0; overflow: hidden; opacity: 0; margin-bottom: 0;
    transition: max-height 0.4s ease, opacity 0.3s, margin 0.3s;
  }
  .cats2-row:hover .cats2-desc, .cats2-row.active .cats2-desc {
    max-height: 80px; opacity: 1; margin-bottom: 14px;
  }
  .cats2-tags {
    display: flex; flex-wrap: wrap; gap: 6px;
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.4s ease 0.05s, opacity 0.3s ease 0.05s;
  }
  .cats2-row:hover .cats2-tags, .cats2-row.active .cats2-tags { max-height: 60px; opacity: 1; }
  .cats2-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 500; letter-spacing: 1px;
    padding: 4px 12px; border-radius: 100px; border: 1px solid;
  }

  /* ── Beneficios Sprites para Cabello ── */
  .cats2-beneficios {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px; margin-bottom: 0;
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height 0.45s ease 0.05s, opacity 0.35s ease 0.05s, margin 0.3s;
  }
  .cats2-row:hover .cats2-beneficios, .cats2-row.active .cats2-beneficios {
    max-height: 160px; opacity: 1; margin-bottom: 14px;
  }
  .cats2-beneficio {
    display: flex; align-items: center; gap: 10px;
    background: white; border: 1px solid;
    border-radius: 12px; padding: 10px 14px;
    animation: marcaIn 0.4s ease both;
    transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cats2-beneficio:hover { transform: translateY(-2px); }
  @keyframes marcaIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cats2-beneficio-icono { font-size: 18px; flex-shrink: 0; }
  .cats2-beneficio-texto {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; color: #555; font-weight: 400; line-height: 1.3;
  }
  .cats2-right { display: flex; align-items: center; gap: 20px; padding-right: 8px; }
  .cats2-emoji-wrap {
    width: 64px; height: 64px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center; font-size: 30px;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
    background: rgba(0,0,0,0.04); flex-shrink: 0;
  }
  .cats2-row:hover .cats2-emoji-wrap, .cats2-row.active .cats2-emoji-wrap {
    transform: scale(1.15) rotate(-6deg);
  }
  .cats2-arrow {
    width: 40px; height: 40px; border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: #ccc; flex-shrink: 0;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cats2-row:hover .cats2-arrow, .cats2-row.active .cats2-arrow { transform: rotate(45deg); color: white; }

  @media (max-width: 900px) {
    .cats2-section { padding: 80px 24px; }
    .cats2-section::before { left: 80px; }
    .cats2-header { flex-direction: column; align-items: flex-start; }
    .cats2-row { grid-template-columns: 56px 1fr auto; }
    .cats2-titulo { font-size: 26px; }
    .cats2-right { gap: 12px; }
    .cats2-emoji-wrap { width: 50px; height: 50px; font-size: 22px; }
  }
  @media (max-width: 600px) {
    .cats2-section::before { display: none; }
    .cats2-right { display: none; }
    .cats2-row { grid-template-columns: 48px 1fr; }
  }

  .cats2-actions {
    display: flex;
    gap: 14px;

    margin-top: 18px;

    opacity: 0;

    max-height: 0;

    overflow: hidden;

    transform: translateY(10px);

    transition:
      opacity 0.35s ease,
      transform 0.35s ease,
      max-height 0.35s ease;
  }

  /* APARECEN DENTRO DEL HOVER */
  .cats2-row:hover .cats2-actions,
  .cats2-row.active .cats2-actions {
    opacity: 1;

    max-height: 80px;

    transform: translateY(0);
  }

  .cats2-edit-btn,
  .cats2-delete-btn {
    border: none;

    padding: 12px 22px;

    border-radius: 14px;

    font-family: 'DM Sans', sans-serif;

    font-size: 13px;
    font-weight: 700;

    letter-spacing: 1px;

    cursor: pointer;

    transition: all 0.3s ease;
  }

  .cats2-edit-btn {
    background: linear-gradient(
      135deg,
      #2547e0,
      #4e78ff
    );

    color: white;

    box-shadow:
      0 8px 24px rgba(37,71,224,0.25);
  }

  .cats2-delete-btn {
    background: linear-gradient(
      135deg,
      #ff3d8b,
      #c1123f
    );

    color: white;

    box-shadow:
      0 8px 24px rgba(255,61,139,0.25);
  }

  .cats2-edit-btn:hover,
  .cats2-delete-btn:hover {
    transform: translateY(-3px);
  }

    .cats2-add-container {
    display: flex;

    justify-content: center;

    margin-top: 70px;
  }

  .cats2-add-btn {
    border: none;

    padding: 18px 34px;

    border-radius: 22px;

    background: linear-gradient(
      135deg,
      #ff3d8b,
      #2547e0
    );

    color: white;

    font-family: 'DM Sans', sans-serif;

    font-size: 14px;
    font-weight: 700;

    letter-spacing: 1px;

    cursor: pointer;

    transition: all 0.35s ease;

    box-shadow:
      0 12px 35px rgba(37,71,224,0.18);
  }

  .cats2-add-btn:hover {
    transform: translateY(-4px) scale(1.02);

    box-shadow:
      0 20px 45px rgba(255,61,139,0.22);
  }

  /* ───────── MODAL ───────── */

  .cats2-modal-overlay {
    position: fixed;

    inset: 0;

    background: rgba(0,0,0,0.45);

    backdrop-filter: blur(6px);

    display: flex;

    align-items: center;

    justify-content: center;

    z-index: 9999;
  }

  .cats2-modal {
    width: 100%;

    max-width: 520px;

    background: white;

    border-radius: 28px;

    padding: 36px;

    box-shadow:
      0 30px 80px rgba(0,0,0,0.18);

    animation: modalIn 0.3s ease;
  }

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(.96);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .cats2-modal h3 {
    font-family: 'Cormorant Garamond', serif;

    font-size: 36px;

    margin-bottom: 24px;

    color: #07091f;
  }

  .cats2-modal input,
  .cats2-modal textarea {
    width: 100%;

    border: 1px solid rgba(0,0,0,0.1);

    border-radius: 16px;

    padding: 16px;

    margin-bottom: 18px;

    font-family: 'DM Sans', sans-serif;

    font-size: 14px;

    outline: none;

    transition: 0.3s;
  }

  .cats2-modal input:focus,
  .cats2-modal textarea:focus {
    border-color: #ff3d8b;

    box-shadow:
      0 0 0 4px rgba(255,61,139,0.1);
  }

  .cats2-modal textarea {
    min-height: 120px;

    resize: none;
  }

  .cats2-modal-actions {
    display: flex;

    justify-content: flex-end;

    gap: 14px;

    margin-top: 12px;
  }

  .cats2-cancel-btn,
  .cats2-save-btn {
    border: none;

    padding: 14px 22px;

    border-radius: 14px;

    cursor: pointer;

    font-weight: 700;

    transition: 0.3s;
  }

  .cats2-cancel-btn {
    background: #f2f2f2;
  }

  .cats2-save-btn {
    background: linear-gradient(
      135deg,
      #ff3d8b,
      #2547e0
    );

    color: white;
  }

  .cats2-save-btn:hover,
  .cats2-cancel-btn:hover {
    transform: translateY(-2px);
  }

  /* MODAL ELIMINAR */

  .cats2-delete-modal {
    max-width: 420px;

    text-align: center;
  }

  .cats2-delete-modal p {
    color: #666;

    line-height: 1.7;

    margin-bottom: 28px;
  }
    
`;

export default function Categorias() {
  const [activa, setActiva] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [categoriaActual, setCategoriaActual] = useState(null);

  const [mostrarEliminar, setMostrarEliminar] =
    useState(false);

  const [idEliminar, setIdEliminar] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    subtitulo: "",
    descripcion: "",
  });
  
  
  const [categorias, setCategorias] =
    useState(categoriasIniciales);
    
  const eliminarCategoria = (id) => {
      setCategorias(
        categorias.filter((cat) => cat.id !== id)
      );
    };
  const editarCategoria = (cat) => {

    setModoEdicion(true);

    setCategoriaActual(cat);

    setFormData({
      titulo: cat.titulo,
      subtitulo: cat.subtitulo,
      descripcion: cat.descripcion,
    });

    setMostrarModal(true);
  };
  const añadirCategoria = () => {

    setModoEdicion(false);

    setFormData({
      titulo: "",
      subtitulo: "",
      descripcion: "",
    });

    setMostrarModal(true);
  };
  const guardarCategoria = () => {

    if (!formData.titulo) return;

    if (modoEdicion) {

      setCategorias(
        categorias.map((cat) =>
          cat.id === categoriaActual.id
            ? {
                ...cat,
                titulo: formData.titulo,
                subtitulo: formData.subtitulo,
                descripcion: formData.descripcion,
              }
            : cat
        )
      );

    } else {

      const nuevaCategoria = {
        id: Date.now(),

        numero: String(categorias.length + 1)
          .padStart(2, "0"),

        emoji: "✨",

        titulo: formData.titulo,

        subtitulo: formData.subtitulo,

        descripcion: formData.descripcion,

        tags: ["Nuevo"],

        acento: "#ff3d8b",

        acentoClaro:
          "rgba(255,61,139,0.08)",
      };

      setCategorias([
        ...categorias,
        nuevaCategoria
      ]);
    }

    setMostrarModal(false);
  };
  return (
    <>
      <style>{styles}</style>
      {/* MODAL AÑADIR / EDITAR */}
      {mostrarModal && (

        <div className="cats2-modal-overlay">

          <div className="cats2-modal">

            <h3>
              {modoEdicion
                ? "Editar Categoría"
                : "Nueva Categoría"}
            </h3>

            <input
              type="text"
              placeholder="Título"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  titulo: e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Subtítulo"
              value={formData.subtitulo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subtitulo: e.target.value
                })
              }
            />

            <textarea
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  descripcion: e.target.value
                })
              }
            />

            <div className="cats2-modal-actions">

              <button
                className="cats2-cancel-btn"
                onClick={() =>
                  setMostrarModal(false)
                }
              >
                Cancelar
              </button>

              <button
                className="cats2-save-btn"
                onClick={guardarCategoria}
              >
                Guardar
              </button>

            </div>

          </div>

        </div>
      )}

      {/* MODAL ELIMINAR */}
      {mostrarEliminar && (

        <div className="cats2-modal-overlay">

          <div className="cats2-modal cats2-delete-modal">

            <h3>Eliminar</h3>

            <p>
              ¿Seguro que deseas eliminar esta
              categoría?
            </p>

            <div className="cats2-modal-actions">

              <button
                className="cats2-cancel-btn"
                onClick={() =>
                  setMostrarEliminar(false)
                }
              >
                Cancelar
              </button>

              <button
                className="cats2-delete-btn"
                onClick={() => {

                  eliminarCategoria(idEliminar);

                  setMostrarEliminar(false);
                }}
              >
                Eliminar
              </button>

            </div>

          </div>

        </div>
      )}

      <section className="cats2-section" id="categorias">

        <div className="cats2-header">
          <div>
            <div className="cats2-eyebrow">Nuestro Catálogo</div>
            <h2>Belleza en cada<br /><em>categoría</em></h2>
          </div>
          <div className="cats2-header-right">
            <span className="cats2-count">07</span>
            <p>Líneas completas importadas directamente para ti.</p>
          </div>
        </div>

        <div className="cats2-list">
          {categorias.map((cat) => (
            <div key={cat.id}>

              <div
                className={`cats2-row ${activa === cat.id ? "active" : ""}`}
                onClick={() => setActiva(activa === cat.id ? null : cat.id)}
                style={{
                  "--acento": cat.acento,
                  "--acentoClaro": cat.acentoClaro,
                }}
              >

                {/* borde izquierdo dinámico */}
                <style>{`
                  #cat-row-${cat.id}::before { background: ${cat.acento}; }

                  #cat-row-${cat.id}:hover .cats2-arrow,
                  #cat-row-${cat.id}.active .cats2-arrow {
                    background: ${cat.acento};
                    border-color: ${cat.acento};
                  }

                  #cat-row-${cat.id}:hover .cats2-emoji-wrap,
                  #cat-row-${cat.id}.active .cats2-emoji-wrap {
                    background: ${cat.acentoClaro};
                  }

                  #cat-row-${cat.id}:hover .cats2-num,
                  #cat-row-${cat.id}.active .cats2-num {
                    color: ${cat.acento};
                  }

                  #cat-row-${cat.id}:hover .cats2-titulo,
                  #cat-row-${cat.id}.active .cats2-titulo {
                    color: ${cat.acento};
                  }
                `}</style>

                {/* Número */}
                <div
                  className="cats2-num"
                  id={`cat-row-${cat.id}`}
                  style={{ "--acento": cat.acento }}
                >
                  {cat.numero}
                </div>

                {/* Centro */}
                {/* Centro */}
                <div className="cats2-center">

                  <div className="cats2-title-row">
                    <span className="cats2-titulo">
                      {cat.titulo}
                    </span>

                    <span className="cats2-subtitulo">
                      {cat.subtitulo}
                    </span>
                  </div>

                  <p className="cats2-desc">
                    {cat.descripcion}
                  </p>

                  {/* Beneficios */}
                  {cat.beneficios && (
                    <div className="cats2-beneficios">
                      {cat.beneficios.map((b, i) => (
                        <div
                          key={i}
                          className="cats2-beneficio"
                          style={{
                            borderColor: cat.acento + "28"
                          }}
                        >
                          <span className="cats2-beneficio-icono">
                            {b.icono}
                          </span>

                          <span className="cats2-beneficio-texto">
                            {b.texto}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className="cats2-tags"
                    style={{
                      marginTop: cat.beneficios
                        ? "12px"
                        : "0"
                    }}
                  >
                    {cat.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="cats2-tag"
                        style={{
                          color: cat.acento,
                          borderColor: cat.acento + "44",
                          background: cat.acentoClaro
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* BOTONES DENTRO DEL HOVER */}
                  <div className="cats2-actions">

                    <button
                      className="cats2-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        editarCategoria(cat);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      className="cats2-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        setIdEliminar(cat.id);

                        setMostrarEliminar(true);
                      }}
                    >
                      Eliminar
                    </button>

                  </div>

                </div>
                {/* DERECHA */}
                <div className="cats2-right">

                  <div className="cats2-emoji-wrap">
                    {cat.emoji}
                  </div>

                  <div className="cats2-arrow">
                    ↗
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
        {/* BOTÓN AÑADIR */}
        <div className="cats2-add-container">

          <button
            className="cats2-add-btn"
            onClick={añadirCategoria}
          >
            + Añadir Categoría
          </button>

        </div>

      </section>
    </>
  );
}
