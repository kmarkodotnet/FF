import { BaseProperty } from './base-property.model';
import { Guid } from 'guid-typescript';
import { AgGridPropertyType } from '../enums';

export class BooleanProperty extends BaseProperty<boolean>{
    constructor(guid: Guid,name: string,value: boolean,emitIfChanged: boolean,isImmediateBind:boolean){
        super(guid,name,value,emitIfChanged,isImmediateBind);
        this.type = AgGridPropertyType.CheckBox;
    }
}