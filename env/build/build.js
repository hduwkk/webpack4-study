const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.config.js')
const ora = require('ora')
const chalk = require('chalk')
const rm = require('rimraf')
const path = require('path')

const spinner = ora('building for production...')
spinner.start()

function run() {
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err

        if (stats.hasErrors()) {
            console.log(chalk.red(' Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan(' Build complete.\n'))
        console.log(chalk.yellow('chalk.yellow .. ..'))
    })
}

rm(path.resolve(__dirname, '../dist'), function callback (err) {
    if (err) { console.log(err); throw err;}
    run()
})
