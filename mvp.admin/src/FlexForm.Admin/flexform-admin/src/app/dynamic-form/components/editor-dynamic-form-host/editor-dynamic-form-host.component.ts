import { Component, OnInit, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { BaseDynamicFormHostComponent } from '../base-dynamic-form-host.component';
import { EditorContainerFormComponent } from '../forms/editor-container-form/editor-container-form.component';
import { ContainerFormModel } from '../../models/container-form.model';
import { ContainerFormView } from '../../models/container-form.view';
import { FormControl, FormDefinition, EntityInstance } from '../../../models/dtos';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';
import { EntityDefinitionService } from '../../../services/entity-definition.service';
import { ContainerFormController } from '../../models/container-form.controller';

@Component({
  selector: 'app-editor-dynamic-form-host',
  templateUrl: './editor-dynamic-form-host.component.html',
  styleUrls: ['./editor-dynamic-form-host.component.css']
})
export class EditorDynamicFormHostComponent extends BaseDynamicFormHostComponent {
  containerForm: EditorContainerFormComponent;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();  
  clicked(event:IViewDefinition[]):void{
    let element = null;
    if(event.length==1){
      element = event[0];
    }else if(event.length>1){
      element = event[event.length-2]      
    } 
    if(element){
      this.selectedEvent.emit(element);   
    }
  }  
  
  @Output() removedEvent: EventEmitter<any> = new EventEmitter();  
  removed(event:IViewDefinition[]):void{    
    let element = null;
    if(event.length==1){
      element = event[0];
    }else if(event.length>1){
      element = event[event.length-2]      
    } 
    if(element){
      this.removedEvent.emit(element);   
    }  
  }  
  
  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected entityDefinitionService:EntityDefinitionService) {
    super(componentFactoryResolver);
  }

  setSelected(selectedItem:FormControl):void{
    this.containerForm.setSelected(selectedItem);
  }

  async render(formDefinition: FormDefinition,entityInstance: EntityInstance): Promise<void>
  {
    this.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(EditorContainerFormComponent);
    let viewContainerRef = this.formHost.viewContainerRef;
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.containerForm = <EditorContainerFormComponent>this.componentRef.instance;
    
    await this.entityDefinitionService.get(formDefinition.entityDefinitionId).then(async entityDefinition =>
      {    
        this.containerForm.model = new ContainerFormModel(entityDefinition,entityInstance,this.containerForm);
        this.containerForm.view = new ContainerFormView(formDefinition,null,0,this.containerForm);
        this.containerForm.controller = new ContainerFormController(this.containerForm);
       
        this.containerForm.selectedEvent.subscribe(event => this.clicked(event));
        this.containerForm.removedEvent.subscribe(event => this.removed(event));
    
        await this.containerForm.render();
        return Promise.resolve();
      }
    );    
 }
}
