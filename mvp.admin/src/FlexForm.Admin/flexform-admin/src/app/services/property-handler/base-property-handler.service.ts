import { Injectable } from '@angular/core';
import { BaseProperty } from '../../models/properties/base-property.model';

@Injectable({
  providedIn: 'root'
})
export class BasePropertyConverterService {
  constructor() { }
  getValue(uiProperties: BaseProperty<any>[],name:string):any{
    let index = uiProperties.findIndex(p => p.name == name);
    if(index <0){
      return null;
    }
    return uiProperties[index].value;
  }
}
