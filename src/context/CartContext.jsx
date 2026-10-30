import { createContext, useContext, useEffect, useReducer } from 'react'
import { cartReducer, initialCart, cartTotal, cartCount } from './cartReducer'
import { getFinalPrice } from '../data/products'
import { load, save } from '../utils/storage'

const CART_KEY = 'jcr_cart'
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart, (init) => ({
    items: load(CART_KEY, init.items),
  }))

  // El carrito se guarda solo cada vez que cambia
  useEffect(() => {
    save(CART_KEY, state.items)
  }, [state.items])

  const value = {
    items: state.items,
    total: cartTotal(state.items),
    count: cartCount(state.items),
    addToCart: (product, qty = 1) =>
      dispatch({ type: 'ADD', product: { ...product, price: getFinalPrice(product) }, qty }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
    setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
