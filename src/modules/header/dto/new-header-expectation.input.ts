import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum } from 'class-validator';
import { CheckMapDTO } from 'src/shared/check-map/dto/check-map.input';

@InputType()
export class NewHeaderExpectationInput {
  @Field()
  header: string;

  @Field()
  newExcpectation: string;

  @Field()
  report: string;
}
