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
    logger.log('Things have been set in motion that cannot be undone!')
})

export default server
