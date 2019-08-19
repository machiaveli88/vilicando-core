#!/usr/bin/env node
import dotenv from 'dotenv';
import next from 'next';
import { createServer } from 'http';
import { join } from 'path';
import { parse } from 'url';

dotenv.config({ path: join(__dirname, '../.env') });

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    let { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      app.serveStatic(req, res, join(__dirname, '../.next', pathname));
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
});
