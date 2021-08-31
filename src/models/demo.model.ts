import { Schema, model, Document } from 'mongoose';
import options, { preUpdateMiddleware } from '../lib/mongoose_options';

interface Demo extends Document{
  name: string;

  type: string,

  createdAt?: Date,

  updatedAt?: Date,
}

const schema = new Schema<Demo>(
  {
    name: { type: String },
    type: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { ...options, collection: 'demo' },
);

schema.pre(new RegExp('^.*update.*', 'i'), preUpdateMiddleware);

export default model<Demo>('demo', schema);
