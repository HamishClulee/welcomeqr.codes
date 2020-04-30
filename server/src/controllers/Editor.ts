'use strict'
import { IResponse, IRequest } from '../interfaces'
import { Editor } from '../models/Editor'
import { Subdom } from '../models/Subdom'
import { User } from '../models/User'
import { QApiError } from './ApiError'

import * as adjective from '../resources/words/adjectives'
import * as noun from '../resources/words/nouns'
import * as adverb from '../resources/words/adverbs'

import QAuth from './QAuth'

const SUBDOMS_ID = '5e52678609948c1e0ec9994f'
let SUBDOMS: string[] = []

export const submitNew = async (req: IRequest, res: IResponse) => {
	try {

		let query = { 'userid': req.session.passport.user }

		let update = { html: req.body.html }

		let options = { upsert: true, new: true, setDefaultsOnInsert: true }

		await Editor.findOneAndUpdate(query, update, options)

		return res.status(200).send({ userContent: 'El poho loco! You just submitted your html!' })

	} catch (e) {
		QApiError('submitNew', e, res)
	}
}

export const submitSubdom = async (req: IRequest, res: IResponse) => {
	try {
		if (SUBDOMS.indexOf(req.body.subdom) === -1) {

			SUBDOMS.push(req.body.subdom)

			await Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true })

			await User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom })

			const user = await User.findOne({ '_id': req.session.passport.user })

			let { email, _id } = user

			return res.status(200).send({
				userContent: 'Everything sorted',
				intercept: false,
				user: QAuth.approve({
					id: _id,
					email,
					subdom: req.body.subdom,
					authed: true
				})
			})
		}
	} catch (e) {
		QApiError('submitSubdom', e, res)
	}
}

export const checkSubdom = (req: IRequest, res: IResponse) => {

	let okay = SUBDOMS.indexOf(req.body.subdom) === -1

	return res.status(200).send({ intercept: false, okay })
}

export const getHTML = async (req: IRequest, res: IResponse) => {
	try {

		const editor = await Editor.findOne({ 'userid': req.session.passport.user })

		return res.status(200).send({ userContent: 'Here is your HTML', editor })

	} catch (e) {
		QApiError('getHTML', e, res)
	}
}

export const _precaching = () => {
	return Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms)
}

export const generateRandomSubDom = (req: IRequest, res: IResponse) => {
	try {

		const rando = () => { return `${adverb.adverbs[Math.floor(Math.random() * Math.floor(adverb.length - 1))]}-${adjective.adjectives[Math.floor(Math.random() * Math.floor(adjective.length - 1))]}-${noun.nouns[Math.floor(Math.random() * Math.floor(noun.length - 1))]}`}

		return res.status(200).send({ userContent: 'Here is your subdom, dude.', subdom: rando() })

	} catch (e) {
		QApiError('generateRandomSubdom', e, res)
	}
}