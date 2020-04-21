import { Injectable } from '@angular/core';
import { FormControlNonBindingPropertiesService } from '../form-control-non-binding-properties.service';
import { BaseProperty } from '../../../../models/properties';
import { FormControl } from '../../../../models/dtos';
import { ConstantsService } from '../../../../services/constants.service';
import { PropertyNameConstants } from '../../../../property-name-constants';
import { HorizontalAlignment } from '../../../../models/enums/horizontal-alignment.enum';
import { StringProperty} from '../../../../models/properties';
import { FormControlHorizontalAlignmentService } from '../../../low-level-properties/form-control-horizontal-alignment.service';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { DisplayTypeTemplateService } from '../../../../services/low-level-properties/display-type-template.service';
import { FormControlPropertyServicePool } from '../../../../services/form-control-property-service-pool.service';
import { TemplatePropertiesServiceFactory } from '../../../template-properties-factory.service';

@Injectable({
  providedIn: 'root'
})
export class LabelFormControlPropertiesService extends FormControlNonBindingPropertiesService {
  constructor(protected propertyServicePool:FormControlPropertyServicePool, protected templatePropertiesServiceFactory:TemplatePropertiesServiceFactory) {
    super(propertyServicePool,templatePropertiesServiceFactory);
  }
   async createProperties(formControl: FormControl): Promise<BaseProperty<any>[]> {
    let bps = await super.createProperties(formControl);
    bps.push(new StringProperty(formControl.guid,PropertyNameConstants.LABEL_TEXT,formControl.name,false,true));
    bps.push(await this.propertyServicePool.formControlHorizontalAlignmentService().createProperty(null,HorizontalAlignment.Left));
    return bps;
  }
  
  async loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void> {
    await super.loadProperties(formControl,uiProperties);
    formControl.uiProperties.push(new StringProperty(formControl.guid,PropertyNameConstants.LABEL_TEXT,this.getValue(uiProperties,PropertyNameConstants.LABEL_TEXT),false,true));
    formControl.uiProperties.push(await this.propertyServicePool.formControlHorizontalAlignmentService().reloadProperty(null, this.getValue(uiProperties,this.propertyServicePool.formControlHorizontalAlignmentService().getName())));
  }

}
