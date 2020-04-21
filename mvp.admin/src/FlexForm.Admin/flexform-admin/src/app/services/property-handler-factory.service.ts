import { Injectable } from '@angular/core';
import { FieldDefinitionPropertyHandlerService } from './property-handler/field-definition-property-handler.service';
import { FormControlBindingPropertyHandlerService } from './property-handler/form-control-binding-property-handler.service';
import { FormControlPropertyHandlerService } from './property-handler/form-control-property-handler.service';
import { FormDefinitionPropertyHandlerService } from './property-handler/form-definition-property-handler.service';
import { FormControl, FormDefinition, FieldDefinition } from '../models/dtos';
import { FormControlBinding } from '../models/dtos/form-control-binding.model';
import { PropertyConverterInterface } from '../models/interfaces/property-handler.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyHandlerFactoryService {

  constructor(
    private fieldDefinitionPropertyHandlerService:FieldDefinitionPropertyHandlerService,
    private formControlBindingPropertyHandlerService:FormControlBindingPropertyHandlerService,
    private formControlPropertyHandlerService:FormControlPropertyHandlerService,
    private formDefinitionPropertyHandlerService:FormDefinitionPropertyHandlerService
    ) { }

  getPropertyHandlerService(entity:any):PropertyConverterInterface<any>
  {
    if(entity instanceof FormControl){
      return this.formControlPropertyHandlerService;
    }else if(entity instanceof FormControlBinding){
      return this.formControlBindingPropertyHandlerService;
    }else if(entity instanceof FormDefinition){
      return this.formDefinitionPropertyHandlerService;
    }else if(entity instanceof FieldDefinition){
      return this.fieldDefinitionPropertyHandlerService;
    }else {
      throw("unknown entity type");
    }
  }
}
