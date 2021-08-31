import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { Logger } from '../lib/logger';

@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {
  private log = Logger.create(module);

  public use(req: Request, res: Response, next: NextFunction): any {
    return morgan('dev', {
      stream: {
        write: this.log.info.bind(this.log),
      },
    })(req, res, next);
  }
}
