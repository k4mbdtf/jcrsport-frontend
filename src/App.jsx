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
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import PagoExitoso from './pages/PagoExitoso'
import PagoError from './pages/PagoError'
import Admin from './pages/Admin'

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
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pago-exitoso/:id" element={<PagoExitoso />} />
            <Route path="/pago-error/:id" element={<PagoError />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </Container>
        <Footer />
      </HashRouter>
    </CartProvider>
  )
}
