export const debounce = (callback: () => void, delay = 300): (() => void) => {
	let timeout: NodeJS.Timeout | undefined;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(), delay);
	};
};
