import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { Guid } from 'guid-typescript';
import { BaseProperty, DropDownListProperty, DropDownElement } from '../../models/properties';
import { PropertyNameConstants } from '../../property-name-constants';
import { FormDefinitionService } from '../form-definition.service';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionContainerFormService implements LowLevelPropertyService{
  getName(): string {
    return PropertyNameConstants.CONTAINER_FORM;
  }

  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> { 
    return this.formDefinitionService.getFormDefinitionsOfEntityDefinition(filterProperty).then(compatibleContainerForms => {
      let dropDownElements = new Array<DropDownElement>();
      compatibleContainerForms.forEach(c => dropDownElements.push(new DropDownElement(c.id,c.formName)));
      defaultValue = 0;
      if(dropDownElements.length>0){
        defaultValue = dropDownElements[0].id;
      }
      return new DropDownListProperty(guid,this.getName(),defaultValue,true,false,dropDownElements);
    });    
  }

  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> { 
    return this.formDefinitionService.getFormDefinitionsOfEntityDefinition(filterProperty).then(compatibleContainerForms =>{
      let dropDownElements = new Array<DropDownElement>();
      compatibleContainerForms.forEach(c => dropDownElements.push(new DropDownElement(c.id,c.formName)));  
      if(!value && compatibleContainerForms && compatibleContainerForms.length > 0){
        value = compatibleContainerForms[0].id;
      }
      return new DropDownListProperty(guid,this.getName(),value,true,false,dropDownElements);
    });
  }

  constructor(private formDefinitionService: FormDefinitionService) { }
}
