import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'
import ContactForm from './ContactForm'
import CheckoutForm from './CheckoutForm'
import CartTable from './CartTable'
import ProductTable from './ProductTable'
import AppNavbar from './AppNavbar'
import { CartProvider, useCart } from '../context/CartContext'
import { mount, click, type, submit, botonConTexto } from '../tests/helpers'

const producto = {
  id: 1,
  name: 'Zapatillas Running Pro',
  category: 'Calzado',
  price: 39990,
  offerPrice: null,
  stock: 5,
  image: 'img/zapatillas.jpeg',
}

let view
afterEach(() => {
  if (view) view.unmount()
  view = null
  localStorage.clear()
})

describe('ProductCard', () => {
  const montar = (p, onAdd = () => {}) =>
    mount(<MemoryRouter><ProductCard product={p} onAdd={onAdd} /></MemoryRouter>)

  it('renderiza nombre, categoria y precio formateado', () => {
    view = montar(producto)
    expect(view.container.textContent).toContain('Zapatillas Running Pro')
    expect(view.container.textContent).toContain('Calzado')
    expect(view.container.textContent).toContain('$39.990')
  })

  it('muestra la etiqueta Oferta solo si el producto tiene precio de oferta', () => {
    view = montar(producto)
    expect(view.container.textContent).not.toContain('Oferta')
    view.unmount()
    view = montar({ ...producto, offerPrice: 29990 })
    expect(view.container.textContent).toContain('Oferta')
    expect(view.container.textContent).toContain('$29.990')
  })

  it('al hacer clic en Añadir llama a onAdd con el producto (prop de funcion)', () => {
    const onAdd = jasmine.createSpy('onAdd')
    view = montar(producto, onAdd)
    click(botonConTexto(view.container, 'Añadir'))
    expect(onAdd).toHaveBeenCalledOnceWith(producto)
  })

  it('deshabilita el boton cuando no hay stock', () => {
    view = montar({ ...producto, stock: 0 })
    expect(botonConTexto(view.container, 'Sin stock').disabled).toBeTrue()
  })
})

describe('ProductFilters', () => {
  it('avisa al padre cuando el usuario escribe o cambia la categoria', () => {
    const onSearch = jasmine.createSpy('onSearch')
    const onCategory = jasmine.createSpy('onCategory')
    view = mount(
      <ProductFilters search="" category="" categories={['Ropa', 'Calzado']} onSearch={onSearch} onCategory={onCategory} />
    )
    type(view.container.querySelector('input'), 'balon')
    type(view.container.querySelector('select'), 'Ropa')
    expect(onSearch).toHaveBeenCalledWith('balon')
    expect(onCategory).toHaveBeenCalledWith('Ropa')
    expect(view.container.querySelectorAll('option').length).toBe(3)
  })
})

