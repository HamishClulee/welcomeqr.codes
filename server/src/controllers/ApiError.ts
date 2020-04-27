import Log from '../middlewares/Log'
import QAuth from './QAuth'
import { Response } from 'express'

export const QApiError = (funcname: string, e: Error, res: Response) => {
	Log.error(`Function Name: ${ funcname } :: ${String(e)}`, [Log.TAG_API_ERROR])
	return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e })
}

export const QAuthError = (funcname: string, e: Error, res: Response, intercept: boolean) => {
	Log.error(`Function Name: ${ funcname } :: ${String(e)} :: User Auth Failure`, [Log.TAG_AUTH])
	return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: QAuth.deny(), intercept })
}
