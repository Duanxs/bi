export function genId(size = 16) {
  const str = '0123456789abcdef'
  let res = ''
  for (let i = 0; i < size; i++) {
    res += str[~~(str.length * Math.random())]
  }
  return res
}
