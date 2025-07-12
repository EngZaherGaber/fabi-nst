import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class CheckMapEntrySchemaClass {
  @Prop({ type: [String], required: true })
  Expectations: string[];

  @Prop({ type: String, required: true })
  correct: string;
}

export const CheckMapEntrySchema = SchemaFactory.createForClass(
  CheckMapEntrySchemaClass,
);
