import netlify from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import removeConsole from 'vite-plugin-svelte-console-remover';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: netlify(),
    prerender: {default: true},
    vite: {plugins: [removeConsole()]},
    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    }
  }
};

export default config;
