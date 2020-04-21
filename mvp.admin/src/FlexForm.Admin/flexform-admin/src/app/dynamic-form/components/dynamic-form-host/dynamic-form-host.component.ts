import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, Type, Input, EventEmitter, Output } from '@angular/core';
import { FormHostDirective } from '../../directives/form-host.directive';
import { IDynamicFormEngine } from '../../models/interfaces/dynamic-form-engine.interface';
import { FormDefinition, EntityDefinition, EntityInstance } from '../../../models/dtos';
import { IForm } from '../../models/interfaces/form.interface';
import { ContainerFormComponent } from '../forms/container-form/container-form.component';
import { ContainerFormModel } from '../../models/container-form.model';
import { IContainerForm } from '../../models/interfaces/container-form.interface';
import { ContainerFormView } from '../../models/container-form.view';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';
import { BaseDynamicFormHostComponent } from '../base-dynamic-form-host.component';
import { EntityDefinitionService } from '../../../services/entity-definition.service';
import { ContainerFormController } from '../../models/container-form.controller';

@Component({
  selector: 'app-dynamic-form-host',
  templateUrl: './dynamic-form-host.component.html',
  styleUrls: ['./dynamic-form-host.component.css']
})
export class DynamicFormHostComponent extends BaseDynamicFormHostComponent
{
  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
    protected entityDefinitionService:EntityDefinitionService) {
    super(componentFactoryResolver);
  }
  
  async render(formDefinition: FormDefinition,entityInstance: EntityInstance): Promise<void>{
    this.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContainerFormComponent);
    let viewContainerRef = this.formHost.viewContainerRef;
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    let containerForm = <ContainerFormComponent>this.componentRef.instance;
    await this.entityDefinitionService.get(formDefinition.entityDefinitionId).then(async entityDefinition =>
      {
        containerForm.model = new ContainerFormModel(entityDefinition,entityInstance,containerForm);
        containerForm.view = new ContainerFormView(formDefinition,null,0,containerForm);
        containerForm.controller = new ContainerFormController(containerForm);
        await containerForm.render();
        return Promise.resolve();
      }
    );    
  }
}
