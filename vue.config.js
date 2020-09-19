const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

const port = process.env.port || process.env.npm_config_port || 8180 // dev port

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  devServer: {
    port: port, // 端口号
  },
}
