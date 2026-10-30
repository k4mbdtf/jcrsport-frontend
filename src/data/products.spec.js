import {
  initialProducts,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
  getFinalPrice,
} from './products'

describe('data/products (CRUD)', () => {
  beforeEach(() => localStorage.clear())

  it('READ: carga el catalogo inicial la primera vez', () => {
    expect(getProducts().length).toBe(initialProducts.length)
  })

  it('READ: busca un producto por id (numero o texto)', () => {
    expect(getProductById(1).name).toBe('Zapatillas Running Pro')
    expect(getProductById('2').id).toBe(2)
    expect(getProductById(999)).toBeUndefined()
  })

  it('CREATE: agrega un producto con id nuevo y lo persiste', () => {
    const nuevo = createProduct({ name: 'Mochila', category: 'Accesorios', price: '15000', offerPrice: '', stock: '4' })
    expect(nuevo.id).toBe(initialProducts.length + 1)
    expect(nuevo.price).toBe(15000)
    expect(nuevo.offerPrice).toBeNull()
    expect(getProductById(nuevo.id).name).toBe('Mochila')
  })

  it('UPDATE: modifica un producto existente', () => {
    const actualizado = updateProduct(1, { price: 35000, stock: 3 })
    expect(actualizado.price).toBe(35000)
    expect(getProductById(1).stock).toBe(3)
    expect(getProductById(1).name).toBe('Zapatillas Running Pro')
  })

  it('UPDATE: devuelve null si el producto no existe', () => {
    expect(updateProduct(999, { price: 1 })).toBeNull()
  })

  it('DELETE: elimina un producto y devuelve true; si no existe devuelve false', () => {
    expect(deleteProduct(1)).toBe(true)
    expect(getProductById(1)).toBeUndefined()
    expect(deleteProduct(1)).toBe(false)
  })

  it('filterProducts filtra por texto y por categoria', () => {
    const lista = getProducts()
    expect(filterProducts(lista, 'BALON').length).toBe(1)
    expect(filterProducts(lista, 'zapatillas').length).toBe(1)
    expect(filterProducts(lista, '', 'Ropa').length).toBe(1)
    expect(filterProducts(lista, '', '').length).toBe(lista.length)
  })

  it('getFinalPrice usa el precio de oferta cuando existe', () => {
    expect(getFinalPrice({ price: 1000, offerPrice: 800 })).toBe(800)
    expect(getFinalPrice({ price: 1000, offerPrice: null })).toBe(1000)
  })
})
