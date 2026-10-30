import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { validateCheckout } from '../utils/validators'
import { formatCLP } from '../utils/format'

const inicial = {
  nombre: '',
  email: '',
  calle: '',
  comuna: '',
  indicaciones: '',
  resultadoPago: 'ok',
}

const campos = [
  { name: 'nombre', label: 'Nombre completo', type: 'text' },
  { name: 'email', label: 'Correo electrónico', type: 'email' },
  { name: 'calle', label: 'Calle y número', type: 'text' },
  { name: 'comuna', label: 'Comuna', type: 'text' },
]

export default function CheckoutForm({ total, onPay }) {
  const [values, setValues] = useState(inicial)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validateCheckout(values)
    setErrors(found)
    if (Object.keys(found).length === 0) onPay(values)
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {campos.map((c) => (
        <Form.Group className="mb-2" key={c.name} controlId={`checkout-${c.name}`}>
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
      <Form.Group className="mb-2" controlId="checkout-indicaciones">
        <Form.Label>Indicaciones para la entrega (opcional)</Form.Label>
        <Form.Control as="textarea" rows={2} name="indicaciones" value={values.indicaciones} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="checkout-resultadoPago">
        <Form.Label>Resultado del pago </Form.Label>
        <Form.Select name="resultadoPago" value={values.resultadoPago} onChange={handleChange}>
          <option value="ok">Pago correcto</option>
          <option value="error">Pago con error</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit" variant="success">Pagar ahora {formatCLP(total)}</Button>
    </Form>
  )
}
