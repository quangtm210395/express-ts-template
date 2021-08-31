import mongoose, { ConnectOptions } from 'mongoose';
import { Logger } from './logger';

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default function connect(uri: string) {
  const logger = Logger.create(module);
  const db = mongoose.connection;

  db.on('connecting', () => {
    logger.info('connecting to MongoDB...');
  });

  db.on('error', (error: any) => {
    logger.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
  });
  db.on('connected', () => {
    logger.info('MongoDB connected!');
  });
  db.once('open', () => {
    logger.info('MongoDB connection opened!');
  });
  db.on('reconnected', () => {
    logger.info('MongoDB reconnected!');
  });
  db.on('disconnected', async () => {
    logger.info('MongoDB disconnected!');
    await wait(2000);
    mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
  });

  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions);
}
