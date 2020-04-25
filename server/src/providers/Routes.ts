import { Application } from 'express'
import Log from '../middlewares/Log'
import authRouter from './../routes/Auth'

class Routes {
	public mountAuth(_express: Application): Application {

		Log.info('Routes :: Mounting API Routes...')

		return _express.use(`/auth`, authRouter)
	}
}

export default new Routes
