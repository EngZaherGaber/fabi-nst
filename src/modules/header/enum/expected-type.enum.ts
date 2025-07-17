import { registerEnumType } from '@nestjs/graphql';

export enum ExpectedTypeEnum {
  String = 'string',
  Number = 'number',
  Currency = 'currency',
  Date = 'date',
}
registerEnumType(ExpectedTypeEnum, {
  name: 'ExpectedTypeEnum', // this name will appear in the GraphQL schema
  description: 'Expected sign for the field',
});
