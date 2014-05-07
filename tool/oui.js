var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;

var MAC_REGEX = /\s[0-9A-F]{2}-[0-9A-F]{2}-[0-9A-F]{2}(.*)/g;

function Parser() {
	this.item = null;
	EventEmitter.call(this);
}

require('util').inherits(Parser, EventEmitter);

Parser.prototype.process = function (line) {
	if (MAC_REGEX.test(line)) {
		if (this.item) {
			this.emit('item', {item:this.item, mac: line.slice(1, 10).trim()});
		}
		this.item = {};
		this.item['address'] = [];
	} else if (this.item) {
		if (this.item.name) {
			this.item.address.push(line.slice(line.lastIndexOf('\t') + 1));
		} else {
			this.item.name = line.slice(line.lastIndexOf('\t') + 1);
		}
	}
};

Parser.prototype.end = function(){
	this.emit('end');
};

var outfile = path.join(__dirname, 'oui.json');
var parser = new Parser();
var json = {};
parser.on('item',function(data){
	var mac = data.mac.replace(/-/g,'');
	json[mac] = data.item;
});

parser.on('end', function(){
	fs.writeFileSync(outfile, JSON.stringify(json, undefined, 2));
});

var file = path.join(__dirname, 'oui.txt');

fs.readFile(file, function (err, data) {
	if (!err) {
		var split = data.toString().split(require('os').EOL);
		for (var i = 0; i < split.length; i++) {
			var line = split[i];
			if (line.length > 10) {
				parser.process(line);
			}
		}
		parser.end();
	}else{
            console.error(err);
        }
});
