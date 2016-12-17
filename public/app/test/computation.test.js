
const assert = require('assert');
const computation = require('../computation');


describe('computation', () => {
	describe('derivative', () => {
		it('y=const', () => {
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
	});
	
});


function equalFloat(actual, expected) {
	if (Math.abs(actual - expected) > 0.00001) {
		assert.equal(expected, actual);
	}
}