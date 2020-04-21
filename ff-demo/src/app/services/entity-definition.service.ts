import { Injectable } from '@angular/core';
import { EntityDefinition } from '../models/dtos/entity-definition';
import { EntityDefinitionsData } from './data/entitiy-definitions.data';

@Injectable()
export class EntityDefinitionService {

  entityDefinitions:EntityDefinition[];

  constructor(private entityDefinitionsData: EntityDefinitionsData,) { 
    this.entityDefinitions = entityDefinitionsData.getEntityDefinitions();
  }

  listEntityDefinitions():EntityDefinition[]{
    return this.entityDefinitions;
  }

  getEntityDefinition(name: string):EntityDefinition{
    let definition = this.entityDefinitions.filter(i => i.name === name)[0];
    return definition;
  }
}
