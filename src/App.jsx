import { HashRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { CartProvider } from './context/CartContext'
import AppNavbar from './components/AppNavbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Detalle from './pages/Detalle'
import Ofertas from './pages/Ofertas'
import Nosotros from './pages/Nosotros'

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <AppNavbar />
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<Detalle />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </Container>
        <Footer />
      </HashRouter>
    </CartProvider>
  )
}
