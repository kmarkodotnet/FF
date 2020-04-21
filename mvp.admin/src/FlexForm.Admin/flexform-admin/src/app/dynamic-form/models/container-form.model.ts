import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';

export class ContainerFormModel extends FormConnectorModel implements IFormModel{
     
    classDefinition: EntityDefinition;
    value: EntityInstance;

    constructor(classDefinition: EntityDefinition,value: EntityInstance, form: IForm) {
        super(form);        
        this.classDefinition = classDefinition;
        this.value = value;
    }

    revertModel(): void {
        throw new Error("Method not implemented.");
    }

    form: IForm;
}