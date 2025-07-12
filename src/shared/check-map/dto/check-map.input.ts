import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { CheckMapEntryDTO } from 'src/shared/check-map-entry/dto/check-map-entry.input';

@ObjectType()
@InputType('CheckMapInput')
export class CheckMapDTO {
  @Field(() => CheckMapEntryDTO, { description: 'Arabic check map' })
  ar: CheckMapEntryDTO;

  @Field(() => CheckMapEntryDTO, { description: 'English check map' })
  en: CheckMapEntryDTO;

  @Field({ description: 'Final check value' })
  final: string;
}
