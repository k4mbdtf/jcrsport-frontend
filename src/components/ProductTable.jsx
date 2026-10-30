import { Table, Button } from 'react-bootstrap'
import { formatCLP } from '../utils/format'

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <Table striped bordered responsive size="sm" className="bg-white">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Oferta</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{formatCLP(p.price)}</td>
            <td>{p.offerPrice ? formatCLP(p.offerPrice) : '-'}</td>
            <td>{p.stock}</td>
            <td>
              <Button variant="outline-primary" size="sm" className="me-1" onClick={() => onEdit(p)}>
                Editar
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(p.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
