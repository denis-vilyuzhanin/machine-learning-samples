

const assert = require('assert');
const regression = require('../regression');
const computation = require('../computation');

/*describe('regression', () => {
	describe('linear', () => {
		it('y = b', () => {
		});
	});
});*/

function func(x) {
	return x[0]; 
}
var learningRate = 1;
var previousLoss = 0;
var b = Math.random();
var target = Math.random() * 100;
for(var step = 0; step < 100; step++) {
	var loss = new computation.loss.Square(func);
	loss.update([b], target);
	
	b -= loss.derivatives()[0] * learningRate;
	var reduce = previousLoss - loss.total();
	if (reduce <= 0) {
		learningRate = learningRate / 2;
	} else {
		learningRate += 0.1;
	}
	if (learningRate > 1) {
		learningRate = 1;
	}
	console.log("b=", b, " Error: ", loss.total());
	if (loss.total() < 0.000001) {
		break;
	}
	
}

console.log("y=" + b + "");

