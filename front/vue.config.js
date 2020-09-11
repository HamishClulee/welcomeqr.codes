const path = require('path')

const isMainApp = process.env.APP_TYPE === 'main-app'
const appDir = isMainApp ? 'main-app' : 'subdoms-app'

const addStyleResource = (rule) => {

    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, `${appDir}/src/style/index.sass`),
            ],
        }
    )
}

module.exports = {
    outputDir: path.resolve(__dirname, `${appDir}/dist`),
    chainWebpack: config => {

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
        config.resolve.alias.set('@I', path.resolve(__dirname, '../interfaces'))
        config.resolve.alias.set('@shared', path.resolve(__dirname, './shared'))

        config.plugin("html").tap(args => {
            args[0].template = path.resolve(__dirname, `${appDir}/index.html`)
            return args
        })

    },
    devServer: {
        port: isMainApp ? 8080 : 7070
    },
}