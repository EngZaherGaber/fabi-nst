import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldResolver } from './field.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Field } from '@nestjs/graphql';
import { FieldSchema } from './field.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
  providers: [FieldResolver, FieldService],
})
export class FieldModule {}
