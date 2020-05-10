import { IRequest, IResponse } from '../../interfaces'
import QAuth from '../QAuth'
import { User } from '../../models/User'

class ToggleSubscribe {

	public static perform (req: IRequest, res: IResponse): any {

		if (!req.session.passport) {

			return res.status(401).send({
				status: 401,
				message: 'No user logged in.',
				user: QAuth.deny()
			})

		} else {

			console.log(req.body.subscribe)

			User.findOneAndUpdate({ _id: req.session.passport.user }, { allowEmails: req.body.subscribe }, { new: true }, (err, user) => {

				if (err) {

					return res.status(403).send({

						userContent: 'Something went wrong, try again later!',
						user: QAuth.deny()

					})

				}

				if (!user) {

					return res.status(403).send({

						userContent: 'Account with that email address does not exist.',
						user: QAuth.deny()

					})

				} else {

					return res.status(200).send({

						userContent: 'updates! updates! updates!',
						user: QAuth.settings(user)

					})
				}

			})
		}
	}
}

export default ToggleSubscribe
