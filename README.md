
# device-discovery

**Discover devices on your local network.**

## Installation

```
npm install device-discovery
```

## Quickstart

```js

const discovery = require('device-discovery')({ iface: 'WiFi' })

discovery.on('device', console.log)
    // => 192.168.0.20
    //    192.168.0.31
    //    ...

```

## API

### `require('device-discovery')(options)`

- **options** `<Object>`
    - **iface** `<String>`: *default =* `WiFi`; the interface on which to scan for devices
    - **start** `<Number>`: *default =* `2`; the start of the range of hosts to be scanned
    - **end** `<Number>`: *default =* `254`; the end of the range of hosts to be scanned
    - **port** `<Number>`: *default =* `1`; the port to be scanned
    - **timeout** `<Number>`: *default =* `3000`; the timeout after which the scan of a host will be considered a miss
- **throws** an `<Error>` if the interface cannot be found
- **returns** an `<EventEmitter>` with the following events:
    - **device** => `<String>`: the IPv4 address of the device found

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).
