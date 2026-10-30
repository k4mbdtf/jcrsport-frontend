import { useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { getProducts } from '../data/products'

export default function Ofertas() {
  const [ofertas] = useState(() => getProducts().filter((p) => p.offerPrice))
  const { addToCart } = useCart()

  return (
    <>
      <h1 className="h3">Ofertas</h1>
      {ofertas.length === 0 ? (
        <Alert variant="info">Por ahora no hay productos en oferta.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {ofertas.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} onAdd={addToCart} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
