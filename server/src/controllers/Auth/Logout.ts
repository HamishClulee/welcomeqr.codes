import { IRequest, IResponse } from '../../interfaces'

class Logout {
	public static perform (req: IRequest, res: IResponse): any {
		req.logout()
		return res.status(200).send({ userContent: 'see you later, aligator', user: { email: null, _id: null, authed: false } })
	}
}

export default Logout
