import { Injectable, EventEmitter } from '@angular/core';
import { FieldDefinition, EntityDefinition, ItemSourceDefinition, FormDefinition, FormControl } from '../models/dtos';
import { ConstantsService } from './constants.service';
import { EntityDesignerMode, FormDesignerMode, FieldType, DisplayType, FormType, NonBinding, AgGridPropertyType } from '../models/enums';
import { DynamicService } from './dynamic.service';
import { Guid } from 'guid-typescript';
import { NonBindingUiField } from '../models/ui/non-binding-ui-field.model';
import { FormControlBinding } from '../models/dtos/form-control-binding.model';
import { PropertiesService } from './properties.service';
import { BaseProperty, StringProperty, BooleanProperty, NumberProperty, DropDownListProperty, DropDownElement, ConstantProperty } from '../models/properties';
import { FormDefinitionService } from './form-definition.service';
import { ComplexUiField } from '../models/ui';
import { EntityEditorUiField } from '../models/ui/entity-editor-ui-field.model';
import { FormDefinitionPropertiesService } from './element-properties/form-definition-properties.service';
import { FormControlBindingPropertiesService } from './element-properties/form-control-properties/form-control-binding-properties.service';
import { PropertiesServiceFactory } from './properties-factory.service';
import { PropertyHandlerFactoryService } from './property-handler-factory.service';
import { EntityDefinitionService } from './entity-definition.service';
import { FormControlItemSource } from '../models/dtos/form-control-item-source.model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  
  constructor(private constantsService: ConstantsService, 
    private dynamicService:DynamicService, 
    private propertiesService:PropertiesService, 
    private entityDefinitionService: EntityDefinitionService,
    private formDefinitionService: FormDefinitionService,
    private formDefinitionPropertiesService:FormDefinitionPropertiesService,
    private formControlPropertiesService:FormControlBindingPropertiesService,
    private propertiesServiceFactory:PropertiesServiceFactory,
    private propertyHandlerFactoryService: PropertyHandlerFactoryService) { }

  async createFormControlFromFieldDefinition(data: FieldDefinition, index: number):Promise<FormControl> {
    let formControl = new FormControl();
    formControl.name = data.name + index;
    let defaultDisplayType = this.constantsService.getDefaultDisplayType(data.fieldType);
    formControl.displayType = defaultDisplayType;
    formControl.formControlBinding = this.createFormControlBindingFromFieldDefinition(data);    
    
    let formControlPropertiesService = this.propertiesServiceFactory.getFormControlServiceOfDisplayType(formControl.displayType);
    await formControlPropertiesService.createProperties(formControl).then(ui =>{
      formControl.uiProperties = ui;
      this.propertyHandlerFactoryService.getPropertyHandlerService(formControl).convertUiProperties(formControl);
      //formControl.subFormDefinitionId = 
    });
    return Promise.resolve(formControl);
  }

  createFormControlBindingFromFieldDefinition(data: FieldDefinition):FormControlBinding{
    let formControlBinding = new FormControlBinding();
    formControlBinding.fieldDefinitionId = data.id;
    formControlBinding.isInvalidStateEnabled = false;
    formControlBinding.isReadOnly = false;
    formControlBinding.uiProperties = new Array<BaseProperty<any>>();
    formControlBinding.fieldDefinition = data;
    return formControlBinding;
  }

  async createFormControlFromNonBindingUiField(data:NonBindingUiField, index: number) :Promise<FormControl>{
    let formControl = new FormControl();
    formControl.name = data.name+ index;;
    let displayType = this.convertNonBindingIntoDisplayType(data.type);
    formControl.displayType = displayType;
    let formControlPropertiesService = this.propertiesServiceFactory.getFormControlServiceOfDisplayType(formControl.displayType);
    await formControlPropertiesService.createProperties(formControl).then(ui =>{
      formControl.uiProperties = ui;
    });
    return Promise.resolve(formControl);
  }

  convertNonBindingIntoDisplayType(nonBinding:NonBinding):DisplayType{
    switch(nonBinding){
      case NonBinding.Breadcrumb: return DisplayType.Breadcrumb;
      case NonBinding.Button: return DisplayType.Button;
      case NonBinding.Icon: return DisplayType.Icon;
      case NonBinding.Label: return DisplayType.Label;
      case NonBinding.Link: return DisplayType.Link;
      case NonBinding.Panel: return DisplayType.Panel;
    }
  }
  convertDisplayTypeIntoNonBinding(nonBinding:DisplayType):NonBinding{
    switch(nonBinding){
      case DisplayType.Breadcrumb: return NonBinding.Breadcrumb;
      case DisplayType.Button: return NonBinding.Button;
      case DisplayType.Icon: return NonBinding.Icon;
      case DisplayType.Label: return NonBinding.Label;
      case DisplayType.Link: return NonBinding.Link;
      case DisplayType.Panel: return NonBinding.Panel;
    }
  }

  createFormDefinitionFromEntityDefinition(entityDefinition: EntityDefinition): Promise<FormDefinition> {
    let formDefinition = new FormDefinition();
    formDefinition.formControls = new Array<FormControl>();
    formDefinition.title = entityDefinition.name;
    formDefinition.description = entityDefinition.name;
    formDefinition.formName = entityDefinition.name;
    formDefinition.entityDefinition = entityDefinition;
    formDefinition.entityDefinitionId = entityDefinition.id;
    formDefinition.formType = FormType.Edit;
    formDefinition.isInvalidStateEnabled = false;
    formDefinition.uiProperties = new Array<BaseProperty<any>>()
    return this.propertiesService.getFormDefinitionProperties(formDefinition).then(ui =>{
      formDefinition.uiProperties = ui;
      return formDefinition;
    });
    
  }

  async createFieldDefinition(data: EntityEditorUiField,index:number):Promise<FieldDefinition>{
    let fieldDefinition = new FieldDefinition();
    fieldDefinition.fieldType = data.fieldType;
    fieldDefinition.name = data.name + index;
    fieldDefinition.fieldType = data.fieldType;
    fieldDefinition.color = data.color;
    if(data instanceof ComplexUiField){
      fieldDefinition.itemSourceDefinition = new ItemSourceDefinition();
      fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId = (<ComplexUiField>data).id;
      //fieldDefinition.uiItemSourceEntityDefinitionId = (<ComplexUiField>data).id;
    }
    let fieldDefinitionService = this.propertiesServiceFactory.getFieldDefinitionServiceOfFieldType(fieldDefinition.fieldType);
    await fieldDefinitionService.createProperties(fieldDefinition).then(ui =>{
      fieldDefinition.properties = ui;
    });
    return fieldDefinition;
    // return this.propertiesService.getFieldDefinitionProperties(fieldDefinition).then(ui =>{
    //   fieldDefinition.properties = ui;
    //   return fieldDefinition;
    // });
    //return fieldDefinition;
  }
  
  async loadFormDefinition(response: any): Promise<FormDefinition> {
    if(!response){
      return null;
    }
    this.dynamicService.clearFormControls();
    let formDefinition = new FormDefinition();
    if(this.dynamicService.getFormDesignerMode() != FormDesignerMode.Clone){
      formDefinition.id = response.id;
      formDefinition.timestamp = response.timestamp;
    }
    formDefinition.entityDefinitionId = response.entityDefinitionId;
    formDefinition.formName = response.formName;
    formDefinition.title = response.title;
    formDefinition.description = response.description;
    formDefinition.formType = response.formType;
    formDefinition.isInvalidStateEnabled = response.isInvalidStateEnabled;    
    formDefinition.uiProperties = new Array<BaseProperty<any>>();

    await this.formDefinitionPropertiesService.loadProperties(formDefinition,response.uiProperties);

    formDefinition.entityDefinition = await this.loadEntityDefinition(response.entityDefinition);
    formDefinition.formControls = new Array<FormControl>();
    
    await this.readFormControlsAsync(response,formDefinition);

    return Promise.resolve(formDefinition);
  }

  reloadFormDefinition(formDefinition: FormDefinition): Promise<FormDefinition> {
    if(!formDefinition){
      return null;
    }
    this.propertyHandlerFactoryService.getPropertyHandlerService(formDefinition).convertUiProperties(formDefinition);
    return this.formDefinitionPropertiesService.loadProperties(formDefinition,formDefinition.uiProperties).then(()=>{
      return formDefinition
    });
  }

