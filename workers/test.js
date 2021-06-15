import { Router } from 'itty-router';

// create a router
const router = Router() // this is a Proxy, not a class

// GET index
router.get('/foo', () => new Response('Foo Index!'))

// GET item
router.get('/foo/:id.:format?', request => {
  const { id, format = 'csv' } = request.params

  return new Response(`Getting item ${id} in ${format} format.`)
})

// 404/Missing as final catch-all route
router.get('*', () => new Response('Not Found.', { status: 404 }))

// attach the router handle to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)