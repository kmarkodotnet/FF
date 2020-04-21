import { BaseUiField } from './base-ui-field.model';
import { FieldType } from '../enums/field-type.enum';

export class EntityEditorUiField extends BaseUiField{
    fieldType: FieldType;
    constructor(name: string, type: FieldType, color: string){
        super();
        this.name = name;
        this.fieldType = type;
        this.color = color;
    }
}