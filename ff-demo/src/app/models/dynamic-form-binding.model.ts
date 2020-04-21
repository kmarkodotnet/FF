import { Type } from "@angular/core";
import { IForm } from "./form.interface";
import { IModel } from "./basicModels/model.interface";

export class DynamicFormBindingModel {

    constructor(formType: Type<IForm>,formModel:IModel){
        this.formType = formType;
        this.formModel = formModel;
    }

    formType: Type<IForm>;
    formModel:IModel;
}
