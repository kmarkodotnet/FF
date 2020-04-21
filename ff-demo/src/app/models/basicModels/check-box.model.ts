import { PrimitiveModel } from "./primitive.model";
import { FormElement } from "../dtos/form-element";

export class CheckBoxModel extends PrimitiveModel<boolean> {
    constructor(value: boolean, formElement: FormElement){
        super(value);
        this.formElement = formElement;
    }
}