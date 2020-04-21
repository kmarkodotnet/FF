import { IFormConnector } from './form-connector.interface';
import { IFormModel } from './form-model.interface';

export interface IFormController extends IFormConnector{
    save():IFormModel;
    done():IFormModel;
    load():IFormModel;
    cancel():void;
    revert():void;
    isValid():boolean;
}