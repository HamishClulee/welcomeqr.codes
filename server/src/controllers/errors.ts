import QLog from '../logger'
import QAuth from './qauth'
import { Response } from 'express'

export const QApiError = (funcname: string, e: Error, res: Response) => {
    QLog.log(`[ERROR] ${ new Date() }`)
    QLog.log(`[ERROR] Function Name: ${ funcname }`, JSON.stringify(e, null, 2))
    QLog.log('[ERROR END ------------------------------------------------------------------------- ]')
    return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e })
}

export const QAuthError = (funcname: string, e: Error, res: Response, intercept: boolean) => {
    QLog.log(`[AUTH ERROR] ${ new Date() }`)
    QLog.log(`[AUTH ERROR] Function Name: ${ funcname }`, JSON.stringify(e, null, 2))
    QLog.log('[AUTH ERROR END ------------------------------------------------------------------------- ]')
    return res.status(403).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e, user: QAuth.deny(), intercept })
}