
const EventEmitter = require('events')
const ping = require('net-ping')

module.exports = ({ range = '192.168.0', start = 2, end = 254, timeout = 3000, retries = 0, exclude = false } = {}) => {

    const emitter = new EventEmitter()
    const session = ping.createSession({ timeout, retries })
    let pending = 0

    for (let i = start; i <= end; i++) {

        pending++
        const device = `${range}.${i}`

        session.pingHost(device, error => {
            if (!error && device !== exclude) emitter.emit('device', device)
            if (!--pending) {
                emitter.emit('done')
                session.close()
            }
        })
    }

    return emitter

}
