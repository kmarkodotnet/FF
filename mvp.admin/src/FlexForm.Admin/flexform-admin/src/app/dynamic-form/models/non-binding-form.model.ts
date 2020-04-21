import { IFormModel } from './interfaces/form-model.interface';
import { FieldDefinition, FormControl } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { FieldValue } from '../../models/dtos/field-value.model';
import { NonBinding } from '../../models/enums';

export class NonBindingFormModel extends FormConnectorModel implements IFormModel{
    
    classDefinition: NonBinding;
    value: any;

    constructor(classDefinition: NonBinding,form: IForm) {
        super(form);        
        this.classDefinition = classDefinition;
        this.value = null;
    }

    revertModel(): void {
        throw new Error("Method not implemented.");
    }

    form: IForm;
}