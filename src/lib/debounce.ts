export const debounce = (callback: (arg0: any) => void, delay = 300) => {
	let timeout: NodeJS.Timeout | undefined;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), delay);
	};
};
