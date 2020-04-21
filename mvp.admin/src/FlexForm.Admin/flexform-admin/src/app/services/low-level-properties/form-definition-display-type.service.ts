import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { Guid } from 'guid-typescript';
import { BaseProperty, DropDownElement, DropDownListProperty } from '../../models/properties';
import { PropertyNameConstants } from '../../property-name-constants';
import { FieldType } from '../../models/enums';
import { FieldTypeDisplayTypeCompatibilityService } from '../field-type-display-type-compatibility.service';
import { ConstantsService } from '../constants.service';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionDisplayTypeService implements LowLevelPropertyService {
  getName(): string {
    return PropertyNameConstants.DISPLAY_TYPE;
  }
  
  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> { 
    let dropDownElements = this.getDropDownElementsOfFieldType(filterProperty);
    defaultValue = 0;
    if(dropDownElements.length > 0){
      defaultValue = dropDownElements[0].id;
    }
    return Promise.resolve(new DropDownListProperty(guid,this.getName(),defaultValue,true,false,dropDownElements));
  }
  
  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> {
    let dropDownElements = this.getDropDownElementsOfFieldType(filterProperty);
    return Promise.resolve(new DropDownListProperty(guid,this.getName(),value,true,false,dropDownElements));
  }

  getDropDownElementsOfFieldType(fieldType: FieldType) {
    let displayTypes = this.fieldTypeDisplayTypeCompatibilityService.getDisplayType(fieldType);
    let dropDownElements = new Array<DropDownElement>();
    displayTypes.forEach(d => dropDownElements.push(new DropDownElement(d,this.constantsService.getDisplayTypeName(d))));
    return dropDownElements;
  }
  
  constructor(private fieldTypeDisplayTypeCompatibilityService:FieldTypeDisplayTypeCompatibilityService, private constantsService: ConstantsService) { }
}
