import { BaseProperty } from './base-property.model';
import { Guid } from 'guid-typescript';
import { AgGridPropertyType } from '../enums';

export class NumberProperty extends BaseProperty<number>{    
    constructor(guid: Guid,name: string,value: number,emitIfChanged: boolean,isImmediateBind:boolean){
        super(guid,name,value,emitIfChanged,isImmediateBind);
        this.type = AgGridPropertyType.Number;
    }
}