import { useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import { useCart } from '../context/CartContext'
import { getProducts, filterProducts } from '../data/products'

export default function Productos() {
  const [products] = useState(() => getProducts())
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const { addToCart } = useCart()

  const categories = [...new Set(products.map((p) => p.category))]
  const visibles = filterProducts(products, search, category)

  return (
    <>
      <h1 className="h3">Catálogo de productos</h1>
      <ProductFilters
        search={search}
        category={category}
        categories={categories}
        onSearch={setSearch}
        onCategory={setCategory}
      />
      {visibles.length === 0 ? (
        <Alert variant="warning">No se encontraron productos.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {visibles.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} onAdd={addToCart} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
