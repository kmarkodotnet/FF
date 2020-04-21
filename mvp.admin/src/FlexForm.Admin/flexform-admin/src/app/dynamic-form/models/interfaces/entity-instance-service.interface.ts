import { EntityInstance } from '../../../models/dtos';

export interface IEntityInstanceService{
    endpoint:string;
    get(entityInstanceId:number):Promise<EntityInstance>;
    getCollection(formControlId:number):Promise<EntityInstance[]>;
    getReference(formDefinitionId:number,entityInstanceId:number):Promise<EntityInstance[]>;

}