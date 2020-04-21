import { Component } from '@angular/core';
import { CheckBoxModel } from '../../../models/basicModels/check-box.model';
import { PrimitiveForm } from '../primitive-form/primitive-form.component';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent extends PrimitiveForm<boolean, CheckBoxModel> {
  get labelPosition():string{
    switch(this.model.formElement.labelPosition){
        case "left": 
        case "right": 
          return "flex-row";
        case "top": 
        case "bottom":   
          return "flex-column";
        default:
            return "flex-row";
    }
  }
  
  get labelPositionOrderInput():string{
    switch(this.model.formElement.labelPosition){
      case "left": 
      case "top": 
        return "order-2";
      case "right": 
      case "bottom":   
        return "order-1";
      default:
          return "order-1";
    }
  }
  get labelPositionOrderLabel():string{
    switch(this.model.formElement.labelPosition){
      case "left": 
      case "top": 
        return "order-1";
      case "right": 
      case "bottom":   
        return "order-2";
      default:
          return "order-2";
    }
  }
}
