'use strict'

const getIfaceAddress = require('./lib/get-iface-address')
const getIfaceRange = address => address.split('.').splice(0, 3).join('.')
const scanRange = require('./lib/scan-range')

module.exports = ({ iface = 'WiFi', start = 2, end = 254, port = 1, timeout = 3000 } = {}) => {

    const address = getIfaceAddress(iface)
    const range = getIfaceRange(address)

    return scanRange({ range, start, end, port, timeout })
        .on('hit', function ({ host }) {
            let device = `${range}.${host}`
            // exclude own device
            if (device !== address) this.emit('device', device)
        })

}
