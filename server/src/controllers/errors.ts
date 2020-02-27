import QLog from '../logger'
import { Response } from 'express'

const QError = (funcname: string, e: Error, res: Response) => {
    QLog.log(`[ERROR] ${ new Date() }`)
    QLog.log(`[ERROR] Function Name: ${ funcname }`, JSON.stringify(e, null, 2))
    QLog.log('[ERROR END ------------------------------------------------------------------------- ]')
    return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day', e })
}

export default QError