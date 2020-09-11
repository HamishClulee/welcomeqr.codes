const path = require('path')

const addStyleResource = (rule) => {

    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './subdoms-app/src/style/index.sass'),
            ],
        })

}

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
        config.resolve.alias.set('@I', path.resolve(__dirname, '../interfaces'))
        config.resolve.alias.set('@shared', path.resolve(__dirname, './shared'))
    },
    devServer: {
        port: 7070,
        disableHostCheck: true,
    },
}
