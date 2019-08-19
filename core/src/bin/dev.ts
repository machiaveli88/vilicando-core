#!/usr/bin/env node
import next from 'next';
import { createServer } from 'http';
import { join } from 'path';
import { parse } from 'url';

export default async ({ '--port': port = 3000, '--dev': dev = true }: any) => {
  const app = next({ dev });
  const handle = app.getRequestHandler();

  return await app.prepare().then(() => {
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
};
