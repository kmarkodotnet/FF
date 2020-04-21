import { BaseProperty } from './base-property.model';
import { DropDownElement } from './drop-down-element.model';
import { Guid } from 'guid-typescript';

export class ListProperty<T> extends BaseProperty<T>{
    constructor(guid: Guid, name: string,value: T,emitIfChanged: boolean,isImmediateBind:boolean, elements: Array<DropDownElement>){
        super(guid, name,value,emitIfChanged,isImmediateBind);
        this.elements = elements;
    }
    elements: Array<DropDownElement>;
}