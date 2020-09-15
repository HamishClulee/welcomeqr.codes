'use strict'
import { IResponse, IRequest } from '../interfaces'
import { Editor } from '../models/Editor'
import { Subdom } from '../models/Subdom'
import { User } from '../models/User'
import Clean from '../middlewares/Clean'

const fs = require('fs')
const path = require('path')

import * as emailer from '../resources/emails/template'

import * as adjective from '../resources/words/adjectives'
import * as noun from '../resources/words/nouns'
import * as adverb from '../resources/words/adverbs'

const SUBDOMS_ID = '5e52678609948c1e0ec9994f'
let SUBDOMS: string[] = []

const jwt = require('jsonwebtoken')

export const getHtmlBySubDom = async(req: IRequest, res: IResponse) => {

	try {

		const query = { subdom: { $eq: req.body.subdom } }

		const editor = await Editor.findOne(query)

		return Clean.success(res, 200, { html: editor.html }, 'getHtmlBySubDom satisfied.')

	} catch (e) {

		return Clean.apiError('submitNew', e, res)

	}
}

export const submitNew = async (req: IRequest, res: IResponse) => {

	try {

		const query = { 'userid': String(req.user._id) }

		const update = { 'html': req.body.html, 'subdom': req.body.user.subdom }

		const options = { 'upsert': true, 'new': true, 'setDefaultsOnInsert': true }

		await Editor.findOneAndUpdate(query, update, options)

		return Clean.success(res, 200, {}, 'submitNew completed.')

	} catch (e) {

		return Clean.apiError('submitNew', e, res)

	}
}

export const submitSubdom = async (req: IRequest, res: IResponse) => {

	try {

		if (SUBDOMS.indexOf(req.body.subdom) === -1) {

			SUBDOMS.push(req.body.subdom)

			await Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true })

			await User.updateOne({ '_id': req.user._id }, { subdom: req.body.subdom })

			const user = await User.findOne({ '_id': req.user._id })

			if (!user) {

				return Clean.failure(res, 501, 'submitSubdom => no user exists.')

			}

			return Clean.approve(res, 200, user, `submitSubdom completed.`)
		}

	} catch (e) {

		return Clean.apiError('submitSubdom', e, res)

	}
}

export const checkSubdom = (req: IRequest, res: IResponse) => {

	const okay = SUBDOMS.indexOf(req.body.subdom) === -1

	return Clean.success(res, 200, { okay }, `Subdom okay.`)
}

export const getHTML = async (req: IRequest, res: IResponse) => {

	try {

		const editor = await Editor.findOne({ 'userid': req.user._id })

		if (!editor) {

			return Clean.failure(res, 501, `getHTML => No Editor found.`)

		}

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

interface TemplateConfig {
	preheader: string, // {{-preheader-}}
	logoHref: string, // {{-logoHref-}}
	logoSrc: string, // {{-logoSrc-}}
	heroHeadingText: string, // {{-heroHeadingText-}}
	emailBodyText: string, // {{-emailBodyText-}} -> OR HTML
	ctaButtonHref: string, // {{-ctaButtonHref-}}
	ctaButtonText: string, // {{-ctaButtonText-}}
	finalContentText: string, // {{-finalContentText-}} -> OR HTML
	afterBodyText: string, // {{-afterBodyText-}} -> OR HTML
	unsubHref: string, // {{-unsubHref-}}
}

export const generateEmailHTML = (req: IRequest, res: IResponse) => {

	try {

		const config: TemplateConfig = req.body.config

		const html = emailer.build(config)

		// fs.open(`./email.html`, 'a', (_err, _fileDescriptor) => {
		// 	if (!_err && _fileDescriptor) {

		// 		fs.writeFile(_fileDescriptor, html, (_err) => {
		// 			if (! _err) {
		// 				fs.close(_fileDescriptor, (_err) => {
		// 					if (! _err) {
		// 						return true
		// 					} else {
		// 						return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended')
		// 					}
		// 				})
		// 			} else {
		// 				return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file')
		// 			}
		// 		})
		// 	} else {
		// 		return console.log('\x1b[31m%s\x1b[0m', 'Error couldn\'t open the log file for appending')
		// 	}
		// })

		Clean.success(res, 200, html)
	} catch (e) {
		return Clean.apiError('generateEmailHTML', e, res)
	}

}
