import { Injectable } from '@angular/core';
import { PropertyConverterInterface } from '../../models/interfaces/property-handler.interface';
import { FormDefinition } from '../../models/dtos/form-definition.model';
import { BasePropertyConverterService } from './base-property-handler.service';
import { PropertyNameConstants } from '../../property-name-constants';

@Injectable({
  providedIn: 'root'
})
export class FormDefinitionPropertyHandlerService extends BasePropertyConverterService implements PropertyConverterInterface<FormDefinition> {
  convertUiProperties(entity: FormDefinition): void {
    entity.formName = this.getValue(entity.uiProperties,PropertyNameConstants.FORM_NAME);
    entity.title = this.getValue(entity.uiProperties,PropertyNameConstants.TITLE);
    entity.description = this.getValue(entity.uiProperties,PropertyNameConstants.DESCRIPTION);
    entity.formType = this.getValue(entity.uiProperties,PropertyNameConstants.FORM_TYPE);
    entity.isRootForm = this.getValue(entity.uiProperties,PropertyNameConstants.ROOT_FORM);
    entity.isInvalidStateEnabled = this.getValue(entity.uiProperties,PropertyNameConstants.READONLY);
  }
  constructor() {
    super();
   }
}
