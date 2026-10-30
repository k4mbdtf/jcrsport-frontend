import { Row, Col, Form } from 'react-bootstrap'

export default function ProductFilters({ search, category, categories, onSearch, onCategory }) {
  return (
    <Row className="g-2 mb-3">
      <Col md={8}>
        <Form.Control
          type="search"
          placeholder="Buscar producto..."
          aria-label="Buscar producto"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </Col>
      <Col md={4}>
        <Form.Select aria-label="Categoría" value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Form.Select>
      </Col>
    </Row>
  )
}
