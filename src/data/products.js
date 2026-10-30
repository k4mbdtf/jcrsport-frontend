// "Base de datos" simulada de productos + CRUD. Persiste en localStorage.
import { load, save } from '../utils/storage'
 
const KEY = 'jcr_products'
 
export const initialProducts = [
  {
    id: 1,
    name: 'Camiseta Colo Colo Entrenamiento 2026',
    category: 'Ropa',
    price: 64990,
    offerPrice: null,
    stock: 10,
    image: 'img/camisetacolocolo.jpg',
    description: 'Camiseta de entrenamiento de Colo Colo, temporada 2026.',
  },
  {
    id: 2,
    name: 'Hoodie Total 90 Negro',
    category: 'Ropa',
    price: 48990,
    offerPrice: null,
    stock: 10,
    image: 'img/hoodietotal90.jpg',
    description: 'Hoodie negro Total 90, cómodo y abrigado.',
  },
  {
    id: 3,
    name: 'Pantalón Adidas Stadium',
    category: 'Ropa',
    price: 38990,
    offerPrice: null,
    stock: 10,
    image: 'img/pantalonstadium.jpg',
    description: 'Pantalón deportivo Adidas Stadium.',
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
