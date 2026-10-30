import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { getProducts } from '../data/products'

export default function Inicio() {
  const [destacados] = useState(() => getProducts().slice(0, 3))
  const { addToCart } = useCart()

  return (
    <>
      <div className="text-center mb-4">
        <h1>Bienvenido a JCRSport</h1>
        <p>Todo lo que necesitas para entrenar: ropa, calzado y accesorios deportivos.</p>
        <img src="img/tienda.png" alt="Tienda JCRSport" className="hero-img mb-3" />
        <div>
          <Button as={Link} to="/productos" variant="dark">Ver catálogo</Button>
        </div>
      </div>
      <h2 className="h4">Productos destacados</h2>
      <Row xs={1} sm={2} md={3} className="g-3">
        {destacados.map((p) => (
          <Col key={p.id}>
            <ProductCard product={p} onAdd={addToCart} />
          </Col>
        ))}
      </Row>
    </>
  )
}
