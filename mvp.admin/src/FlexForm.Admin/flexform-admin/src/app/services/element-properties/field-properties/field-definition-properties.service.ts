import { Injectable, EventEmitter } from '@angular/core';
import { ElementPropertiesServiceInterface } from '../../../models/interfaces';
import { BaseProperty, StringProperty, NumberProperty } from '../../../models/properties';
import { FieldDefinition } from '../../../models/dtos';
import { ConstantsService } from '../../constants.service';
import { EntityDefinitionItemSourceService } from '../../low-level-properties/entity-definition-item-source.service';
import { EntityDefinitionTypeService } from '../../low-level-properties/entity-definition-type.service';
import { PropertyNameConstants } from '../../../property-name-constants';
import { BasePropertiesService } from './../base-properties.service';
import { FormControlPropertyServicePool } from '../../form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class FieldDefinitionPropertiesService extends BasePropertiesService implements ElementPropertiesServiceInterface<FieldDefinition> {
  
  constructor(
    public entityDefinitionItemSourceService:EntityDefinitionItemSourceService, 
    public entityDefinitionTypeService:EntityDefinitionTypeService,
    protected formControlPropertyServicePool:FormControlPropertyServicePool) {
      super(formControlPropertyServicePool);
     }

  async createProperties(fieldDefinition: FieldDefinition): Promise<BaseProperty<any>[]> {
    let cps = new Array<BaseProperty<any>>();
    cps.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.NAME,fieldDefinition.name,true,true));
    cps.push(await this.entityDefinitionTypeService.createProperty(fieldDefinition.guid,this.formControlPropertyServicePool.constantsService().getFieldTypeName(fieldDefinition.fieldType),fieldDefinition.fieldType));

    //fieldDefinition.typeChangedEvent = new EventEmitter();
    //cps.push(new BooleanProperty("Required",false,true));
    return Promise.resolve(cps);
  }
    
  async loadProperties(fieldDefinition: FieldDefinition,properties: BaseProperty<any>[]): Promise<void> {
    fieldDefinition.properties = new Array<BaseProperty<any>>();
    fieldDefinition.properties.push(new StringProperty(fieldDefinition.guid,PropertyNameConstants.NAME,this.getValue(properties,PropertyNameConstants.NAME),true,true));
    fieldDefinition.properties.push(await this.entityDefinitionTypeService.createProperty(
      fieldDefinition.guid,
      this.formControlPropertyServicePool.constantsService().getFieldTypeName(fieldDefinition.fieldType),
      fieldDefinition.fieldType));

    //fieldDefinition.typeChangedEvent = new EventEmitter();
    fieldDefinition.color = this.formControlPropertyServicePool.constantsService().getFieldTypeColor(fieldDefinition.fieldType);    
    return Promise.resolve();
  }
}
