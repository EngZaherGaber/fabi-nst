import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('CheckMapEntryInput')
export class CheckMapEntryDTO {
  @Field(() => [String], { description: 'Expected values' })
  Expectations: string[];

  @Field({ description: 'Correct value' })
  correct: string;
}
