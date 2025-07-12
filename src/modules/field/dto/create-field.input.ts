import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsArray, IsOptional } from 'class-validator';
import { CheckMapDTO } from 'src/shared/check-map/dto/check-map.input';

export enum ExpectedSign {
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  SUM = 'sum',
}
registerEnumType(ExpectedSign, {
  name: 'ExpectedSign', // this name will appear in the GraphQL schema
  description: 'Expected sign for the field',
});
@InputType()
export class CreateFieldInput {
  @Field(() => CheckMapDTO)
  checkMap: CheckMapDTO;

  @Field(() => ExpectedSign)
  @IsEnum(ExpectedSign)
  expectedSign: ExpectedSign;

  @Field()
  @IsBoolean()
  required: boolean;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  fieldsSum?: string[];
}