async readFormControlsAsync(response,formDefinition):Promise<void>{
  for (const formControl of response.formControls) {
    const fc= await this.loadFormControl(formControl,formDefinition.entityDefinition);
    this.dynamicService.addFormControl(fc);
    formDefinition.formControls.push(fc);
  }
}

  loadUiProperty(property: BaseProperty<any>): BaseProperty<any> {
    switch(property.type){
      case AgGridPropertyType.Constant: return new ConstantProperty(property.guid,property.name,property.value,"");
      case AgGridPropertyType.Text: return new StringProperty(property.guid,property.name,property.value,property.emitIfChanged,property.isImmediateBind);
      case AgGridPropertyType.CheckBox: return new BooleanProperty(property.guid,property.name,property.value,property.emitIfChanged,property.isImmediateBind);
      case AgGridPropertyType.Number: return new NumberProperty(property.guid,property.name,property.value,property.emitIfChanged,property.isImmediateBind);
      case AgGridPropertyType.DropDown: 
        let elements = new Array<DropDownElement>();
        if((<DropDownListProperty>property) && (<DropDownListProperty>property).elements)
        {
          (<DropDownListProperty>property).elements.forEach(e => elements.push(new DropDownElement(e.id,e.name)));
        }
        return new DropDownListProperty(property.guid,property.name,property.value,property.emitIfChanged,property.isImmediateBind,elements);
    }
  }

  async loadFormControl(response: any, entityDefinition:EntityDefinition): Promise<FormControl> {
    if(!response){
      return null;
    }
    let formControl = new FormControl();    
    if(response.guid){
      formControl.guid = response.guid;
    }
    if(this.dynamicService.getFormDesignerMode() != FormDesignerMode.Clone){
      formControl.id = response.id;
      formControl.timestamp = response.timestamp;
    }
    formControl.formDefinitionId = response.formDefinitionId;
    formControl.name = response.name;
    formControl.displayType = response.displayType;
    formControl.formControlItemSourceId = response.formControlItemSourceId;
    formControl.subFormDefinitionId = response.subFormDefinitionId;

    if(response.itemSourceDefinition)
    {
      formControl.formControlItemSource = this.loadFormControlItemSource(response.formControlItemSource);
    }
    if(response.formControlBinding && entityDefinition)
    {
      formControl.formControlBinding = await this.loadFormControlBinding(response.formControlBinding, entityDefinition); 
    }
    formControl.uiProperties = new Array<BaseProperty<any>>();
    response.uiProperties.forEach(p =>{
      formControl.uiProperties.push(this.loadUiProperty(p));
    });
    let formControlPropertiesService = this.propertiesServiceFactory.getFormControlServiceOfDisplayType(formControl.displayType);
    return formControlPropertiesService.loadProperties(formControl,formControl.uiProperties).then(()=>{
      return formControl;
    });
  }

  reloadFormControl(formControl: FormControl): Promise<FormControl> {
    if(!formControl){
      return null;
    }
    this.propertyHandlerFactoryService.getPropertyHandlerService(formControl).convertUiProperties(formControl);
    let formControlPropertiesService = this.propertiesServiceFactory.getFormControlServiceOfDisplayType(formControl.displayType);
    return formControlPropertiesService.loadProperties(formControl,formControl.uiProperties).then(()=>{
      return formControl
    });
  }
  
  loadFormControlItemSource(response:any):FormControlItemSource {
    if(!response){
      return null;
    }
    let isd = new FormControlItemSource();    
    if(this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.Clone){
      isd.id = response.id;
      isd.timestamp = response.timestamp;
    }
    isd.includeProperties = response.includeProperties;
    isd.itemSourceCondition = response.itemSourceCondition;
    isd.itemSourceOrder = response.itemSourceOrder;
    isd.pageSize = response.pageSize;
    
    return isd;
  }

  async loadFormControlBinding(response: any, entityDefinition:EntityDefinition):Promise<FormControlBinding> {
    if(!response){
      return null;
    }
    let formControlBinding = new FormControlBinding();
    if(this.dynamicService.getFormDesignerMode() != FormDesignerMode.Clone){
      formControlBinding.id = response.id;
      formControlBinding.timestamp = response.timestamp;
    }
    formControlBinding.fieldDefinitionId = response.fieldDefinitionId;
    formControlBinding.isReadOnly = response.isReadOnly;
    formControlBinding.isInvalidStateEnabled = response.isInvalidStateEnabled;
    formControlBinding.uiProperties = new Array<BaseProperty<any>>();
    response.uiProperties.forEach(p =>{
      formControlBinding.uiProperties.push(this.loadUiProperty(p));
    });

    if(response.fieldDefinition){
      formControlBinding.fieldDefinition = await this.loadFieldDefinition(response.fieldDefinition);
    }else{
      formControlBinding.fieldDefinition = entityDefinition.fieldDefinitions.find(d => d.id == formControlBinding.fieldDefinitionId);
    }
    
    return Promise.resolve(formControlBinding);
  }

  async loadEntityDefinition(response:any):Promise<EntityDefinition> {
    if(!response){
      return null;
    }
    this.dynamicService.clearFields();
    let entityDefinition = new EntityDefinition();
    if(this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.Clone){
      entityDefinition.id = response.id;
      entityDefinition.timestamp = response.timestamp;
    }
    entityDefinition.name = response.name;
    let fds = response.fieldDefinitions;
    entityDefinition.fieldDefinitions = new Array<FieldDefinition>();
    let that = this;

    await this.readFieldDefinitionsAsync(fds,entityDefinition);
    return Promise.resolve(entityDefinition);
  }

  async readFieldDefinitionsAsync(response,entityDefinition):Promise<void>{
    for (const fieldDefinition of response) {
      const fc= await this.loadFieldDefinition(fieldDefinition);
      this.dynamicService.addField(fc);
      entityDefinition.fieldDefinitions.push(fc);
    }
  }

  loadFieldDefinition(response:any):Promise<FieldDefinition> {
    if(!response){
      return null;
    }
    let fieldDefinition = new FieldDefinition();
    if(this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.Clone){
      fieldDefinition.id = response.id;
      fieldDefinition.entityDefinitionId = response.entityDefinitionId;
      fieldDefinition.timestamp = response.timestamp;
    }
    fieldDefinition.name = response.name;
    fieldDefinition.fieldType = response.fieldType;
    fieldDefinition.guid = Guid.create();
    fieldDefinition.color = this.constantsService.getFieldTypeColor(response.fieldType);
    //fieldDefinition.typeChangedEvent = new EventEmitter();
    if(response.itemSourceDefinition){
      fieldDefinition.itemSourceDefinitionId = response.itemSourceDefinitionId;
      fieldDefinition.itemSourceDefinition = this.loadItemSourceDefinition(response.itemSourceDefinition);
      fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId = response.itemSourceDefinition.itemSourceEntityDefinitionId;
    }
    let fieldDefinitionService = this.propertiesServiceFactory.getFieldDefinitionServiceOfFieldType(fieldDefinition.fieldType);
    return fieldDefinitionService.createProperties(fieldDefinition).then(ui =>{
      fieldDefinition.properties = ui;
      return fieldDefinition;
    });
    // return this.propertiesService.getFieldDefinitionProperties(fieldDefinition).then(ui =>{
    //   fieldDefinition.properties = ui;
    //   return fieldDefinition;
    // });
    // fieldDefinition.properties = this.propertiesService.getFieldDefinitionProperties(response);
    // return fieldDefinition;
  }

  loadItemSourceDefinition(response:any):ItemSourceDefinition {
    if(!response){
      return null;
    }
    let isd = new ItemSourceDefinition();    
    if(this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.Clone){
      isd.id = response.id;
      isd.timestamp = response.timestamp;
    }
    isd.includeProperties = response.includeProperties;
    isd.isSingleResult = response.isSingleResult;
    isd.itemSourceCondition = response.itemSourceCondition;
    isd.itemSourceDefaultOrder = response.itemSourceDefaultOrder;
    isd.itemSourceEntityDefinitionId = response.itemSourceEntityDefinitionId;
    isd.name = response.name;
    isd.pageSize = response.pageSize;
    return isd;
  }

  public getDesignType(data:FieldDefinition):string{
    if(this.constantsService.isSimpleFieldType(data.fieldType)){
      return this.constantsService.getFieldTypeName(data.fieldType);
    }else if (this.constantsService.isComplexFieldType(data.fieldType)){
      let uiItemSourceEntityDefinitionName = "";
      if(data.itemSourceDefinition){
        let uiItemSourceEntityDefinition = this.dynamicService.getEntityDefinition(data.itemSourceDefinition.itemSourceEntityDefinitionId);
        if(uiItemSourceEntityDefinition){
          uiItemSourceEntityDefinitionName = uiItemSourceEntityDefinition.name;
        }
      }
      switch(data.fieldType){        
        case FieldType.EntityReference:
          return "<"+uiItemSourceEntityDefinitionName+">";
        case FieldType.EntityCollection:
          return "<"+uiItemSourceEntityDefinitionName+">[]";
        case FieldType.Collection:
          return "("+uiItemSourceEntityDefinitionName+")[]";
        case FieldType.Association:
            return "{"+uiItemSourceEntityDefinitionName+"}";
      }
    }
  }

  public getDesignName(data:FieldDefinition):string{
    return data.name;
  }

}
