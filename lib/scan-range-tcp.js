'use strict'

const { Socket } = require('net')
const EventEmitter = require('events')

const scanHost = ({ device, port, timeout }, callback) => {

        const socket = new Socket()

        socket.setTimeout(timeout)
        socket.connect({ host: device, port })
        socket.unref()

        socket.on('error', error =>
            'ECONNREFUSED' === error.code ? callback(false) : callback(true))

        socket.on('timeout', () => {
            callback(true); socket.destroy() })

        socket.on('connect', () => {
            callback(false); socket.destroy() })

}

module.exports = ({ range = '192.168.0', start = 2, end = 254, port = 1, timeout = 3000, exclude = false } = {}) => {

    const emitter = new EventEmitter()
    let pending = 0

    for (let i = start; i <= end; i++) {

        pending++
        const device = `${range}.${i}`

        scanHost({ device, port, timeout }, error => {
            if (!error && device !== exclude) emitter.emit('device', device)
            if (!--pending) emitter.emit('done')
        })
    }

    return emitter

}
