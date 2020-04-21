import { BaseWithTimeStamp } from "./base-with-timestamp.model";
import { FieldValue } from './field-value.model';
import { IValue } from '../interfaces/value.interface';

export class EntityInstance extends BaseWithTimeStamp<number> implements IValue{
    fieldValues:FieldValue[];
}