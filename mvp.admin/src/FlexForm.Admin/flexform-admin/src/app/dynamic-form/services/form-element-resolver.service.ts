import { Injectable, Type } from '@angular/core';
import { PropertyNameConstants } from '../../property-name-constants';
import { FormDefinitionService } from '../../services/form-definition.service';
import { EntityDefinitionService } from '../../services/entity-definition.service';
import { IFormElementResolver } from '../models/interfaces/form-element-resolver.interface';
import { ContainerFormComponent } from '../components/forms/container-form/container-form.component';
import { FormControl, FormDefinition, EntityDefinition, FieldDefinition, EntityInstance } from '../../models/dtos';
import { IForm } from '../models/interfaces/form.interface';
import { FieldValue } from '../../models/dtos/field-value.model';
import { PrimitiveFormComponent } from '../components/forms/primitive-form/primitive-form.component';
import { IFormModel } from '../models/interfaces/form-model.interface';
import { ContainerFormModel } from '../models/container-form.model';
import { PrimitiveFormModel } from '../models/primitive-form.model';
import { DisplayType } from '../../models/enums';
import { BasePropertyConverterService } from '../../services/property-handler/base-property-handler.service';
import { PrimitiveFormView } from '../models/primitive-form.view';
import { ContainerFormView } from '../models/container-form.view';
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
//import { FormFormComponent } from '../components/forms/primitive-form/form-form/form-form.component';
import { NonBindingFormView } from '../models/non-binding-form.view';
import { NonBindingFormModel } from '../models/non-binding-form.model';
import { ConverterService } from '../../services/converter.service';
import { ContainerFormController } from '../models/container-form.controller';
import { PrimitiveFormController } from '../models/primitive-form.controller';
import { NonBindingFormController } from '../models/non-binding-form.controller';
import { ConstantsService } from '../../services/constants.service';
import { CollectionFormView } from '../models/collection-form.view';
import { CollectionFormModel } from '../models/collection-form.model';
import { CollectionFormController } from '../models/collection-form.controller';
import { IItemSourceService } from "../../models/interfaces/item-source-service.interface";
import { CheckBoxGroupFormComponent } from '../components/forms/primitive-form/check-box-group-form-component/check-box-group-form.component';

@Injectable({
  providedIn: 'root'
})
export class FormElementResolverService implements IFormElementResolver {

  itemSourceService:IItemSourceService;

  constructor(private basePropertyConverterService:BasePropertyConverterService, 
    private formDefinitionService:FormDefinitionService, 
    private entityDefinitionService:EntityDefinitionService,
    private converterService: ConverterService,
    private constantService:ConstantsService) { }

  setItemSourceService(itemSourceService: IItemSourceService): void {
    this.itemSourceService = itemSourceService;
  }

  setupForm(formControl: FormControl, viewLevel:number, instanceData: any, form:IForm): Promise<void> {
    
    if(formControl.displayType == DisplayType.Form){
      let containerFormId = this.getContainerFormId(formControl);    
      if(formControl.subFormDefinitionId != null && formControl.subFormDefinitionId != undefined){
        containerFormId = formControl.subFormDefinitionId;
      }
      let fd = null;
      //if(containerFormId > 0)        
      {  //complex field itemsource has a premade subform
        let that = this;
        return this.formDefinitionService.get(containerFormId).then( formDefinition =>
          {
            //let entityDefinitionId = formDefinition.entityDefinitionId;
            //formControl.subFormDefinitionId
            let entityDefinitionId = formControl.formControlBinding.fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId;
            return that.entityDefinitionService.get(entityDefinitionId).then(entityDefinition => {            
              form.setup(new ContainerFormView(formDefinition,formControl,viewLevel,form),
                new ContainerFormModel(entityDefinition,instanceData,form),
                new ContainerFormController(form)
              );
              //return form;
              return Promise.resolve();
            });
          }        
        );
      }
      // else{  //complex field doesn't have premade subform, so the form displaytype is not available

      // }
    }else{
      if(formControl.formControlBinding){
        if(this.constantService.isCollectionFieldType(formControl.formControlBinding.fieldDefinition.fieldType)){
          form.setup(new CollectionFormView(formControl,viewLevel,form),
          new CollectionFormModel(formControl.formControlBinding.fieldDefinition,instanceData,form),
          new CollectionFormController(form,this.itemSourceService)
        );
        }else{
          form.setup(new PrimitiveFormView(formControl,viewLevel,form),
          new PrimitiveFormModel(formControl.formControlBinding.fieldDefinition,instanceData,form),
          new PrimitiveFormController(form)
        );
        }
        
      }else{
        let nonBinding = this.converterService.convertDisplayTypeIntoNonBinding(formControl.displayType);
        form.setup(new NonBindingFormView(formControl,viewLevel, form),
          new NonBindingFormModel(nonBinding,form),
          new NonBindingFormController(form)
        );
      }
      
      return Promise.resolve();
    }  
  }
  resolveType(formControl: FormControl): Type<IForm> {
    // let containerFormId = this.getContainerFormId(formControl);
    // if(containerFormId && containerFormId >=0){
    //   return ContainerFormComponent;
    // }else{
      switch(formControl.displayType){
        case DisplayType.AutoCompleteBox : return AutoCompleteBoxFormComponent;
        case DisplayType.Button : return ButtonFormComponent;
        case DisplayType.Breadcrumb : return BreadcrumbFormComponent;
        case DisplayType.CascadeComboBox : return CascadeComboBoxFormComponent;
        case DisplayType.CheckBox : return CheckBoxFormComponent;
        case DisplayType.ComboBox : return ComboBoxFormComponent;
        case DisplayType.DataGrid : return DataGridFormComponent;
        case DisplayType.DateTime : return DateTimeFormComponent;
        case DisplayType.DocumentDownload : return DocumentDownloadFormComponent;
        case DisplayType.DocumentUploader : return DocumentUploaderFormComponent;
        case DisplayType.DropDown : return DropDownFormComponent;
        case DisplayType.ExpressionEditor : return ExpressionEditorFormComponent;
        case DisplayType.Hidden : return HiddenFormComponent;
        case DisplayType.Icon : return IconFormComponent;
        case DisplayType.Label : return LabelFormComponent;
        case DisplayType.Link : return LinkFormComponent;
        case DisplayType.CheckBoxGroup : return CheckBoxGroupFormComponent;
        case DisplayType.ListBox : return ListBoxFormComponent;
        case DisplayType.Money : return MoneyFormComponent;
        case DisplayType.Decimal : return DecimalFormComponent;
        case DisplayType.RadioButton : return RadioButtonFormComponent;
        case DisplayType.RichText : return RichTextFormComponent;
        case DisplayType.Text : return TextFormComponent;
        case DisplayType.Tree : return TreeFormComponent;
        case DisplayType.Panel : return PanelFormComponent;
        case DisplayType.Image : return ImageFormComponent;

        case DisplayType.Form : return ContainerFormComponent;
      }      
    // }    
  }

  public getContainerFormId(formControl: FormControl){
    return this.basePropertyConverterService.getValue(formControl.uiProperties,PropertyNameConstants.CONTAINER_FORM);
  }

}
