// function loader(src) {
//   console.log(src, 'src')
//   return src
// }

// exports.default = loader
// exports.raw = false

module.exports = function loader(src) {
  console.log(src, 'src')
  return src
}
