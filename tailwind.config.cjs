const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	safelist: [{ pattern: /bg-.+-.+/ }],

	theme: {
		extend: {}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
