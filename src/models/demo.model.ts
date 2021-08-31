import { Schema, model, Document } from 'mongoose';
import options, { preUpdateMiddleware } from '../lib/mongoose_options';

export interface Demo extends Document {
  name: string;

  type: string,

  createdAt?: Date,

  updatedAt?: Date,
}

export const DemoSchema = new Schema<Demo>(
  {
    name: { type: String },
    type: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { ...options, collection: 'demo' },
);

DemoSchema.pre(new RegExp('^.*update.*', 'i'), preUpdateMiddleware);

export const DemoModel = model<Demo>('demo', DemoSchema);
