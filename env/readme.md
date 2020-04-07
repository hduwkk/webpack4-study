# url-loader 与 file-loader

url-loader可以将小图片转为base-64格式，大图片通过fallback传递给file-loader处理(fallback的默认值`file-loader`), 你可以这么传参数`{name: [name]_[hash:8].[ext], outputPath: 'images/'}`，或者通过query params的形式: `{fallback: 'file-loader?name=[name].[ext]&outputPath: images/'}`

值得注意的是如果`name: [path][name].[ext]`, 那么在dist目录中会根据`path`的值新建文件夹，文件夹里面才是`[name].[ext]`形式的文件。


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
loader的执行顺序是从右往左执行的。如果是普通的css，那么只需要css-loader、style-loader就可以了。

1. style-loader, 通过注入`<style>`标签把css添加到dom中
2. css-loader，解释`@import`和`url()`，会`import/require()`后再解析`(resolve)`它们。

如果是scss这种css的拓展语言，那么久需要下载`node-sass`、`sass-loader`，这两个的版本必须要匹配(peerDependencies)

3. sass-loader 与node-sass搭配下载，将sacc/scss 转成css
4. postcss-loader + autoprefixer: 为了给css3的添加厂商前缀而使用的

postcss-loader推荐在根目录下创建配置文件(当然也可以在webpack下的rules中写):

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

对于开发环境，你通常想要更快的source maps(以bundle体积为代价)；在生产环境，你想要把source maps精准的分离出来并且mizisizing。


开发环境，举例
1. `eval-cheap-source-map`: cheap（低开销)的source map，因为他没有生成column mapping列映射，只是精确到行（映射到行)。它会忽略自loader的source map，并且仅显示转译后的代码。
2. `cheap-module-eval-source-map`。类似`eval-cheap-source-map`，并且在这种情况下，源自loader的source map会得到更好支持。loader maps映射到行。


## devserver

### devserver.before
提供了服务器内部在其他中间件之前执行自定义中间件的能力。这可用于自定义处理程序。

```js
before(app) {
    app.get('/some/path', (req, res) => { res.json({custom: 'response'}) })
}
```

### compress
一切服务都启用gzip压缩

### contentBase: boolean | string | array

告诉服务器从哪里提供content，只有在你想要提供静态文件的时候才需要(推荐使用绝对路径)。devServer.publicPath将用于确定应该从哪里提供bundle且此选项优先。

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


























