import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'me'
	},
	intro: true,
	hydrate: true
});

export default app;