import { BaseProperty } from './base-property.model';
import { Guid } from 'guid-typescript';
import { AgGridPropertyType } from '../enums';

export class ConstantProperty extends BaseProperty<any>{
    displayValue:string;
    constructor(guid: Guid,name: string,value: any, displayValue:string){
        super(guid,name,value,false,false);
        this.type = AgGridPropertyType.Constant;
        this.displayValue = displayValue;
    }
}