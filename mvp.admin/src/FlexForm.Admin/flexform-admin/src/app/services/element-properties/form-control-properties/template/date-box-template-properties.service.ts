import { Injectable } from '@angular/core';
import { BaseProperty, StringProperty, ConstantProperty } from '../../../../models/properties';
import { FormControl } from '../../../../models/dtos';
import { ConstantsService } from '../../../constants.service';
import { TemplatePropertiesService } from '../template-properties.service';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../../../../services/form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class DateBoxTemplatePropertiesService extends TemplatePropertiesService{
  constructor(protected formControlPropertyServicePool:FormControlPropertyServicePool) {
    super(formControlPropertyServicePool);
   }

   async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = await super.createProperties(formControl);
    return bps;
  }
  
  async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
    await super.loadProperties(formControl,uiProperties);
  }
}
