import { IRequest, IResponse } from '../../interfaces'
import QAuth from '../QAuth'
import { User } from '../../models/User'

class Settings {

	public static perform (req: IRequest, res: IResponse): any {

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

					return res.status(200).send({

						msg: 'you are a premium user',
						user: QAuth.settings(user)

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

export default Settings
