
const DERIVATIVE_STEP = 0.00000001;

function ComputeDerivative(func, argument, index) {
	if (Array.isArray(argument)) {
		if (typeof index === "undefined") {
			throw new Error("The index argument is required if agument is array");
		}
		var argument2 = argument.slice(0);
		argument2[index] += DERIVATIVE_STEP;
		return (func(argument2) - func(argument)) / DERIVATIVE_STEP;
	} else {
		return (func(argument + DERIVATIVE_STEP) - func(argument)) / DERIVATIVE_STEP;
	}
}



function SquareLoss(options) {
	this._func = options.func;
	this._result = 0;
}
SquareLoss.prototype.update = function(argument, target) {
	this._result += Math.pow(target - this._func(argument), 2);
}
SquareLoss.prototype.result = function() {
	return this._result;
}


if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		DERIVATIVE_STEP: DERIVATIVE_STEP,
		derivative: ComputeDerivative
	};
}


