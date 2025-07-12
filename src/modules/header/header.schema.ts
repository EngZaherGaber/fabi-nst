import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CheckMapSchemaClass } from 'src/shared/check-map/schema/check-map.schema';
import { Document } from 'mongoose';

@Schema()
export class Header extends Document {
  @Prop({ type: CheckMapSchemaClass, required: true })
  checkMap: CheckMapSchemaClass;

  @Prop({
    type: String,
    enum: ['string', 'number', 'currency', 'date'],
  })
  expectedType: string;

  @Prop()
  required: boolean;
}

export const HeaderSchema = SchemaFactory.createForClass(Header);
