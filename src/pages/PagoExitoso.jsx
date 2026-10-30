import { Alert, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import OrderSummary from '../components/OrderSummary'
import { getOrderById } from '../data/orders'

export default function PagoExitoso() {
  const { id } = useParams()
  const order = getOrderById(id)

  if (!order) return <Alert variant="danger">No se encontró la orden.</Alert>

  return (
    <>
      <h1 className="h3 text-success">Se ha realizado la compra. Nro #{order.id}</h1>
      <OrderSummary order={order} />
      <Button variant="outline-secondary" className="me-2" onClick={() => window.print()}>
        Imprimir boleta
      </Button>
      <Button as={Link} to="/" variant="dark">Volver al inicio</Button>
    </>
  )
}
