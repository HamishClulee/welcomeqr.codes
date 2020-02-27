import fs from 'fs'

const logPath = process.env.NODE_ENV === 'production' ? '/var/www/welcomeqr.codes/logs/all.log' : './logs.log'
const output = fs.createWriteStream(logPath, { flags: 'w', encoding: null, mode: 0o666 })
const errorOutput = fs.createWriteStream(logPath, { flags: 'w', encoding: null, mode: 0o666 })
const QLog = new console.Console({ stdout: output, stderr: errorOutput })

export default QLog