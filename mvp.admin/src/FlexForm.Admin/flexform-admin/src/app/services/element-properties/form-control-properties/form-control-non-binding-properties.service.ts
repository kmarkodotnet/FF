import { Injectable } from '@angular/core';
import { ElementPropertiesServiceInterface } from '../../../models/interfaces';
import { BaseProperty, StringProperty, ConstantProperty, DropDownListProperty } from '../../../models/properties';
import { PropertyNameConstants } from '../../../property-name-constants';
import { FormControl } from '../../../models/dtos';
import { BaseFormControlPropertiesService } from '../base-form-control-properties.service';
import { ConstantsService } from '../../constants.service';
import { BasePropertyConverterService } from '../../property-handler/base-property-handler.service';
import { DisplayTypeTemplateService } from '../../low-level-properties/display-type-template.service';
import { FormControlPropertyServicePool } from '../../form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../template-properties-factory.service';
import { TemplatePropertiesService } from './template-properties.service';

@Injectable({
  providedIn: 'root'
})
export class FormControlNonBindingPropertiesService extends BaseFormControlPropertiesService implements ElementPropertiesServiceInterface<FormControl> {
  
  protected templatePropertiesService:TemplatePropertiesService;
  constructor(protected propertyServicePool:FormControlPropertyServicePool, protected templatePropertiesServiceFactory:TemplatePropertiesServiceFactory) {
    super(propertyServicePool);
  }

  async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = new Array<BaseProperty<any>>();
    //
    bps.push(new ConstantProperty(formControl.guid,PropertyNameConstants.DISPLAY_TYPE,formControl.displayType,this.propertyServicePool.constantsService().getDisplayTypeName(formControl.displayType)));
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.NAME,formControl.name,true,true));
    // bps.push(new BooleanProperty(formControl.guid,PropertyNameConstants.READONLY,false,true,false));
    // bps.push(new BooleanProperty(formControl.guid,PropertyNameConstants.INVALID_STATE_ENABLED,false,true,false));
    
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.CSS_CLASSES,"",true,false));

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
    formControl.uiProperties.push(new ConstantProperty(formControl.guid,PropertyNameConstants.DISPLAY_TYPE,formControl.displayType,this.propertyServicePool.constantsService().getDisplayTypeName(formControl.displayType)));
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.NAME,this.getValue(uiProperties,PropertyNameConstants.NAME),false,true));
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.CSS_CLASSES,this.getValue(uiProperties,PropertyNameConstants.CSS_CLASSES),true,false));
    
    let templates = await this.propertyServicePool.displayTypeTemplateService().reloadProperty(null, this.getValue(uiProperties,this.propertyServicePool.displayTypeTemplateService().getName()), formControl.displayType);
    if((<DropDownListProperty>templates).elements.length>0){
      formControl.uiProperties.push(templates);
      let choonesTemplate = templates.value;
      this.templatePropertiesService = this.templatePropertiesServiceFactory.getFormControlServiceOfTemplate(choonesTemplate);      
      await this.templatePropertiesService.loadProperties(formControl,uiProperties);
    }
  }

}
