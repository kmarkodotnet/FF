import { Injectable } from '@angular/core';
import { FormDefinition } from '../models/dtos/form-definition';
import { FormDefinitionsData } from './data/form-definitions.data';

@Injectable()
export class FormDefinitionService {

  private formDefinitions: FormDefinition[];

  constructor(private formDefinitionsData: FormDefinitionsData) {
    this.formDefinitions = formDefinitionsData.getFormDefinitions();
  }

  listFormDefinitions(type: string):FormDefinition[]{
    let filteredFormDefinitions = this.formDefinitions.filter(i => i.entityDefinition === type);
    return filteredFormDefinitions;
  }

  getFormDefinition(id: number):FormDefinition{
    let formDefinition = this.formDefinitions.filter(i => i.id === id)[0];
    return formDefinition;
  }
}
