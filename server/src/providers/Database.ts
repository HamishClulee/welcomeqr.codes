import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'
import { MongoError } from 'mongodb'

import Environment from './Environment'
import Log from '../middlewares/Log'

export class Database {
	public static init (): any {
		const dsn = Environment.config().mongooseUrl
		const options = { useNewUrlParser: true, useUnifiedTopology: true };

		(<any>mongoose).Promise = bluebird

		mongoose.set('useCreateIndex', true)
		mongoose.set('useFindAndModify', false)

		mongoose.connect(dsn, options, (error: MongoError) => {
			if (error) {
				Log.info('Failed to connect to the Mongo server!!')
				console.log(error)
				throw error
			} else {
				Log.info('connected to mongo server at: ' + dsn)
			}
		})
	}
}

export default mongoose
