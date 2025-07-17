import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class GeneralReportInfoOutput {
  @Field()
  isDynamic: boolean;

  @Field()
  reportName: string;

  @Field()
  headerCount: number;

  @Field(() => [String])
  allHeaders: string[];
}
