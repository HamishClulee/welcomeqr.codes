import { IRequest, IResponse } from '../../interfaces'
import QAuth from '../QAuth'

class LogOut {

	public static perform (req: IRequest, res: IResponse): any {

		req.logout()

		return res.status(200).send({

			userContent: 'see you later, aligator',
			user: QAuth.deny()

		})
	}
}

export default LogOut
