import { Injectable } from '@angular/core';
import { FormControlNonBindingPropertiesService } from '../form-control-non-binding-properties.service';
import { BaseProperty } from '../../../../models/properties';
import { FormControl } from '../../../../models/dtos';
import { ConstantsService } from '../../../../services/constants.service';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { DisplayTypeTemplateService } from '../../../../services/low-level-properties/display-type-template.service';
import { FormControlPropertyServicePool } from '../../../../services/form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../../template-properties-factory.service';

@Injectable({
  providedIn: 'root'
})
export class PanelFormControlPropertiesService extends FormControlNonBindingPropertiesService {
  constructor(protected propertyServicePool:FormControlPropertyServicePool, protected templatePropertiesServiceFactory:TemplatePropertiesServiceFactory) {
    super(propertyServicePool,templatePropertiesServiceFactory);
  }

   async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = await super.createProperties(formControl);
    return bps;
  }
  
  async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
    await super.loadProperties(formControl,uiProperties);
  }
}
