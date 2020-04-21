import { EntityInstance, ItemSourceDefinition } from '../../models/dtos';

export interface IItemSourceService{
    itemSource(itemSourceDefinition: ItemSourceDefinition): Promise<EntityInstance[]>;
}