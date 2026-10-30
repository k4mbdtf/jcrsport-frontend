// Ordenes de compra simuladas (persisten en localStorage)
import { load, save } from '../utils/storage'

const KEY = 'jcr_orders'

export const getOrders = () => load(KEY, [])

export const getOrderById = (id) => getOrders().find((o) => String(o.id) === String(id))

export function createOrder({ customer, items, total, status }) {
  const list = getOrders()
  const id = list.reduce((max, o) => Math.max(max, o.id), 1000) + 1
  const order = { id, date: new Date().toISOString(), customer, items, total, status }
  save(KEY, [...list, order])
  return order
}
