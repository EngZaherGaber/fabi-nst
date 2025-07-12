import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CheckHeaderInput {
  @Field(() => [String])
  headers: string[];

  @Field()
  report: string;
}
