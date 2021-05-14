var check="check";
var io = require('socket.io').listen(8000);

io.sockets.on('connection', function (socket) {

	socket.on('sendtxt', function (txt) {
		console.log(txt);
		io.emit("updatetxt", txt);
	});


});
