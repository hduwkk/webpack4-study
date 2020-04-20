// import './index.scss'
// import a from './js/a.js'
// import b from './js/b.js'
// import jpg from './imgs/a.jpg'
import json from './demo.json'
console.log(666)
console.log(json)
document.addEventListener('click', function () {
  import('./js/a.js').then(a => {
    if (a && a.say) {
      a.say()
    }
  })
  console.log(json)
  // const img = document.createElement('img')
  // img.src = jpg
  // img.style.display = 'block'
  // img.style.width = '100px'
  // document.body.append(img)
})
