const next = require('next');
const path = require('path');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { parse } = require('url');

dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), '../.env') });

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: any, res?: any) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname } = parsedUrl;

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      app.serveStatic(req, res, path.join(process.cwd(), '.next', pathname));
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
