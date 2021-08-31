import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';

import { Logger } from '../decorators/Logger';

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public isProduction = process.env.NODE_ENV === 'production';

  constructor(@Logger(module) private log: winston.Logger) { }

  public error(error: HttpError, req: Request, res: Response, next: NextFunction): void {
    res.status(error.httpCode || 500);
    res.json({
      name: error.name,
      message: error.message,
      errors: error[`errors`] || [],
    });

    if (this.isProduction) {
      this.log.error(error.name, error.message);
    } else {
      this.log.error(error.name, error.stack);
    }
  }
}
