import { Injectable } from '@angular/core';
import { FieldDefinitionPropertiesService } from './element-properties/field-properties/field-definition-properties.service';
import { FormDefinitionPropertiesService} from './element-properties/form-definition-properties.service';
import { FormControlBindingPropertiesService } from './element-properties/form-control-properties/form-control-binding-properties.service';
import { DisplayType, FieldType } from '../models/enums';
import { SimpleFieldDefinitionPropertiesService } from './element-properties/field-properties/simple-field-definition-properties.service';
import { ComplexFieldDefinitionPropertiesService } from './element-properties/field-properties/complex-field-definition-properties.service';
import { TextFormControlPropertiesService } from './element-properties/form-control-properties/binding/text-form-control-properties.service';
import { BreadcrumbFormControlPropertiesService } from './element-properties/form-control-properties/nonBinding/breadcrumb-form-control-properties.service';
import { ButtonFormControlPropertiesService } from './element-properties/form-control-properties/nonBinding/button-form-control-properties.service';
import { IconFormControlPropertiesService } from './element-properties/form-control-properties/nonBinding/icon-form-control-properties.service';
import { LabelFormControlPropertiesService } from './element-properties/form-control-properties/nonBinding/label-form-control-properties.service';
import { LinkFormControlPropertiesService } from './element-properties/form-control-properties/nonBinding/link-form-control-properties.service';
import { PanelFormControlPropertiesService } from './element-properties/form-control-properties/nonBinding/panel-form-control-properties.service';
import { BaseFormControlPropertiesService } from './element-properties/base-form-control-properties.service';
import { AutoCompleteBoxFormControlPropertiesService} from './element-properties/form-control-properties/binding/auto-complete-box-form-control-properties.service';
import { CascadeComboBoxFormControlPropertiesService} from './element-properties/form-control-properties/binding/cascade-combo-box-form-control-properties.service';
import { CheckBoxFormControlPropertiesService} from './element-properties/form-control-properties/binding/check-box-form-control-properties.service';
import { ComboBoxFormControlPropertiesService} from './element-properties/form-control-properties/binding/combo-box-form-control-properties.service';
import { DataGridFormControlPropertiesService} from './element-properties/form-control-properties/binding/data-grid-form-control-properties.service';
import { DateTimeFormControlPropertiesService} from './element-properties/form-control-properties/binding/date-time-form-control-properties.service';
import { DocumentDownloadFormControlPropertiesService} from './element-properties/form-control-properties/binding/document-download-form-control-properties.service';
import { DocumentUploaderFormControlPropertiesService} from './element-properties/form-control-properties/binding/document-uploader-form-control-properties.service';
import { DropDownFormControlPropertiesService} from './element-properties/form-control-properties/binding/dropdown-form-control-properties.service';
import { ExpressionEditorFormControlPropertiesService} from './element-properties/form-control-properties/binding/expression-editor-form-control-properties.service';
import { HiddenFormControlPropertiesService} from './element-properties/form-control-properties/binding/hidden-form-control-properties.service';
import { ListBoxFormControlPropertiesService} from './element-properties/form-control-properties/binding/list-box-form-control-properties.service';
import { MoneyFormControlPropertiesService} from './element-properties/form-control-properties/binding/money-form-control-properties.service';
import { DecimalFormControlPropertiesService} from './element-properties/form-control-properties/binding/decimal-form-control-properties.service';
import { RadioButtonFormControlPropertiesService} from './element-properties/form-control-properties/binding/radio-button-form-control-properties.service';
import { RichTextFormControlPropertiesService} from './element-properties/form-control-properties/binding/rich-text-form-control-properties.service';
import { TreeFormControlPropertiesService} from './element-properties/form-control-properties/binding/tree-form-control-properties.service';
import { FormFormControlPropertiesService} from './element-properties/form-control-properties/binding/form-form-control-properties.service';
import { ImageFormControlPropertiesService} from './element-properties/form-control-properties/binding/image-form-control-properties.service';
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
import { CheckBoxGroupFormControlPropertiesService } from './element-properties/form-control-properties/binding/check-box-group-form-control-properties.service';



@Injectable({
  providedIn: 'root'
})
export class PropertiesServiceFactory {

