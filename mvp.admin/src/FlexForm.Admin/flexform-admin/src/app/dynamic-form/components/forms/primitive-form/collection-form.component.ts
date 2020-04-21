import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IPrimitiveForm } from '../../../models/interfaces/primitive-form.interface';
import { IFormView } from '../../../models/interfaces/form-view.interface';
import { FieldDefinition, FormControl, EntityInstance } from '../../../../models/dtos';
import { FieldValue } from '../../../../models/dtos/field-value.model';
import { IFormModel } from '../../../models/interfaces/form-model.interface';
import { IFormController } from '../../../models/interfaces/form-controller.interface';
import { PrimitiveFormView } from '../../../models/primitive-form.view';
import { PrimitiveFormModel } from '../../../models/primitive-form.model';
import { PrimitiveFormController } from '../../../models/primitive-form.controller';
import { IViewDefinition } from '../../../../models/interfaces/view-definition.interface';
import { BaseProperty } from '../../../../models/properties/base-property.model';
import { LabelTextPropertyRendererService } from '../../../services/label-text-property-renderer.service';
import { CollectionFormView } from '../../../../dynamic-form/models/collection-form.view';
import { CollectionFormModel } from '../../../../dynamic-form/models/collection-form.model';
import { CollectionFormController } from '../../../../dynamic-form/models/collection-form.controller';
import { PrimitiveFormComponent } from './primitive-form.component';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { EntityDefinitionService } from '../../../../services/entity-definition.service';
import { PropertyNameConstants } from '../../../../property-name-constants';

export abstract class CollectionFormComponent extends PrimitiveFormComponent implements OnInit,IPrimitiveForm {
  
  fieldDefinitions:FieldDefinition[];

  view: CollectionFormView;  
  model: CollectionFormModel;
  controller: CollectionFormController;

  async render(): Promise<void>  {
    
  }
 
  constructor(protected basePropertyConverterService:BasePropertyConverterService,
    protected entityDefinitionService:EntityDefinitionService) {
    super(basePropertyConverterService);
  }

  async ngOnInit() {
    if(this.controller instanceof CollectionFormController){
      (<CollectionFormModel>this.model).items = await (<CollectionFormController>this.controller).itemSourceService.itemSource(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition);
    }    
    let fieldDefinitionId = this.basePropertyConverterService.getValue(this.view.viewDefinition.uiProperties,PropertyNameConstants.PROPERTIES);
    if(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition)
    {
      this.fieldDefinitions = await this.getFieldDefinitionRecursive(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId, fieldDefinitionId);
      this.fieldDefinitions = this.fieldDefinitions.reverse();
    }
    await this.postNgOnInit()
  }

  async abstract postNgOnInit():Promise<void>;

  getDisplayText(entityInstance:EntityInstance|FieldValue):any{
    if(!this.fieldDefinitions){
      return "";
    }
    let value = entityInstance;
    this.fieldDefinitions.forEach(fd => {
      value = value[fd.name];
    });
    return value;
  }  
  
  async getFieldDefinitionRecursive(entityDefinitionId:number, fieldDefinitionId:number):Promise<FieldDefinition[]>{
    let fds = new Array<FieldDefinition>();
    let ed = await this.entityDefinitionService.get(entityDefinitionId);
    for (const f of ed.fieldDefinitions) {
      const cn = await this.getFieldDefinition(f,fieldDefinitionId);
      if(cn != undefined && cn != null && cn.length > 0){
        fds = cn;
      }
    }
    return Promise.resolve(fds);
  }

  async getFieldDefinition(fieldDefinition:FieldDefinition, fieldDefinitionId:number):Promise<FieldDefinition[]>{    
    if(fieldDefinition.id == fieldDefinitionId){
      let fds = new Array<FieldDefinition>();
      fds.push(fieldDefinition);
      return Promise.resolve(fds);
    }else if(fieldDefinition.itemSourceDefinition){
      let fds = await this.getFieldDefinitionRecursive(fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId,fieldDefinitionId);
      if(fds != null && fds != undefined && fds.length > 0){
        fds.push(fieldDefinition)
        return Promise.resolve(fds);
      }
    }
    return Promise.resolve(null);
  }

}
