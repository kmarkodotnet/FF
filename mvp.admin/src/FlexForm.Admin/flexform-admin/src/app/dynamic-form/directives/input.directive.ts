import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormBaseDirective } from './form-base.directive';
import { PropertyRenderingProviderService } from '../services/property-rendering-provider.service';
import { BaseProperty } from '../../models/properties/base-property.model';

@Directive({
  selector: '[appInput]'
})
export class InputDirective extends FormBaseDirective {

  @Input('appInput') uiProperties: BaseProperty<any>[];
  
  constructor(protected el: ElementRef, protected renderer:Renderer2, protected propertyRenderingProviderService:PropertyRenderingProviderService) {
    super(el,renderer,propertyRenderingProviderService);
   }

   calculate():void{
    this.renderText();
    this.renderUrl();
   }

   renderText():void{
    let inputText= this.propertyRenderingProviderService.inputText.renderValue(this.uiProperties);
    if(this.el.nativeElement.localName == 'a'){
      this.el.nativeElement.text = inputText;
    }else if(this.el.nativeElement.localName == 'input'){
      this.renderer.setAttribute(this.el.nativeElement,"value",inputText)
    }
   }

   renderUrl():void{
    let url= this.propertyRenderingProviderService.url.renderValue(this.uiProperties);
    if(url){
      if(this.el.nativeElement.localName == 'a'){
        this.el.nativeElement.href = url;
      }else if(this.el.nativeElement.localName == 'input' && this.el.nativeElement.type == 'button'){
        this.el.nativeElement.onclick = function(){
          location.href=url;
        };
        //this.renderer.setAttribute(this.el.nativeElement,"value",url)
      }
    }
   
  }
}
