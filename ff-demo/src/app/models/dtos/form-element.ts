import { ValidationRule } from "./validation-rule";

export class FormElement {
    type:string;// {textbox|dateselector|checkbox|[form:id]}
	labelText:string;
	labelPosition:string;// {left|right|top|bottom}
	labelHAlignment:string;// {left|middle|right}
	labelVAlignment:string;// {top|middle|bottom}
	tooltip:string;
	propertyName:string;
	validations:ValidationRule[];
}