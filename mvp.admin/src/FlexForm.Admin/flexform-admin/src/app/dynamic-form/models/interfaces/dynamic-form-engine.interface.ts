import { FormDefinition, EntityDefinition, EntityInstance } from '../../../models/dtos';
import { IForm } from './form.interface';
import { ComponentRef, EventEmitter } from '@angular/core';
import { IFormHost } from './form-host.interface';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';

export interface IDynamicFormEngine
{

    componentInstance:IForm;
    componentRef:ComponentRef<any>;

    render(formDefinition:FormDefinition,entityInstance:EntityInstance): Promise<void>;
    isValid():boolean;
    save():void;
    done():void;
    cancel():void;
}