process.env.VUE_APP_VERSION = require('./package.json').version

function getFolder() {
    const list = process.env.VUE_APP_VERSION.split('.')
    const minor = list[1] >= 10 ? list[1] : '0'.concat(list[1])
    return 'dist' + list[0] + minor
}

module.exports = {
    outputDir: getFolder(),
    publicPath: '',
    productionSourceMap: false,
    chainWebpack: config => {
        config.optimization.minimize(false)
        config.resolve.extensions.merge(['.ts']).end()
        config.module
            .rule('ts')
            .test(/\.ts$/)
            .use('ts-loader')
            .loader('ts-loader')
            .end()
    },
}
