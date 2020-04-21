import { IForm } from "../../../models/form.interface";
import { ValidationService } from "../../../services/validation.service";
import { PrimitiveModel } from "../../../models/basicModels/primitive.model";
import { Component } from "@angular/core";

@Component({
    selector: 'app-primitive-form',
    templateUrl: './primitive-form.component.html',
    styleUrls: ['./primitive-form.component.css']
  })
export class PrimitiveForm<TBase, T extends PrimitiveModel<TBase>> implements IForm {
    public model: T;
    public value: TBase;
    constructor(private validationService: ValidationService){
    }
    
    public isValid():boolean{
        let validations = this.model.formElement.validations;
        if(validations)
        {
            return this.validationService.validate(this.model.modifiedValue,validations);
        }
        return true;
      }

    save(): any {
        this.model.originalValue = this.model.modifiedValue;
        return this.model;
    }
    cancel(): void {
        this.model.modifiedValue = this.model.originalValue;
    }

    public isValidClass():string{
        let isValid = "";
        if(this.isValid()){
            isValid = "is-valid";
        }else{
            isValid = "is-invalid";
        }
        return " " +  isValid;
    }

    public getTooltip():string{
        return this.model.formElement.tooltip;
    }

    get labelPosition():string{
        switch(this.model.formElement.labelPosition){
            case "left": 
                return "flex-row";
            case "right": 
                return "flex-row-reverse";
            case "top": 
                return "flex-column";
            case "bottom": 
                return "flex-column-reverse";
            default:
                return "flex-row";
        }
    }
    
    get labelHAlignment():string{
        switch(this.model.formElement.labelHAlignment){
            case "left": 
                return "justify-content-start";
            case "middle": 
                return "justify-content-center";
            case "right": 
                return "justify-content-end";
            default:
                return "";
        }
    }
    
    get labelVAlignment():string{
        switch(this.model.formElement.labelVAlignment){
            case "top": 
                return "";
            case "middle": 
                return "";
            case "bottom": 
                return "";
            default:
                return "";
        }
    }

    get toolTip():string{
        return this.model.formElement.tooltip;
    }
}