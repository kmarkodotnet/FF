import { Injectable } from '@angular/core';
import { LowLevelPropertyService } from '../../models/interfaces';
import { Guid } from 'guid-typescript';
import { BaseProperty, DropDownListProperty, DropDownElement } from '../../models/properties';
import { ConstantsService } from '../constants.service';
import { PropertyNameConstants } from '../../property-name-constants';
import { EntityDefinition } from '../../models/dtos';
import { EntityDefinitionService } from '../entity-definition.service';

@Injectable({
  providedIn: 'root'
})
export class FieldDefinitionsService implements LowLevelPropertyService {
  getName(): string {
    return PropertyNameConstants.PROPERTIES;
  }
  async createProperty(guid: Guid, defaultValue: any, filterProperty?: any): Promise<BaseProperty<any>> {
    if(!filterProperty)
    {
      return null;
    }
    let entityDefinitionId = filterProperty;
    let that = this;
    
    // let ed = await this.entityDefinitionService.get(entityDefinitionId);
    // let dropDownElements = new Array<DropDownElement>();
    // let fieldDefinitions = ed.fieldDefinitions;
    // fieldDefinitions.forEach(e => dropDownElements.push(new DropDownElement(e.id,e.name)));
    let dropDownElements = await this.getFieldDefinitionsRecursive(entityDefinitionId,"");

    let defaultDropDownElement = 0;
    let index = dropDownElements.findIndex(i => i.id == defaultValue);
    if(index>=0){
      defaultDropDownElement = dropDownElements[index].id;
    }else if (dropDownElements.length > 0){
      defaultDropDownElement = dropDownElements[0].id;
    }
    return new DropDownListProperty(guid,that.getName(),defaultDropDownElement,true,false,dropDownElements);  
  }

  async reloadProperty(guid: Guid, value: any, filterProperty?: any): Promise<BaseProperty<any>> {
    return await this.createProperty(guid,value, filterProperty);
  }

  async getFieldDefinitionsRecursive(entityDefinitionId:number, prefix:string):Promise<DropDownElement[]>{
    let dropDownElements = new Array<DropDownElement>();
    let ed = await this.entityDefinitionService.get(entityDefinitionId);

    for (const f of ed.fieldDefinitions) {
      const fc= await this.getFieldDefinition(f,prefix+f.name);
      fc.forEach(d =>{
        dropDownElements.push(d);
      })
    }
    return Promise.resolve(dropDownElements);
  }

  async getFieldDefinition(f,prefix):Promise<DropDownElement[]>{
    let dropDownElements = new Array<DropDownElement>();
    if(!f.itemSourceDefinition){
      dropDownElements.push(new DropDownElement(f.id,prefix));
    }else{
      const innerDropDownElements = await this.getFieldDefinitionsRecursive(f.itemSourceDefinition.itemSourceEntityDefinitionId,prefix + ".");
      innerDropDownElements.forEach(i =>{
        dropDownElements.push(i);
      });
    }
    return Promise.resolve(dropDownElements);
  }

  constructor(private entityDefinitionService: EntityDefinitionService) { }
}
