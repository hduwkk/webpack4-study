let webpack = require('webpack')
let config = require('./webpack.config')

let comiple = webpack(config)

comiple.run()