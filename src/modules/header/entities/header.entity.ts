import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Header {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
