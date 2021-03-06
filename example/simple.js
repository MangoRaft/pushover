var pushover = require('../');
var ProgressBar = require('progress');
var repos = pushover('/tmp/repos');

repos.on('push', function(push) {
	//console.log(push)
	console.log('push ' + push.repo + '/' + push.commit + ' (' + push.branch + ')');

	push.sideband().accept().once('sideband', function(sideband) {
		
				sideband.write('\ncomplete\n');
		var bar = new ProgressBar(':bar', {
			total : 10,
			stream : sideband
		});
		var timer = setInterval(function() {
			bar.tick();
			if (bar.complete) {
				sideband.end('\ncomplete\n');
				clearInterval(timer);
			}
		}, 100);
	});

});

repos.on('fetch', function(fetch) {
	console.log('fetch ' + fetch.repo + '/' + fetch.commit);
	fetch.accept();
});

var http = require('http');
var server = http.createServer(function(req, res) {
	repos.handle(req, res);
});
server.listen(7005);
