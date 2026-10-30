export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
export const isPhone = (v) => /^\+?\d{8,12}$/.test(String(v || '').replace(/[\s-]/g, ''))
 
export function validateContact({ nombre, email, telefono, mensaje }) {
  const errors = {}
  if (!nombre || nombre.trim().length < 3) errors.nombre = 'El nombre debe tener al menos 3 caracteres'
  if (!isEmail(email)) errors.email = 'Ingresa un correo válido'
  if (telefono && !isPhone(telefono)) errors.telefono = 'Teléfono no válido (8 a 12 digitos)'
  if (!mensaje || mensaje.trim().length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
  return errors
}
 
export function validateCheckout({ nombre, email, calle, comuna }) {
  const errors = {}
  if (!nombre || nombre.trim().length < 3) errors.nombre = 'El nombre debe tener al menos 3 caracteres'
  if (!isEmail(email)) errors.email = 'Ingresa un correo válido'
  if (!calle || calle.trim().length < 3) errors.calle = 'Ingresa la calle y número'
  if (!comuna || !comuna.trim()) errors.comuna = 'Ingresa la comuna'
  return errors
}
 
export function validateProduct({ name, category, price, offerPrice, stock }) {
  const errors = {}
  if (!name || name.trim().length < 3) errors.name = 'El nombre debe tener al menos 3 caracteres'
  if (!category || !category.trim()) errors.category = 'La categoría es obligatoria'
  if (!(Number(price) > 0)) errors.price = 'El precio debe ser mayor a 0'
  const hasOffer = offerPrice !== '' && offerPrice !== null && offerPrice !== undefined
  if (hasOffer && !(Number(offerPrice) > 0 && Number(offerPrice) < Number(price))) {
    errors.offerPrice = 'La oferta debe ser mayor a 0 y menor al precio'
  }
  if (stock === '' || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
    errors.stock = 'El stock debe ser un entero mayor o igual a 0'
  }
  return errors
}
