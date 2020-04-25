import * as cors from 'cors'
import { Application } from 'express'

import Log from './Log'
// import Locals from '../providers/Locals'

class CORS {
	public mount(_express: Application): Application {
		Log.info('Booting the \'CORS\' middleware...')

		_express.use(cors({ origin: 'http://localhost:8080', credentials: true }))

		return _express
	}
}

export default new CORS
