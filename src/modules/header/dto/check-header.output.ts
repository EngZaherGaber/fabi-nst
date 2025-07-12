import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class HeaderInfo {
  @Field()
  sentHeader: string;

  @Field()
  expectedHeader: string;

  @Field(() => Float)
  score: number;
}

@ObjectType()
export class CheckHeaderOutput {
  @Field(() => [HeaderInfo])
  headersInfo: HeaderInfo[];

  @Field(() => [String])
  allHeaders: string[];
}
