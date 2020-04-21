import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance, FormControl } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { IFormView } from './interfaces/form-view.interface';

export class ContainerFormView extends FormConnectorModel implements IFormView{
    viewDefinition: FormDefinition;
    holderFormControl:FormControl;
    viewLevel:number;
    constructor(viewDefinition: FormDefinition, holderFormControl:FormControl, viewLevel:number, form: IForm) {
        super(form);        
        this.viewDefinition = viewDefinition;
        this.holderFormControl = holderFormControl;
        this.viewLevel = viewLevel;
    }

    form: IForm;
}