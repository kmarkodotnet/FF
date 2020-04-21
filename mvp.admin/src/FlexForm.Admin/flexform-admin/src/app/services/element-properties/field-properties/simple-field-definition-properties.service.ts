import { Injectable } from '@angular/core';
import { FieldDefinitionPropertiesService } from './field-definition-properties.service';
import { ConstantsService } from '../../constants.service';
import { EntityDefinitionItemSourceService } from '../../low-level-properties/entity-definition-item-source.service';
import { EntityDefinitionTypeService } from '../../low-level-properties/entity-definition-type.service';
import { FieldDefinition } from '../../../models/dtos';
import { BaseProperty } from '../../../models/properties';
import { PropertyNameConstants } from '../../../property-name-constants';
import { BasePropertyConverterService } from '../../property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../../form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class SimpleFieldDefinitionPropertiesService extends FieldDefinitionPropertiesService {

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
      return super.createProperties(fieldDefinition);
    }
      
    
    async loadProperties(fieldDefinition: FieldDefinition,properties: BaseProperty<any>[]): Promise<void> {
      await super.loadProperties(fieldDefinition,properties);
      let index = properties.findIndex(p => p.name == PropertyNameConstants.ITEM_SOURCE);
      if(index >= 0){        
        fieldDefinition.properties.splice(index, 1);
        fieldDefinition.itemSourceDefinitionId = null;
        fieldDefinition.timestamp = null;
      }
      //fieldDefinition.color = this.constantsService.getFieldTypeColor(fieldDefinition.uiFieldType);
      return Promise.resolve();
    }
}
