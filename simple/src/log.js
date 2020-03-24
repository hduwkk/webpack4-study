const createLog = function (prefix) {
  return function (str) {
    console.log(`[${prefix}]: ${str}`)
  }
}
export const lineLog = function (a, b) {
  console.log(`${b}-------------开始`)
  console.log(`${a}----------------`)
  console.log(`${b}-------------结束`)
}
export default createLog
