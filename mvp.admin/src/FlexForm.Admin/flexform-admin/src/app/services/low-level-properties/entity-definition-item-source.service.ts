import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { BaseProperty, DropDownElement, DropDownListProperty } from '../../models/properties';
import { Guid } from 'guid-typescript';
import { ConstantsService } from '../constants.service';
import { DynamicService } from '../dynamic.service';
import { PropertyNameConstants } from '../../property-name-constants';

@Injectable({
  providedIn: 'root'
})
export class EntityDefinitionItemSourceService implements LowLevelPropertyService {
  getName(): string {
    return PropertyNameConstants.ITEM_SOURCE;
  }
  
  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> {
    let dropDownElements = new Array<DropDownElement>();
    let entityDefinitions = this.dynamicService.getEntityDefinitions();
    entityDefinitions.forEach(e => dropDownElements.push(new DropDownElement(e.id,e.name)));
    let defaultDropDownElement = 0;
    let index = dropDownElements.findIndex(i => i.id == defaultValue);
    if(index>=0){
      defaultDropDownElement = dropDownElements[index].id;
    }
    return Promise.resolve(new DropDownListProperty(guid,this.getName(),defaultDropDownElement,true,false,dropDownElements));
  }
  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> {
    return await this.createProperty(guid,value,filterProperty);
  }

  constructor(private constantsService: ConstantsService, private dynamicService: DynamicService) { }
}
