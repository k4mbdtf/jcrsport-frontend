// Reducer puro del carrito (facil de probar)
export const initialCart = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, qty = 1 } = action
      const exists = state.items.find((i) => i.id === product.id)
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i)),
        }
      }
      const item = { id: product.id, name: product.name, price: product.price, image: product.image, qty }
      return { ...state, items: [...state.items, item] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'SET_QTY':
      if (action.qty <= 0) return { ...state, items: state.items.filter((i) => i.id !== action.id) }
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i)),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export const cartTotal = (items) => items.reduce((sum, i) => sum + i.price * i.qty, 0)
export const cartCount = (items) => items.reduce((sum, i) => sum + i.qty, 0)
