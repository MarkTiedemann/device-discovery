'use strict'

const os = require('os')

module.exports = (name = 'WiFi') => {

    const ifaces = os.networkInterfaces()
    const iface = ifaces[name]

    if (!iface)
        throw new Error(`Interface '${name}' not found`)

    else
        return iface
            .filter(iface => 'IPv4' === iface.family)
            .shift()
            .address

}
