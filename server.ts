import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import bootstrap from './src/main.server';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Proxy middleware voor /sitemap.xml
  server.use('/sitemap.xml', createProxyMiddleware({
    target: 'https://backend.mumba.nl',
    changeOrigin: true,
    onProxyReq: (proxyReq: any, req: any, res: any) => {
      console.log('Proxy request:', req.originalUrl);
    },
    onProxyRes: (proxyRes: any, req: any, res: any) => {
      console.log('Proxy response:', req.originalUrl);
    },
    onError: (err: any, req: any, res: any) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy Error');
    }
  } as Options));

  // Serveer statische bestanden vanuit /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Alle andere routes gebruiken de Angular engine
  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    const { protocol, headers, originalUrl } = req;

    commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start de Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server luistert op http://localhost:${port}`);
  });
}

run();