describe('ContactForm', () => {
  const llenar = (c, datos) => {
    type(c.querySelector('#contacto-nombre'), datos.nombre)
    type(c.querySelector('#contacto-email'), datos.email)
    type(c.querySelector('#contacto-mensaje'), datos.mensaje)
  }

  it('no muestra mensajes de error al iniciar', () => {
    view = mount(<ContactForm onSubmit={() => {}} />)
    expect(view.container.querySelectorAll('.text-danger').length).toBe(0)
  })

  it('el estado del input cambia cuando el usuario escribe', () => {
    view = mount(<ContactForm onSubmit={() => {}} />)
    const input = view.container.querySelector('#contacto-nombre')
    type(input, 'Camilo')
    expect(input.value).toBe('Camilo')
  })

  it('con el formulario vacio muestra errores y no llama a onSubmit', () => {
    const onSubmit = jasmine.createSpy('onSubmit')
    view = mount(<ContactForm onSubmit={onSubmit} />)
    submit(view.container.querySelector('form'))
    expect(view.container.querySelectorAll('.text-danger').length).toBe(3)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('con datos validos llama a onSubmit con los valores', () => {
    const onSubmit = jasmine.createSpy('onSubmit')
    view = mount(<ContactForm onSubmit={onSubmit} />)
    llenar(view.container, { nombre: 'Camilo Bernales', email: 'camilo@duoc.cl', mensaje: 'Quiero cotizar zapatillas' })
    submit(view.container.querySelector('form'))
    expect(onSubmit).toHaveBeenCalledWith(jasmine.objectContaining({ nombre: 'Camilo Bernales', email: 'camilo@duoc.cl' }))
    expect(view.container.querySelectorAll('.text-danger').length).toBe(0)
  })
})

describe('CheckoutForm', () => {
  it('valida los datos y llama a onPay solo cuando son correctos', () => {
    const onPay = jasmine.createSpy('onPay')
    view = mount(<CheckoutForm total={50000} onPay={onPay} />)
    expect(view.container.textContent).toContain('$50.000')
    submit(view.container.querySelector('form'))
    expect(onPay).not.toHaveBeenCalled()
    type(view.container.querySelector('#checkout-nombre'), 'Camilo Bernales')
    type(view.container.querySelector('#checkout-email'), 'camilo@duoc.cl')
    type(view.container.querySelector('#checkout-calle'), 'Los Olmos 123')
    type(view.container.querySelector('#checkout-comuna'), 'Maipu')
    submit(view.container.querySelector('form'))
    expect(onPay).toHaveBeenCalledWith(jasmine.objectContaining({ comuna: 'Maipu', resultadoPago: 'ok' }))
  })
})

describe('CartTable', () => {
  const items = [
    { id: 1, name: 'Zapatillas', price: 1000, qty: 2 },
    { id: 2, name: 'Balon', price: 500, qty: 1 },
  ]

  it('renderiza una fila por cada producto del carrito', () => {
    view = mount(<CartTable items={items} onRemove={() => {}} onQty={() => {}} />)
    expect(view.container.querySelectorAll('tbody tr').length).toBe(2)
    expect(view.container.textContent).toContain('$2.000')
  })

  it('al eliminar o cambiar la cantidad avisa con el id del producto', () => {
    const onRemove = jasmine.createSpy('onRemove')
    const onQty = jasmine.createSpy('onQty')
    view = mount(<CartTable items={items} onRemove={onRemove} onQty={onQty} />)
    click(view.container.querySelectorAll('button')[1])
    type(view.container.querySelectorAll('input')[0], '4')
    expect(onRemove).toHaveBeenCalledWith(2)
    expect(onQty).toHaveBeenCalledWith(1, 4)
  })
})

describe('ProductTable (admin)', () => {
  it('lista los productos y avisa al editar o eliminar', () => {
    const onEdit = jasmine.createSpy('onEdit')
    const onDelete = jasmine.createSpy('onDelete')
    view = mount(<ProductTable products={[producto]} onEdit={onEdit} onDelete={onDelete} />)
    expect(view.container.querySelectorAll('tbody tr').length).toBe(1)
    click(botonConTexto(view.container, 'Editar'))
    click(botonConTexto(view.container, 'Eliminar'))
    expect(onEdit).toHaveBeenCalledWith(producto)
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})

describe('CartContext + AppNavbar (integracion)', () => {
  function Probe() {
    const { addToCart } = useCart()
    return <button onClick={() => addToCart(producto, 2)}>probar</button>
  }

  it('el navbar muestra la cantidad de productos guardada en localStorage', () => {
    localStorage.setItem('jcr_cart', JSON.stringify([{ id: 1, name: 'x', price: 100, image: '', qty: 2 }, { id: 2, name: 'y', price: 50, image: '', qty: 3 }]))
    view = mount(<CartProvider><MemoryRouter><AppNavbar /></MemoryRouter></CartProvider>)
    expect(view.container.querySelector('[data-testid="cart-count"]').textContent).toBe('5')
  })

  it('al agregar un producto el contador del navbar se actualiza', () => {
    view = mount(<CartProvider><MemoryRouter><AppNavbar /><Probe /></MemoryRouter></CartProvider>)
    expect(view.container.querySelector('[data-testid="cart-count"]').textContent).toBe('0')
    click(botonConTexto(view.container, 'probar'))
    expect(view.container.querySelector('[data-testid="cart-count"]').textContent).toBe('2')
  })
})
