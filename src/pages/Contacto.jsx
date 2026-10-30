import { useState } from 'react'
import { Row, Col, Alert } from 'react-bootstrap'
import ContactForm from '../components/ContactForm'

export default function Contacto() {
  const [enviado, setEnviado] = useState(null)

  return (
    <Row>
      <Col md={7}>
        <h1 className="h3">Contáctanos</h1>
        {enviado && (
          <Alert variant="success">Gracias {enviado.nombre}, recibimos tu mensaje.</Alert>
        )}
        <ContactForm onSubmit={setEnviado} />
      </Col>
      <Col md={5}>
        <h2 className="h5 mt-4 mt-md-0">Síguenos en nuestras redes</h2>
        <ul>
          <li><a href="https://www.instagram.com/k4mbdtf">Instagram</a></li>
          <li><a href="https://www.facebook.com/">Facebook</a></li>
        </ul>
      </Col>
    </Row>
  )
}
