import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';

@Directive({
  selector: '[appFormBase]'
})
export class FormBaseDirective implements OnInit {

  @Input('appFormBase') uiProperties: BaseProperty<any>[];

  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {

  }
  
  ngOnInit() {
    this.propertyRenderingProviderService.setUiProperties(this.uiProperties);
    this.calculate();
    
  }

  protected calculate():void{
    
  }
}
