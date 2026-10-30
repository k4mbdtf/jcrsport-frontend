import { Table, Button, Form } from 'react-bootstrap'
import { formatCLP } from '../utils/format'

export default function CartTable({ items, onRemove, onQty }) {
  return (
    <Table responsive bordered size="sm" className="bg-white">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((i) => (
          <tr key={i.id}>
            <td>{i.name}</td>
            <td>{formatCLP(i.price)}</td>
            <td style={{ width: 110 }}>
              <Form.Control
                type="number"
                min="1"
                size="sm"
                value={i.qty}
                aria-label={`Cantidad de ${i.name}`}
                onChange={(e) => onQty(i.id, Math.max(1, Number(e.target.value) || 1))}
              />
            </td>
            <td>{formatCLP(i.price * i.qty)}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => onRemove(i.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
