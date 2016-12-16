const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const mocha = new Mocha();

process.argv.slice(2).forEach(discoverPath);

mocha.run(function(failures) {
	process.on('exit', function() {
		process.exit(failures);
	});
});


function discoverPath(path) {
	if (fs.lstatSync(path).isDirectory()) {
		discoverDirectory(path);
	} else {
		mocha.addFile(path);
	}
}

function discoverDirectory(directory) {
	fs.readdirSync(directory).filter(function(file) {
		const suffix = '.test.js';
		return file.substr(-1 * suffix.length) === suffix;
	}).forEach(function(file) {
		mocha.addFile(path.join(directory, file));
	});
}
