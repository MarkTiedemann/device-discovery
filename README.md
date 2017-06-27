
# device-discovery

**Discover devices on your local network.**

## Installation

```
npm install device-discovery
```

## Quickstart

```js

const discovery = require('device-discovery')
    ({ type: 'ICMP', iface: 'WiFi' })

discovery.on('device', console.log)
    // => 192.168.0.20
    //    192.168.0.31
    //    ...

discovery.on('done', () =>
    console.log('Done!'))

```

## API

### `require('device-discovery')(options)`

- **options** `<Object>`
    - **type** `<String>`: *default =* `ICMP`; the protocol used for device discovery, one of `ICMP` or `TCP`
    - **iface** `<String>`: *default =* `WiFi`; the interface on which to scan for devices
    - **start** `<Number>`: *default =* `2`; the start of the range of hosts to be scanned
    - **end** `<Number>`: *default =* `254`; the end of the range of hosts to be scanned
    - **port** `<Number>`: *default =* `1`; the port to be scanned (`TCP` only)
    - **timeout** `<Number>`: *default =* `3000`; the timeout after which the scan of a host will be considered a miss
    - **retries** `<Number>`: *default =* `0`; the number of retries for pinging a host (`ICMP` only)
    - **excludeSelf** `<Boolean>`: *default =* `true`; whether to exclude the device the discovery is run on
- **throws** an `<Error>` if the interface cannot be found or the type is unknown
- **returns** an `<EventEmitter>` with the following events:
    - **device** => `<String>`: the IPv4 address of the device found
    - **done** => `()`: if the discovery is done

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).
