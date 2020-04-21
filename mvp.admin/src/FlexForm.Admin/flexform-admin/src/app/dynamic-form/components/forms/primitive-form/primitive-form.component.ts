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
import { BaseProperty } from '../../../../models/properties/base-property.model';
import { LabelTextPropertyRendererService } from '../../../services/label-text-property-renderer.service';
import { BasePropertyConverterService } from '../../../../services/property-handler/base-property-handler.service';
import { BaseFormComponent } from './base-form.component';

// @Component({
//   selector: 'app-primitive-form',
//   templateUrl: './primitive-form.component.html',
//   styleUrls: ['./primitive-form.component.css']
// })
export class PrimitiveFormComponent extends BaseFormComponent implements OnInit,IPrimitiveForm {
  setup(view: IFormView, model: IFormModel, controller: IFormController) {
    this.view = <PrimitiveFormView>view;
    this.model = <PrimitiveFormModel>model;
    this.controller = <PrimitiveFormController>controller;
  }
  
  view: PrimitiveFormView;
  get uiProperties():BaseProperty<any>[]{
    if(this.view && this.view.viewDefinition){
      return this.view.viewDefinition.uiProperties;
    }
    return null;
  }
  
  model: PrimitiveFormModel;
  controller: PrimitiveFormController;

  async render(): Promise<void>  {
    //throw new Error("Method not implemented.");
  }
 
  constructor(protected basePropertyConverterService:BasePropertyConverterService) {
    super(basePropertyConverterService);
   }

  ngOnInit() {
  }

}
