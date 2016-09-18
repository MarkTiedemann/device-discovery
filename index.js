'use strict'

const getIfaceAddress = require('./lib/get-iface-address')
const getIfaceRange = address => address.split('.').splice(0, 3).join('.')

const getScanner = type => {
    switch (type) {
        case 'ICMP': return require('./lib/ping-range-icmp')
        case 'TCP': return require('./lib/scan-range-tcp')
        default: throw new Error(`Unknown type '${type}'`)
    }
}

module.exports = ({

    type = 'ICMP',
    iface = 'WiFi',
    start = 2,
    end = 254,
    port = 1,
    timeout = 3000,
    retries = 0

} = {}) => {

    const address = getIfaceAddress(iface)
    const range = getIfaceRange(address)
    const scanner = getScanner(type)({ range, start, end, port, timeout, retries })

    return scanner.on('hit', function ({ host }) {
        let device = `${range}.${host}`
        // exclude own device
        if (device !== address) this.emit('device', device)
    })

}
