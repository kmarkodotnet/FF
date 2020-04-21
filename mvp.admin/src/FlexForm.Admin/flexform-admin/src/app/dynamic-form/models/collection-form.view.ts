import { IFormModel } from './interfaces/form-model.interface';
import { FormDefinition, EntityDefinition, EntityInstance, FormControl } from '../../models/dtos';
import { IForm } from './interfaces/form.interface';
import { FormConnectorModel } from './form-connector.model';
import { IFormView } from './interfaces/form-view.interface';
import { PrimitiveFormView } from './primitive-form.view';

export class CollectionFormView extends PrimitiveFormView {
    constructor(viewDefinition: FormControl, viewLevel:number, form: IForm) {
        super(viewDefinition,viewLevel,form);
    }
}