# url-loader 与 file-loader

url-loader 可以将小图片转为 base-64 格式，大图片通过 fallback 传递给 file-loader 处理(fallback 的默认值`file-loader`), 你可以这么传参数`{name: [name]_[hash:8].[ext], outputPath: 'images/'}`，或者通过 query params 的形式: `{fallback: 'file-loader?name=[name].[ext]&outputPath: images/'}`

值得注意的是如果`name: [path][name].[ext]`, 那么在 dist 目录中会根据`path`的值新建文件夹，文件夹里面才是`[name].[ext]`形式的文件。

### url-loader 引起的的[object module]问题

当图片转为 base64 的时候，img 标签的 scr 显示[object module]。原因是新版 url-loader 默认是 es6Module，把配置项设置为 es6Module: false 即可。

# 加载样式

```js
{
    module: {
        rules: [
            test: /\.(scss|sass)$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        ]
    }
}
```

loader 的执行顺序是从右往左执行的。如果是普通的 css，那么只需要 css-loader、style-loader 就可以了。

1. style-loader, 通过注入`<style>`标签把 css 添加到 dom 中
2. css-loader，解释`@import`和`url()`，会`import/require()`后再解析`(resolve)`它们。

如果是 scss 这种 css 的拓展语言，那么久需要下载`node-sass`、`sass-loader`，这两个的版本必须要匹配(peerDependencies)

3. sass-loader 与 node-sass 搭配下载，将 sacc/scss 转成 css
4. postcss-loader + autoprefixer: 为了给 css3 的添加厂商前缀而使用的

postcss-loader 推荐在根目录下创建配置文件(当然也可以在 webpack 下的 rules 中写):

```js
// 这里也有写函数的，应该是做了多种参数的适配...
module.exports = {
  plugins: [
    require('autoprefixer') // 在这里引入插件autoprefixer
  ]
}

// 然后我们需要给 autoprefixer配置参数：告诉他我们需要支持什么浏览器
// 我一开始写 plugins: [require('autoprefixer')({browser: ['last 2 versions', '> 1%']})], 然而提示告诉我要写个.browserslistrc配置文件
// 于是

// .browserslistrc
// last 2 versions
// > 1%
```

然后就有厂商前缀了

### devtool

对于开发环境，你通常想要更快的 source maps(以 bundle 体积为代价)；在生产环境，你想要把 source maps 精准的分离出来并且 mizisizing。

开发环境，举例

1. `eval-cheap-source-map`: cheap（低开销)的 source map，因为他没有生成 column mapping 列映射，只是精确到行（映射到行)。它会忽略自 loader 的 source map，并且仅显示转译后的代码。
2. `cheap-module-eval-source-map`。类似`eval-cheap-source-map`，并且在这种情况下，源自 loader 的 source map 会得到更好支持。loader maps 映射到行。

## devserver

### devserver.before

提供了服务器内部在其他中间件之前执行自定义中间件的能力。这可用于自定义处理程序。

```js
before(app) {
    app.get('/some/path', (req, res) => { res.json({custom: 'response'}) })
}
```

### compress

一切服务都启用 gzip 压缩

### contentBase: boolean | string | array

告诉服务器从哪里提供 content，只有在你想要提供静态文件的时候才需要(推荐使用绝对路径)。devServer.publicPath 将用于确定应该从哪里提供 bundle 且此选项优先。

默认情况下，将使用当前的工作目录作为提供内容的目录，但是你可以修改为其他目录`contentBase: path.join(__dirname, 'public')`，或者从多个目录提供内容：`contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')]`,或者禁用`contentBase: false`。

### proxy

```js
// /api/users ===> http://localhost:3000/api/users
proxy: {
    "/api": "http://locaohost:3000"
}
// /api/users ===> http://localhost:3000/users
proxy: {
    "/api": "http://locaohost:3000",
    "pathRewrite": {"^/api": ""}
}

// 通过函数来绕过代理
proxy: {
    '/api': {
        target: 'http://localhost:3000',
        bypass: function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf('html') !== -1) {
                return '/index.html' // 返回html也没
                return false // 跳过请求代理
            }
        }
    }
}
```
