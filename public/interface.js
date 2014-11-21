$(document).ready(function() {

	var socket = io.connect();

	$('form').submit(function() {

		socket.emit('video upload', $('#newupload').val());
		$('#').val('');
		return false;
	});

	socket.on('video upload', function(video) {
		var videoLocation = video.replace("C:\\fakepath\\", " ");
		console.log(videoLocation)
		$('#video').append("<video width='320' height='240' controls><source src="+videoLocation+"</video>");
	})
})