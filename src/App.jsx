import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import ACercaDe from './pages/sobre-nosotros.jsx'
import Home from './pages/home.jsx'
import Categoria from './pages/Categorias.jsx'

function App() {
  return (
    <>
      {/* ── NAVBAR ── */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<ACercaDe />} />

        {/* NUEVA PAGINA */}
        <Route path="/categorias" element={<Categoria />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App