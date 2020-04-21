import { Component,ComponentFactoryResolver, Inject, forwardRef } from '@angular/core';
import { AutoCompleteBoxFormComponent } from '../primitive-form/auto-complete-box-form/auto-complete-box-form.component';
import { PrimitiveFormWrapperComponent } from './primitive-form-wrapper.component';
import { DropDownFormComponent } from '../primitive-form/drop-down-form/drop-down-form.component';
import { EditorFormElementResolverService } from '../../../services/editor-form-element-resolver.service';
@Component({
  selector: 'app-primitive-form-wrapper',
  templateUrl: './primitive-form-wrapper.component.html',
  styleUrls: ['./primitive-form-wrapper.component.css']
})
export class DropDownPrimitiveFormWrapperComponent extends PrimitiveFormWrapperComponent<DropDownFormComponent>{
  constructor(@Inject(forwardRef(() => EditorFormElementResolverService)) public resolver:EditorFormElementResolverService, protected componentFactoryResolver:ComponentFactoryResolver)
  {
    super(resolver,componentFactoryResolver); 
  }
  getComponentFactory():any{
    return this.componentFactoryResolver.resolveComponentFactory(DropDownFormComponent);
  }
}
