export class CheckMapEntryEntity {
  Expectations: string[];
  correct: string;

  constructor(partial: Partial<CheckMapEntryEntity>) {
    Object.assign(this, partial);
  }
}
