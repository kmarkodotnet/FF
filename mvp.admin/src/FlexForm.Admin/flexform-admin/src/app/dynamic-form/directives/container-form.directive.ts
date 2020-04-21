import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormBaseDirective } from './form-base.directive';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';

@Directive({
  selector: '[appContainerForm]'
})
export class ContainerFormDirective extends FormBaseDirective {

  @Input('appContainerForm') uiProperties: BaseProperty<any>[];
  
  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {
    super(el,renderer,propertyRenderingProviderService);
   }

   calculate():void{
    this.form();
   }

   form():void{
    let isRootForm= this.propertyRenderingProviderService.isRootForm.renderValue(this.uiProperties);
    if(isRootForm){
      let rootFormSave= this.propertyRenderingProviderService.rootFormSave.renderValue(this.uiProperties);
      let saveButton = this.renderer.createElement("button");
      let saveText = this.renderer.createText(rootFormSave);
      this.renderer.addClass(saveButton,"btn")
      this.renderer.addClass(saveButton,"btn-light")
      this.renderer.appendChild(saveButton, saveText);
      this.renderer.appendChild(this.el.nativeElement,saveButton);

      let rootFormCancel= this.propertyRenderingProviderService.rootFormCancel.renderValue(this.uiProperties);
      let cancelButton = this.renderer.createElement("button");
      let cancelText = this.renderer.createText(rootFormCancel); 
      this.renderer.addClass(cancelButton,"btn")
      this.renderer.addClass(cancelButton,"btn-light")
      this.renderer.appendChild(cancelButton, cancelText);
      this.renderer.appendChild(this.el.nativeElement,cancelButton);
    }    
   }
}
