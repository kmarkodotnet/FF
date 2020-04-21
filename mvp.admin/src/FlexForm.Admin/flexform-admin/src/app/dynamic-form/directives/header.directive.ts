import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormBaseDirective } from './form-base.directive';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';

@Directive({
  selector: '[appHeader]'
})
export class HeaderDirective extends FormBaseDirective {

  @Input('appHeader') uiProperties: BaseProperty<any>[];
  
  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {
    super(el,renderer,propertyRenderingProviderService);
   }

   calculate():void{
    this.renderTitle();
   }

   renderTitle():void{
    let visible = this.propertyRenderingProviderService.formNameVisible.renderValue(this.uiProperties);
    if(visible){
      let title= this.propertyRenderingProviderService.title.renderValue(this.uiProperties);
      let label = this.renderer.createText(title);
      this.renderer.appendChild(this.el.nativeElement,label);
    }
   }
}
