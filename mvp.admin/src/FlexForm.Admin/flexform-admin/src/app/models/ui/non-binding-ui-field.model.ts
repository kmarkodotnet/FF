import { NonBinding } from '../enums';
import { BaseUiField } from './base-ui-field.model';

export class NonBindingUiField extends BaseUiField{
    constructor(name:string, type: NonBinding, color:string) {
        super();
        this.name = name;
        this.type = type;
        this.color = color;
    }
    type: NonBinding;
}