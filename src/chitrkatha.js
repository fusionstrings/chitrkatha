import Chitrkatha from './components/chitrkatha.svelte';

const app = new Chitrkatha({
	target: document.body,
	props: {},
	intro: true,
	hydrate: true
});

export default app;