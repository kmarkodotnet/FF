import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormBaseDirective } from './form-base.directive';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';

@Directive({
  selector: '[appNonBinding]'
})
export class NonBindingDirective extends FormBaseDirective {

  @Input('appNonBinding') uiProperties: BaseProperty<any>[];
  
  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {
    super(el,renderer,propertyRenderingProviderService);
   }

   calculate():void{
    this.title();
    this.imgUrl();
   }
  title() {
    let title= this.propertyRenderingProviderService.title.renderValue(this.uiProperties);
    let label = this.renderer.createText(title);
    this.renderer.appendChild(this.el.nativeElement,label);
  }

  imgUrl(){
    let baseUrl= this.propertyRenderingProviderService.baseUrl.renderValue(this.uiProperties);
    let pictureName= this.propertyRenderingProviderService.pictureName.renderValue(this.uiProperties);
    if(this.el.nativeElement.tagName && this.el.nativeElement.tagName.toLowerCase() == "img"){
      this.el.nativeElement.src = baseUrl + pictureName;
    }
  }
}
