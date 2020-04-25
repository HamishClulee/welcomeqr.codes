import { User } from '../../models/User'
import { IRequest, IResponse, INext } from '../../interfaces/vendors'

class SessionChallenge {

	public static perform (req: IRequest, res: IResponse, next: INext): any {

		if (!req.session.passport) {

			return res.status(401).send({
				status: 401,
				message: 'No user logged in.',
				user: { email: null, _id: null, authed: false }
			})

		} else {

			User.findOne({ _id: req.session.passport.user }, (err, user) => {

				if (err) {
					return res.status(401).send({
						status: 401,
						message: 'You are not authenticated.',
						user: { email: null, _id: null, authed: false }
					})
				}

				if (user) {

					let { email, _id } = user
					return res.status(200).send({
						msg: 'you are a premium user',
						user: { email, id: _id, authed: true }
					})

				} else {

					return res.status(401).send({
						status: 401,
						message: 'You do not exist.',
						user: { email: null, _id: null, authed: false }
					})

				}
			})
		}
	}
}

export default SessionChallenge
