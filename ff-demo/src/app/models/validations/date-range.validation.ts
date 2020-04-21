import { IValidation } from "./validation.interface";

export class DateRangeValidation implements IValidation{
    minDate:Date | null;
    maxDate:Date | null;

    constructor(minDate:Date | null, maxDate:Date | null){
        this.minDate = minDate;
        this.maxDate = maxDate;
    }

    validate(value: object): boolean {
        let date = new Date(value.toString());
        return (this.minDate == null || date >= this.minDate) && (this.maxDate == null || date <= this.maxDate);
    }
}