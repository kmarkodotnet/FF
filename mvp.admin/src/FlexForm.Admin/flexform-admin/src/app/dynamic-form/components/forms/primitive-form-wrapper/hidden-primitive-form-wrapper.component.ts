import { Component ,ComponentFactoryResolver, Inject, forwardRef} from '@angular/core';
import { AutoCompleteBoxFormComponent } from '../primitive-form/auto-complete-box-form/auto-complete-box-form.component';
import { PrimitiveFormWrapperComponent } from './primitive-form-wrapper.component';
import { HiddenFormComponent } from '../primitive-form/hidden-form/hidden-form.component';
import { EditorFormElementResolverService } from '../../../services/editor-form-element-resolver.service';
@Component({
  selector: 'app-primitive-form-wrapper',
  templateUrl: './primitive-form-wrapper.component.html',
  styleUrls: ['./primitive-form-wrapper.component.css']
})
export class HiddenPrimitiveFormWrapperComponent extends PrimitiveFormWrapperComponent<HiddenFormComponent>{
  constructor(@Inject(forwardRef(() => EditorFormElementResolverService)) public resolver:EditorFormElementResolverService, protected componentFactoryResolver:ComponentFactoryResolver)
  {    
    super(resolver,componentFactoryResolver); 
    this.wrapperText = "HIDDEN FIELD";
  }
  getComponentFactory():any{
    return this.componentFactoryResolver.resolveComponentFactory(HiddenFormComponent);
  }
}
