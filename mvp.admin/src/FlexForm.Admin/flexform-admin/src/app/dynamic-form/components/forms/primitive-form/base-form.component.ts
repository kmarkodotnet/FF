import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IPrimitiveForm } from '../../../models/interfaces/primitive-form.interface';
import { IFormView } from '../../../models/interfaces/form-view.interface';
import { FieldDefinition, FormControl } from '../../../../models/dtos';
import { FieldValue } from '../../../../models/dtos/field-value.model';
import { IFormModel } from '../../../models/interfaces/form-model.interface';
import { IFormController } from '../../../models/interfaces/form-controller.interface';
import { PrimitiveFormView } from '../../../models/primitive-form.view';
import { PrimitiveFormModel } from '../../../models/primitive-form.model';
import { PrimitiveFormController } from '../../../models/primitive-form.controller';
import { IViewDefinition } from '../../../../models/interfaces/view-definition.interface';
import { INonBindingForm } from '../../../models/interfaces/non-binding-form.interface';
import { NonBindingFormView } from '../../../models/non-binding-form.view';
import { NonBindingFormModel } from '../../../models/non-binding-form.model';
import { NonBindingFormController } from '../../../models/non-binding-form.controller';
import { BaseProperty } from '../../../../models/properties/base-property.model';
import { PropertyNameConstants } from '../../../../property-name-constants';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { VisualTemplate } from '../../../../models/enums/visual-template.enum';

export class BaseFormComponent implements OnInit,INonBindingForm {
  
  visualTemplate=VisualTemplate;
  
  get templateValue():number{
    return this.basePropertyConverterService.getValue(this.view.viewDefinition.uiProperties,PropertyNameConstants.TEMPLATE);
  }
  
  setup(view: IFormView, model: IFormModel, controller: IFormController) {
    this.view = <IFormView>view;
    this.model = <IFormModel>model;
    this.controller = <IFormController>controller;
  }
  
  view: IFormView;
  get uiProperties():BaseProperty<any>[]{
    if(this.view && this.view.viewDefinition){
      return this.view.viewDefinition.uiProperties;
    }
    return null;
  }
  model: IFormModel;
  controller: IFormController;

  async render(): Promise<void>  {
    //throw new Error("Method not implemented.");
  }
 
  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
   }

  ngOnInit() {
  }

}
