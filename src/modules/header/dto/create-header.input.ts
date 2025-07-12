import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum } from 'class-validator';
import { CheckMapDTO } from 'src/shared/check-map/dto/check-map.input';

export enum ExpectedType {
  String = 'string',
  Number = 'number',
  Currency = 'currency',
  Date = 'date',
}
registerEnumType(ExpectedType, {
  name: 'ExpectedType', // this name will appear in the GraphQL schema
  description: 'Expected sign for the field',
});
@InputType()
export class CreateHeaderInput {
  @Field(() => CheckMapDTO)
  checkMap: CheckMapDTO;

  @Field(() => ExpectedType)
  @IsEnum(ExpectedType)
  expectedType: ExpectedType;

  @Field()
  @IsBoolean()
  required: boolean;
}
