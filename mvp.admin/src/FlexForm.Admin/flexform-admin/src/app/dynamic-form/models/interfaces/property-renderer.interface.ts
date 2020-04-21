import { BaseProperty } from '../../../models/properties/base-property.model';

export interface PropertyRendererInterface{
    context:any;
    renderValue(uiProperties:BaseProperty<any>[]):string;
}