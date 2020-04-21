import { PrimitiveModel } from "./primitive.model";
import { FormElement } from "../dtos/form-element";

export class TextBoxModel extends PrimitiveModel<string> {
    constructor(value: string, formElement: FormElement){
        super(value);
        this.formElement = formElement;
    }
}