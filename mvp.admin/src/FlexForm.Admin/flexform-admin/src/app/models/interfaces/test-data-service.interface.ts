import { EntityInstance, ItemSourceDefinition } from '../../models/dtos';

export interface ITestDataService{
    get(entityDefinitionId:number):Promise<EntityInstance>;
}