const readLine = require('readline')
const exec = require('child_process').exec

let stepCount = 1

function execAdb(distance) {
	let factor = 710 / 32
	let time = Math.round(factor * distance)

	return new Promise((resolve, reject) => {
		let adb = exec(`adb shell input swipe 0 0 0 0 ${time}`, (error, stdout, stderr) => {
			console.log(`step ${stepCount++}`)
			adb.kill()
			resolve()
		})
	})
}

let rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
})

rl.setPrompt('输入距离(mm)：')
rl.prompt()

rl.on('line', line => {
	line = line.trim()

	if (!/\d+/g.test(line)) {
		return console.warn('请输入数字')
	}

	execAdb(line).then(() => {
		rl.prompt()
	})
})

// process.on('exit', () => {
// 	rl.clear()
// })