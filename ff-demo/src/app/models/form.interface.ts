import { IValidation } from "./validations/validation.interface";
import { IModel } from "./basicModels/model.interface";

/**
  * Dynamic form interface
  */
export interface IForm {

    /**
     * Model of the form
     */
    model: object;

    /**
     * Form, and subforms are valid or not
     */
    isValid():boolean;

    /**
     * Saving form, and subforms data
     */
    save():IModel;

    /**
     * Canceling form, and subforms data
     */
    cancel():void;
}
