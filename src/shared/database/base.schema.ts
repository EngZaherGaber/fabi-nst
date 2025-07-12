import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class BaseSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
