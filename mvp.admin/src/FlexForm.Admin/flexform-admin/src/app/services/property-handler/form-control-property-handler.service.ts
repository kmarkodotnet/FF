import { Injectable } from '@angular/core';
import { PropertyConverterInterface } from '../../models/interfaces/property-handler.interface';
import { FormControl } from '../../models/dtos/form-control.model';
import { BasePropertyConverterService } from './base-property-handler.service';
import { PropertyNameConstants } from '../../property-name-constants';

@Injectable({
  providedIn: 'root'
})
export class FormControlPropertyHandlerService extends BasePropertyConverterService implements PropertyConverterInterface<FormControl> {
  convertUiProperties(entity: FormControl): void {
    entity.name = this.getValue(entity.uiProperties,PropertyNameConstants.NAME);
    entity.displayType = this.getValue(entity.uiProperties,PropertyNameConstants.DISPLAY_TYPE);
    entity.subFormDefinitionId = this.getValue(entity.uiProperties,PropertyNameConstants.CONTAINER_FORM);
  }
  constructor() {
    super();
   }
}
