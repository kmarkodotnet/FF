import { Injectable } from '@angular/core';
import { ValidationRule } from '../models/dtos/validation-rule';
import { IValidation } from '../models/validations/validation.interface';
import { RequiredValidation } from '../models/validations/required.validation';
import { LengthValidation } from '../models/validations/length.validation';
import { DateRangeValidation } from '../models/validations/date-range.validation';

@Injectable()
export class ValidationService {

  constructor() {  }

  validate(value: any,validations: ValidationRule[]):boolean{
    let domainValidations = this.getValidations(validations);
    let validationResult = this.runValidations(value, domainValidations);
    return validationResult;
  }

  runValidations(value: any,domainValidations: IValidation[]):boolean{
    let validationOk = true;

    domainValidations.forEach(v =>{
      validationOk = validationOk && v.validate(value);
    });

    return validationOk;
  }

  getValidations(validations: ValidationRule[]):IValidation[]{
    let domainValidations = new Array<IValidation>();
    validations.forEach(v => {
      switch(v.name){
        case "required":
          domainValidations.push(new RequiredValidation());
          break;
        case "length":
          domainValidations.push(new LengthValidation(v.parameters["minLength"],v.parameters["maxLength"]));
          break;
        case "daterange":
          domainValidations.push(new DateRangeValidation(new Date(v.parameters["minDate"]),new Date(v.parameters["maxDate"])));
          break;
        default:
          console.log("unknown validation rule");
          break;
      }
    });
    return domainValidations;
  }
}
