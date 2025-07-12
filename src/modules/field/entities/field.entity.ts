import { CheckMapEntity } from 'src/shared/check-map/entities/check-map.entity';

export class FieldEntity {
  checkMap: CheckMapEntity;
  expectedSign: 'negative' | 'positive' | 'sum';
  required: boolean;
  fieldsSum?: string[];

  constructor(partial: Partial<FieldEntity>) {
    Object.assign(this, partial);
  }
}
