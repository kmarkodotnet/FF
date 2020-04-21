import { Injectable } from '@angular/core';
import { FormControlBindingPropertiesService } from '../../form-control-properties/form-control-binding-properties.service';
import { FormDefinitionDisplayTypeService } from '../../../low-level-properties/form-definition-display-type.service';
import { FormDefinitionContainerFormService } from '../../../low-level-properties/form-definition-container-form.service';
import { FormControlVerticalAlignmentService } from '../../../low-level-properties/form-control-vertical-alignment.service';
import { FormControlHorizontalAlignmentService } from '../../../low-level-properties/form-control-horizontal-alignment.service';
import { BaseProperty, NumberProperty } from '../../../../models/properties';
import { PropertyNameConstants } from '../../../../property-name-constants';
import { FormControl } from '../../../../models/dtos/form-control.model';
import { ConstantsService } from '../../../constants.service';
import { DisplayTypeTemplateService } from '../../../../services/low-level-properties/display-type-template.service';
import { SingleLineTextTemplatePropertiesService } from '../template/single-line-text-template-properties.service';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../../../../services/form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../../template-properties-factory.service';

@Injectable({
  providedIn: 'root'
})
export class DataGridFormControlPropertiesService extends FormControlBindingPropertiesService {

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
