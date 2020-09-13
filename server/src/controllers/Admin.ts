'use strict'
import { IResponse, IRequest } from '../interfaces'
import Clean from '../middlewares/Clean'
import Log from '../middlewares/Log'

const fs = require('fs')
const path = require('path')

export const getLogByDay = (req: IRequest, res: IResponse) => {

	try {

		let filePath = path.join(__dirname, '../../.logs/2020-09-13.log')
		let stat = fs.statSync(filePath)

		fs.readFile(filePath, 'utf8', function(err, data) {

			if (err) { throw err }

			const raw = data.split(/\r?\n/)

			const cleaned = raw.filter(line => {
				return line != null && line !== ''
			})

			Clean.success(res, 200, cleaned, `Logs for given day`)
		})

	} catch (e) {

		return Clean.apiError('getLogByDay', e, res)

	}
}
