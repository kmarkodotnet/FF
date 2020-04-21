import { Injectable } from '@angular/core';
import { FormControl } from '../../../models/dtos';
import { ElementPropertiesServiceInterface } from '../../../models/interfaces/element-properties-service.interface';
import { BaseProperty, StringProperty, ConstantProperty, BooleanProperty, DropDownListProperty } from '../../../models/properties';
import { PropertyNameConstants } from '../../../property-name-constants';
import { FormDefinitionDisplayTypeService } from '../../low-level-properties/form-definition-display-type.service';
import { FormDefinitionContainerFormService } from '../../low-level-properties/form-definition-container-form.service';
import { ConstantsService } from '../../constants.service';
import { FormControlHorizontalAlignmentService } from '../../low-level-properties/form-control-horizontal-alignment.service';
import { FormControlVerticalAlignmentService } from '../../low-level-properties/form-control-vertical-alignment.service';
import { HorizontalAlignment } from '../../../models/enums/horizontal-alignment.enum';
import { VerticalAlignment } from '../../../models/enums/vertical-alignment.enum';
import { BaseFormControlPropertiesService } from '../base-form-control-properties.service';
import { DisplayTypeTemplateService } from '../../low-level-properties/display-type-template.service';
import { BasePropertyConverterService } from '../../property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../../form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../template-properties-factory.service';
import { TemplatePropertiesService } from './template-properties.service';

@Injectable({
  providedIn: 'root'
})
export class FormControlBindingPropertiesService extends BaseFormControlPropertiesService implements ElementPropertiesServiceInterface<FormControl> {
  
  protected templatePropertiesService:TemplatePropertiesService;
  constructor(protected propertyServicePool:FormControlPropertyServicePool, protected templatePropertiesServiceFactory:TemplatePropertiesServiceFactory) {
    super(propertyServicePool);
  }

  async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = new Array<BaseProperty<any>>();
    bps.push(new ConstantProperty(formControl.guid,PropertyNameConstants.TYPE,formControl.formControlBinding.fieldDefinition.fieldType,this.propertyServicePool.constantsService().getFieldTypeName(formControl.formControlBinding.fieldDefinition.fieldType)));
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.NAME,formControl.name,true,true));
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.LABEL_TEXT,formControl.formControlBinding.fieldDefinition.name + " label",true,true));
    bps.push(await this.propertyServicePool.formControlHorizontalAlignmentService().createProperty(null,HorizontalAlignment.Left));
    bps.push(await this.propertyServicePool.formControlVerticalAlignmentService().createProperty(null,VerticalAlignment.Top));
    
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.CSS_CLASSES,"",true,false));
    
    bps.push(new BooleanProperty(formControl.guid,PropertyNameConstants.READONLY,false,true,false));
    if(formControl.formControlBinding && formControl.formControlBinding.fieldDefinition)
    {        
      bps.push(await this.propertyServicePool.formDefinitionDisplayTypeService().createProperty(formControl.guid,null,formControl.formControlBinding.fieldDefinition.fieldType));
      // if(formControl.formControlBinding.fieldDefinition.itemSourceDefinition){
      //   bps.push(this.formDefinitionContainerFormService.createProperty(formControl.guid,null,formControl.formControlBinding.fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId));
      //   bps.push(new BooleanProperty(formControl.guid,PropertyNameConstants.FORM_NAME_VISIBLE,true,true,false));
      // }
    }
    let templates = await this.propertyServicePool.displayTypeTemplateService().createProperty(null,null,formControl.displayType);
    if((<DropDownListProperty>templates).elements.length>0){
      bps.push(templates);
      let choonesTemplate = templates.value;
      this.templatePropertiesService = this.templatePropertiesServiceFactory.getFormControlServiceOfTemplate(choonesTemplate);
      (await this.templatePropertiesService.createProperties(formControl)).forEach(p => bps.push(p));
    }
    return Promise.resolve(bps);
  }
  
  async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
    formControl.uiProperties = new Array<BaseProperty<any>>();
    formControl.uiProperties.push(new ConstantProperty(formControl.guid,PropertyNameConstants.TYPE,formControl.formControlBinding.fieldDefinition.fieldType,this.propertyServicePool.constantsService().getFieldTypeName(formControl.formControlBinding.fieldDefinition.fieldType)));
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.NAME,this.getValue(uiProperties,PropertyNameConstants.NAME),false,true));
    
    if(formControl.formControlBinding && formControl.formControlBinding.fieldDefinition){
      formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.LABEL_TEXT,this.getValue(uiProperties,PropertyNameConstants.LABEL_TEXT),false,true));
      formControl.uiProperties.push(await this.propertyServicePool.formControlHorizontalAlignmentService().reloadProperty(null, this.getValue(uiProperties,this.propertyServicePool.formControlHorizontalAlignmentService().getName())));
      formControl.uiProperties.push(await this.propertyServicePool.formControlVerticalAlignmentService().reloadProperty(null, this.getValue(uiProperties,this.propertyServicePool.formControlVerticalAlignmentService().getName())));
    }
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.CSS_CLASSES,this.getValue(uiProperties,PropertyNameConstants.CSS_CLASSES),true,false));

    formControl.uiProperties.push(new BooleanProperty(formControl.guid,PropertyNameConstants.READONLY,this.getValue(uiProperties,PropertyNameConstants.READONLY),true,false));
    // formControl.uiProperties.push(new BooleanProperty(formControl.guid,PropertyNameConstants.INVALID_STATE_ENABLED,this.getValue(uiProperties,PropertyNameConstants.INVALID_STATE_ENABLED),false,));
    if(formControl.formControlBinding && formControl.formControlBinding.fieldDefinition)
    {        
      formControl.uiProperties.push(await this.propertyServicePool.formDefinitionDisplayTypeService().reloadProperty(formControl.guid,this.getValue(uiProperties,this.propertyServicePool.formDefinitionDisplayTypeService().getName()),formControl.formControlBinding.fieldDefinition.fieldType));
      // if(formControl.formControlBinding.fieldDefinition.itemSourceDefinition){
      //   formControl.uiProperties.push(this.formDefinitionContainerFormService.reloadProperty(
      //     formControl.guid,
      //     this.getValue(uiProperties,this.formDefinitionContainerFormService.getName()),
      //     formControl.formControlBinding.fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId));
      //   formControl.uiProperties.push(new BooleanProperty(formControl.guid,PropertyNameConstants.FORM_NAME_VISIBLE,this.getValue(uiProperties,PropertyNameConstants.FORM_NAME_VISIBLE),true,false));
      // }
    }    
    let templates = await this.propertyServicePool.displayTypeTemplateService().reloadProperty(null, this.getValue(uiProperties,this.propertyServicePool.displayTypeTemplateService().getName()), formControl.displayType);
    if((<DropDownListProperty>templates).elements.length>0){
      formControl.uiProperties.push(templates);
      let choonesTemplate = templates.value;
      this.templatePropertiesService = this.templatePropertiesServiceFactory.getFormControlServiceOfTemplate(choonesTemplate);
      await this.templatePropertiesService.loadProperties(formControl,uiProperties);
    }

    return Promise.resolve();
  }
}
