import { User } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces'
import QAuth from '../QAuth'

class SessionChallenge {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		if (!req.session.passport) {

			return res.status(401).send({
				status: 401,
				message: 'No user logged in.',
				user: QAuth.deny()
			})

		} else {

			User.findOne({ _id: req.session.passport.user }, (err, user) => {

				if (err) {

					return res.status(401).send({

						message: 'You are not authenticated.',
						user: QAuth.deny()

					})
				}

				if (user) {

					let { email, _id, subdom } = user

					return res.status(200).send({

						msg: 'you are a premium user',
						user: QAuth.approve({ email, id: _id, authed: true, subdom })

					})

				} else {

					return res.status(401).send({

						message: 'You do not exist.',
						user: QAuth.deny()

					})

				}
			})
		}
	}
}

export default SessionChallenge
