import { Component, OnInit, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { EntityDefinition } from '../../models/dtos/entity-definition';
import { EntityDefinitionService } from '../../services/entity-definition.service';
import { EntityInstanceService } from '../../services/entity-instance.service';
import { EntityInstance } from '../../models/dtos/entity-instance';
import { FormDefinition } from '../../models/dtos/form-definition';
import { FormDefinitionService } from '../../services/form-definition.service';
import { IForm } from '../../models/form.interface';
import { FormHostDirective } from '../../form-host.directive';
import { DynamicFormBindingModel } from '../../models/dynamic-form-binding.model';
import { FormComponent } from '../basicComponents/form/form.component';
import { FormModel } from '../../models/basicModels/form.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {

  entityDefinitions: EntityDefinition[];
  selectedEntityDefinition: EntityDefinition;

  entityInstances: EntityInstance[];
  selectedEntityInstance: EntityInstance;
  
  formDefinitions: FormDefinition[];
  selectedFormDefinition: FormDefinition;
  
  @ViewChild(FormHostDirective) formHost: FormHostDirective;
  rootComponentRef:ComponentRef<FormComponent>;

  newClicked:boolean;

  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityInstanceService: EntityInstanceService,
    private formDefinitionService: FormDefinitionService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.newClicked = false;
  }

  ngOnInit() {
    this.entityDefinitions = this.entityDefinitionService.listEntityDefinitions();
  }
  
  onSelectEntityDefinition(entityDefinition: EntityDefinition): void {
    this.selectedEntityDefinition = entityDefinition;
    this.entityInstances = this.entityInstanceService.listEntityInstances(this.selectedEntityDefinition.name);  
    
    this.clearDynamicForm();
    this.newClicked = false;
    this.selectedEntityInstance = null;
    this.selectedFormDefinition = null;
  }

  onSelectEntityInstance(entityInstance: EntityInstance):void{
    this.selectedEntityInstance = entityInstance;
    this.newClicked = false;
        
    this.loadFormDefinitions();
  }

  loadFormDefinitions():void{
    this.formDefinitions = this.formDefinitionService.listFormDefinitions(this.selectedEntityDefinition.name);
    this.clearDynamicForm();
    this.selectedFormDefinition = null;
  }
  
  getEntityInstanceJSON(entityInstance: EntityInstance): string{
    return JSON.stringify(entityInstance);
  }

  onSelectFormDefinition(formDefinition: FormDefinition): void {
    this.clearDynamicForm();

    this.selectedFormDefinition = formDefinition;

    this.renderRoot();
  }

  renderRoot():void{
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormComponent);
    let viewContainerRef = this.formHost.viewContainerRef;
    this.rootComponentRef = viewContainerRef.createComponent(componentFactory);
    (<IForm>this.rootComponentRef.instance).model = new DynamicFormBindingModel(null,new FormModel(this.selectedEntityInstance,this.selectedFormDefinition));
    (<FormComponent>this.rootComponentRef.instance).loadComponent();
  }

  clearDynamicForm():void{
    if(this.selectedFormDefinition != null){
      let viewContainerRef = this.formHost.viewContainerRef;
      viewContainerRef.clear();
    }
  }

  isValid():boolean{
    return (<FormComponent>this.rootComponentRef.instance).isValid();;
  }

  onSaveClicked():void{
    if(this.isValid()){
      let model = (<FormComponent>this.rootComponentRef.instance).save();
      let newElement = this.entityInstanceService.saveEntityInstance(model.entityInstance);
      this.entityInstances = this.entityInstanceService.listEntityInstances(this.selectedEntityDefinition.name);
      this.selectedEntityInstance = newElement;
          
      this.saveOrCancelClicked();
    }
  }

  cancel():void{
    (<FormComponent>this.rootComponentRef.instance).cancel();
  }

  onCancelClicked():void{
    this.cancel();
    this.saveOrCancelClicked();    
  }

  saveOrCancelClicked():void{
    this.clearDynamicForm();
    this.newClicked = false;
    this.selectedFormDefinition = null;
  }

  onNewClicked():void{
    if(this.rootComponentRef){
      this.cancel();
    }
    this.newClicked = true;
    this.selectedEntityInstance = this.entityInstanceService.getNewEntityInstance(this.selectedEntityDefinition.name);
    this.loadFormDefinitions();
  }  
}
