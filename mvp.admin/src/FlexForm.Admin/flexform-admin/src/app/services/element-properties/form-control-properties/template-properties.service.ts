import { Injectable } from '@angular/core';
import { ElementPropertiesServiceInterface } from '../../../models/interfaces';
import { BaseProperty, StringProperty, ConstantProperty } from '../../../models/properties';
import { PropertyNameConstants } from '../../../property-name-constants';
import { FormControl } from '../../../models/dtos';
import { BaseFormControlPropertiesService } from '../base-form-control-properties.service';
import { ConstantsService } from '../../constants.service';
import { BasePropertyConverterService } from '../../../services/property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../../form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class TemplatePropertiesService extends BaseFormControlPropertiesService implements ElementPropertiesServiceInterface<FormControl> {
  async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = new Array<BaseProperty<any>>();
    return Promise.resolve(bps);
  }
  
  async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
    
  }

  constructor(protected formControlPropertyServicePool:FormControlPropertyServicePool) {
    super(formControlPropertyServicePool);
   }
}
