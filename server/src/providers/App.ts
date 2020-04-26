import * as kue from 'kue'
import * as path from 'path'
import * as dotenv from 'dotenv'

import Express from './Express'
import { Database } from './Database'

import Environment from './Environment'
import Log from '../middlewares/Log'

class App {

	public loadConfiguration (): void {

		Log.info('Configuration :: Booting @ Master...')

		dotenv.config({ path: path.join(__dirname, '../../.env') })
	}

	public loadDatabase (): void {

		Log.info('Database :: Booting @ Master...')

		Database.init()
	}

	public loadServer (): void {

		Log.info('Server :: Booting @ Master...')

		Express.init()
	}

	public loadQueue (): void {
		const isQueueMonitorEnabled: boolean = Environment.config().queueMonitor
		const queueMonitorPort: number = Environment.config().queueMonitorHttpPort

		if (isQueueMonitorEnabled) {
			kue.app.listen(queueMonitorPort)

			console.log('\x1b[33m%s\x1b[0m', `Queue Monitor :: Running @ 'http://localhost:${queueMonitorPort}'`)
		}
	}
}

export default new App
