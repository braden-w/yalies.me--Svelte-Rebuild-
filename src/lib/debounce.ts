export const debounce = (callback, delay = 300): (() => void) => {
	let timeout: NodeJS.Timeout | undefined;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(), delay);
	};
};
