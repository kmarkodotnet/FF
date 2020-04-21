import { DisplayType } from '../enums';
import { FormDefinition } from './form-definition.model';
import { FormControlBinding } from './form-control-binding.model';
import { ItemSourceDefinition } from '.';
import { BaseProperty } from '../properties';
import { Guid } from 'guid-typescript';
import { UiPropertiesInterface } from '../interfaces/ui-properties.interface';
import { BaseWithTimeStamp } from './base-with-timestamp.model';
import { IViewDefinition } from '../interfaces/view-definition.interface';
import { FormControlItemSource } from './form-control-item-source.model';

export class FormControl extends BaseWithTimeStamp<number> implements UiPropertiesInterface, IViewDefinition{

    guid:Guid;

    constructor() {
        super();
        this.guid = Guid.create();
    }

    formDefinitionId:Number;
    name: string;
    displayType: DisplayType;
    formControlItemSourceId: number | null;
    subFormDefinitionId: number | null;
    uiProperties: BaseProperty<any>[];
    formDefinition: FormDefinition;
    formControlBinding:FormControlBinding;
    formControlItemSource:FormControlItemSource;
    subFormDefinition:FormDefinition;

}