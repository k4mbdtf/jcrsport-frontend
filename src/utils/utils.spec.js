import { formatCLP } from './format'
import { load, save } from './storage'
import { isEmail, validateContact, validateCheckout, validateProduct } from './validators'

describe('format', () => {
  it('formatCLP agrega separador de miles', () => {
    expect(formatCLP(39990)).toBe('$39.990')
    expect(formatCLP(1250000)).toBe('$1.250.000')
    expect(formatCLP(0)).toBe('$0')
  })
})

describe('validators', () => {
  it('isEmail acepta correos validos y rechaza invalidos', () => {
    expect(isEmail('camilo@duoc.cl')).toBeTrue()
    expect(isEmail('camilo@')).toBeFalse()
    expect(isEmail('')).toBeFalse()
  })

  it('validateContact no devuelve errores con datos validos', () => {
    const datos = { nombre: 'Camilo B', email: 'a@b.cl', telefono: '', mensaje: 'Hola, quiero consultar un producto' }
    expect(validateContact(datos)).toEqual({})
  })

  it('validateContact detecta campos invalidos', () => {
    const errores = validateContact({ nombre: 'ab', email: 'x', telefono: '12', mensaje: 'corto' })
    expect(Object.keys(errores).sort()).toEqual(['email', 'mensaje', 'nombre', 'telefono'])
  })

  it('validateCheckout exige nombre, correo, calle y comuna', () => {
    expect(Object.keys(validateCheckout({})).length).toBe(4)
    const ok = { nombre: 'Camilo', email: 'a@b.cl', calle: 'Los Olmos 123', comuna: 'Maipu' }
    expect(validateCheckout(ok)).toEqual({})
  })

  it('validateProduct revisa precio, oferta y stock', () => {
    const base = { name: 'Mochila', category: 'Accesorios', price: '1000', offerPrice: '', stock: '2' }
    expect(validateProduct(base)).toEqual({})
    expect(validateProduct({ ...base, price: '0' }).price).toBeDefined()
    expect(validateProduct({ ...base, offerPrice: '1500' }).offerPrice).toBeDefined()
    expect(validateProduct({ ...base, stock: '-1' }).stock).toBeDefined()
  })
})

describe('storage (con mocks)', () => {
  it('save guarda el valor como JSON usando localStorage.setItem', () => {
    const espia = spyOn(Storage.prototype, 'setItem')
    save('clave', { a: 1 })
    expect(espia).toHaveBeenCalledWith('clave', '{"a":1}')
  })

  it('load devuelve el valor guardado', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('[1,2,3]')
    expect(load('clave', [])).toEqual([1, 2, 3])
  })

  it('load devuelve el valor por defecto si el JSON esta danado', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es json')
    expect(load('clave', 'por-defecto')).toBe('por-defecto')
  })
})
