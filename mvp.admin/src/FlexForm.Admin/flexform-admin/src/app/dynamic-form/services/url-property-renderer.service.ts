import { Injectable } from '@angular/core';
import { PropertyRendererInterface } from '../models/interfaces/property-renderer.interface';
import { BaseProperty } from '../../models/properties/base-property.model';
import { BasePropertiesService } from '../../services/element-properties/base-properties.service';
import { PropertyNameConstants } from '../../property-name-constants';
import { FormControlPropertyServicePool } from '../../services/form-control-property-service-pool.service';

@Injectable({
  providedIn: 'root'
})
export class UrlPropertyRendererService extends BasePropertiesService implements PropertyRendererInterface{
  context: any;
  renderValue(uiProperties: BaseProperty<any>[]): string {
    return super.getValue(uiProperties,PropertyNameConstants.URL);
  }

  constructor(protected formControlPropertyServicePool:FormControlPropertyServicePool) { 
    super(formControlPropertyServicePool);
  }
}
