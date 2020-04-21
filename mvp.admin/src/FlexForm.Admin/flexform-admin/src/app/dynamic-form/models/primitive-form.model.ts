import { IFormModel } from './interfaces/form-model.interface';
import { FieldDefinition, FormControl } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { FieldValue } from '../../models/dtos/field-value.model';

export class PrimitiveFormModel extends FormConnectorModel implements IFormModel{
    
    classDefinition: FieldDefinition;
    value: FieldValue;

    constructor(classDefinition: FieldDefinition,value: FieldValue, form: IForm) {
        super(form);        
        this.classDefinition = classDefinition;
        this.value = value;
    }

    revertModel(): void {
        throw new Error("Method not implemented.");
    }

    form: IForm;
}