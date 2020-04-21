import { Component, OnInit, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { IForm } from '../../../models/form.interface';
import { FormModel } from '../../../models/basicModels/form.model';
import { DynamicFormBindingModel } from '../../../models/dynamic-form-binding.model';
import { FormHostDirective } from '../../../form-host.directive';
import { FormDefinition } from '../../../models/dtos/form-definition';
import { EntityInstance } from '../../../models/dtos/entity-instance';
import { TextBoxComponent } from '../text-box/text-box.component';
import { DateSelectorComponent } from '../date-selector/date-selector.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { TextBoxModel } from '../../../models/basicModels/text-box.model';
import { DateSelectorModel } from '../../../models/basicModels/date-selector.model';
import { CheckBoxModel } from '../../../models/basicModels/check-box.model';
import { FormDefinitionService } from '../../../services/form-definition.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, IForm {

  formTitle: string;
  model: DynamicFormBindingModel;

  dynamicFormBindingModelList: DynamicFormBindingModel[];
  @ViewChild(FormHostDirective) formHost: FormHostDirective;

  formDefinition:FormDefinition;
  entityInstance:EntityInstance;

  formElementsRefs: ComponentRef<IForm>[];

  constructor(
    private formDefinitionService:FormDefinitionService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  isValid():boolean{
    let isValid = true;
    this.formElementsRefs.forEach(formElementRef =>{
      isValid = isValid && formElementRef.instance.isValid();
    });
    return isValid;
  }

  public save():any{
    this.formElementsRefs.forEach(r =>{
      let itemSaveResult = r.instance.save();

      let propertyName = itemSaveResult.getPropertyName();
      let modifiedValue = itemSaveResult.getValue();

      (<FormModel>this.model.formModel).entityInstance.fieldValues[propertyName] = <string>modifiedValue;
      
    });
    return this.model.formModel;
  }

  public cancel():void{
    this.formElementsRefs.forEach(r =>{
      r.instance.cancel();
    });
  }

  public loadComponent() {
    this.clearForm(this);

    let formModel = <FormModel>this.model.formModel;
    let formDefinition = formModel.formDefinition;
    let entityInstance = formModel.entityInstance;
    this.formTitle = formDefinition.title;
    this.dynamicFormBindingModelList = new Array<DynamicFormBindingModel>();
    formDefinition.formElements.forEach(formElement =>{
      let value = undefined;
      if(entityInstance && entityInstance.fieldValues){
        value = entityInstance.fieldValues[formElement.propertyName];
      }
      
      switch(formElement.type) { //textbox|dateselector|checkbox|[form:id]
        case "textbox": { 
          this.dynamicFormBindingModelList.push(new DynamicFormBindingModel(TextBoxComponent,new TextBoxModel(<string>value,formElement)));
          break; 
        } 
        case "dateselector": { 
          this.dynamicFormBindingModelList.push(new DynamicFormBindingModel(DateSelectorComponent,new DateSelectorModel(value,formElement)));
          break; 
        } 
        case "checkbox": { 
          this.dynamicFormBindingModelList.push(new DynamicFormBindingModel(CheckBoxComponent,new CheckBoxModel(<boolean>value,formElement)));
          break;  
        } 
        default: { 
          let index = +(formElement.type.split(':')[1]);
          let formDefinition = this.formDefinitionService.getFormDefinition(index);
          this.dynamicFormBindingModelList.push(new DynamicFormBindingModel(FormComponent,new FormModel(value,formDefinition)));
           break; 
        } 
     }
    });

    this.renderForm();
  }

  public clearForm(that):void{
    let viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
  }

  renderForm():void{
    let formModel = <FormModel>this.model.formModel;
    let formDefinition = formModel.formDefinition;

    if(formDefinition != null && this.dynamicFormBindingModelList != null){
      let that = this;
      this.formElementsRefs = new Array<ComponentRef<IForm>>();
      this.dynamicFormBindingModelList.forEach((child) => { 

        let componentFactory = that.componentFactoryResolver.resolveComponentFactory(child.formType);
        let viewContainerRef = that.formHost.viewContainerRef;
        let componentRef = viewContainerRef.createComponent(componentFactory);
        this.formElementsRefs.push(componentRef);

        if(child.formModel instanceof FormModel){
          (<IForm>componentRef.instance).model = new DynamicFormBindingModel(null,child.formModel);
          (<FormComponent>componentRef.instance).loadComponent();
        }else{
          (<IForm>componentRef.instance).model = child.formModel;
        }

      });
    }  
  }
}
