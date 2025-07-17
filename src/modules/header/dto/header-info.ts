import { InputType, Field, Float, ObjectType } from '@nestjs/graphql';
import { ExpectedTypeEnum } from '../enum/expected-type.enum';

@ObjectType('HeaderInfoBaseObject', { isAbstract: true })
@InputType('HeaderInfoBaseInput', { isAbstract: true })
export class HeaderInfoBase {
  @Field()
  sentHeader: string;

  @Field()
  expectedHeader: string;

  @Field()
  choiceHeader: string;

  @Field()
  final: string;

  @Field(() => Float)
  score: number;

  @Field()
  status: string;

  @Field()
  isDynamic: boolean;

  @Field(() => ExpectedTypeEnum, { nullable: true })
  expectedType?: ExpectedTypeEnum;
}
@InputType()
export class HeaderInfoInput extends HeaderInfoBase {}

@ObjectType()
export class HeaderInfoOutput extends HeaderInfoBase {}
