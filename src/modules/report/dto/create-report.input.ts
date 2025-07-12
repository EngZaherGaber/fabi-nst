import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateFieldInput } from 'src/modules/field/dto/create-field.input';
import { CreateHeaderInput } from 'src/modules/header/dto/create-header.input';

@InputType()
export class CreateReportInput {
  @Field()
  name: string;

  @Field(() => [CreateFieldInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFieldInput)
  fields: CreateFieldInput[];

  @Field(() => [CreateHeaderInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHeaderInput)
  headers: CreateHeaderInput[];
}
