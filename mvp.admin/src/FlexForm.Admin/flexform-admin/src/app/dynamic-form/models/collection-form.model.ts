import { IFormModel } from './interfaces/form-model.interface';
import { FieldDefinition, FormControl, EntityInstance } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { FieldValue } from '../../models/dtos/field-value.model';
import { PrimitiveFormModel } from './primitive-form.model';

export class CollectionFormModel extends PrimitiveFormModel {
    items:EntityInstance[];
    constructor(classDefinition: FieldDefinition,value: FieldValue, form: IForm) {
        super(classDefinition,value,form);
    }
}