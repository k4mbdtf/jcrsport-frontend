import { Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CartTable from '../components/CartTable'
import CheckoutForm from '../components/CheckoutForm'
import { useCart } from '../context/CartContext'
import { createOrder } from '../data/orders'

export default function Checkout() {
  const { items, total, removeFromCart, setQty, clearCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <Alert variant="info">
        No hay productos para pagar. <Link to="/productos">Ir al catálogo</Link>
      </Alert>
    )
  }

  const handlePay = (customer) => {
    const pagado = customer.resultadoPago !== 'error'
    const order = createOrder({ customer, items, total, status: pagado ? 'pagada' : 'error' })
    if (pagado) {
      clearCart()
      navigate(`/pago-exitoso/${order.id}`)
    } else {
      navigate(`/pago-error/${order.id}`)
    }
  }

  return (
    <>
      <h1 className="h3">Checkout</h1>
      <CartTable items={items} onRemove={removeFromCart} onQty={setQty} />
      <h2 className="h5">Datos de entrega</h2>
      <CheckoutForm total={total} onPay={handlePay} />
    </>
  )
}
