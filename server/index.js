const path = require('path')
const fs = require('fs')
const WebSocket = require('ws')
const readLine = require('readline')
const adbHelper = require('./adbHelper')

let screenshotHandler = {
    pushPromise: null,
    screenshotPath: path.resolve('${__dirname}/../screenshot/screenshot.png'),

    push() {
        console.log(`start screenshot to path: ${this.screenshotPath}`)
        return this.pushPromise || (this.pushPromise = adbHelper.screenshot(this.screenshotPath)
            .then(() => {
                this.pushPromise = null
                return `${this.screenshotPath}?_t=${Date.now()}`
            }).catch(stderr => {
                console.log('pushScreenshot error:', stderr)
                this.pushPromise = null
                return Promise.reject(stderr)
            })
        )
    }
}

// websocket通信
let wss = new WebSocket.Server({port: 8899})

wss.on('connection', (ws, req) => {
    console.log('connection success')
    let getDeviceSizePromise = adbHelper.getDeviceSize()
    let looping = false
	// 获取设备分辨率
    ws.on('message', message => {
        console.log('received message:', message)
        message = JSON.parse(message)
        let data = message.data

        getDeviceSizePromise.then(size => {
            if (message.type == 'screenshot') {
                if (looping) { return }
                (function loopPush(){
                    screenshotHandler.push().then(path => {
                        ws.send(JSON.stringify({type: 'screenshot', data: path}), () => {
                            data.needLoop && loopPush() && (looping = true)
                        })
                    })
                })()

            } else if (message.type == 'tap') {
                adbHelper.tap(data.x, data.y).then(() => {
                    ws.send(JSON.stringify({type: 'tap', data: data}))
                })

            } else if (message.type == 'longtap') {
                adbHelper.longTap(data.x, data.y, data.time).then(() => {
                    ws.send(JSON.stringify({type: 'longtap', data: data}))
                })

            } else if (message.type == 'size') {
                ws.send(JSON.stringify({type: 'size', data: size}))
            }
        }).catch(error => {
            console.log('get device size error:', error)
            ws.send(JSON.stringify({type: 'deviceError', data: error}))
        })
    });

    ws.on('close', () => {
        console.log('ws close')
    })

    ws.on('error', () => {
        console.log('ws connection error')
        ws.close()
    })
});

console.log('websocket listening port 8899...')