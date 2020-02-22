import dotenv from 'dotenv'
import fs from 'fs'
import QLog from '../logger'

if (fs.existsSync('.env')) {
    QLog.log('Using .env file to supply config environment variables')
    dotenv.config({ path: '.env' })
} else {
    QLog.log('Using .env.example file to supply config environment variables')
}
const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production'

export const SESSION_SECRET = process.env['SESSION_SECRET']
export const MONGODB_URI = process.env['MONGODB_URI_LOCAL']

if (!SESSION_SECRET) {
    QLog.error('No client secret. Set SESSION_SECRET environment variable.')
    process.exit(1)
}

if (!MONGODB_URI) {
    if (prod) {
        QLog.error('No mongo connection string. Set MONGODB_URI environment variable.')
    } else {
        QLog.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.')
    }
    process.exit(1)
}
