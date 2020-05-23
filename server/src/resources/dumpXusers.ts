import { UserDocument, User } from '../models/User'

const DBDump = {

	genEmail: function () {

		return `${this.genRanStr(10)}@$${this.genRanStr(5)}.com`

	},

	genRanStr: function (len) {

		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, len)

	},

	genOneUser: function() {

		const user: UserDocument = new User({
			email: this.genEmail(),
			password: this.genRanStr(10),
			emailVerifyToken: this.genRanStr(36)
		})

		user.save()

	},

	addXUsersToDb: function (numUsers) {

		for (let i = 0; i < numUsers; i++) {

			this.genOneUser()

		}
	}

}

export default DBDump
