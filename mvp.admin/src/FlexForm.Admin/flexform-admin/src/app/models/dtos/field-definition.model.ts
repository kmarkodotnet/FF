import { FieldType } from '../enums';
import { ItemSourceDefinition } from './item-source-definition.model';
import { Guid } from 'guid-typescript';
import { Output, EventEmitter } from '@angular/core';
import { BaseProperty } from '../properties';
import { PropertyNameConstants } from '../../property-name-constants';
import { BaseWithTimeStamp } from './base-with-timestamp.model';
import { IClassDefinition } from '../interfaces/class-definition.interface';

export class FieldDefinition extends BaseWithTimeStamp<number> implements IClassDefinition{
    
    name:string;
    entityDefinitionId:number;
    itemSourceDefinitionId:number;
    fieldType:FieldType;
    expression: string;
    itemSourceDefinition:ItemSourceDefinition;
    
    public properties: BaseProperty<any>[];
    color: string;
    public guid: Guid;
    constructor() {
        super();
        this.guid = Guid.create();
    }

}