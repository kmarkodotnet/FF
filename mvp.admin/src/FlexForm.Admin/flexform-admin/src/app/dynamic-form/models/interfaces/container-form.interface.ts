import { IForm } from './form.interface';
import { FormHostDirective } from '../../directives/form-host.directive';
import { ComponentRef } from '@angular/core';
import { FormDefinition, EntityDefinition, EntityInstance, FormControl, FieldDefinition } from '../../../models/dtos';
import { FieldValue } from '../../../models/dtos/field-value.model';
import { IFormHost } from './form-host.interface';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';
import { IClassDefinition  } from '../../../models/interfaces/class-definition.interface';
import { IValue } from '../../../models/interfaces/value.interface';

export interface IContainerForm extends IForm,  IFormHost{
    title:string;
    formHost: FormHostDirective;
    formElementsRefs: ComponentRef<IForm>[];
}