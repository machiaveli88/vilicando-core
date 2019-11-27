#!/usr/bin/env node
import next from 'next';
import { join } from 'path';
import { createServer } from 'http';
import { parse as urlParse } from 'url';
import { setEnv } from './env';

// set env
setEnv();

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: any, res?: any) => {
    const parsedUrl = urlParse(req.url!, true);
    const { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      app.serveStatic(req, res, join(process.cwd(), '.next', pathname));
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  console.info(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
