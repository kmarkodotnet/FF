/**
  * Data validation interface
  */
 export interface IValidation {
    /**
     * Validates an object, returns validation result
     */
    validate(value: object):boolean;
}