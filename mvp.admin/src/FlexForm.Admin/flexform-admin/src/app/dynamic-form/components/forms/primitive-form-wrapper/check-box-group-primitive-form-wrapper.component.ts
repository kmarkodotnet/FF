import { Component,ComponentFactoryResolver, Inject, forwardRef } from '@angular/core';
import { AutoCompleteBoxFormComponent } from '../primitive-form/auto-complete-box-form/auto-complete-box-form.component';
import { PrimitiveFormWrapperComponent } from './primitive-form-wrapper.component';
import { ListBoxFormComponent } from '../primitive-form/list-box-form/list-box-form.component';
import { EditorFormElementResolverService } from '../../../services/editor-form-element-resolver.service';
import { CheckBoxGroupFormComponent } from '../primitive-form/check-box-group-form-component/check-box-group-form.component';
@Component({
  selector: 'app-primitive-form-wrapper',
  templateUrl: './primitive-form-wrapper.component.html',
  styleUrls: ['./primitive-form-wrapper.component.css']
})
export class CheckBoxGroupPrimitiveFormWrapperComponent extends PrimitiveFormWrapperComponent<CheckBoxGroupFormComponent>{
  constructor(@Inject(forwardRef(() => EditorFormElementResolverService)) public resolver:EditorFormElementResolverService, protected componentFactoryResolver:ComponentFactoryResolver)
  {
    super(resolver,componentFactoryResolver); 
  }
  getComponentFactory():any{
    return this.componentFactoryResolver.resolveComponentFactory(CheckBoxGroupFormComponent);
  }
}
