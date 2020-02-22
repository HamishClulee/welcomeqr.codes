import errorHandler from 'errorhandler'
import app from './app'
import logger from './logger'

if (process.env.NODE_ENV !== 'production') app.use(errorHandler())

const server = app.listen(app.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')

    logger.log(`=========================================================================\n
                [${new Date()}] Restarted on http://localhost:${app.get('port')}\n
                =========================================================================`)
})

export default server
