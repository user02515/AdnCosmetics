// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Categorias.jsx — VDN Cosmetics (v2)
//  Diseño: Filas horizontales estilo magazine
//  Uso: <Categorias />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { API_URL, BASE_URL } from "../config/api";


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
`;

export default function Categorias() {
  const [activa, setActiva] = useState(null);
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {

    fetch(`${API_URL}/get_categorias.php`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const formattedCategorias = data.map((cat, index) => ({
          id: cat.id,
          numero: String(index + 1).padStart(2, "0"),
          titulo: cat.nombre,
          subtitulo: cat.eslogan || "Categoría",
          descripcion: cat.descripcion,
          imagen_url: cat.imagen_url,
          emoji: ["💄", "🧴", "🌸", "💅", "💇", "✨", "🌿"][index % 7],
          tags: [],
          acento: [
            "#e8186d",
            "#2547e0",
            "#c0186e",
            "#4e78ff",
            "#ff3d8b",
            "#7aa0ff",
            "#1a9e5c",
          ][index % 7],

          acentoClaro: [
            "rgba(232,24,109,0.08)",
            "rgba(37,71,224,0.08)",
            "rgba(192,24,110,0.08)",
            "rgba(78,120,255,0.08)",
            "rgba(255,61,139,0.08)",
            "rgba(122,160,255,0.08)",
            "rgba(26,158,92,0.08)",
          ][index % 7],

        }));

        setCategorias(formattedCategorias);

      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <>
      <style>{styles}</style>

      <section className="cats2-section" id="categorias">

        <div className="cats2-header">
          <div>
            <div className="cats2-eyebrow">Nuestro Catálogo</div>
            <h2>Belleza en cada<br /><em>categoría</em></h2>
          </div>
          <div className="cats2-header-right">
            <span className="cats2-count">
              {String(categorias.length).padStart(2, "0")}
            </span>
            <p>Líneas completas importadas directamente para ti.</p>
          </div>
        </div>

        <div className="cats2-list">
          {categorias.map((cat) => (
            <div
              key={cat.id}
              id={`cat-row-${cat.id}`}
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
                #cat-row-${cat.id}.active .cats2-arrow { background: ${cat.acento}; border-color: ${cat.acento}; }
                #cat-row-${cat.id}:hover .cats2-emoji-wrap,
                #cat-row-${cat.id}.active .cats2-emoji-wrap { background: ${cat.acentoClaro}; }
                #cat-row-${cat.id}:hover .cats2-num,
                #cat-row-${cat.id}.active .cats2-num { color: ${cat.acento}; }
                #cat-row-${cat.id}:hover .cats2-titulo,
                #cat-row-${cat.id}.active .cats2-titulo { color: ${cat.acento}; }
              `}</style>

              {/* Número */}
              <div className="cats2-num" >
                {cat.numero}
              </div>

              {/* Centro */}
              <div className="cats2-center">
                <div className="cats2-title-row">
                  <span className="cats2-titulo">{cat.titulo}</span>
                  <span className="cats2-subtitulo">{cat.subtitulo}</span>
                </div>
                <p className="cats2-desc">{cat.descripcion}</p>

                {/* Beneficios — solo para Sprites para Cabello */}
                {cat.beneficios && (
                  <div className="cats2-beneficios">
                    {cat.beneficios.map((b, i) => (
                      <div key={i} className="cats2-beneficio" style={{ borderColor: cat.acento + "28" }}>
                        <span className="cats2-beneficio-icono">{b.icono}</span>
                        <span className="cats2-beneficio-texto">{b.texto}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="cats2-tags" style={{ marginTop: cat.beneficios ? "12px" : "0" }}>
                  {cat.tags.map((tag, i) => (
                    <span key={i} className="cats2-tag"
                      style={{ color: cat.acento, borderColor: cat.acento + "44", background: cat.acentoClaro }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Derecha */}
              <div className="cats2-right">
                <div className="cats2-emoji-wrap">{cat.emoji}</div>
                <div className="cats2-arrow">↗</div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}
