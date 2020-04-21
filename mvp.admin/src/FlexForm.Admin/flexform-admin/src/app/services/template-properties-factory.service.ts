import { Injectable } from '@angular/core';
import { BaseFormControlPropertiesService } from './element-properties/base-form-control-properties.service';
import { VisualTemplate } from '../models/enums/visual-template.enum';
import { DateTimePickerTemplatePropertiesService } from './element-properties/form-control-properties/template/date-time-picker-template-properties.service';
import { TimePickerTemplatePropertiesService } from './element-properties/form-control-properties/template/time-picker-template-properties.service';
import { DatePickerTemplatePropertiesService } from './element-properties/form-control-properties/template/date-picker-template-properties.service';
import { TimeBoxTemplatePropertiesService } from './element-properties/form-control-properties/template/time-box-template-properties.service';
import { DateTimeBoxTemplatePropertiesService } from './element-properties/form-control-properties/template/date-time-box-template-properties.service';
import { DateBoxTemplatePropertiesService } from './element-properties/form-control-properties/template/date-box-template-properties.service';
import { CheckBoxTemplatePropertiesService } from './element-properties/form-control-properties/template/check-box-template-properties.service';
import { SwitchButtonTemplatePropertiesService } from './element-properties/form-control-properties/template/switch-button-template-properties.service';
import { LinkButtonTemplatePropertiesService } from './element-properties/form-control-properties/template/link-button-template-properties.service';
import { LinkTextTemplatePropertiesService } from './element-properties/form-control-properties/template/link-text-template-properties.service.ts';
import { SingleLineTextTemplatePropertiesService } from './element-properties/form-control-properties/template/single-line-text-template-properties.service';
import { MultiLineTextTemplatePropertiesService } from './element-properties/form-control-properties/template/multi-line-text-template-properties.service';
import { TemplatePropertiesService } from './element-properties/form-control-properties/template-properties.service';



@Injectable({
  providedIn: 'root'
})
export class TemplatePropertiesServiceFactory {

  constructor(
    private timePickerTemplatePropertiesService:TimePickerTemplatePropertiesService,
    private dateTimePickerTemplatePropertiesService:DateTimePickerTemplatePropertiesService,
    private datePickerTemplatePropertiesService:DatePickerTemplatePropertiesService,
    private timeBoxTemplatePropertiesService:TimeBoxTemplatePropertiesService,
    private dateTimeBoxTemplatePropertiesService:DateTimeBoxTemplatePropertiesService,
    private dateBoxTemplatePropertiesService:DateBoxTemplatePropertiesService,

    private checkBoxTemplatePropertiesService:CheckBoxTemplatePropertiesService,
    private switchButtonTemplatePropertiesService:SwitchButtonTemplatePropertiesService,

    private linkButtonTemplatePropertiesService:LinkButtonTemplatePropertiesService,
    private linkTextTemplatePropertiesService:LinkTextTemplatePropertiesService,

    private singleLineTextTemplatePropertiesService:SingleLineTextTemplatePropertiesService,
    private multiLineTextTemplatePropertiesService:MultiLineTextTemplatePropertiesService
    ) { }


  getFormControlServiceOfTemplate(visualTemplate:VisualTemplate):TemplatePropertiesService{    
    switch(visualTemplate){
      case VisualTemplate.SingleLineText: return this.singleLineTextTemplatePropertiesService;
      case VisualTemplate.MultiLineText: return this.multiLineTextTemplatePropertiesService;

      case VisualTemplate.LinkButton: return this.linkButtonTemplatePropertiesService;
      case VisualTemplate.LinkText: return this.linkTextTemplatePropertiesService;

      case VisualTemplate.CheckBox: return this.checkBoxTemplatePropertiesService;
      case VisualTemplate.SwitchButton: return this.switchButtonTemplatePropertiesService;

      case VisualTemplate.DateTimePicker: return this.dateTimePickerTemplatePropertiesService;
      case VisualTemplate.TimePicker: return this.timePickerTemplatePropertiesService;
      case VisualTemplate.DatePicker: return this.datePickerTemplatePropertiesService;
      case VisualTemplate.DateTimeBox: return this.dateTimeBoxTemplatePropertiesService;
      case VisualTemplate.TimeBox: return this.timeBoxTemplatePropertiesService;
      case VisualTemplate.DateBox: return this.dateBoxTemplatePropertiesService;
      default:
        throw("unknown template: " + visualTemplate);
    }
  }
}