  constructor(private simpleFieldDefinitionPropertiesService:SimpleFieldDefinitionPropertiesService,
    private complexFieldDefinitionPropertiesService:ComplexFieldDefinitionPropertiesService,
    private formDefinitionPropertiesService: FormDefinitionPropertiesService,
    private formControlPropertiesService:FormControlBindingPropertiesService,
    private textFormControlPropertiesService:TextFormControlPropertiesService,
    private breadcrumbFormControlPropertiesService:BreadcrumbFormControlPropertiesService,
    private buttonFormControlPropertiesService:ButtonFormControlPropertiesService,
    private iconFormControlPropertiesService:IconFormControlPropertiesService,
    private labelFormControlPropertiesService:LabelFormControlPropertiesService,
    private linkFormControlPropertiesService:LinkFormControlPropertiesService,
    private panelFormControlPropertiesService:PanelFormControlPropertiesService,
    private autoCompleteBoxFormControlPropertiesService:AutoCompleteBoxFormControlPropertiesService,
    private cascadeComboBoxFormControlPropertiesService:CascadeComboBoxFormControlPropertiesService,
    private checkBoxFormControlPropertiesService:CheckBoxFormControlPropertiesService,
    private comboBoxFormControlPropertiesService:ComboBoxFormControlPropertiesService,
    private dataGridFormControlPropertiesService:DataGridFormControlPropertiesService,
    private dateTimeFormControlPropertiesService:DateTimeFormControlPropertiesService,
    private documentDownloadFormControlPropertiesService:DocumentDownloadFormControlPropertiesService,
    private documentUploaderFormControlPropertiesService:DocumentUploaderFormControlPropertiesService,
    private dropDownFormControlPropertiesService:DropDownFormControlPropertiesService,
    private expressionEditorFormControlPropertiesService:ExpressionEditorFormControlPropertiesService,
    private hiddenFormControlPropertiesService:HiddenFormControlPropertiesService,
    private checkBoxGroupFormControlPropertiesService:CheckBoxGroupFormControlPropertiesService,
    private listBoxFormControlPropertiesService:ListBoxFormControlPropertiesService,
    private moneyFormControlPropertiesService:MoneyFormControlPropertiesService,
    private decimalFormControlPropertiesService:DecimalFormControlPropertiesService,
    private radioButtonFormControlPropertiesService:RadioButtonFormControlPropertiesService,
    private richTextFormControlPropertiesService:RichTextFormControlPropertiesService,
    private treeFormControlPropertiesService:TreeFormControlPropertiesService,
    private imageFormControlPropertiesService:ImageFormControlPropertiesService,
    private formFormControlPropertiesService:FormFormControlPropertiesService,

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


  getFieldDefinitionServiceOfFieldType(fieldType:FieldType):FieldDefinitionPropertiesService{
    switch(fieldType){
      case FieldType.Identity:
      case FieldType.Int:
      case FieldType.Double:
      case FieldType.Decimal:
      case FieldType.Text:
      case FieldType.DateTime:
      case FieldType.OuterId:
      case FieldType.Calculated:
      case FieldType.Boolean:
        return this.simpleFieldDefinitionPropertiesService;
      case FieldType.EntityCollection:
      case FieldType.EntityReference:
      case FieldType.Association:
      case FieldType.Collection: 
        return this.complexFieldDefinitionPropertiesService;
      default:
        throw("unknown fieldType: "+fieldType);
    }
  }

  getFormControlServiceOfDisplayType(displayType:DisplayType):BaseFormControlPropertiesService{    
    switch(displayType){
      case DisplayType.AutoCompleteBox: return this.autoCompleteBoxFormControlPropertiesService;
      case DisplayType.CascadeComboBox: return this.cascadeComboBoxFormControlPropertiesService;
      case DisplayType.CheckBox: return this.checkBoxFormControlPropertiesService;
      case DisplayType.ComboBox: return this.comboBoxFormControlPropertiesService;
      case DisplayType.DataGrid: return this.dataGridFormControlPropertiesService;
      case DisplayType.DateTime: return this.dateTimeFormControlPropertiesService;
      case DisplayType.DocumentDownload: return this.documentDownloadFormControlPropertiesService;
      case DisplayType.DocumentUploader: return this.documentUploaderFormControlPropertiesService;
      case DisplayType.DropDown: return this.dropDownFormControlPropertiesService;
      case DisplayType.ExpressionEditor: return this.expressionEditorFormControlPropertiesService;
      case DisplayType.Hidden: return this.hiddenFormControlPropertiesService;
      case DisplayType.CheckBoxGroup: return this.checkBoxGroupFormControlPropertiesService;
      case DisplayType.ListBox: return this.listBoxFormControlPropertiesService;
      case DisplayType.Money: return this.moneyFormControlPropertiesService;
      case DisplayType.Decimal: return this.decimalFormControlPropertiesService;
      case DisplayType.RadioButton: return this.radioButtonFormControlPropertiesService;
      case DisplayType.RichText: return this.richTextFormControlPropertiesService;
      case DisplayType.Tree: return this.treeFormControlPropertiesService;
      case DisplayType.Text: 
        return this.textFormControlPropertiesService;
        
        
      case DisplayType.Button: 
        return this.buttonFormControlPropertiesService;
      case DisplayType.Breadcrumb: 
        return this.breadcrumbFormControlPropertiesService;
      case DisplayType.Icon: 
        return this.iconFormControlPropertiesService;
      case DisplayType.Image: 
        return this.imageFormControlPropertiesService;
      case DisplayType.Label: 
        return this.labelFormControlPropertiesService;
      case DisplayType.Link: 
        return this.linkFormControlPropertiesService;
      case DisplayType.Panel: 
        return this.panelFormControlPropertiesService;
      case DisplayType.Form: 
        return this.formFormControlPropertiesService;
      default:
        throw("unknown displayType: " + displayType);
    }
  }
  getFormControlServiceOfTemplate(visualTemplate:VisualTemplate):BaseFormControlPropertiesService{    
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
