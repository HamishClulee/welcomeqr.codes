import Log from '../middlewares/Log'
import Environment from '../providers/Environment'

class Handler {
	/**
	 * Handles all the not found routes
	 */
	public static notFoundHandler(_express): any {
		const apiPrefix = Environment.config().apiPrefix

		_express.use('*', (req, res) => {
			const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

			Log.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`)
		})

		return _express
	}

	/**
	 * Handles your api/web routes errors/exception
	 */
	public static clientErrorHandler(err, req, res, next): any {

		Log.error(err.stack)

		if (req.xhr) {
			return res.status(500).send({error: 'Something went wrong!'})
		} else {
			return next(err)
		}
	}

	/**
	 * Show undermaintenance page incase of errors
	 */
	public static errorHandler(err, req, res, next): any {
		Log.error(err.stack)
		res.status(500)
	}

	/**
	 * Register your error / exception monitoring
	 * tools right here ie. before "next(err)"!
	 */
	public static logErrors(err, req, res, next): any {
		Log.error(err.stack)

		return next(err)
	}
}

export default Handler
