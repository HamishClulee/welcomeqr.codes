import fs from 'fs'

const logPath = process.env.NODE_ENV === 'production' ? '/var/www/welcomeqr.codes/logs/all.log' : './logs.log'
const output = fs.createWriteStream(logPath);
const errorOutput = fs.createWriteStream(logPath);
const logger = new console.Console({ stdout: output, stderr: errorOutput });

export default logger