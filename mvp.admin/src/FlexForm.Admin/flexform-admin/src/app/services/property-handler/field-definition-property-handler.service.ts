import { Injectable } from '@angular/core';
import { PropertyConverterInterface } from '../../models/interfaces/property-handler.interface';
import { FieldDefinition } from '../../models/dtos';
import { BasePropertyConverterService } from './base-property-handler.service';
import { PropertyNameConstants } from '../../property-name-constants';

@Injectable({
  providedIn: 'root'
})
export class FieldDefinitionPropertyHandlerService extends BasePropertyConverterService implements PropertyConverterInterface<FieldDefinition> {
  convertUiProperties(entity: FieldDefinition): void {
    entity.name = this.getValue(entity.properties,PropertyNameConstants.NAME);
    entity.fieldType = this.getValue(entity.properties,PropertyNameConstants.TYPE);
    if(entity.itemSourceDefinition)
    {
      entity.itemSourceDefinition.itemSourceEntityDefinitionId = this.getValue(entity.properties,PropertyNameConstants.ITEM_SOURCE);
    }
  }
  constructor() {
    super();
   }
}
