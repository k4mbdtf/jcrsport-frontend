import { useState } from 'react'
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProductById, getFinalPrice } from '../data/products'
import { formatCLP } from '../utils/format'

export default function Detalle() {
  const { id } = useParams()
  const product = getProductById(id)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <Alert variant="danger">
        Producto no encontrado. <Link to="/productos">Volver al catálogo</Link>
      </Alert>
    )
  }

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
  }

  return (
    <Row>
      <Col md={5}>
        <img src={product.image} alt={product.name} className="img-fluid mb-3" />
      </Col>
      <Col md={7}>
        <h1 className="h3">{product.name}</h1>
        <p className="text-muted">{product.category}</p>
        <p>{product.description}</p>
        <p className="h4">{formatCLP(getFinalPrice(product))}</p>
        <p>Stock disponible: {product.stock}</p>
        <Form.Control
          type="number"
          min="1"
          max={product.stock}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          aria-label="Cantidad"
          style={{ width: 100 }}
          className="mb-2"
        />
        <Button variant="dark" disabled={product.stock <= 0} onClick={handleAdd}>
          Añadir al carrito
        </Button>
        {added && (
          <Alert variant="success" className="mt-3">
            Producto añadido al carrito. <Link to="/carrito">Ver carrito</Link>
          </Alert>
        )}
      </Col>
    </Row>
  )
}
