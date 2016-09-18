
const EventEmitter = require('events')
const ping = require('net-ping')

const pingHost = ({ session, range, dest }) => {

    return new Promise ((resolve, reject) => {

        session.pingHost(`${range}.${dest}`, (error, target) => {
            error ? reject(error) : resolve(target)
        })

    })

}

module.exports = ({ range = '192.168.0', start = 2, end = 254, timeout = 1000, retries = 0 } = {}) => {

    const emitter = new EventEmitter()
    const session = ping.createSession({ timeout, retries })

    for (let i = start; i <= end; i++)
        pingHost({ session, range, dest: i })
            .then(reason => emitter.emit('hit', { host: i, reason }))
            .catch(reason => emitter.emit('miss', { host: i, reason }))

    return emitter

}
