import { FormElement } from "../dtos/form-element";
import { IModel } from "./model.interface";

/* Generic basic model
*  
*/

export class PrimitiveModel<T> implements IModel {
    
    constructor(value: T){
        this.originalValue = value;
        this.modifiedValue = value;
    }

    originalValue: T;
    modifiedValue: T;
    formElement: FormElement;
    
    getPropertyName(): string {
        return this.formElement.propertyName;
    }
    getValue() {
        return this.modifiedValue;
    }
}