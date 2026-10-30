// Formatea un numero como pesos chilenos: 39990 -> $39.990
export const formatCLP = (n) =>
  '$' + String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
