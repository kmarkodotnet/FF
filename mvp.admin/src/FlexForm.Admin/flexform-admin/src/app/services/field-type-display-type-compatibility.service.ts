import { Injectable } from '@angular/core';
import { DisplayType, FieldType } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class FieldTypeDisplayTypeCompatibilityService {

  constructor() { }


  getDisplayType(fieldType: FieldType){
      switch(fieldType)
      {
        case FieldType.Int:
          return this.getIntDisplayTypes();
        case FieldType.Decimal:
          return this.getDecimalDisplayTypes();
        case FieldType.Double:
          return this.getDoubleDisplayTypes();
        case FieldType.Text:
          return this.getTextDisplayTypes();
        case FieldType.DateTime:
          return this.getDateTimeDisplayTypes();
        case FieldType.OuterId:
          return this.getOuterIdDisplayTypes();
        case FieldType.Calculated:
          return this.getCalculatedDisplayTypes();
        case FieldType.Boolean:
          return this.getBooleanDisplayTypes();
        case FieldType.EntityReference:
          return this.getEntityReferenceDisplayTypes();
        case FieldType.EntityCollection:
          return this.getEntityCollectionDisplayTypes();
        case FieldType.Collection:
          return this.getCollectionDisplayTypes();
        case FieldType.Association:
          return this.getAssociationDisplayTypes();
        default:
          throw("no display type for simple field type: " + fieldType);
      }
  }

  getIntDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Money);
    dts.push(DisplayType.Decimal);
    dts.push(DisplayType.CheckBox);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getDoubleDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Money);
    dts.push(DisplayType.Decimal);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getDecimalDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Money);
    dts.push(DisplayType.Decimal);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getTextDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Text);
    dts.push(DisplayType.RichText);
    dts.push(DisplayType.ExpressionEditor);    
    dts.push(DisplayType.Image);
    dts.push(DisplayType.Hidden);
    return dts;
  }

  getDateTimeDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.DateTime);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getOuterIdDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.DocumentDownload);
    dts.push(DisplayType.DocumentUploader);
    dts.push(DisplayType.Hidden);
    return dts;
  }

  getCollectionDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.CascadeComboBox);
    dts.push(DisplayType.ComboBox);
    dts.push(DisplayType.DropDown);
    dts.push(DisplayType.ListBox);
    dts.push(DisplayType.Hidden);
    return dts;
  }

  getBooleanDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.CheckBox);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getEntityReferenceDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Form);
    dts.push(DisplayType.ComboBox);
    dts.push(DisplayType.AutoCompleteBox);
    dts.push(DisplayType.RadioButton);
    dts.push(DisplayType.Tree);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getEntityCollectionDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();    
    dts.push(DisplayType.ListBox);
    dts.push(DisplayType.CheckBoxGroup);
    dts.push(DisplayType.Tree);
    dts.push(DisplayType.CascadeComboBox);
    dts.push(DisplayType.DropDown);
    dts.push(DisplayType.Hidden);
    return dts;
  }
  
  getCalculatedDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Hidden);
    return dts;
  }

  getAssociationDisplayTypes():DisplayType[]
  {
    let dts = new Array<DisplayType>();
    dts.push(DisplayType.Hidden);
    return dts;
  }
  

}
