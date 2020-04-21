import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormBaseDirective } from './form-base.directive';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';
import { HorizontalAlignment } from '../../models/enums/horizontal-alignment.enum';

@Directive({
  selector: '[appLabel]'
})
export class LabelDirective extends FormBaseDirective {
  
  @Input('appLabel') uiProperties: BaseProperty<any>[];
  
  
  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {
    super(el,renderer,propertyRenderingProviderService);
   }
   
   calculate():void{
    this.renderLabelText();
    this.renderLabelPosition();
   }

   renderLabelText():void{
    let labelText= this.propertyRenderingProviderService.labelText.renderValue(this.uiProperties);
    // let div = this.renderer.createElement("div");
    // let label = this.renderer.createText(labelText);
    // this.renderer.appendChild(div, label);
    // this.renderer.appendChild(this.el.nativeElement,div);
    let label = this.renderer.createText(labelText);
    this.renderer.appendChild(this.el.nativeElement,label);
   }

   renderLabelPosition():void{
    let hpos= this.propertyRenderingProviderService.labelHPos.renderValue(this.uiProperties);
    if(hpos)
    {
      this.renderer.addClass(this.el.nativeElement,"d-flex");
      switch(Number(hpos)){        
        case HorizontalAlignment.Left:
          this.renderer.addClass(this.el.nativeElement,"justify-content-start");
          break;
        case HorizontalAlignment.Center:
          this.renderer.addClass(this.el.nativeElement,"justify-content-center");
          break;
        case HorizontalAlignment.Right:
          this.renderer.addClass(this.el.nativeElement,"justify-content-end");
          break;
      }
    }
   }
}
