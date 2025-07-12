import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CheckMapEntrySchema,
  CheckMapEntrySchemaClass,
} from 'src/shared/check-map-entry/schema/check-map-entry.schema';

@Schema({ _id: false })
export class CheckMapSchemaClass {
  @Prop({ type: CheckMapEntrySchema, required: true })
  ar: CheckMapEntrySchemaClass;

  @Prop({ type: CheckMapEntrySchema, required: true })
  en: CheckMapEntrySchemaClass;

  @Prop({ type: String, required: true })
  final: string;
}

export const CheckMapSchema = SchemaFactory.createForClass(CheckMapSchemaClass);
