import { Injectable } from '@angular/core';
import { PropertyConverterInterface } from '../../models/interfaces/property-handler.interface';
import { FormControlBinding } from '../../models/dtos/form-control-binding.model';
import { BasePropertyConverterService } from './base-property-handler.service';
import { PropertyNameConstants } from '../../property-name-constants';

@Injectable({
  providedIn: 'root'
})
export class FormControlBindingPropertyHandlerService extends BasePropertyConverterService implements PropertyConverterInterface<FormControlBinding> {
  convertUiProperties(entity: FormControlBinding): void {
    entity.isReadOnly = this.getValue(entity.uiProperties,PropertyNameConstants.READONLY);
    entity.isInvalidStateEnabled = this.getValue(entity.uiProperties,PropertyNameConstants.INVALID_STATE_ENABLED);
  }
  constructor() {
    super();
   }
}
