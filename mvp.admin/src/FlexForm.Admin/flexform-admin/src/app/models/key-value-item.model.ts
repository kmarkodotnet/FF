export class KeyValueItem<TKey,TValue>{
    constructor(key:TKey, value:TValue) {
        this.key = key;
        this.value = value;
    }
    key:TKey;
    value:TValue;
}