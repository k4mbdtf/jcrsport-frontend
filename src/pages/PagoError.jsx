import { Alert, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary'
import { getOrderById } from '../data/orders'

export default function PagoError() {
  const { id } = useParams()
  const order = getOrderById(id)

  if (!order) return <Alert variant="danger">No se encontró la orden.</Alert>

  return (
    <>
      <h1 className="h3 text-danger">No se pudo realizar el pago. Nro #{order.id}</h1>
      <Button as={Link} to="/checkout" variant="success" className="mb-3">
        Volver a realizar el pago
      </Button>
      <OrderSummary order={order} />
    </>
  )
}
