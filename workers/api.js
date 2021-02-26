import { Router } from "itty-router";

import gallery from './api/gallery.js';
import comics from './api/comics.js';
import latestComics from './api/comics/latest.js';
import images from './api/images.js';
import notFound from './api/404.js';

const router = Router()

router
  .get('/api/comics', gallery)
  .get('/api/comics/latest', latestComics)
  .get('/api/comics/:id', comics)
  .get('/api/images', images)
  .get('/api/xkcd/images', images)
  .get('/xkcd/api/images', images)
  .get('*', notFound)

  
export const handleRequest = request => router.handle(request)