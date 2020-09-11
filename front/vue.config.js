const path = require('path')

const isMainApp = process.env.APP_TYPE === 'main-app'
const appDir = isMainApp ? 'main-app' : 'subdoms-app'

const buildPageOpts = () => {

    return {
        // entry for the page
        entry: path.resolve(__dirname, `${appDir}/src/main.ts`), //'src/index/main.js',
        // the source template
        template: path.resolve(__dirname, `${appDir}/public/index.html`), //'public/index.html',
        // output as dist/index.html
        filename: 'index.html',
        // extracted common chunks and vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      }
}

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
    pages: {
        index: buildPageOpts()
    },
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('sass').oneOf(type)))
        config.resolve.alias.set('@I', path.resolve(__dirname, '../interfaces'))
        config.resolve.alias.set('@shared', path.resolve(__dirname, './shared'))
    },
    devServer: {
        port: isMainApp ? 8080 : 7070
    },
}