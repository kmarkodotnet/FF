import { Component, OnInit, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { BaseContainerFormComponent } from '../base-container-form.component';
import { EditorFormElementResolverService } from '../../../services/editor-form-element-resolver.service';
import { IViewDefinition } from '../../../../models/interfaces/view-definition.interface';
import { FormControl } from '../../../../models/dtos/form-control.model';
import { PrimitiveFormWrapperComponent } from '../primitive-form-wrapper/primitive-form-wrapper.component';
import { IEditorElement } from '../../../../dynamic-form/models/interfaces/editor-element.interface';
import { IsRootFormPropertyRendererService } from '../../../services/is-root-form-property-renderer.service';
import { HeaderPropertyRendererService } from '../../../services/header-property-renderer.service';
import { EntityDefinitionService } from '../../../../services/entity-definition.service';
import { TestDataService } from '../../../../services/test-data.service';


@Component({
  selector: 'app-editor-container-form',
  templateUrl: './editor-container-form.component.html',
  styleUrls: ['./editor-container-form.component.css']
})
export class EditorContainerFormComponent extends BaseContainerFormComponent<EditorFormElementResolverService> implements IEditorElement {
  setResolverItemSourceService(): void {
    this.resolver.setItemSourceService(this.itemSourceService)
  }
  
  isSelected:boolean;

  @Output() selectedEvent: EventEmitter<any> = new EventEmitter();  
  clicked(event:IViewDefinition[]):void{
    if(!event){
      event = new Array<IViewDefinition>();
    }
    event.push(this.view.holderFormControl);
    this.selectedEvent.emit(event);
  }
  
  @Output() removedEvent: EventEmitter<any> = new EventEmitter();  
  removed(event:IViewDefinition[]):void{
    if(!event){
      event = new Array<IViewDefinition>();
    }
    event.push(this.view.holderFormControl);
    this.removedEvent.emit(event);
  }

  constructor(
    protected resolver:EditorFormElementResolverService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected isRootFormPropertyRendererService:IsRootFormPropertyRendererService,
    protected headerPropertyRendererService:HeaderPropertyRendererService,
    protected entityDefinitionService:EntityDefinitionService,
    protected itemSourceService:TestDataService
    ) {
    super(resolver,componentFactoryResolver,entityDefinitionService);
   }

  customRender(form:any):void{
    if(form instanceof EditorContainerFormComponent){
      let isRootForm = this.isRootFormPropertyRendererService.renderValue(form.holderAndViewUiProperties);
      if(isRootForm){
        let title = this.headerPropertyRendererService.renderValue(form.holderAndViewUiProperties);
        //throw this.
        console.log(title);
      }
    }
    form.selectedEvent.subscribe(event => this.clicked(event));
    form.removedEvent.subscribe(event => this.removed(event));
  }

  setSelected(selectedItem:FormControl):void{
    this.formElementsRefs.forEach(e => {
      if(e.instance instanceof EditorContainerFormComponent){
        if(e.instance.view.holderFormControl === selectedItem){
          e.instance.isSelected = true;
        }else{
          e.instance.isSelected = false;
        }
      }else if(e.instance instanceof PrimitiveFormWrapperComponent){
        if(e.instance.view.viewDefinition === selectedItem){
          e.instance.isSelected = true;
        }else{
          e.instance.isSelected = false;
        }
      }
    });
  }

   isRootChild():boolean{
    return this.view && this.view.viewLevel == 1;
   }
}
