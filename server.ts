
import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import * as compression from 'compression';

import { AppServerModule } from './src/main.server';

const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: 'test_E8azAjRBsrTA96MSR4f7r6SrdEcagz' });

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
    const amountValue = req.body.amount as string | number;
    const currency = 'EUR'; // Je zou de valuta kunnen hardcoderen of vanuit een andere bron kunnen verkrijgen

    if (typeof amountValue === 'string' || typeof amountValue === 'number') {
      const rawValue = parseFloat(amountValue as string);
      if (!isNaN(rawValue)) {
        const formattedAmount = rawValue.toFixed(2);
        const description = req.body.description;
        try {
          const payment = await mollieClient.payments.create({
            amount: {
              currency,
              value: formattedAmount
            },
            description,
            redirectUrl: 'https://www.hafc.nl/doneer/dank-je-wel'
          });
          const checkoutUrl = payment.getCheckoutUrl();
          res.json({ checkoutUrl });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      } else {
        res.status(400).json({ error: 'Invalid amount value' });
      }
    } else {
      res.status(400).json({ error: 'Invalid amount format' });
    }
  });

  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req
    });
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
