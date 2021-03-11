import { skipWaiting, clientsClaim } from 'workbox-core';
import * as navigationPreload from 'workbox-navigation-preload';
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing';
import {
	NetworkFirst,
	StaleWhileRevalidate,
	CacheFirst,
} from 'workbox-strategies';

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
// import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

navigationPreload.enable();
// Cache page navigations (html) with a Network First strategy
registerRoute(
	// Check to see if the request is a navigation to a new page
	({ request }) => request.mode === 'navigate',
	// Use a Network First caching strategy
	new NetworkFirst({
		// Put all cached files in a cache named 'pages'
		cacheName: 'pages',
		plugins: [
			// Ensure that only requests that result in a 200 status are cached
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
	({ url }) => url.origin === 'https://fonts.googleapis.com',
	new StaleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets',
	})
);
// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
	// Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
	({ request }) =>
		request.destination === 'style' ||
		request.destination === 'script' ||
		request.destination === 'worker',
	// Use a Stale While Revalidate caching strategy
	new StaleWhileRevalidate({
		// Put all cached files in a cache named 'assets'
		cacheName: 'assets',
		plugins: [
			// Ensure that only requests that result in a 200 status are cached
			new CacheableResponsePlugin({
				statuses: [200],
			}),
		],
	}),
);

// Cache images with a Cache First strategy
registerRoute(
	// Check to see if the request's destination is style for an image
	({ request }) => request.destination === 'image',
	// Use a Cache First caching strategy
	new CacheFirst({
		// Put all cached files in a cache named 'images'
		cacheName: 'images',
		plugins: [
			// Ensure that only requests that result in a 200 status are cached
			new CacheableResponsePlugin({
				statuses: [200],
			}),
			// Don't cache more than 5000 items, and expire them after 30 days
			// new ExpirationPlugin({
			// 	maxEntries: 5000,
			// 	maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
			// }),
		],
	}),
);

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new StaleWhileRevalidate());

// Catch routing errors, like if the user is offline
setCatchHandler(({ url, event }) => {
	// Return the precached offline page if a document is being requested
	if (event.request.destination === 'document') {
		if (url.pathname.startsWith('/xkcd')) {
			return matchPrecache('/xkcd/offline.html');
		}
		return matchPrecache('/offline.html');
	}

	return Response.error();
});

skipWaiting();
clientsClaim();