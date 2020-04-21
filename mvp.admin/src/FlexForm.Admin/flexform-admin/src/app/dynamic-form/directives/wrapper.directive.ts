import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBaseDirective } from './form-base.directive';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';

@Directive({
  selector: '[appWrapper]'
})
export class WrapperDirective extends FormBaseDirective {

  @Input('appWrapper') uiProperties: BaseProperty<any>[];

  
  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {
    super(el,renderer,propertyRenderingProviderService);
   }
   
   calculate():void{

   }
}
