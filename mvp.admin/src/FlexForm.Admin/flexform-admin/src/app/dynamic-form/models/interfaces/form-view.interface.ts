import { IFormConnector } from './form-connector.interface';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';

export interface IFormView extends IFormConnector{
    viewDefinition:IViewDefinition;
    viewLevel:number;
}