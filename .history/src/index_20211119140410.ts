import { handleRequest } from './utils'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
