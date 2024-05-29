export const toFix2 = (value: number | null) => {
	if (value === 0) {
		return;
	}

	return value?.toFixed(4).slice(0, -2);
};
