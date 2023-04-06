export let roundUpTo4DecimalPlaces = (num: number): number => {
	const precision = 4;
	const roundingFactor = Math.pow(10, precision);
	return Math.ceil(num * roundingFactor) / roundingFactor;
};
