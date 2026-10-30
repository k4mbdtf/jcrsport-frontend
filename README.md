# JCRSport - Frontend (EvaluaciÃ³n Parcial 2, DSY1104)

Tienda deportiva hecha con **React + Vite + Bootstrap (react-bootstrap)**, con pruebas unitarias en **Jasmine + Karma**.

## Ejecutar

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de produccion
```

## Pruebas y cobertura

```bash
npm test           # Karma + Jasmine en ChromeHeadless (requiere Chrome)
npm run test:jsdom # mismas pruebas sin navegador (jsdom)
```

El reporte de cobertura queda en `coverage/html/index.html`.

## Estructura

- `src/pages/`: Inicio, Productos, Detalle, Ofertas, Nosotros, Contacto, Carrito, Checkout, PagoExitoso, PagoError, Admin
- `src/components/`: AppNavbar, Footer, ProductCard, ProductFilters, CartTable, ContactForm, CheckoutForm, OrderSummary, ProductForm, ProductTable
- `src/context/`: estado global del carrito (`useReducer` + Context) y `cartReducer` puro
- `src/data/`: `products.js` (CRUD) y `orders.js`, con persistencia en localStorage
- `src/utils/`: formato de precios, validadores y acceso a localStorage
- `src/**/*.spec.js(x)`: pruebas Jasmine

## Rutas

`/` `/productos` `/producto/:id` `/ofertas` `/nosotros` `/contacto` `/carrito` `/checkout` `/pago-exitoso/:id` `/pago-error/:id` `/admin`
