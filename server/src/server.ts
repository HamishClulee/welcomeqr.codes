import app from './app'

console.log('build started')

const server = app.listen(app.get('port'), () => {
    console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')

    console.log(
`
============================================================================================\n
[${new Date()}] Restarted on http://localhost:${app.get('port')}\n
============================================================================================\n
`)
})

console.log('build running')

export default server
