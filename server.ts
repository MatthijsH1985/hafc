
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import * as compression from 'compression';

import { AppServerModule } from './src/main.server';
import axios from 'axios';

export function app(): express.Express {
  const mollieTestApiKey = 'test_E8azAjRBsrTA96MSR4f7r6SrdEcagz';
  const mollieLiveApiKey = 'live_nWauMaxegtgfAeJn2uK4azkFaB6Vrq';
  const server = express();
  server.use(compression());
  const distFolder = join(process.cwd(), 'dist/hafc/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.use(express.json());

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.post('/donate', async (req, res) => {
    const { amount, description = 'Donatie', redirectUrl } = req.body;
    try {
      const response = await axios.post('https://api.mollie.com/v2/payments', {
        amount: {
          currency: 'EUR',
          value: amount.toFixed(2)
        },
        description: description,
        redirectUrl: redirectUrl,
        webhookUrl: 'https://webhook.example.com'
      }, {
        headers: {
          'Authorization': `Bearer ${mollieTestApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      res.json(response.data);
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  });

  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req
    });
    console.log('hi')
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
