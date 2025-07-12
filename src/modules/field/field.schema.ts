import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CheckMapSchemaClass } from 'src/shared/check-map/schema/check-map.schema';

@Schema()
export class Field extends Document {
  @Prop({ type: CheckMapSchemaClass, required: true })
  checkMap: typeof CheckMapSchemaClass;

  @Prop({ type: String, enum: ['negative', 'positive', 'sum'], required: true })
  expectedSign: string;

  @Prop({ type: Boolean, required: true })
  required: boolean;

  @Prop({ type: [String], default: [] })
  fieldsSum: string[];
}

export const FieldSchema = SchemaFactory.createForClass(Field);
