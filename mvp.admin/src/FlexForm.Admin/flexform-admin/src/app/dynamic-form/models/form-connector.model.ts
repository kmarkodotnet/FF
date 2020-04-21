import { IFormConnector } from './interfaces/form-connector.interface';
import { IForm } from './interfaces/form.interface';

export class FormConnectorModel implements IFormConnector{
    form: IForm;
    /**
     *
     */
    constructor(form: IForm) {
        this.form = form;
    }
}