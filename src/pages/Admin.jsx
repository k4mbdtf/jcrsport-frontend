import { useState } from 'react'
import ProductForm from '../components/ProductForm'
import ProductTable from '../components/ProductTable'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../data/products'

export default function Admin() {
  const [products, setProducts] = useState(() => getProducts())
  const [editing, setEditing] = useState(null)

  const refresh = () => setProducts(getProducts())

  const handleSave = (values) => {
    if (editing) updateProduct(editing.id, values)
    else createProduct(values)
    setEditing(null)
    refresh()
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      deleteProduct(id)
      refresh()
    }
  }

  return (
    <>
      <h1 className="h3">Panel de administración - Productos</h1>
      <ProductForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      <ProductTable products={products} onEdit={setEditing} onDelete={handleDelete} />
    </>
  )
}
