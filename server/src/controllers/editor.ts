'use strict'
import { Response, Request } from 'express'
import { Editor } from '../models/Editor'
import { Subdom } from '../models/Suddom'
import { User } from '../models/User'
import QLog from '../logger'
import QError from './errors'

const SUBDOMS_ID = '5e52678609948c1e0ec9994f'
let SUBDOMS: string[] = []

export const postSubmitNew = async (req: Request, res: Response) => {
    try {
        let query = { 'userid': req.session.passport.user }
        let update = { html: req.body.html };
        let options = { upsert: true, new: true, setDefaultsOnInsert: true }
        await Editor.findOneAndUpdate(query, update, options)
        return res.status(200).send({ userContent: 'El poho loco! You just submitted your html!' })
    } catch(e) {
        QError('postSubmitNew', e, res)
    }
}

export const postSubmitSubdom = async (req: Request, res: Response) => {
    try {
        if (SUBDOMS.indexOf(req.body.subdom) === -1) {
            SUBDOMS.push(req.body.subdom)
            Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true })
            await User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom })
            const user = await User.findOne({ '_id': req.session.passport.user })
            let { email, _id, subdom } = user
            return res.status(200).send({ 
                userContent: 'Everything sorted', intercept: false, user: { id: _id, email, subdom, authed: true} 
            })
        }
    } catch (e) {
        QError('postSubmitSubdom', e, res)
    }
}

export const postCheckSubdom = (req: Request, res: Response) => {
    let okay = SUBDOMS.indexOf(req.body.subdom) === -1
    return res.status(200).send({ intercept: false, okay })
}

export const postGetHTML = async (req: Request, res: Response) => {
    try {
        const editor = await Editor.findOne({ 'userid': req.session.passport.user })
        return res.status(200).send({ userContent: 'Here is your HTML', editor })
    } catch (e) {
        QError('postGetHTML', e, res)
    }
}


export const precaching = () => {
    return Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms)
}