
const DERIVATIVE_STEP = 0.00000001;

function ComputeDerivative(func, x) {
	return (func(x + DERIVATIVE_STEP) - func(x)) / DERIVATIVE_STEP; 
}


if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		DERIVATIVE_STEP: DERIVATIVE_STEP,
		derivative: ComputeDerivative
	};
}


