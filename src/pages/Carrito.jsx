import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartTable from '../components/CartTable'
import { useCart } from '../context/CartContext'
import { formatCLP } from '../utils/format'

export default function Carrito() {
  const { items, total, removeFromCart, setQty, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <Alert variant="info">
        Tu carrito está vacío. <Link to="/productos">Ir al catálogo</Link>
      </Alert>
    )
  }

  return (
    <>
      <h1 className="h3">Carrito de compras</h1>
      <CartTable items={items} onRemove={removeFromCart} onQty={setQty} />
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="outline-secondary" onClick={clearCart}>Vaciar carrito</Button>
        <div>
          <strong className="me-3">Total: {formatCLP(total)}</strong>
          <Button as={Link} to="/checkout" variant="success">Ir a pagar</Button>
        </div>
      </div>
    </>
  )
}
