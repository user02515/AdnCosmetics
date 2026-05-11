import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ACercaDe from './pages/sobre-nosotros.jsx'
import Home from './pages/home.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<ACercaDe />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App