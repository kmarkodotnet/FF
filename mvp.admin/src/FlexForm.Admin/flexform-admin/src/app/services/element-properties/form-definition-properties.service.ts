import { Injectable } from '@angular/core';
import { ElementPropertiesServiceInterface } from '../../models/interfaces';
import { FormControl, FormDefinition } from '../../models/dtos';
import { BaseProperty, StringProperty, DropDownListProperty, BooleanProperty, DropDownElement } from '../../models/properties';
import { PropertyNameConstants } from '../../property-name-constants';
import { ConstantsService } from '../constants.service';
import { FormDefinitionFormTypeService } from '../low-level-properties/form-definition-form-type.service';
import { FormType } from '../../models/enums';
import { BasePropertiesService } from './base-properties.service';
import { BasePropertyConverterService } from '../../services/property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionPropertiesService extends BasePropertiesService implements ElementPropertiesServiceInterface<FormDefinition> {
  constructor(private formDefinitionFormTypeService:FormDefinitionFormTypeService,
    protected formControlPropertyServicePool:FormControlPropertyServicePool
    ) {
    super(formControlPropertyServicePool);
   }
  
  async createProperties(formDefinition: FormDefinition): Promise<BaseProperty<any>[]> {
    let bps = new Array<BaseProperty<any>>();
    
    bps.push(new StringProperty(null,PropertyNameConstants.FORM_NAME,formDefinition.formName,false,true));
    bps.push(new StringProperty(null,PropertyNameConstants.TITLE,formDefinition.title,false,false));
    bps.push(new StringProperty(null,PropertyNameConstants.DESCRIPTION,formDefinition.description,false,false));
    bps.push(await this.formDefinitionFormTypeService.createProperty(null,FormType.Edit));
    bps.push(new BooleanProperty(null,PropertyNameConstants.ROOT_FORM,false,true,true));
    bps.push(new BooleanProperty(null,PropertyNameConstants.INVALID_STATE_ENABLED,false,false,false));

    return Promise.resolve(bps);
  }

  async loadProperties(formDefinition: FormDefinition,uiProperties: BaseProperty<any>[]): Promise<void> {
    formDefinition.uiProperties = new Array<BaseProperty<any>>();
    formDefinition.uiProperties.push(new StringProperty(null,PropertyNameConstants.FORM_NAME,this.getValue(uiProperties,PropertyNameConstants.FORM_NAME),false,true));
    formDefinition.uiProperties.push(new StringProperty(null,PropertyNameConstants.TITLE,this.getValue(uiProperties,PropertyNameConstants.TITLE),false,false));
    formDefinition.uiProperties.push(new StringProperty(null,PropertyNameConstants.DESCRIPTION,this.getValue(uiProperties,PropertyNameConstants.DESCRIPTION),false,false));
    formDefinition.uiProperties.push(await this.formDefinitionFormTypeService.reloadProperty(null, this.getValue(uiProperties,this.formDefinitionFormTypeService.getName())));
    
    let isRootForm = this.getValue(uiProperties,PropertyNameConstants.ROOT_FORM);
    formDefinition.uiProperties.push(new BooleanProperty(null,PropertyNameConstants.ROOT_FORM,isRootForm,true,true));
    if(isRootForm){
      let saveText = this.getValue(uiProperties,PropertyNameConstants.ROOT_FORM_SAVE);
      if(saveText == undefined){
        saveText = "Save";
      }
      formDefinition.uiProperties.push(new StringProperty(null,PropertyNameConstants.ROOT_FORM_SAVE,saveText,false,true));
      let cancelText = this.getValue(uiProperties,PropertyNameConstants.ROOT_FORM_SAVE);
      if(cancelText == undefined){
        cancelText = "Cancel";
      }
      formDefinition.uiProperties.push(new StringProperty(null,PropertyNameConstants.ROOT_FORM_CANCEL,cancelText,false,true));
    }

    formDefinition.uiProperties.push(new BooleanProperty(null,PropertyNameConstants.INVALID_STATE_ENABLED,this.getValue(uiProperties,PropertyNameConstants.INVALID_STATE_ENABLED),false,false));
    return Promise.resolve();
  }
}
