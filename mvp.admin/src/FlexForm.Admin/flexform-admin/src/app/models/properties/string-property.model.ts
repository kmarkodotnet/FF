import { BaseProperty } from './base-property.model';
import { AgGridPropertyType } from '../enums/ag-grid-property-type.enum';
import { Guid } from 'guid-typescript';

export class StringProperty extends BaseProperty<string>{
    constructor(guid: Guid,name: string,value: string,emitIfChanged: boolean,isImmediateBind:boolean){
        super(guid,name,value,emitIfChanged,isImmediateBind);
        this.type = AgGridPropertyType.Text;
    }
}