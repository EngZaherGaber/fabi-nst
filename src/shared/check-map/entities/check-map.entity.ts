import { CheckMapEntryEntity } from 'src/shared/check-map-entry/entities/check-map-entry.entity';

export class CheckMapEntity {
  ar: CheckMapEntryEntity;
  en: CheckMapEntryEntity;
  final: string;

  constructor(partial: Partial<CheckMapEntity>) {
    Object.assign(this, partial);
  }
}
