const path = require('path')
const fs = require('fs')
const WebSocket = require('ws')
const readLine = require('readline')
const adbHelper = require('./adbHelper')

// let stepCount = 1


// let rl = readLine.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })

// rl.setPrompt('输入距离(mm)：')
// rl.prompt()

// rl.on('line', line => {
// 	line = line.trim()

// 	if (!/\d+/g.test(line)) {
// 		return console.warn('请输入数字')
// 	}

// 	adbHelper.longTap(line).then(() => {
// 		rl.prompt()
// 	})
// })


let screenshotPath = path.resolve('./screenshot/screenshot.png')

function pushScreenshot(ws) {
	adbHelper.screenshot(screenshotPath).then((path) => {		
		// let data = fs.readFileSync(path, {encoding: 'base64'})
		// data = 'data:image/png;base64,' + data

		ws.send(JSON.stringify({type: 'screenshot', data: path + '?_=' + Date.now()}), () => {
			console.log('push screenshot to client success')
			// pushScreenshot(ws)
		})
	}).catch(stderr => {
		console.log('pushScreenshot error:', stderr)
	})
}

// websocket通信
let wss = new WebSocket.Server({port: 8899})

wss.on('connection', (ws, req) => {
	console.log('connection success')
	// 获取设备分辨率
	adbHelper.getDeviceSize().then(size => {
		ws.on('message', message => {
			console.log('received message:', message)
			message = JSON.parse(message)
			let data = message.data

			if (message.type == 'screenshot') {
				pushScreenshot(ws)
			} else if (message.type == 'tap') {
				adbHelper.tap(data.x, data.y).then(() => {
					ws.send(JSON.stringify({type: 'tap', data: data}))
				})
			} else if (message.type == 'longtap') {
				adbHelper.longTap(data.x, data.y, data.time).then(() => {
					ws.send(JSON.stringify({type: 'longtap', data: data}))
				})
			}
		});
		ws.send(JSON.stringify({type: 'size', data: size}))
		pushScreenshot(ws)

		ws.on('close', () => {
			console.log('ws close')
		})

		ws.on('error', () => {
			console.log('ws connection error')
			ws.close()
		})
	}).then(() => {
		// pushScreenshot(ws)
	}).catch(error => {
		ws.send(JSON.stringify({type: 'error', data: error}))
		ws.close()
	})
});

console.log('websocket listening port 8899...')