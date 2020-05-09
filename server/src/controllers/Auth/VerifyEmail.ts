import * as validate from 'express-validator'

import { User, UserDocument } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'

import QAuth from '../QAuth'

class VerifyEmail {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

        User.findOne({ emailVerifyToken: req.body.token }).exec((err, user: any) => {

            if (err) { return next(err) }

            if (!user) {

                return res.status(401).send({

                    userContent: 'Verify token is invalid or has expired.',
                    user: QAuth.deny()

                })
            }

            user.emailVerified = true
            user.emailVerifyToken = undefined

            user.save((err: any) => {

                if (err) { return next(err) }

                return res.status(200).send({

                    userContent: 'Email verified',
                    user: QAuth.approve(user)

                })

            })

        })

	}
}

export default VerifyEmail
