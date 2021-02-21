import { handleRequest } from './api.js'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})