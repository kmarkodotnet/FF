import { Injectable } from '@angular/core';
import { BaseProperty } from '../models/properties';
import { FieldDefinition, FormDefinition } from '../models/dtos';
import { FieldDefinitionPropertiesService } from './element-properties/field-properties/field-definition-properties.service';
import { FormDefinitionPropertiesService } from './element-properties/form-definition-properties.service';
import { FormControlBindingPropertiesService } from './element-properties/form-control-properties/form-control-binding-properties.service';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(
    private fieldDefinitionPropertiesService:FieldDefinitionPropertiesService,
    private formDefinitionPropertiesService: FormDefinitionPropertiesService,
    private formControlPropertiesService:FormControlBindingPropertiesService) { }

  getFormDefinitionProperties(formDefinition:FormDefinition):Promise<BaseProperty<any>[]>{
    return this.formDefinitionPropertiesService.createProperties(formDefinition).then(bps =>{
      return bps;
    });
  }
}
