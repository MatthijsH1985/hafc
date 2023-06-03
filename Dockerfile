## Use Node Slim image
FROM node:16-slim

## Copy source code
COPY dist /dist/

## Start the application
CMD ["node", "/dist/hafc/server/main.js"]