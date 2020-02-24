'use strict'
import { Response, Request } from 'express'
import { Editor } from '../models/Editor'
import { Subdom } from '../models/Suddom'
import { User } from '../models/User'
import QLog from '../logger'

const SUBDOMS_ID = '5e52678609948c1e0ec9994f'
let SUBDOMS: string[] = []

export const postSubmitNew = (req: Request, res: Response) => {
    let editor = new Editor({
        html: req.body.html,
        useremail: req.body.user.email,
        userid: req.body.user.id,
        name: req.body.name,
    })
    editor.save(function (err) {
        if (err) {
            QLog.log(err)
            return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day' })
        } else {
            return res.status(200).send({ userContent: 'El poho loco! You just submitted your html!' })
        }
    })
}

export const postGetAllEditorsForUser = (req: Request, res: Response) => {
    Editor.find({ userid: req.body.userid }, function (err, editors) {
        if (err) {
            QLog.log(err)
            return res.status(501).send({ userContent: 'Ice cream machine broke, ok, have a nice day'})
        } else {
            return res.status(200).send({ userContent: 'I Skweam!', editors })
        }
    })
}

export const postSubmitSubdom = (req: Request, res: Response) => {
    if (SUBDOMS.indexOf(req.body.subdom) === -1) {
        SUBDOMS.push(req.body.subdom)
        Subdom.updateOne({ '_id': SUBDOMS_ID }, { subdoms: SUBDOMS }, { upsert: true }, function(err) {
            if (err) {
                QLog.log(err)
                return res.status(502).send({ userContent: 'Ice cream machine broke, ok, have a nice day', intercept: false })
            } else {
                User.updateOne({ '_id': req.session.passport.user }, { subdom: req.body.subdom }, function(err, user) {
                    if (err) {
                        return res.status(502).send({ userContent: 'Couldnt save user', intercept: false })
                    } else {
                        User.findOne({ '_id': req.session.passport.user }, function(err, user) {
                            if (err) {
                                return res.status(502).send({ userContent: 'Couldnt retrieve user', intercept: false })
                            } else {
                                let { email, _id, subdom } = user
                                return res.status(200).send({ 
                                    userContent: 'Everything sorted',
                                    intercept: false,
                                    user: {
                                        id: _id,
                                        email,
                                        subdom,
                                        authed: true,
                                    } 
                                })
                            }
                        })
                    } 
                })
            }
        })
    } else {
        return res.status(501).send({ userContent: 'Cant clone that crazy chicken bro!', intercept: false })
    }
}

export const postCheckSubdom = (req: Request, res: Response) => {
    let okay = SUBDOMS.indexOf(req.body.subdom) === -1
    return res.status(200).send({ intercept: false, okay })
}

export const postGetHTML = (req: Request, res: Response) => {
    if (req.session.passport.user) {
        Editor.findOne({ 'userid': req.session.passport.user }, function(err, editor) {
            if (err) {
                QLog.log(err)
                return res.status(502).send({ userContent: 'Couldnt find user from session info', intercept: true })
            } else {
                let html = editor.html || ''
                return res.status(200).send({ userContent: 'Here is your HTML', html })
            }
        })
    }
}


export const precaching = () => {
    return Subdom.findById(SUBDOMS_ID).exec().then(res => SUBDOMS = res.subdoms)
}