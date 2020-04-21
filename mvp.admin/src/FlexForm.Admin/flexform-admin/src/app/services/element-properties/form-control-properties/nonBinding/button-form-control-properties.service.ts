import { Injectable } from '@angular/core';
import { FormControlNonBindingPropertiesService } from '../form-control-non-binding-properties.service';
import { BaseProperty, StringProperty } from '../../../../models/properties';
import { FormControl } from '../../../../models/dtos';
import { ConstantsService } from '../../../../services/constants.service';
import { PropertyNameConstants } from '../../../../property-name-constants';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { DisplayTypeTemplateService } from '../../../../services/low-level-properties/display-type-template.service';
import { FormControlPropertyServicePool } from '../../../../services/form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../../template-properties-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonFormControlPropertiesService extends FormControlNonBindingPropertiesService {
  constructor(protected propertyServicePool:FormControlPropertyServicePool, protected templatePropertiesServiceFactory:TemplatePropertiesServiceFactory) {
    super(propertyServicePool,templatePropertiesServiceFactory);
  }
    async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
      let bps = await super.createProperties(formControl);
      bps.push(new StringProperty(formControl.guid,PropertyNameConstants.TITLE,"Button title",true,true));
      return bps;
    }
    
    async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
      await super.loadProperties(formControl,uiProperties);
      formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.TITLE,this.getValue(uiProperties,PropertyNameConstants.TITLE),false,true));
    }
}
