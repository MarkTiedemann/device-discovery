'use strict'

const { Socket } = require('net')
const EventEmitter = require('events')

const scanHost = ({ range, dest, port, timeout }) => {

    return new Promise ((resolve, reject) => {

        const socket = new Socket()

        socket.setTimeout(timeout)
        socket.connect({ host: `${range}.${dest}`, port })
        socket.unref()

        socket.on('error', error =>
            'ECONNREFUSED' === error.code ? resolve('REFUSED') : reject(error.code))

        socket.on('timeout', () => {
            reject('TIMEOUT'); socket.destroy() })

        socket.on('connect', () => {
            resolve('CONNECTED'); socket.destroy() })

    })

}

module.exports = ({ range = '192.168.0', start = 2, end = 254, port = 1, timeout = 3000 } = {}) => {

    const emitter = new EventEmitter()

    for (let i = start; i <= end; i++)
        scanHost({ range, dest: i, port, timeout })
            .then(reason => emitter.emit('hit', { host: i, reason }))
            .catch(reason => emitter.emit('miss', { host: i, reason }))

    return emitter

}
