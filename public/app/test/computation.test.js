
const assert = require('assert');
const computation = require('../computation');


describe('computation', () => {
	describe('derivative', () => {
		it('y = const', () => {
			function func(x) {
				return 10;
			}
			assert.equal(computation.derivative(func, 1), 0);
			assert.equal(computation.derivative(func, 10), 0);
			assert.equal(computation.derivative(func, -1), 0);
		});
		
		it('y = x', () => {
			function func(x) {
				return x;
			}
			equalFloat(computation.derivative(func, 1), 1);
			equalFloat(computation.derivative(func, 10), 1);
			equalFloat(computation.derivative(func, -1), 1);
		});
		
		it('y = 3 * x', () => {
			function func(x) {
				return 3 * x;
			}
			equalFloat(computation.derivative(func, 1), 3);
			equalFloat(computation.derivative(func, 10), 3);
			equalFloat(computation.derivative(func, -1), 3);
		});
		
		it('y = 3 * x * x', () => {
			function func(x) {
				return 3 * x * x;
			}
			equalFloat(computation.derivative(func, 1), 3 * 2 * 1);
			equalFloat(computation.derivative(func, 10), 3 * 2  * 10);
			equalFloat(computation.derivative(func, -5), 3 * 2 * -5);
		});
		
		it('y = exp(x)', () => {
			function func(x) {
				return Math.exp(x);
			}
			equalFloat(computation.derivative(func, 1), Math.exp(1));
			equalFloat(computation.derivative(func, 5), Math.exp(5));
			equalFloat(computation.derivative(func, 3), Math.exp(3));
			equalFloat(computation.derivative(func, -3), Math.exp(-3));
		});
		
		it('c = a + b', () => {
			function func(x) {
				return x[0] + x[1];
			}
			equalFloat(computation.derivative(func, [1, 2], 0), 1);
			equalFloat(computation.derivative(func, [10, 20], 1), 1);
			equalFloat(computation.derivative(func, [-1, 3], 0), 1);
		});
		
		it('c = x * x * a + b', () => {
			function func(args) {
				return Math.pow(args[0], 2) * args[1] + args[2];
			}
			equalFloat(computation.derivative(func, [3, 2, 5], 0), 2 * 3 * 2);
			equalFloat(computation.derivative(func, [3, 2, 5], 1), 3 * 3);
			equalFloat(computation.derivative(func, [3, 2, 5], 2), 1);
		});
		
		it('sigmoid y = 1 / (1 + exp(-x))', () => {
			function sigmoid(arg) {
				return 1 / (1 + Math.exp(-arg));
			}
			
			equalFloat(computation.derivative(sigmoid, -10), sigmoid(-10) * (1 - sigmoid(-10)));
			equalFloat(computation.derivative(sigmoid, 0), sigmoid(0) * (1 - sigmoid(0)));
			equalFloat(computation.derivative(sigmoid, 0), 0.25);
			equalFloat(computation.derivative(sigmoid, 100), sigmoid(100) * (1 - sigmoid(100)));
		});
	});
	
	describe('square loss', () => {
		describe ('y = a * x + b', () => {
			function func(args) {
				return args[0] * args[1] + args[2];
			}
			
			
			it ('target = actual', () => {
				var loss = new computation.loss.Square(func);
				equalLoss(loss.update([2, 3, 1], func([2, 3, 1])), 
						  {loss: 0.0, derivatives: [0.0, 0.0, 0.0]});
				equalLoss(loss.update([3, 2, 2], func([3, 2, 2])), 
						  {loss: 0.0, derivatives: [0.0, 0.0, 0.0]});
				equalFloat(loss.total(), 0.0);
			});
			
			it ('target = actual + 0.2', () => {
				var loss = new computation.loss.Square(func);

				const a1 = 2, x1 = 3, b1 = 1, error1 = 0.2;
				equalLoss(loss.update([a1, x1, b1], func([a1, x1, b1]) + error1), 
						  {loss: error1 * error1, derivatives: [-2 * x1 * error1, -2 * a1 * error1,  -2 * error1]});
				
				const a1 = 2, x1 = 3, b1 = 1, error1 = 0.2;
				/*equalLoss(loss.update([3, 2, 2], func([3, 2, 2]) + 0.2), 
						  {loss: 0.04, derivatives: [0.0, 0.0]});
				equalFloat(loss.total(), 0.0, "total loss");*/
			});
		});
	});
});


function equalFloat(actual, expected, message) {
	if (Math.abs(actual - expected) > 0.00001) {
		assert.equal(expected, actual, message);
	}
}

function equalLoss(actual, expected) {
	equalFloat(actual.loss, expected.loss, "loss");
	equalFloat(actual.derivatives.length, expected.derivatives.length, "count of loss derivatives");
	for(var i = 0; i < actual.derivatives.length; i++) {
		equalFloat(actual.derivatives[i], expected.derivatives[i], "derivative of [" + i + "]");
	}
}