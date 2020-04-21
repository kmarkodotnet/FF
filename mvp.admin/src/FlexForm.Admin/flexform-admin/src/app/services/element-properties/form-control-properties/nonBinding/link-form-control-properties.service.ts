import { Injectable } from '@angular/core';
import { FormControlNonBindingPropertiesService } from '../form-control-non-binding-properties.service';
import { BaseProperty, StringProperty, BooleanProperty } from '../../../../models/properties';
import { FormControl } from '../../../../models/dtos';
import { ConstantsService } from '../../../../services/constants.service';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { DisplayTypeTemplateService } from '../../../../services/low-level-properties/display-type-template.service';
import { PropertyNameConstants } from '../../../../property-name-constants';
import { FormControlPropertyServicePool } from '../../../../services/form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../../template-properties-factory.service';

@Injectable({
  providedIn: 'root'
})
export class LinkFormControlPropertiesService extends FormControlNonBindingPropertiesService {
  constructor(protected propertyServicePool:FormControlPropertyServicePool, protected templatePropertiesServiceFactory:TemplatePropertiesServiceFactory) {
    super(propertyServicePool,templatePropertiesServiceFactory);
  }

   async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = await super.createProperties(formControl);
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.TEXT,"Link",false,true));
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.URL,formControl.name,false,true));
    bps.push(new BooleanProperty(formControl.guid,PropertyNameConstants.IS_RELATIVE_URL,false,true,false));
    return bps;
  }
  
  async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
    await super.loadProperties(formControl,uiProperties);
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.TEXT,this.getValue(uiProperties,PropertyNameConstants.TEXT),false,true));
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.URL,this.getValue(uiProperties,PropertyNameConstants.URL),false,true));
    formControl.uiProperties.push(new BooleanProperty(formControl.guid,PropertyNameConstants.IS_RELATIVE_URL,this.getValue(uiProperties,PropertyNameConstants.IS_RELATIVE_URL),true,false));
  }
}
