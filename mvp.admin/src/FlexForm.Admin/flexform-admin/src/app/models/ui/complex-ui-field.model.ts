import { BaseUiField } from './base-ui-field.model';
import { EntityDefinition } from '../dtos';
import { FieldType } from '../enums/field-type.enum';
import { EntityEditorUiField } from './entity-editor-ui-field.model';

export class ComplexUiField extends EntityEditorUiField{
    id:number;
    timestamp: any;
    constructor(entityDefinition:EntityDefinition){
        super(entityDefinition.name, FieldType.EntityReference,"#DCDCDC");
        this.id = entityDefinition.id;
        this.timestamp = entityDefinition.timestamp;
    }
}