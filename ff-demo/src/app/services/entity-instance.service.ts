import { Injectable } from '@angular/core';
import { EntityInstance } from '../models/dtos/entity-instance';
import { ClaimInstancesData } from './data/claim-instances.data';
import { PersonInstancesData } from './data/person-instances.data';
import { EntityDefinitionService } from './entity-definition.service';
import { EntityDefinition } from '../models/dtos/entity-definition';
import { FieldDefinition } from '../models/dtos/field-definition';
import { AddressInstancesData } from './data/address-instances.data';

@Injectable()
export class EntityInstanceService {

  private instances:EntityInstance[];
  private entityDefinitions: EntityDefinition[];

  constructor(
    private personInstancesData: PersonInstancesData,
    private claimInstancesData: ClaimInstancesData,
    private addressInstancesData: AddressInstancesData,
    private entityDefinitionService: EntityDefinitionService
  ) {
    this.mergeTypes();
   }

  mergeTypes():void{
    let persons = this.personInstancesData.getPersons();
    let claims = this.claimInstancesData.getClaims();
    let addresses = this.addressInstancesData.getAddresses();
    this.instances = persons.concat(claims).concat(addresses);
  }

  listEntityInstances(type: string):EntityInstance[]{
    this.mergeTypes();
    let filteredInstances = this.instances.filter(i => i.entityDefinition === type);
    return filteredInstances;
  }

  getEntityInstance(id: number):EntityInstance{
    this.mergeTypes();
    let instance = this.instances.filter(i => i.id === id)[0];
    return instance;
  }

  saveEntityInstance(entityInstance: EntityInstance):EntityInstance{
    let type = entityInstance.entityDefinition;
    let instances = this.listEntityInstances(type);

    if(entityInstance.id == 0){
      let maxId = 0;
      instances.forEach((element,index) => {
        if(element.id > maxId){
          maxId = element.id;
        }
      });
      entityInstance.id = maxId + 1;
      instances.push(entityInstance);
    }else{
      let itemIndex = 0;
      instances.forEach((element,index) => {
        if(element.id == entityInstance.id){
          itemIndex = index;
        }
      });
      instances[itemIndex] = entityInstance;
    }
    
    if(type == 'person'){
      this.personInstancesData.setPersons(instances);
    }else if(type == 'claim'){
      this.claimInstancesData.setClaims(instances);
    }else if(type == 'address'){
      this.addressInstancesData.setAddresses(instances);
    }
    return entityInstance;
  }

  getNewEntityInstance(selectedEntityDefinitionName):EntityInstance{
    let entityDefinition = this.entityDefinitionService.getEntityDefinition(selectedEntityDefinitionName);

    let newInstance = new EntityInstance()
    newInstance.id = 0;
    newInstance.entityDefinition = selectedEntityDefinitionName;
    newInstance.fieldValues = new Object();
    entityDefinition.fieldDefinitions.forEach(fieldDefinition =>{
      
      let value = null;
      let name = fieldDefinition.name;
      
      switch(fieldDefinition.type)
      {
        case "number":
          if(fieldDefinition.defaultValue===undefined){
            value = 0;
          }else{
            value = +fieldDefinition.defaultValue;
          }          
          break;
        case "text":
          if(fieldDefinition.defaultValue===undefined){
            value = "";
          }else{
            value = fieldDefinition.defaultValue;
          }
          break;
        case "date":
          if(fieldDefinition.defaultValue===undefined){
            value = new Date();
          }else{
            value = new Date(fieldDefinition.defaultValue);
          }          
          break;
        case "bool":
          if(fieldDefinition.defaultValue===undefined){
            value = false;
          }else{
            value = value != "false";
          }          
          break;
        default:
          value = this.getNewEntityInstance(fieldDefinition.type);   
          break;
      }
      newInstance.fieldValues[name] = value;
    });

    return newInstance;
  }
}
