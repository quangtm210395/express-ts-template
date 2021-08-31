import { PreMiddlewareFunction, Query, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  versionKey: 'version',
  timestamps: true,
};

// eslint-disable-next-line func-names
export const preUpdateMiddleware: PreMiddlewareFunction<Query<any, any>> = function (next) {
  const update: any = this.getUpdate();
  if (update.version != null) {
    delete update.version;
  }
  const keys = ['$set', '$setOnInsert'];
  keys.forEach((key) => {
    if (update[key] != null && update[key].version != null) {
      delete update[key].version;
      if (Object.keys(update[key]).length === 0) {
        delete update[key];
      }
    }
  });
  update.$inc = update.$inc || {};
  update.$inc.version = 1;
  next();
};

export default options;
