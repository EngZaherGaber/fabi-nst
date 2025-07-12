import { CreateHeaderInput } from './create-header.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHeaderInput extends PartialType(CreateHeaderInput) {
  @Field(() => Int)
  id: number;
}
