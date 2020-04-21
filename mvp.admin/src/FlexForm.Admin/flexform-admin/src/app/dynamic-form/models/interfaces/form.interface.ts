import { IFormView } from './form-view.interface';
import { IFormModel } from './form-model.interface';
import { IFormController } from './form-controller.interface';
import { EventEmitter } from '@angular/core';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';

export interface IForm{
    view: IFormView;
    model: IFormModel;
    controller: IFormController;
    //render(): Promise<void>;
    setup(view: IFormView,model: IFormModel,controller: IFormController);
}