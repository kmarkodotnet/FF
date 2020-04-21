import { BaseProperty} from '../../models/properties';
import { FormControl } from '../../models/dtos';
import { BasePropertiesService } from './base-properties.service';
import { BasePropertyConverterService } from '../../services/property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../form-control-property-service-pool.service';

export abstract class BaseFormControlPropertiesService extends BasePropertiesService{

  constructor(protected formControlPropertyServicePool:FormControlPropertyServicePool) {
    super(formControlPropertyServicePool);
   }

  abstract createProperties(formControl: FormControl): Promise<BaseProperty<any>[]>;

  abstract loadProperties(formControl: FormControl,uiProperties: BaseProperty<any>[]): Promise<void>;

}
