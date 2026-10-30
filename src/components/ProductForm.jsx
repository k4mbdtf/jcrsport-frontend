import { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { validateProduct } from '../utils/validators'

const vacio = {
  name: '',
  category: '',
  price: '',
  offerPrice: '',
  stock: '',
  image: 'img/tienda.png',
  description: '',
}

const campos = [
  { name: 'name', label: 'Nombre', type: 'text', md: 6 },
  { name: 'category', label: 'Categoría', type: 'text', md: 6 },
  { name: 'price', label: 'Precio', type: 'number', md: 4 },
  { name: 'offerPrice', label: 'Precio oferta (opcional)', type: 'number', md: 4 },
  { name: 'stock', label: 'Stock', type: 'number', md: 4 },
  { name: 'image', label: 'Imagen (ruta)', type: 'text', md: 12 },
]

export default function ProductForm({ initial, onSave, onCancel }) {
  const [values, setValues] = useState(initial || vacio)
  const [errors, setErrors] = useState({})

  // Si cambia el producto en edicion, se cargan sus datos en el formulario
  useEffect(() => {
    setValues(initial || vacio)
    setErrors({})
  }, [initial])

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateProduct(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      onSave(values)
      if (!initial) setValues(vacio)
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate className="bg-white p-3 border mb-4">
      <h2 className="h5">{initial ? `Editar producto #${initial.id}` : 'Nuevo producto'}</h2>
      <Row>
        {campos.map((c) => (
          <Col md={c.md} key={c.name}>
            <Form.Group className="mb-2" controlId={`producto-${c.name}`}>
              <Form.Label>{c.label}</Form.Label>
              <Form.Control
                name={c.name}
                type={c.type}
                value={values[c.name] ?? ''}
                onChange={handleChange}
                isInvalid={Boolean(errors[c.name])}
              />
              {errors[c.name] && <div className="text-danger small">{errors[c.name]}</div>}
            </Form.Group>
          </Col>
        ))}
      </Row>
      <Form.Group className="mb-3" controlId="producto-description">
        <Form.Label>Descripción</Form.Label>
        <Form.Control as="textarea" rows={2} name="description" value={values.description ?? ''} onChange={handleChange} />
      </Form.Group>
      <Button type="submit" variant="dark" className="me-2">
        {initial ? 'Guardar cambios' : 'Crear producto'}
      </Button>
      {initial && (
        <Button variant="outline-secondary" onClick={onCancel}>Cancelar</Button>
      )}
    </Form>
  )
}
