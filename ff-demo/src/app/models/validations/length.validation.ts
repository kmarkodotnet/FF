import { IValidation } from "./validation.interface";

export class LengthValidation implements IValidation{
    minLength:number | null;
    maxLength:number | null;

    constructor(minLength:number | null, maxLength:number | null){
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

    validate(value: object): boolean {
        let str = new String(value);
        return (this.minLength != null && str.length >= this.minLength) || (this.maxLength != null && str.length <= this.maxLength);
    }
}