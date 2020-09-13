import Log from '../middlewares/Log'

class NativeEvent {
	public cluster (_cluster): void {
		// Catch cluster listening event...
		_cluster.on('listening', () => {
			// Cluster listenting
		})

		// Catch cluster once it is back online event...
		_cluster.on('online', () => {
			// Cluster online
		})

		// Catch cluster disconnect event...
		_cluster.on('disconnect', () => {
			// Cluster disconnected
		})

		// Catch cluster exit event...
		_cluster.on('exit', (worker, code, signal) => {
			Log.warn(`NativeEventExit`, `Cluster with ProcessID '${worker.process.pid}' is Dead with Code '${code}, and signal: '${signal}'`)
			// Ensuring a new cluster will start if an old one dies
			_cluster.fork()
		})
	}

	public process (): void {
		// Catch the Process's uncaught-exception
		process.on('uncaughtException', (exception) =>
			Log.error(`NativeEventUncaughtExcpt`, exception.stack)
		)

		// Catch the Process's warning event
		process.on('warning', (warning) =>
			Log.warn(`NativeEventWarning`, warning.stack)
		)
	}
}

export default new NativeEvent
