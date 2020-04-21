import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { Guid } from 'guid-typescript';
import { BaseProperty, DropDownElement, DropDownListProperty } from '../../models/properties';
import { PropertyNameConstants } from '../../property-name-constants';
import { ConstantsService } from '../constants.service';

@Injectable({
  providedIn: 'root'
})
export class FormControlVerticalAlignmentService implements LowLevelPropertyService {
  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> {
    let dropDownElements = new Array<DropDownElement>();
    let verticalAlignments = this.constantsService.getVerticalAlignments();
    verticalAlignments.forEach(e => dropDownElements.push(new DropDownElement(e,this.constantsService.getVerticalAlignmentName(e))));
    let defaultDropDownElement = 0;
    let index = dropDownElements.findIndex(i => i.id == defaultValue);
    if(index>=0){
      defaultDropDownElement = dropDownElements[index].id;
    }
    return Promise.resolve(new DropDownListProperty(guid,this.getName(),defaultDropDownElement,false,false,dropDownElements));
  }

  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> {
    return this.createProperty(guid,value,null);
  }
  getName():string{
    return PropertyNameConstants.LABEL_VPOS;
  }
  constructor(private constantsService: ConstantsService) { }
}
