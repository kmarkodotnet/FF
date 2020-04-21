import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDefinition, FieldDefinition } from '../models/dtos';
import { ApiUrls } from './apiUrls';
import { DynamicService } from './dynamic.service';
import { BaseCacheService } from './cache/base-cache.service';
import { BaseProperty } from '../models/properties/base-property.model';
import { PropertyNameConstants } from '../property-name-constants';
import { BasePropertyConverterService } from './property-handler/base-property-handler.service';

@Injectable()
export class EntityDefinitionService extends BaseCacheService<EntityDefinition> {

  getValue(uiProperties: BaseProperty<any>[],name:string):any{
    return this.basePropertyConverterService.getValue(uiProperties,name);
  }

  updateItemSourceProperties(fieldDefinition:FieldDefinition){    
    fieldDefinition.itemSourceDefinition.name = fieldDefinition.name;
    fieldDefinition.itemSourceDefinition.includeProperties = this.getValue(fieldDefinition.properties,PropertyNameConstants.PROPERTIES);
    fieldDefinition.itemSourceDefinition.itemSourceCondition = this.getValue(fieldDefinition.properties,PropertyNameConstants.ITEM_SOURCE_CONDITION);
    fieldDefinition.itemSourceDefinition.itemSourceDefaultOrder = this.getValue(fieldDefinition.properties,PropertyNameConstants.ITEM_SOURCE_DEFAULT_ORDER);
    fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId = this.getValue(fieldDefinition.properties,PropertyNameConstants.ITEM_SOURCE);
    fieldDefinition.itemSourceDefinition.pageSize = this.getValue(fieldDefinition.properties,PropertyNameConstants.ITEM_SOURCE_PAGE_SIZE);
  }
  protected beforeSave(entityDefinition: EntityDefinition): void {
    entityDefinition.fieldDefinitions.forEach(element => {
          if(element.itemSourceDefinition){
            this.updateItemSourceProperties(element);
          }
        });
  }
  protected getSaveUrl(): string {
    return ApiUrls.API_ENTITYDEFINITION;
  }
  protected deleteCustom(id: number): string {
    return ApiUrls.API_ENTITYDEFINITION + id;
  }
  protected afterRefresh(data: EntityDefinition[]): void {
    this.dynamicService.setEntityDefinitions(data);
  }

  public constructor(
    protected http: HttpClient, 
    protected dynamicService:DynamicService,
    protected basePropertyConverterService:BasePropertyConverterService) {
    super(http);
   }
}
