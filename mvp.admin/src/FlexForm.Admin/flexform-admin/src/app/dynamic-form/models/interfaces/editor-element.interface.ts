import { IFormView } from './form-view.interface';
import { IFormModel } from './form-model.interface';
import { IFormController } from './form-controller.interface';
import { EventEmitter } from '@angular/core';
import { IViewDefinition } from '../../../models/interfaces/view-definition.interface';

export interface IEditorElement{
    isSelected:boolean;

    selectedEvent: EventEmitter<any>;
    clicked(event:IViewDefinition[]):void;
    
    removedEvent: EventEmitter<any>;
    removed(event:IViewDefinition[]):void;

    isRootChild():boolean;
}