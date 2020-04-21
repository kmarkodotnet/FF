import { Component, OnInit, ViewChild, ComponentRef, Type, Output, EventEmitter, ComponentFactoryResolver, Inject, forwardRef } from '@angular/core';
import { IPrimitiveForm } from '../../../models/interfaces/primitive-form.interface';
import { IFormHost } from '../../../models/interfaces/form-host.interface';
import { FormHostDirective } from '../../../directives/form-host.directive';
import { EntityInstance } from '../../../../models/dtos/entity-instance.model';
import { IForm } from '../../../models/interfaces/form.interface';
import { IFormController } from '../../../../dynamic-form/models/interfaces/form-controller.interface';
import { IViewDefinition } from '../../../../models/interfaces/view-definition.interface';
import { IFormView } from '../../../../dynamic-form/models/interfaces/form-view.interface';
import { IFormModel } from '../../../../dynamic-form/models/interfaces/form-model.interface';
import { EditorFormElementResolverService } from '../../../services/editor-form-element-resolver.service';
import { FormControl } from '../../../../models/dtos/form-control.model';
import { IEditorElement } from '../../../../dynamic-form/models/interfaces/editor-element.interface';
import { Host } from '../host.component';

@Component({
  selector: 'app-primitive-form-wrapper',
  templateUrl: './primitive-form-wrapper.component.html',
  styleUrls: ['./primitive-form-wrapper.component.css']
})
export class PrimitiveFormWrapperComponent<T extends IForm> extends Host implements IForm,OnInit,IFormHost,IEditorElement {
  
  wrapperText:string;
  formElementsRefs: ComponentRef<T>;
  isSelected:boolean;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();  
  clicked(event:IViewDefinition[]):void{
    event = new Array<IViewDefinition>();
    event.push(this.view.viewDefinition);
    this.selectedEvent.emit(event);
  }

  @Output() removedEvent: EventEmitter<any> = new EventEmitter();  
  removed(event:IViewDefinition[]):void{
    if(!this.isRootChild()){
      return;
    }
    event = new Array<IViewDefinition>();
    event.push(this.view.viewDefinition);
    this.removedEvent.emit(event);
  }

  constructor(@Inject(forwardRef(() => EditorFormElementResolverService)) public resolver:EditorFormElementResolverService, protected componentFactoryResolver:ComponentFactoryResolver)
  {
    super();
  }

  ngOnInit() {
  }



  view: IFormView;
  model: IFormModel;
  controller: IFormController;
  setup(view: IFormView, model: IFormModel, controller: IFormController) {
    this.view = <IFormView>view;
    this.model = <IFormModel>model;
    this.controller = <IFormController>controller;
  }
  
    getComponentFactory():any{

  }

  async render(): Promise<void>  {
    this.clear();
    let componentFactory = this.getComponentFactory();
    let viewContainerRef = this.formHost.viewContainerRef;
    let componentRef = viewContainerRef.createComponent(componentFactory);
    let wrappedForm = <IForm>componentRef.instance;
    
    //this.customRender(wrappedForm);

    await this.resolver.setupForm(<FormControl>this.view.viewDefinition,this.view.viewLevel+1,this.model.value,wrappedForm);
    // .then( async form =>
    //   {
    //     wrappedForm.setup(form.view,form.model,form.controller);
    //     //await wrappedForm.render();
    //   }
    // );
  }
  
  // customRender(form:any):void{    
  //   form.selectedEvent.subscribe(event => this.clicked(event));
  //   form.removedEvent.subscribe(event => this.removed(event));
  // }
  
  clear(): void {    
    let viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
  }

  load(entityInstance: EntityInstance): void {
    throw new Error("Method not implemented.");
  }
  
  isRootChild():boolean{
    return this.view && this.view.viewLevel == 1;
   }
}
