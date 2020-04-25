import * as express from 'express'
import * as path from 'path'
import * as serveStatic from 'serve-static'
import Locals from './Locals'
import Routes from './Routes'
import Bootstrap from '../middlewares/Kernel'
import ExceptionHandler from '../exception/Handler'

const history = require('connect-history-api-fallback')

class Express {
	/**
	 * Create the express object
	 */
	public express: express.Application

	/**
	 * Initializes the express server
	 */
	constructor () {

		this.express = express()

		this.mountDotEnv()
		this.mountMiddlewares()
		this.mountRoutes()
	}

	private mountDotEnv (): void {
		this.express = Locals.init(this.express)
	}

	/**
	 * Mounts all the defined middlewares
	 */
	private mountMiddlewares (): void {
		this.express = Bootstrap.init(this.express)
	}

	/**
	 * Mounts all the defined routes
	 */
	private mountRoutes (): void {
		this.express = Routes.mountAuth(this.express)
	}

	/**
	 * Starts the express server
	 */
	public init (): any {
		const port: number = Locals.config().port

		// Registering Exception / Error Handlers
		this.express.use(ExceptionHandler.logErrors)
		this.express.use(ExceptionHandler.clientErrorHandler)
		this.express.use(ExceptionHandler.errorHandler)
		this.express = ExceptionHandler.notFoundHandler(this.express)

		const _static = serveStatic(path.join(__dirname, 'front-end'), { maxAge: 31557600000 })
		if (process.env.NODE_ENV === 'production') {

			this.express.use(_static)
		}

		this.express.use(history({
			verbose: true,
			disableDotRule: true
		}))

		this.express.get('*', _static)

		// Start the server on the specified port
		this.express.listen(port, (_error: any) => {
			if (_error) {
				return console.log('Error: ', _error)
			}

			return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`)
		})
	}
}

/** Export the express module */
export default new Express()