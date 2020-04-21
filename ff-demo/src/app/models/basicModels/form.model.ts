import { EntityInstance } from "../dtos/entity-instance";
import { FormDefinition } from "../dtos/form-definition";
import { IModel } from "./model.interface";

export class FormModel implements IModel{

    constructor(entityInstance: EntityInstance, formDefinition: FormDefinition){
        this.entityInstance = entityInstance;
        this.formDefinition = formDefinition;
    }
    
    entityInstance: EntityInstance;
    formDefinition: FormDefinition;

    getPropertyName(): string {
        return this.formDefinition.entityDefinition;
    }
    getValue():any {
        return this.entityInstance;
    }
}