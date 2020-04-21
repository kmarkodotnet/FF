import { EntityInstance } from '../../models/dtos/entity-instance.model';

export class KeyValuePair<TKey,TValue> {
    key: TKey;
    value: TValue;
    constructor(key: TKey,value: TValue) {
      this.key = key;
      this.value = value;
    }
  }