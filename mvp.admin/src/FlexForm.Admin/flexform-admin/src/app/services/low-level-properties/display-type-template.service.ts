import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { Guid } from 'guid-typescript';
import { BaseProperty, DropDownElement, DropDownListProperty } from '../../models/properties';
import { PropertyNameConstants } from '../../property-name-constants';
import { ConstantsService } from '../constants.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayTypeTemplateService implements LowLevelPropertyService {
  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> {
    let templatesForDisplayType = this.constantsService.getTemplatesForDisplayType(filterProperty);    
    let defaultDropDownElement = 0;
    if(templatesForDisplayType.length>0){
      let index = templatesForDisplayType.findIndex(i => i.id == defaultValue);
      if(index>=0){
        defaultDropDownElement = templatesForDisplayType[index].id;
      }else{
        defaultDropDownElement = templatesForDisplayType[0].id;
      }
    }
    return Promise.resolve(new DropDownListProperty(guid,this.getName(),defaultDropDownElement,true,false,templatesForDisplayType));
  }

  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> {
    return this.createProperty(guid,value,filterProperty);
  }

  getName():string{
    return PropertyNameConstants.TEMPLATE;
  }

  constructor(private constantsService: ConstantsService) { }
}
