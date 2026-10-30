// Carga automaticamente todas las pruebas (*.spec.js / *.spec.jsx)
const context = import.meta.webpackContext('..', { recursive: true, regExp: /\.spec\.jsx?$/ })
context.keys().forEach(context)
