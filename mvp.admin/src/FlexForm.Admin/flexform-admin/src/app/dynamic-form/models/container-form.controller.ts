import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { IFormView } from './interfaces/form-view.interface';
import { IFormController } from './interfaces/form-controller.interface';

export class ContainerFormController extends FormConnectorModel implements IFormController{
    load(): IFormModel {
        throw new Error("Method not implemented.");
    }
    save(): IFormModel {
        throw new Error("Method not implemented.");
    }
    done(): IFormModel {
        throw new Error("Method not implemented.");
    }
    cancel(): void {
        throw new Error("Method not implemented.");
    }
    revert(): void {
        throw new Error("Method not implemented.");
    }
    isValid(): boolean {
        throw new Error("Method not implemented.");
    }

    constructor(form: IForm) {
        super(form);        
    }

    form: IForm;
}