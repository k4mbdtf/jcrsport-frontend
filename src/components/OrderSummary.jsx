import { Table } from 'react-bootstrap'
import { formatCLP } from '../utils/format'

export default function OrderSummary({ order }) {
  const { customer } = order
  return (
    <>
      <p className="mb-1"><strong>Cliente:</strong> {customer.nombre} ({customer.email})</p>
      <p className="mb-1"><strong>Dirección:</strong> {customer.calle}, {customer.comuna}</p>
      {customer.indicaciones && <p className="mb-1"><strong>Indicaciones:</strong> {customer.indicaciones}</p>}
      <Table responsive bordered size="sm" className="bg-white mt-3">
        <thead>
          <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          {order.items.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>{formatCLP(i.price)}</td>
              <td>{i.qty}</td>
              <td>{formatCLP(i.price * i.qty)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="h5">Total: {formatCLP(order.total)}</p>
    </>
  )
}
