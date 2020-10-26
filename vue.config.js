process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    publicPath: '',
    chainWebpack: config => {
        config.resolve.extensions.merge(['.ts']).end()
        config.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .end()
    },
}
