import { IForm } from './form.interface';
import { FormDefinition, EntityDefinition, EntityInstance, FormControl, FieldDefinition } from '../../../models/dtos';
import { FieldValue } from '../../../models/dtos/field-value.model';
import { Type } from '@angular/core';
import { IFormModel } from './form-model.interface';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';
import { IClassDefinition  } from '../../../models/interfaces/class-definition.interface';
import { IValue } from '../../../models/interfaces/value.interface';
import { IItemSourceService } from '../../../models/interfaces/item-source-service.interface';

export interface IFormElementResolver{
    itemSourceService:IItemSourceService;
    resolveType(formControl:FormControl):Type<IForm>;
    setupForm(formControl:FormControl, viewLevel:number, instanceData: any, form:IForm):Promise<void>;
    setItemSourceService(itemSourceService:IItemSourceService):void;
}