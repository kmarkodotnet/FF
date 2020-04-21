import { Injectable } from '@angular/core';
import { FormDefinitionDisplayTypeService } from './low-level-properties/form-definition-display-type.service';
import { FormDefinitionContainerFormService, FormControlHorizontalAlignmentService, FormControlVerticalAlignmentService } from './low-level-properties';
import { ConstantsService } from '.';
import { DisplayTypeTemplateService } from './low-level-properties/display-type-template.service';
import { BasePropertyConverterService } from './property-handler/base-property-handler.service';
import { FieldDefinitionsService } from './low-level-properties/field-definitions.service';
import { PropertiesServiceFactory } from './properties-factory.service';

@Injectable({
  providedIn: 'root'
})
export class FormControlPropertyServicePool {

  constructor(
    protected FormDefinitionDisplayTypeService:FormDefinitionDisplayTypeService,
    protected FormDefinitionContainerFormService:FormDefinitionContainerFormService,
    protected FormControlHorizontalAlignmentService:FormControlHorizontalAlignmentService,
    protected FormControlVerticalAlignmentService:FormControlVerticalAlignmentService,
    protected ConstantsService:ConstantsService,
    protected DisplayTypeTemplateService:DisplayTypeTemplateService,
    protected BasePropertyConverterService:BasePropertyConverterService,
    protected FieldDefinitionsService:FieldDefinitionsService//,
    //protected propertiesServiceFactory:PropertiesServiceFactory

    ) { }

  // propertiesServiceFactory():PropertiesServiceFactory{
  //   return this.propertiesServiceFactory;
  // }

  fieldDefinitionsService():FieldDefinitionsService{
    return this.FieldDefinitionsService;
  }

  formDefinitionDisplayTypeService():FormDefinitionDisplayTypeService{
    return this.FormDefinitionDisplayTypeService;
  }
  
  formDefinitionContainerFormService():FormDefinitionContainerFormService{
    return this.FormDefinitionContainerFormService;
  }
  
  formControlHorizontalAlignmentService():FormControlHorizontalAlignmentService{
    return this.FormControlHorizontalAlignmentService;
  }
  
  formControlVerticalAlignmentService():FormControlVerticalAlignmentService{
    return this.FormControlVerticalAlignmentService;
  }
  
  constantsService():ConstantsService{
    return this.ConstantsService;
  }
  
  displayTypeTemplateService():DisplayTypeTemplateService{
    return this.DisplayTypeTemplateService;
  }
  
  basePropertyConverterService():BasePropertyConverterService{
    return this.BasePropertyConverterService;
  }
}
