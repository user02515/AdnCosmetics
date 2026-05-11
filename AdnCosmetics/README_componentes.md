# VDN Cosmetics — Componentes del Equipo

## Archivos disponibles

| Archivo        | Descripción                          | Responsable |
|----------------|--------------------------------------|-------------|
| `Navbar.jsx`   | Barra de navegación superior fija    | Tu compañero/a |
| `Footer.jsx`   | Pie de página con links y contacto   | Tu compañero/a |
| `colors.js`    | Variables de colores y fuentes       | Compartido  |

---

## Cómo importar en App.jsx (o donde lo necesiten)

```jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      {/* El contenido de su sección va aquí */}
      <main>
        <section id="inicio">...</section>
        <section id="productos">...</section>
        <section id="marcas">...</section>
        <section id="nosotros">...</section>
        <section id="contacto">...</section>
      </main>

      <Footer />
    </>
  );
}
```

---

## IDs de sección que deben respetar todos

Para que los links de la navbar funcionen correctamente,
cada sección del proyecto debe tener estos IDs:

| Sección              | ID            |
|----------------------|---------------|
| Inicio / Hero        | `#inicio`     |
| Categorías           | `#productos`  |
| Marcas               | `#marcas`     |
| Acerca de Nosotros   | `#nosotros`   |
| Contacto             | `#contacto`   |

---

## Fuentes necesarias en index.html

Pegar dentro del `<head>` del archivo `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

---

## Colores principales (colors.js)

```js
pinkHot:   "#ff3d8b"   // Rosa fuerte — color principal
pinkSoft:  "#ff80b5"   // Rosa suave
blueDeep:  "#0b1560"   // Azul oscuro
blueVivid: "#2547e0"   // Azul medio
blueSky:   "#4e78ff"   // Azul cielo
blueGlow:  "#7aa0ff"   // Azul brillante
dark:      "#07091f"   // Fondo oscuro
```
