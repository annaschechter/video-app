var app = require('express')();
var server = require('http').createServer(app);
var io = require ('socket.io')(server);
var expressLayouts = require('express-ejs-layouts');
var fs = require('fs');

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(require('express').static(__dirname + '/public'));
app.use(expressLayouts);

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/upload', function(req, res) {
	res.render('upload');
});

io.on('connection', function(socket) {
	console.log('new connection');
	socket.on('channel provided', function(channel) {
		console.log('got channel')
		io.emit('channel provided', channel)
	});

	socket.on('video upload', function(video) {
		console.log('got video');
		console.log(video);
		uploadToYoutube(video, "smth", "smth")
	})
});

server.listen(3000, function() {
	console.log('listening on port 3000');
});

function uploadToYoutube(video_file, title, description,tokens, callback){
    var google = require("googleapis"),
        yt = google.youtube('v3');

    var oauth2Client = new google.auth.OAuth2("710857957569-cjc5k4m5d7nsqt73dpi16a9aab7aqo7f.apps.googleusercontent.com", "3pqlkqT0QhTJsy3LMlv4x3G1", '/');
    oauth2Client.setCredentials(tokens);
    google.options({auth: oauth2Client});

    return yt.videos.insert({
        part: 'status,snippet',
        resource: {
            snippet: {
                title: title,
                description: description
            },
            status: { 
                privacyStatus: 'private' //if you want the video to be private
            }
        },
        media: {
            body: fs.createReadStream(video_file)
        }
    }, function(error, data){
        if(error){
            callback(error, null);
        } else {
            callback(null, data.id);
        }
    });
};


