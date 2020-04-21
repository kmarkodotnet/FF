import { Injectable } from '@angular/core';
import { FieldDefinitionPropertiesService } from './field-definition-properties.service';
import { ConstantsService } from '../../constants.service';
import { EntityDefinitionItemSourceService } from '../../low-level-properties/entity-definition-item-source.service';
import { EntityDefinitionTypeService } from '../../low-level-properties/entity-definition-type.service';

import { FieldDefinition, ItemSourceDefinition } from '../../../models/dtos';
import { BaseProperty, BooleanProperty, StringProperty, NumberProperty } from '../../../models/properties';
import { PropertyNameConstants } from '../../../property-name-constants';
import { FormControlPropertyServicePool } from '../../form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class ComplexFieldDefinitionPropertiesService extends FieldDefinitionPropertiesService {

  constructor(
    public entityDefinitionItemSourceService:EntityDefinitionItemSourceService, 
    public entityDefinitionTypeService:EntityDefinitionTypeService,
    protected formControlPropertyServicePool:FormControlPropertyServicePool
    ) {
      super(
        entityDefinitionItemSourceService,entityDefinitionTypeService,formControlPropertyServicePool
        );
     }

     async createProperties(fieldDefinition: FieldDefinition): Promise<BaseProperty<any>[]> {
      let bps = await super.createProperties(fieldDefinition);  
      let is = await this.entityDefinitionItemSourceService.createProperty(fieldDefinition.guid, fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId);
      bps.push(is);
      
      bps.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_CONDITION,fieldDefinition.itemSourceDefinition.itemSourceCondition,true,false));
      bps.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_DEFAULT_ORDER,fieldDefinition.itemSourceDefinition.itemSourceDefaultOrder,true,false));
      bps.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_PROPERTIES,fieldDefinition.itemSourceDefinition.includeProperties,true,false));
      let pageSize = 10;
      if(fieldDefinition.itemSourceDefinition.pageSize){
        pageSize = fieldDefinition.itemSourceDefinition.pageSize;
      }
      bps.push(new NumberProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_PAGE_SIZE,pageSize,true,false));
      return Promise.resolve(bps);
    }

    async loadProperties(fieldDefinition: FieldDefinition,properties: BaseProperty<any>[]): Promise<void> {
      await super.loadProperties(fieldDefinition,properties);
      let index = properties.findIndex(p => p.name == PropertyNameConstants.ITEM_SOURCE);
      if(index < 0){
        let itemSourceProperty = await this.entityDefinitionItemSourceService.createProperty(fieldDefinition.guid, "");
        fieldDefinition.properties.push(itemSourceProperty);
        //fieldDefinition.uiItemSourceEntityDefinitionId = 0;  
        fieldDefinition.itemSourceDefinition = new ItemSourceDefinition();
        fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId = 0;
      }else{
        fieldDefinition.properties.push(await this.entityDefinitionItemSourceService.reloadProperty(fieldDefinition.guid, this.getValue(properties,PropertyNameConstants.ITEM_SOURCE)));
      }
      fieldDefinition.properties.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_CONDITION,this.getValue(properties,PropertyNameConstants.ITEM_SOURCE_CONDITION),true,false));
      fieldDefinition.properties.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_DEFAULT_ORDER,this.getValue(properties,PropertyNameConstants.ITEM_SOURCE_DEFAULT_ORDER),true,false));
      fieldDefinition.properties.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_PROPERTIES,this.getValue(properties,PropertyNameConstants.ITEM_SOURCE_PROPERTIES),true,false));
      fieldDefinition.properties.push(new NumberProperty(fieldDefinition.guid,PropertyNameConstants.ITEM_SOURCE_PAGE_SIZE,this.getValue(properties,PropertyNameConstants.ITEM_SOURCE_PAGE_SIZE),true,false));
      
      return Promise.resolve();
    }
}
