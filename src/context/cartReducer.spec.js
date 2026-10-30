import { cartReducer, initialCart, cartTotal, cartCount } from './cartReducer'

describe('cartReducer', () => {
  const zapatillas = { id: 1, name: 'Zapatillas', price: 1000, image: 'a.jpg' }
  const balon = { id: 2, name: 'Balon', price: 500, image: 'b.jpg' }

  it('agrega un producto nuevo con cantidad 1', () => {
    const state = cartReducer(initialCart, { type: 'ADD', product: zapatillas })
    expect(state.items.length).toBe(1)
    expect(state.items[0].qty).toBe(1)
  })

  it('si el producto ya existe, suma la cantidad', () => {
    let state = cartReducer(initialCart, { type: 'ADD', product: zapatillas })
    state = cartReducer(state, { type: 'ADD', product: zapatillas, qty: 2 })
    expect(state.items.length).toBe(1)
    expect(state.items[0].qty).toBe(3)
  })

  it('elimina un producto', () => {
    let state = cartReducer(initialCart, { type: 'ADD', product: zapatillas })
    state = cartReducer(state, { type: 'ADD', product: balon })
    state = cartReducer(state, { type: 'REMOVE', id: 1 })
    expect(state.items.map((i) => i.id)).toEqual([2])
  })

  it('SET_QTY cambia la cantidad y con 0 elimina el producto', () => {
    let state = cartReducer(initialCart, { type: 'ADD', product: zapatillas })
    state = cartReducer(state, { type: 'SET_QTY', id: 1, qty: 5 })
    expect(state.items[0].qty).toBe(5)
    state = cartReducer(state, { type: 'SET_QTY', id: 1, qty: 0 })
    expect(state.items.length).toBe(0)
  })

  it('CLEAR vacia el carrito', () => {
    let state = cartReducer(initialCart, { type: 'ADD', product: zapatillas })
    state = cartReducer(state, { type: 'CLEAR' })
    expect(state.items).toEqual([])
  })

  it('calcula total y cantidad de productos', () => {
    const items = [
      { id: 1, price: 1000, qty: 2 },
      { id: 2, price: 500, qty: 3 },
    ]
    expect(cartTotal(items)).toBe(3500)
    expect(cartCount(items)).toBe(5)
  })

  it('una accion desconocida no cambia el estado', () => {
    const state = cartReducer(initialCart, { type: 'OTRA' })
    expect(state).toBe(initialCart)
  })
})
