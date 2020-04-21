import { IValidation } from "./validation.interface";

export class RequiredValidation implements IValidation{

    validate(value: object): boolean {
        return !this.isEmpty(value);
    }

    isEmpty(str):boolean {
        return (!str || 0 === str.length);
    }
}