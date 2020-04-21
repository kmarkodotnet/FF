import { BaseProperty} from '../../models/properties';
import { BasePropertyConverterService } from '../property-handler/base-property-handler.service';
import { FormControlPropertyServicePool } from '../form-control-property-service-pool.service';

export abstract class BasePropertiesService{
  constructor(protected formControlPropertyServicePool:FormControlPropertyServicePool) { }

  getValue(uiProperties: BaseProperty<any>[],name:string):any{
    let index = uiProperties.findIndex(p => p.name == name);
    if(index <0){
      return null;
    }
    return uiProperties[index].value;
  }
}