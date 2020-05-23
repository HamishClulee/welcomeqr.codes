'use strict'
import { IResponse, IRequest } from '../interfaces'
import { Editor } from '../models/Editor'
import { Subdom } from '../models/Subdom'
import { User } from '../models/User'
import Clean from '../middlewares/Clean'

import * as adjective from '../resources/words/adjectives'
import * as noun from '../resources/words/nouns'
import * as adverb from '../resources/words/adverbs'

const SUBDOMS_ID = '5e52678609948c1e0ec9994f'
let SUBDOMS: string[] = []

export const submitNew = async (req: IRequest, res: IResponse) => {

	try {

		let query = { 'userid': req.session.passport.user }

		let update = { html: req.body.html }

		let options = { upsert: true, new: true, setDefaultsOnInsert: true }

		await Editor.findOneAndUpdate(query, update, options)

		return Clean.success(res, 200)

	} catch (e) {

		return Clean.apiError('submitNew', e, res)

	}
}

export const submitSubdom = async (req: IRequest, res: IResponse) => {

	try {

		if (SUBDOMS.indexOf(req.body.subdom) === -1) {

			SUBDOMS.push(req.body.subdom)

			await Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true })

			await User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom })

			const user = await User.findOne({ '_id': req.session.passport.user })

			return Clean.approve(res, 200, user)
		}

	} catch (e) {

		return Clean.apiError('submitSubdom', e, res)

	}
}

export const checkSubdom = (req: IRequest, res: IResponse) => {

	let okay = SUBDOMS.indexOf(req.body.subdom) === -1

	return res.status(200).send({ intercept: false, okay })
}

export const getHTML = async (req: IRequest, res: IResponse) => {

	try {

		const editor = await Editor.findOne({ 'userid': req.session.passport.user })

		return Clean.success(res, 200, editor)

	} catch (e) {

		Clean.apiError('getHTML', e, res)

	}

}

export const _precaching = () => {

	return Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms)

}

export const generateRandomSubDom = (req: IRequest, res: IResponse) => {

	try {

		const randInd = (len: number): number => {
			return Math.floor(Math.random() * Math.floor(len - 1))
		}

		const ad = adverb.adverbs
		const nouns = noun.nouns
		const adj = adjective.adjectives

		const randSubDom = () => {
			return `${ad[randInd(ad.length)]}-${adj[randInd(adj.length)]}-${nouns[randInd(nouns.length)]}`
		}

		return Clean.success(res, 200, randSubDom())

	} catch (e) {

		return Clean.apiError('generateRandomSubdom', e, res)

	}
}
