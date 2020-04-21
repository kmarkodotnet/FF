import { Injectable } from '@angular/core';
import { EntityDefinition, FieldDefinition, FormDefinition, FormControl } from '../models/dtos';
import { _ } from 'ag-grid-community';
import { EntityDesignerMode, FormDesignerMode } from '../models/enums';
@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  entityDesignerMode:EntityDesignerMode;
  formDesignerMode:FormDesignerMode;
  fieldDefinitions: FieldDefinition[];
  entityDefinitions: EntityDefinition[];
  formDefinitions: FormDefinition[];
  formControls:FormControl[];

  constructor() { 
    this.entityDefinitions = new Array<EntityDefinition>();
    this.fieldDefinitions = new Array<FieldDefinition>();
    this.formDefinitions = new Array<FormDefinition>();
    this.formControls = new Array<FormControl>();
  }

  setEntityDesignerMode(entityDesignerMode:EntityDesignerMode):void{
    this.entityDesignerMode = entityDesignerMode;
  }
  getEntityDesignerMode():EntityDesignerMode{
    return this.entityDesignerMode;
  }
  
  setFormDesignerMode(formDesignerMode:FormDesignerMode):void{
    this.formDesignerMode = formDesignerMode;
  }
  getFormDesignerMode():FormDesignerMode{
    return this.formDesignerMode;
  }

  setEntityDefinitions(entityDefinitions: EntityDefinition[]){
    this.entityDefinitions = entityDefinitions;
  }

  getEntityDefinitions():EntityDefinition[]{
    return this.entityDefinitions;
  }

  getEntityDefinition(id:number):EntityDefinition{
    let index = this.entityDefinitions.findIndex(e => e.id == id);
    if(index >= 0){
      return this.entityDefinitions[index];
    }else{
      return null;
    }
  }

  clearFields():void{    
    this.fieldDefinitions = new Array<FieldDefinition>();
  }

  addField(field: FieldDefinition):void{
    let index = this.fieldDefinitions.indexOf(field);
    if(index >= 0){
      throw "field exist"
    }else{
      this.fieldDefinitions.push(field);
    }
  }

  isFieldNameUsed(fieldName: string):boolean{
    let matchingNames = this.fieldDefinitions.filter(f => f.name == fieldName);
    return matchingNames.length > 1;
  }

  removeField(field: FieldDefinition):void{
    let index = this.fieldDefinitions.indexOf(field);
    if(index >= 0){
      this.fieldDefinitions.splice(index, 1);
    }else{
      throw "field doesnt exist"
    }
  }

  allFieldNameUnique():boolean{
    let names = Array<string>();
    this.fieldDefinitions.forEach(d => names.push(d.name));

    const distinct = (value, index, self) => {return self.indexOf(value) === index};
    let distinctNames = names.filter(distinct);
    
    return distinctNames.length == names.length;
  }  
  
  setFormDefinitions(formDefinitions: FormDefinition[]){
    this.formDefinitions = formDefinitions;
  }

  getFormDefinitions():FormDefinition[]{
    return this.formDefinitions;
  }

  addFormDefinition(formDefinition: FormDefinition):void{
    let index = this.formDefinitions.findIndex(fd => fd.id == formDefinition.id);
    if(index >= 0){
      this.formDefinitions[index] = formDefinition;
    }
  }

  removeFormDefinition(id: number):void{
    let index = this.formDefinitions.findIndex(fd => fd.id == id);
    if(index >= 0){
      this.formDefinitions.splice(index, 1);
    }
  }

  isFormNameUsed(formDefinition:FormDefinition):boolean{
    let index = this.formDefinitions.findIndex(fd => fd.formName == formDefinition.formName && fd.id != formDefinition.id);
    return index >= 0;
  }

  
  clearFormControls():void{    
    this.formControls = new Array<FormControl>();
  }

  addFormControl(formControl: FormControl):void{
    let index = this.formControls.indexOf(formControl);
    if(index >= 0){
      throw "formControl exist"
    }else{
      this.formControls.push(formControl);
    }
  }

  isFormControlNameUsed(formControlName: string):boolean{
    let matchingNames = this.formControls.filter(f => f.name == formControlName);
    return matchingNames.length > 1;
  }

  removeFormControl(formControl: FormControl):void{
    let index = this.formControls.indexOf(formControl);
    if(index >= 0){
      this.formControls.splice(index, 1);
    }else{
      throw "formControl doesnt exist"
    }
  }
  updateFormControl(formControl: FormControl):void{
    let index = this.formControls.findIndex(f => f.guid == formControl.guid);
    if(index >= 0){
      this.formControls[index] = formControl;
    }else{
      throw "formControl doesnt exist"
    }
  }

  allFormControlNameUnique():boolean{
    let names = Array<string>();
    this.formControls.forEach(d => names.push(d.name));

    const distinct = (value, index, self) => {return self.indexOf(value) === index};
    let distinctNames = names.filter(distinct);
    
    return distinctNames.length == names.length;
  }
}
