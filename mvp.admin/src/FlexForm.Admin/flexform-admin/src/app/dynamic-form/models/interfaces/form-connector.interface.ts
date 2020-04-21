import { IForm } from './form.interface';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';
import { IClassDefinition } from '../../../models/interfaces/class-definition.interface';
import { IValue } from '../../../models/interfaces/value.interface';

export interface IFormConnector{
    form: IForm;
}