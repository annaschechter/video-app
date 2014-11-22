var app = require('express')();
var server = require('http').createServer(app);
var io = require ('socket.io')(server);

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(require('express').static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/upload', function(req, res) {
	res.render('upload');
});

io.on('connection', function(socket) {
	console.log('new connection');

	socket.on('video upload', function(video) {

		console.log('got video');

		io.emit('video upload', video)
		console.log(video);
	})
});

server.listen(3000, function() {
	console.log('listening on port 3000');
});


