import { IFormConnector } from './form-connector.interface';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';
import { IClassDefinition } from '../../../models/interfaces/class-definition.interface';
import { IValue } from '../../../models/interfaces/value.interface';

export interface IFormModel extends IFormConnector{
    classDefinition:IClassDefinition;
    value:IValue;
    revertModel():void;
}