// "Base de datos" simulada de productos + CRUD. Persiste en localStorage.
import { load, save } from '../utils/storage'
 
const KEY = 'jcr_products'
 
export const initialProducts = [
  {
    id: 1,
    name: 'Zapatillas Running Pro',
    category: 'Calzado',
    price: 39990,
    offerPrice: null,
    stock: 10,
    image: 'img/zapatillas.jpeg',
    description: 'Zapatillas livianas para running, con buena amortiguación.',
  },
  {
    id: 2,
    name: 'Balón de Fútbol N°5',
    category: 'Balones',
    price: 14990,
    offerPrice: 11990,
    stock: 25,
    image: 'img/balon.jpg',
    description: 'Balón de fútbol tamaño oficial N°5.',
  },
  {
    id: 3,
    name: 'Polera Deportiva Kappa',
    category: 'Ropa',
    price: 129990,
    offerPrice: null,
    stock: 8,
    image: 'img/polera.jpg',
    description: 'Polera deportiva Kappa, tela que respira.',
  },
  {
    id: 4,
    name: 'Set de Pesas 10kg',
    category: 'Entrenamiento',
    price: 24990,
    offerPrice: 21990,
    stock: 0,
    image: 'img/pesas.jpg',
    description: 'Set de pesas de 10kg para entrenar en casa.',
  },
]
 
const normalize = (data) => ({
  name: String(data.name).trim(),
  category: String(data.category).trim(),
  price: Number(data.price),
  offerPrice:
    data.offerPrice === '' || data.offerPrice === null || data.offerPrice === undefined
      ? null
      : Number(data.offerPrice),
  stock: Number(data.stock),
  image: data.image || 'img/tienda.png',
  description: data.description || '',
})
 
// READ
export function getProducts() {
  const list = load(KEY, null)
  if (!list) {
    save(KEY, initialProducts)
    return [...initialProducts]
  }
  return list
}
 
export const getProductById = (id) => getProducts().find((p) => String(p.id) === String(id))
 
// CREATE
export function createProduct(data) {
  const list = getProducts()
  const id = list.reduce((max, p) => Math.max(max, p.id), 0) + 1
  const product = { ...normalize(data), id }
  save(KEY, [...list, product])
  return product
}
 
// UPDATE (devuelve el producto actualizado o null si no existe)
export function updateProduct(id, changes) {
  const list = getProducts()
  const current = list.find((p) => String(p.id) === String(id))
  if (!current) return null
  const updated = { ...normalize({ ...current, ...changes }), id: current.id }
  save(KEY, list.map((p) => (p.id === current.id ? updated : p)))
  return updated
}
 
// DELETE (devuelve true si elimino algo)
export function deleteProduct(id) {
  const list = getProducts()
  const rest = list.filter((p) => String(p.id) !== String(id))
  if (rest.length === list.length) return false
  save(KEY, rest)
  return true
}
 
// Utilidades puras
export const getFinalPrice = (p) => (p.offerPrice ? p.offerPrice : p.price)
 
// Compara sin importar mayusculas ni tildes (balon = Balón)
const plain = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
 
export function filterProducts(list, search = '', category = '') {
  const text = plain(search.trim())
  return list.filter(
    (p) => (!text || plain(p.name).includes(text)) && (!category || p.category === category)
  )
}
