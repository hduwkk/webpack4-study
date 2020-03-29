# url-loader 与 file-loader

url-loader可以将小图片转为base-64格式，大图片通过fallback传递给file-loader处理(fallback的默认值`file-loader`), 你可以这么传参数`{name: [name]_[hash:8].[ext], outputPath: 'images/'}`，或者通过query params的形式: `{fallback: 'file-loader?name=[name].[ext]&outputPath: images/'}`

值得注意的是如果`name: [path][name].[ext]`, 那么在dist目录中会根据`path`的值新建文件夹，文件夹里面才是`[name].[ext]`形式的文件。
