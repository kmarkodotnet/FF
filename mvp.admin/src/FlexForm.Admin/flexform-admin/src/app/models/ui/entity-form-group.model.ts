import { EntityDefinition, FormDefinition } from '../dtos';

export class EntityFormGroup{
    entityDefinition: EntityDefinition;
    formDefinitions:FormDefinition[];
    isOpen:boolean;
    constructor(entityDefinition: EntityDefinition,formDefinitions:FormDefinition[]){
        this.entityDefinition = entityDefinition;
        this.formDefinitions = formDefinitions;
        this.isOpen=false;

    }
}