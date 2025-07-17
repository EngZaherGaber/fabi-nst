import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsArray, IsOptional } from 'class-validator';
import { CheckMapDTO } from 'src/shared/check-map/dto/check-map.input';
import { ExpectedSign } from '../enum/expected-sign.enum';

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
