import XKCD from './xkcd.svelte';

const app = new XKCD({
	target: document.body,
	props: {},
	intro: true,
	hydrate: true
});

export default app;