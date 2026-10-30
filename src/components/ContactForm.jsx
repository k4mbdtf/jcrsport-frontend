import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { validateContact } from '../utils/validators'

const vacio = { nombre: '', email: '', telefono: '', mensaje: '' }

const campos = [
  { name: 'nombre', label: 'Nombre completo', type: 'text' },
  { name: 'email', label: 'Correo electrónico', type: 'email' },
  { name: 'telefono', label: 'Teléfono (opcional)', type: 'tel' },
]

export default function ContactForm({ onSubmit }) {
  const [values, setValues] = useState(vacio)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      onSubmit(values)
      setValues(vacio)
    }
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {campos.map((c) => (
        <Form.Group className="mb-2" key={c.name} controlId={`contacto-${c.name}`}>
          <Form.Label>{c.label}</Form.Label>
          <Form.Control
            name={c.name}
            type={c.type}
            value={values[c.name]}
            onChange={handleChange}
            isInvalid={Boolean(errors[c.name])}
          />
          {errors[c.name] && <div className="text-danger small">{errors[c.name]}</div>}
        </Form.Group>
      ))}
      <Form.Group className="mb-3" controlId="contacto-mensaje">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="mensaje"
          value={values.mensaje}
          onChange={handleChange}
          isInvalid={Boolean(errors.mensaje)}
        />
        {errors.mensaje && <div className="text-danger small">{errors.mensaje}</div>}
      </Form.Group>
      <Button type="submit" variant="dark">Enviar</Button>
    </Form>
  )
}
