var encode = require('git-side-band-message');

function SideBand(stream) {
	this.stream = stream;
}

SideBand.prototype.end = function(msg) {
	// must be called on the end
	if (msg) {
		this.write(msg);
	}
	return this.stream.end("00000000");
};

SideBand.prototype.write = function(msg) {
	return this.stream.write(encode(msg));
};

module.exports = SideBand