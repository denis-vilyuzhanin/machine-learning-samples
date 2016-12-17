

(function() {

const DERIVATIVE_STEP = 0.00000001;

function FunctionDefinition() {
}

function FunctionDefinition(arg1, arg2) {
	
}
FunctionDefinition.prototype.specify = function(parameters) {
	return null;
}
FunctionDefinition.prototype.evaluate = function(arguments) {
	return null;
}

function FunctionEvaluation(definition) {
	
}



var func = DefineFunction(['a', 'b','c', 'x[2]'], function(a, b, c, x){
	return a * x[0] + b * x[1] + c;
});

func.;

var func1 = func.specify({a: 10, b: 20, c:12});
func.evaluate().set('x', [10, 20]).result();


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



function SquareLoss(func) {
	this._func = func;
	this._totalLoss = 0;
	this._totalDerivatives = [];
	this._count = 0;
}
SquareLoss.prototype.update = function(args, target) {
	var squareLossFunction = (x) => {
		return Math.pow(target - this._func(x), 2);
	};
	var loss = squareLossFunction(args);
	this._totalLoss += loss;
	
	var lossDerivatives = [];
	for(var i = 0; i < args.length; i++) {
		lossDerivatives[i] = ComputeDerivative(squareLossFunction, args, i);
		if (this._totalDerivatives.length < i + 1) {
			this._totalDerivatives.push(0);
		}
		this._totalDerivatives[i] += lossDerivatives[i]; 
	}
	this._count++;
	return {
		loss: loss,
		derivatives: lossDerivatives
	};
}
SquareLoss.prototype.total = function() {
	return this._totalLoss / this._count;
}

SquareLoss.prototype.derivatives = function() {
	return this._totalDerivatives;
}

var exports = {
	DERIVATIVE_STEP: DERIVATIVE_STEP,
	derivative: ComputeDerivative,
	loss: {
		Square: SquareLoss 
	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = exports; 
}


})();

