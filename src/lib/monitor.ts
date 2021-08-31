import basicAuth from 'express-basic-auth';
import monitor from 'express-status-monitor';
import { Express } from 'express';

import { env } from '../env';

export const monitorLoader = (app: Express) => {
  if (env.monitor.enabled) {

    app.use(monitor());
    app.get(
      env.monitor.route,
      env.monitor.username ? basicAuth({
        users: {
          [`${env.monitor.username}`]: env.monitor.password,
        },
        challenge: true,
      }) : (req, res, next) => next(),
      monitor().pageRoute
    );

  }
};
