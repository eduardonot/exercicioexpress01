const express = require('express')
const app = express ()
const ports = [3000, 3100,3200,3300,3400,3500, 5000, 5100, 5200, 5300, 5400, 5500] 
var isListening = false

function tryPorts () {
	while (isListening == false){
		var randIndex = ports[Math.floor(Math.random() * ports.length)]
		isListening = app.listen(randIndex).listening
	}
}

module.exports = {
	port: tryPorts(),
	
}