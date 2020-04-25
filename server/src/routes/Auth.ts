import { Router } from 'express'
import LoginController from '../controllers/Auth/Login'
import SignUpController from '../controllers/Auth/SignUp'
import SessionChallenge from '../controllers/Auth/SessionChallenge'
import LogOutController from '../controllers/Auth/Logout'

const { assert, check, sanitize } = require('express-validator')

const router = Router()

router.post('/session_challenge', SessionChallenge.perform)

router.post('/login', LoginController.perform)

router.post('/signup', SignUpController.perform)

router.post('/logout', LogOutController.perform)

// [
// 	assert('email', 'E-mail cannot be blank').notEmpty(),
// 	assert('email', 'E-mail is not valid').isEmail(),
// 	assert('password', 'Password cannot be blank').notEmpty(),
// 	assert('password', 'Password length must be atleast 8 characters').isLength({ min: 8 }),
// 	assert('confirmPassword', 'Confirmation Password cannot be blank').notEmpty(),
// 	sanitize('email').normalizeEmail({ gmail_remove_dots: false })
// ]

export default router
