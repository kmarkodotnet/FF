import { Injectable, Type } from '@angular/core';
import { FormElementResolverService } from './form-element-resolver.service';

import { PropertyNameConstants } from '../../property-name-constants';
import { FormDefinitionService } from '../../services/form-definition.service';
import { EntityDefinitionService } from '../../services/entity-definition.service';

import { ConverterService } from '../../services/converter.service';
import { IFormElementResolver } from '../models/interfaces/form-element-resolver.interface';
import { IForm } from '../models/interfaces/form.interface';
import { FormControl } from '../../models/dtos';
import { EditorContainerFormComponent } from '../components/forms/editor-container-form/editor-container-form.component';
import { PrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/primitive-form-wrapper.component';
import { IFormHost } from '../models/interfaces/form-host.interface';
import { AutoCompleteBoxFormComponent } from '../components/forms/primitive-form/auto-complete-box-form/auto-complete-box-form.component';
import { ButtonFormComponent } from '../components/forms/primitive-form/button-form/button-form.component';
import { BreadcrumbFormComponent } from '../components/forms/primitive-form/breadcrumb-form/breadcrumb-form.component';
import { CascadeComboBoxFormComponent } from '../components/forms/primitive-form/cascade-combo-box-form/cascade-combo-box-form.component';
import { CheckBoxFormComponent } from '../components/forms/primitive-form/check-box-form/check-box-form.component';
import { ComboBoxFormComponent } from '../components/forms/primitive-form/combo-box-form/combo-box-form.component';
import { DataGridFormComponent } from '../components/forms/primitive-form/data-grid-form/data-grid-form.component';
import { DateTimeFormComponent } from '../components/forms/primitive-form/date-time-form/date-time-form.component';
import { DocumentDownloadFormComponent } from '../components/forms/primitive-form/document-download-form/document-download-form.component';
import { DocumentUploaderFormComponent } from '../components/forms/primitive-form/document-uploader-form/document-uploader-form.component';
import { DropDownFormComponent } from '../components/forms/primitive-form/drop-down-form/drop-down-form.component';
import { ExpressionEditorFormComponent } from '../components/forms/primitive-form/expression-editor-form/expression-editor-form.component';
import { HiddenFormComponent } from '../components/forms/primitive-form/hidden-form/hidden-form.component';
import { IconFormComponent } from '../components/forms/primitive-form/icon-form/icon-form.component';
import { LabelFormComponent } from '../components/forms/primitive-form/label-form/label-form.component';
import { LinkFormComponent } from '../components/forms/primitive-form/link-form/link-form.component';
import { ListBoxFormComponent } from '../components/forms/primitive-form/list-box-form/list-box-form.component';
import { MoneyFormComponent } from '../components/forms/primitive-form/money-form/money-form.component';
import { DecimalFormComponent } from '../components/forms/primitive-form/decimal-form/decimal-form.component';
import { RadioButtonFormComponent } from '../components/forms/primitive-form/radio-button-form/radio-button-form.component';
import { RichTextFormComponent } from '../components/forms/primitive-form/rich-text-form/rich-text-form.component';
import { TextFormComponent } from '../components/forms/primitive-form/text-form/text-form.component';
import { TreeFormComponent } from '../components/forms/primitive-form/tree-form/tree-form.component';
import { PanelFormComponent } from '../components/forms/primitive-form/panel-form/panel-form.component';
import { ImageFormComponent } from '../components/forms/primitive-form/image-form/image-form.component';
import { AutoCompleteBoxPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/auto-complete-box-primitive-form-wrapper.component';
import { ButtonPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/button-primitive-form-wrapper.component';
import { BreadcrumbPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/breadcrumb-primitive-form-wrapper.component';
import { CascadeComboBoxPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/cascade-combo-box-primitive-form-wrapper.component';
import { CheckBoxPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/check-box-primitive-form-wrapper.component';
import { ComboBoxPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/combo-box-primitive-form-wrapper.component';
import { DataGridPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/data-grid-primitive-form-wrapper.component';
import { DateTimePrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/date-time-primitive-form-wrapper.component';
import { DocumentDownloadPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/document-download-primitive-form-wrapper.component';
import { DocumentUploaderPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/document-uploader-primitive-form-wrapper.component';
import { DropDownPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/drop-down-primitive-form-wrapper.component';
import { ExpressionEditorPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/expression-editor-primitive-form-wrapper.component';
import { HiddenPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/hidden-primitive-form-wrapper.component';
import { IconPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/icon-primitive-form-wrapper.component';
import { LabelPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/label-primitive-form-wrapper.component';
import { LinkPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/link-primitive-form-wrapper.component';
import { ListBoxPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/list-box-primitive-form-wrapper.component';
import { MoneyPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/money-primitive-form-wrapper.component';
import { DecimalPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/decimal-primitive-form-wrapper.component';
import { RadioButtonPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/radio-button-primitive-form-wrapper.component';
import { RichTextPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/rich-text-primitive-form-wrapper.component';
import { TextPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/text-primitive-form-wrapper.component';
import { TreePrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/tree-primitive-form-wrapper.component';
import { PanelPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/panel-primitive-form-wrapper.component';
import { ImagePrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/image-primitive-form-wrapper.component';
import { ContainerFormComponent } from '../components/forms/container-form/container-form.component';
import { IItemSourceService } from "../../models/interfaces/item-source-service.interface";
import { CheckBoxGroupFormComponent } from '../components/forms/primitive-form/check-box-group-form-component/check-box-group-form.component';
import { CheckBoxGroupPrimitiveFormWrapperComponent } from '../components/forms/primitive-form-wrapper/check-box-group-primitive-form-wrapper.component';

@Injectable({
  providedIn: 'root'
})
export class EditorFormElementResolverService implements IFormElementResolver {

  itemSourceService:IItemSourceService;
  setItemSourceService(itemSourceService: IItemSourceService): void {
    this.itemSourceService = itemSourceService;
  }

  async setupForm(formControl: FormControl, viewLevel:number, instanceData: any, form: IForm): Promise<void> {
    await this.formElementResolverService.setupForm(formControl,viewLevel,instanceData,form);
    return Promise.resolve();
  }

  resolveType(formControl: FormControl): Type<IForm> {
    // let containerFormId = this.formElementResolverService.getContainerFormId(formControl);
    // if(containerFormId && containerFormId >=0){
    //   return EditorContainerFormComponent;
    // }else{
      this.formElementResolverService.setItemSourceService(this.itemSourceService);
      let t = this.formElementResolverService.resolveType(formControl);
      switch(t){
        case AutoCompleteBoxFormComponent : return AutoCompleteBoxPrimitiveFormWrapperComponent;
        case ButtonFormComponent : return ButtonPrimitiveFormWrapperComponent;
        case BreadcrumbFormComponent : return BreadcrumbPrimitiveFormWrapperComponent;
        case CascadeComboBoxFormComponent : return CascadeComboBoxPrimitiveFormWrapperComponent;
        case CheckBoxFormComponent : return CheckBoxPrimitiveFormWrapperComponent;
        case ComboBoxFormComponent : return ComboBoxPrimitiveFormWrapperComponent;
        case DataGridFormComponent : return DataGridPrimitiveFormWrapperComponent;
        case DateTimeFormComponent : return DateTimePrimitiveFormWrapperComponent;
        case DocumentDownloadFormComponent : return DocumentDownloadPrimitiveFormWrapperComponent;
        case DocumentUploaderFormComponent : return DocumentUploaderPrimitiveFormWrapperComponent;
        case DropDownFormComponent : return DropDownPrimitiveFormWrapperComponent;
        case ExpressionEditorFormComponent : return ExpressionEditorPrimitiveFormWrapperComponent;
        case HiddenFormComponent : return HiddenPrimitiveFormWrapperComponent;
        case IconFormComponent : return IconPrimitiveFormWrapperComponent;
        case LabelFormComponent : return LabelPrimitiveFormWrapperComponent;
        case LinkFormComponent : return LinkPrimitiveFormWrapperComponent;
        case CheckBoxGroupFormComponent : return CheckBoxGroupPrimitiveFormWrapperComponent;
        case ListBoxFormComponent : return ListBoxPrimitiveFormWrapperComponent;
        case MoneyFormComponent : return MoneyPrimitiveFormWrapperComponent;
        case DecimalFormComponent : return DecimalPrimitiveFormWrapperComponent;
        case RadioButtonFormComponent : return RadioButtonPrimitiveFormWrapperComponent;
        case RichTextFormComponent : return RichTextPrimitiveFormWrapperComponent;
        case TextFormComponent : return TextPrimitiveFormWrapperComponent;
        case TreeFormComponent : return TreePrimitiveFormWrapperComponent;
        case PanelFormComponent : return PanelPrimitiveFormWrapperComponent;
        case ImageFormComponent : return ImagePrimitiveFormWrapperComponent;

        case ContainerFormComponent : return EditorContainerFormComponent;
      }    
      //return typeof (new ());
    // }
  }

  constructor(protected formElementResolverService:FormElementResolverService){
    
  }
}
