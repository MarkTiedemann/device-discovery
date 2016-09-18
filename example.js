'use strict'

const discovery = require('.')
    ({ type: 'ICMP', iface: 'WiFi' })

discovery.on('device', console.log)
    // => 192.168.0.1
    //    192.168.0.20
    //    ...
