import { ListProperty } from './list-property.model';
import { DropDownElement } from './drop-down-element.model';
import { Guid } from 'guid-typescript';
import { AgGridPropertyType } from '../enums';

export class DropDownListProperty extends ListProperty<number>{
    constructor(guid: Guid, name: string,value: number,emitIfChanged: boolean,isImmediateBind:boolean, elements: Array<DropDownElement>){
        super(guid, name,value,emitIfChanged,isImmediateBind, elements);
        this.type = AgGridPropertyType.DropDown;
    }
}