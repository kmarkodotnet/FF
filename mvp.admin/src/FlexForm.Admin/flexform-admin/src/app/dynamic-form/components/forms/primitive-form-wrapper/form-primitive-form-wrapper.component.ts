// import { Component, ComponentFactoryResolver, Inject, forwardRef } from '@angular/core';
// import { PrimitiveFormWrapperComponent } from './primitive-form-wrapper.component';
// import { FormFormComponent } from '../primitive-form/form-form/form-form.component';
// import { EditorFormElementResolverService } from '../../../services/editor-form-element-resolver.service';
// @Component({
//   selector: 'app-primitive-form-wrapper',
//   templateUrl: './primitive-form-wrapper.component.html',
//   styleUrls: ['./primitive-form-wrapper.component.css']
// })
// export class FormPrimitiveFormWrapperComponent extends PrimitiveFormWrapperComponent<FormFormComponent>{  
//   constructor(@Inject(forwardRef(() => EditorFormElementResolverService)) public resolver:EditorFormElementResolverService, protected componentFactoryResolver:ComponentFactoryResolver)
//   {
//     super(resolver,componentFactoryResolver); 
//   }
//   getComponentFactory():any{
//     return this.componentFactoryResolver.resolveComponentFactory(FormFormComponent);
//   }
// }
