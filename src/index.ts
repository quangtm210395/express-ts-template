import 'reflect-metadata';

import { useExpressServer, useContainer } from 'routing-controllers';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { Container } from 'typedi';
import path from 'path';

import app from './app';
import mongodbConnect from './lib/mongodb';
import { swaggerSetup } from './lib/swagger';
import { monitorLoader } from './lib/monitor';

import { env } from './env';

// its important to set container before any operation you do with routing-controllers,
// including importing controllers
useContainer(Container);
classValidatorUseContainer(Container);

// connect to mongodb
mongodbConnect(env.mongodb.uri);

// create  server
useExpressServer(app, {
  cors: true,
  classTransformer: true,
  routePrefix: env.app.routePrefix || '/api',
  defaultErrorHandler: false,
  controllers: [path.join(__dirname, '/controllers/*')],
  middlewares: [path.join(__dirname, '/middlewares/*')],
});

// setup swagger docs
swaggerSetup(app);
// setup express monitor
monitorLoader(app);

// run server
app.listen(env.app.port || 3000, () => console.log(`Server running at ${env.app.port}`));
