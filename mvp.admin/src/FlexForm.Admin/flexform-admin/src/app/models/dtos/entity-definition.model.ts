import { FieldDefinition } from './field-definition.model';
import { EntityInstance } from './entity-instance.model';
import { BaseWithTimeStamp } from './base-with-timestamp.model';
import { IClassDefinition } from '../interfaces/class-definition.interface';

export class EntityDefinition extends BaseWithTimeStamp<number> implements IClassDefinition{
    name: string;
    
    fieldDefinitions:FieldDefinition[];
    entityInstances:EntityInstance[];

    hasFormDefinitions:boolean;
    hasEntityInstances:boolean;
}