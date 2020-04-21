import { BaseWithTimeStamp } from "./base-with-timestamp.model";
import { IValue } from '../interfaces/value.interface';

export class FieldValue extends BaseWithTimeStamp<number> implements IValue{
    value:any;
}