import { registerEnumType } from '@nestjs/graphql';

export enum ExpectedSign {
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  SUM = 'sum',
}
registerEnumType(ExpectedSign, {
  name: 'ExpectedSign', // this name will appear in the GraphQL schema
  description: 'Expected sign for the field',
});
