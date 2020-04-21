import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, Type, Input, EventEmitter, Output } from '@angular/core';
import { FormHostDirective } from './../directives/form-host.directive';
import { IDynamicFormEngine } from './../models/interfaces/dynamic-form-engine.interface';
import { FormDefinition, EntityDefinition, EntityInstance } from './../../models/dtos';
import { IForm } from './../models/interfaces/form.interface';
import { ContainerFormComponent } from './forms/container-form/container-form.component';
import { IContainerForm } from './../models/interfaces/container-form.interface';
import { ContainerFormView } from './../models/container-form.view';
import { IViewDefinition } from './../../models/interfaces/view-definition.interface';

export abstract class BaseDynamicFormHostComponent implements OnInit, IDynamicFormEngine {

  @ViewChild(FormHostDirective) formHost: FormHostDirective;
  componentRef:ComponentRef<any>;
  
  get componentInstance():IForm{
    return <IForm>this.componentRef.instance;
  }
  
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  ngOnInit() {
  }

  abstract render(formDefinition: FormDefinition,entityInstance: EntityInstance): Promise<void>;
  
  isValid(): boolean {
    return this.componentInstance.controller.isValid();
  }
  save(): void {
    let saveModel = this.componentInstance.controller.save();
  }
  done(): void {
    let saveModel = this.componentInstance.controller.done();
  }
  cancel(): void {
    this.componentInstance.controller.cancel();
  }

  clear(): void {
    let viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
  }
}
