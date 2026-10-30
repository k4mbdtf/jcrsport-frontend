import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatCLP } from '../utils/format'

export default function ProductCard({ product, onAdd }) {
  const hasOffer = Boolean(product.offerPrice)
  const sinStock = product.stock <= 0

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} alt={product.name} className="product-img" />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5">{product.name}</Card.Title>
        <Card.Text className="text-muted">{product.category}</Card.Text>
        {hasOffer ? (
          <p>
            <span className="text-decoration-line-through text-muted me-2">{formatCLP(product.price)}</span>
            <strong>{formatCLP(product.offerPrice)}</strong> <Badge bg="danger">Oferta</Badge>
          </p>
        ) : (
          <p><strong>{formatCLP(product.price)}</strong></p>
        )}
        <div className="mt-auto d-flex gap-2">
          <Button as={Link} to={`/producto/${product.id}`} variant="outline-secondary" size="sm">
            Ver detalle
          </Button>
          <Button variant="dark" size="sm" disabled={sinStock} onClick={() => onAdd(product)}>
            {sinStock ? 'Sin stock' : 'Añadir'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
