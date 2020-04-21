import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance, FormControl } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { IFormView } from './interfaces/form-view.interface';

export class PrimitiveFormView extends FormConnectorModel implements IFormView{
    viewDefinition: FormControl;
    viewLevel:number;
    constructor(viewDefinition: FormControl, viewLevel:number, form: IForm) {
        super(form);        
        this.viewDefinition = viewDefinition;
        this.viewLevel = viewLevel;
    }

    form: IForm;
}