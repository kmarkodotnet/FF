import { FormType } from '../enums';
import { FormControl } from './form-control.model';
import { EntityDefinition } from './entity-definition.model';
import { BaseProperty } from '../properties/base-property.model';
import { UiPropertiesInterface } from '../interfaces/ui-properties.interface';
import { BaseWithTimeStamp } from './base-with-timestamp.model';
import { IViewDefinition } from '../interfaces/view-definition.interface';

export class FormDefinition extends BaseWithTimeStamp<number> implements UiPropertiesInterface, IViewDefinition{

    entityDefinitionId:number;
    formName: string;
    title: string;
    description: string;
    formType: FormType;
    isRootForm: boolean;
    isInvalidStateEnabled: boolean;
    uiProperties: BaseProperty<any>[];
    formControls:FormControl[];
    entityDefinition:EntityDefinition;
    
}