import { PrimitiveModel } from "./primitive.model";
import { FormElement } from "../dtos/form-element";

export class DateSelectorModel extends PrimitiveModel<Date> {
    constructor(value: Date, formElement: FormElement){
        super(value);
        this.formElement = formElement;
    }
}