import errorHandler from 'errorhandler'
import app from './app'
import QLog from './logger'

if (process.env.NODE_ENV !== 'production') app.use(errorHandler())

const server = app.listen(app.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')

    QLog.log(`
    =========================================================================\n
    [${new Date()}] Restarted on http://localhost:${app.get('port')}\n
    =========================================================================\n
    `)
})

export default server
