export const calcularDistancia = (origem, destino) => {
  if (!origem || !destino) return 0
  const hash = (origem + destino).split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return Math.abs(hash % 1000) + 100
}
