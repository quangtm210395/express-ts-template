import { Container } from 'typedi';

import { Logger as WinstonLogger } from '../lib/logger';

export function Logger(_module: any): ParameterDecorator {
  return (object, propertyKey, index): any => {
    const logger = WinstonLogger.create(_module);
    const propertyName = propertyKey ? propertyKey.toString() : '';
    Container.registerHandler({ object, propertyName, index, value: () => logger } as any);
  };
}
