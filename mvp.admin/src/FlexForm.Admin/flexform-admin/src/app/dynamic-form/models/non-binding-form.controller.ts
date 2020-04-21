import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { IFormView } from './interfaces/form-view.interface';
import { IFormController } from './interfaces/form-controller.interface';

export class NonBindingFormController extends FormConnectorModel implements IFormController{
    load(): IFormModel {
        throw new Error("Method not implemented.");
    }
    save(): IFormModel {
        return null;
    }
    done(): IFormModel {
        return null;
    }
    cancel(): void {
    }
    revert(): void {
    }
    isValid(): boolean {
        return true;
    }

    constructor(form: IForm) {
        super(form);        
    }

    form: IForm;
}