const child_process = require('child_process')
const exec = child_process.exec

function execAdbShell() {
	return execAdbShell.promise || (execAdbShell.promise = new Promise((resolve, reject) => {
		let subProcess = exec('adb shell', (error, stdout, stderr) => {
			if (error) {
				console.log('adb error')
				reject(stderr)
			}
		})
		resolve(subProcess)
	}))
}

function longTap(x, y, time) {
	// let factor = 710 / 32
	// let time = Math.round(factor * distance)

	return swipe(x, y, x, y, time)
}

function swipe(x1, y1, x2, y2, time) {
	return new Promise((resolve, reject) => {
		let subProcess = exec(`adb shell input swipe ${x1} ${y1} ${x2} ${y2} ${time}`, (error, stdout, stderr) => {
			if (error) {
				reject(stderr)
			} else {
				resolve(stdout)
			}
		})
	})
}

function tap(x,y) {
	return new Promise((resolve, reject) => {
		let subProcess = exec(`adb shell input tap ${x} ${y}`, (error, stdout, stderr) => {
			if (error) {
				reject(stderr)
			} else {
				resolve(stdout)
			}
		})
	})
}

function getDeviceSize() {
	return new Promise((resolve, reject) => {
		let subProcess = exec(`adb shell wm size`, (error, stdout, stderr) => {
			if (error) {
				reject(stderr)
			} else {
				let size = stdout.match(/\d+/g)|| []
				resolve({width: size[0], height: size[1]})
			}
		})
	})
}

function screenshot(path) {
	return new Promise((resolve, reject) => {
		let subProcess = exec(`adb shell screencap -p /sdcard/screenshot.png`, (error, stdout, stderr) => {
			if (error) {
				reject(stderr)
			} else {
				subProcess = exec(`adb pull /sdcard/screenshot.png ${path}`, (error, stdout, stderr) => {
					if (error) {
						reject(stderr)
					} else {
						resolve(path)
					}
				})
			}
		})
	})
}

module.exports = {
	execAdbShell,
	tap,
	longTap,
	swipe,
	getDeviceSize,
	screenshot
}