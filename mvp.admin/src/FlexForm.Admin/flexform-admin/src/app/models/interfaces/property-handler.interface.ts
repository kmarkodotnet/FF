export interface PropertyConverterInterface<T>{
    convertUiProperties(entity: T):void;
}