import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Field, FieldSchema } from '../field/field.schema';
import { Header, HeaderSchema } from '../header/header.schema';

@Schema({ timestamps: true })
export class Report extends Document {
  @Prop()
  name: string;

  @Prop({ type: [FieldSchema], required: true })
  fields: Types.DocumentArray<Field>;

  @Prop(() => [HeaderSchema])
  headers: Types.DocumentArray<Header>;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
