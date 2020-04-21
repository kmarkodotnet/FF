import { EntityInstance } from '../../../models/dtos';
import { FormHostDirective } from '../../directives/form-host.directive';

export interface IFormHost{
    formHost: FormHostDirective;
    // render(): Promise<void>;
    render(): Promise<void>;
    clear():void;
    load(entityInstance:EntityInstance):void;
}