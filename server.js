const http = require('http');
const colors = require('colors');
const Archivos = require('./archivos/archivos.js');
const localhost = '127.0.0.1';	
const port = 3000;



var aplicacion = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(Archivos.archivos);
});

aplicacion.listen(3000, localhost);

console.log('todo corriendo a millon en: '.random.bold.bgYellow + localhost.america.yellow.bgBlack.bold + ' en el puerto: '.white.bgBlue.bold + port.toString().rainbow);

exports.server;
