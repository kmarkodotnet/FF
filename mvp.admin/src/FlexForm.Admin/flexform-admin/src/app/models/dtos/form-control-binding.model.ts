import { FieldDefinition } from './field-definition.model';
import { FormControl } from '@angular/forms';
import { BaseProperty } from '../properties/base-property.model';
import { UiPropertiesInterface } from '../interfaces/ui-properties.interface';
import { BaseWithTimeStamp } from './base-with-timestamp.model';

export class FormControlBinding extends BaseWithTimeStamp<number> implements UiPropertiesInterface{

    fieldDefinition:FieldDefinition;
    fieldDefinitionId:number;
    isReadOnly:boolean;
    isInvalidStateEnabled:boolean;
    uiProperties: BaseProperty<any>[];
    formControl:FormControl;
    
}