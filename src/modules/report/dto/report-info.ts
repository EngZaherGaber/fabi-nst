import { InputType, Field, Float, ObjectType } from '@nestjs/graphql';
import { HeaderInfoBase } from 'src/modules/header/dto/header-info';

@ObjectType({ isAbstract: true }) // <-- Required
@InputType({ isAbstract: true }) // <-- Required
export class ReportInfoBase {
  @Field()
  reportName: string;

  @Field(() => [HeaderInfoBase])
  headers: HeaderInfoBase[];
}
@InputType()
export class ReportInfoInput extends ReportInfoBase {}

@ObjectType()
export class ReportInfoOutput extends ReportInfoBase {}
