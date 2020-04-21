import { Component, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { IFormController } from '../../../models/interfaces/form-controller.interface';
import { IFormView } from '../../..//models/interfaces/form-view.interface';
import { IFormModel } from '../../..//models/interfaces/form-model.interface';
import { IContainerForm } from '../../..//models/interfaces/container-form.interface';
import { FormHostDirective } from '../../../directives/form-host.directive';
import { IForm } from '../../..//models/interfaces/form.interface';
import { FormControl, FieldDefinition, EntityInstance, FormDefinition, EntityDefinition } from '../../../../models/dtos';
import { FieldValue } from '../../../../models/dtos/field-value.model';
import { IFormHost } from '../../../models/interfaces/form-host.interface';
import { FormElementResolverService } from '../../../services/form-element-resolver.service';
import { IViewDefinition } from '../../../../models/interfaces/view-definition.interface';
import { IClassDefinition  } from '../../../../models/interfaces/class-definition.interface';
import { IValue } from '../../../../models/interfaces/value.interface';
import { ContainerFormView } from '../../../models/container-form.view';
import { ContainerFormModel } from '../../../models/container-form.model';
import { ContainerFormController } from '../../../models/container-form.controller';
import { BaseContainerFormComponent } from '../base-container-form.component';
import { EntityDefinitionService } from '../../../../services/entity-definition.service';
import { TestDataService } from '../../../../services/test-data.service';

@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.css']
})
export class ContainerFormComponent extends BaseContainerFormComponent<FormElementResolverService>{
  setResolverItemSourceService(): void {
    this.resolver.setItemSourceService(this.itemSourceService)
  }
  constructor(protected resolver:FormElementResolverService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected entityDefinitionService:EntityDefinitionService,
    protected itemSourceService:TestDataService
    ) {
    super(resolver,componentFactoryResolver,entityDefinitionService);
   }

   customRender(form:any):void{  }
}
