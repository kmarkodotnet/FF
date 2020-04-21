import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { IFormController } from './../../models/interfaces/form-controller.interface';
import { IFormView } from './../..//models/interfaces/form-view.interface';
import { IFormModel } from './../..//models/interfaces/form-model.interface';
import { IContainerForm } from './../..//models/interfaces/container-form.interface';
import { FormHostDirective } from './../../directives/form-host.directive';
import { IForm } from './../../models/interfaces/form.interface';
import { FormControl, FieldDefinition, EntityInstance, FormDefinition, EntityDefinition } from './../../../models/dtos';
import { FieldValue } from './../../../models/dtos/field-value.model';
import { IFormHost } from './../../models/interfaces/form-host.interface';
import { IViewDefinition } from './../../../models/interfaces/view-definition.interface';
import { IClassDefinition  } from './../../../models/interfaces/class-definition.interface';
import { IValue } from './../../../models/interfaces/value.interface';
import { ContainerFormView } from './../../models/container-form.view';
import { ContainerFormModel } from './../../models/container-form.model';
import { ContainerFormController } from './../../models/container-form.controller';
import { IFormElementResolver } from '../../models/interfaces/form-element-resolver.interface';
import { BaseProperty } from '../../../models/properties/base-property.model';
import { Host } from './host.component';
import { EntityDefinitionService } from '../../../services/entity-definition.service';

export abstract class BaseContainerFormComponent<T extends IFormElementResolver> extends Host implements OnInit, IContainerForm {

  formElementsRefs: ComponentRef<IForm>[];

  constructor(protected resolver:T,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected entityDefinitionService:EntityDefinitionService
    )
  {
    super();
  }

  ngOnInit() {
  }

  setup(view: IFormView, model: IFormModel, controller: IFormController) {
    this.view = <ContainerFormView>view;
    this.model = <ContainerFormModel>model;
    this.controller = <ContainerFormController>controller;
  }

  async render(): Promise<void> {
    this.clear();
    this.formElementsRefs = new Array<ComponentRef<IForm>>();
    if(!this.view.viewDefinition || !this.view.viewDefinition.formControls){
      return Promise.resolve();
    }
    let entityDefinition = await this.entityDefinitionService.get(this.view.viewDefinition.entityDefinitionId);
    this.model.classDefinition = entityDefinition;
    await this.view.viewDefinition.formControls.forEach(
      async formControl =>
      {
        let instanceData = null;
        if(formControl.formControlBinding){
          formControl.formControlBinding.fieldDefinition  = entityDefinition.fieldDefinitions.find(fd => fd.id == formControl.formControlBinding.fieldDefinitionId);
          instanceData = this.model.value[formControl.formControlBinding.fieldDefinition.name];
        }
        
        this.setResolverItemSourceService();
        let form = this.resolver.resolveType(formControl);
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(form);
        let viewContainerRef = this.formHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.formElementsRefs.push(componentRef);
        await this.resolver.setupForm(formControl,this.view.viewLevel+1,instanceData,componentRef.instance).then( async () =>
          {  
            this.customRender(componentRef.instance);
            if(componentRef.instance instanceof Host){
              await (componentRef.instance as Host).render();
            }  
          }
        );        
      }
    );

  }

  abstract setResolverItemSourceService():void;

  abstract customRender(form:any):void;

  load(entityInstance: EntityInstance): void {
    throw new Error("Method not implemented.");
  }

  clear(): void {    
    let viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
  }

  get title(): string {
    if(this.model && this.view.viewDefinition)
    {
      return this.view.viewDefinition.title;
    }
    return "";
  }
  
  view: ContainerFormView;  
  get viewUiProperties():BaseProperty<any>[]{
    if(this.view && this.view.viewDefinition){
      return this.view.viewDefinition.uiProperties;
    }
    return null;
  }
  get holderUiProperties():BaseProperty<any>[]{
    if(this.view && this.view.holderFormControl){
      return this.view.holderFormControl.uiProperties;
    }
    return null;
  }
  get holderAndViewUiProperties():BaseProperty<any>[]{
    let merged = new Array<BaseProperty<any>>();
    if(this.view && this.view.holderFormControl){
      this.view.holderFormControl.uiProperties.forEach(u => merged.push(u));
    }if(this.view && this.view.viewDefinition){
      this.view.viewDefinition.uiProperties.forEach(u => merged.push(u));
    }
    return merged;
  }
  model: ContainerFormModel;
  controller: ContainerFormController;


  
  isValid():boolean{
    let isValid = true;
    this.formElementsRefs.forEach(formElementRef =>{
      isValid = isValid && formElementRef.instance.controller.isValid();
    });
    return isValid;
  }

  public save():IFormModel{
    this.formElementsRefs.forEach(r =>{
      let elementSaveResult = r.instance.controller.save();

      // let name = elementSaveResult.classDefinition.name;
      // let value = elementSaveResult.value;

      // this.model.value.fieldValues[name] = value;
      
    });
    return this.model;
  }
}
