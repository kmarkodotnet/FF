import { Guid } from 'guid-typescript';
import { AgGridPropertyType } from '../enums';
import { Output, EventEmitter } from '@angular/core';

export class BaseProperty<T>{
    constructor(guid: Guid,name: string,value: T,emitIfChanged: boolean,isImmediateBind:boolean){
        this.guid = guid;
        this.name = name;
        this.value = value;
        this.emitIfChanged = emitIfChanged;
        this.isImmediateBind=isImmediateBind;
    }
    //@Output() valueChangedEvent: EventEmitter<any> = new EventEmitter();
    guid: Guid;
    name: string;
    value: T;
    emitIfChanged: boolean;
    isImmediateBind:boolean;
    type:AgGridPropertyType;
}