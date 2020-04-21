import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { Guid } from 'guid-typescript';
import { BaseProperty, DropDownListProperty, DropDownElement } from '../../models/properties';
import { ConstantsService } from '../constants.service';
import { PropertyNameConstants } from '../../property-name-constants';
import { FieldType } from '../../models/enums';

@Injectable({
  providedIn: 'root'
})
export class EntityDefinitionTypeService implements LowLevelPropertyService {
  getName(): string {
    return PropertyNameConstants.TYPE;
  }
  
  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> {
    let dropDownElements = new Array<DropDownElement>();
    let isSimple = this.constantsService.isSimpleFieldType(filterProperty);
    let fieldTypes = new Array<FieldType>();
    if(isSimple){
      fieldTypes = this.constantsService.getSimples();
    }else{
      fieldTypes = this.constantsService.getComplexes();
    }
    //this.constantsService.getFieldTypes();
    fieldTypes.forEach(e => dropDownElements.push(new DropDownElement(e,this.constantsService.getFieldTypeName(e))));
    let defaultDropDownElement = 0;
    let index = dropDownElements.findIndex(i => i.name == defaultValue);
    if(index>=0){
      defaultDropDownElement = dropDownElements[index].id;
    }
    return Promise.resolve(new DropDownListProperty(guid,this.getName(),defaultDropDownElement,true,false,dropDownElements));
  }
  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> {
    throw new Error("Method not implemented.");
  }

  constructor(private constantsService: ConstantsService) { }
}
