import { Injectable } from '@angular/core';
import { SimpleUiField } from '../models/ui/simple-ui-field.model';
import { FieldType, NonBinding, DisplayType, FormType } from '../models/enums';
import { DynamicService } from './dynamic.service';
import { NonBindingUiField } from '../models/ui/non-binding-ui-field.model';
import { FieldTypeDisplayTypeCompatibilityService } from './field-type-display-type-compatibility.service';
import { HorizontalAlignment } from '../models/enums/horizontal-alignment.enum';
import { VerticalAlignment } from '../models/enums/vertical-alignment.enum';
import { DropDownElement } from '../models/properties';
import { VisualTemplate } from '../models/enums/visual-template.enum';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  initVerticalAlignments() {    
    this.verticalAlignments = new Array<VerticalAlignment>();
    this.verticalAlignments.push(VerticalAlignment.Top);
    this.verticalAlignments.push(VerticalAlignment.Middle);
    this.verticalAlignments.push(VerticalAlignment.Buttom);
  }
  initHorizontalAlignment() {
    this.horizontalAlignments = new Array<HorizontalAlignment>();
    this.horizontalAlignments.push(HorizontalAlignment.Left);
    this.horizontalAlignments.push(HorizontalAlignment.Center);
    this.horizontalAlignments.push(HorizontalAlignment.Right);
  }
  
  formTypes: Array<FormType>;
  fieldTypes: Array<FieldType>;
  nonBindings: Array<NonBinding>;
  displayTypes: Array<DisplayType>;
  horizontalAlignments: Array<HorizontalAlignment>;
  verticalAlignments: Array<VerticalAlignment>;

  constructor(private dynamicService: DynamicService, private fieldTypeDisplayTypeCompatibilityService:FieldTypeDisplayTypeCompatibilityService) { 
    this.initFieldTypes();
    this.initNonBindings();
    this.initDisplayTypes();
    this.initFormTypes();
    this.initVerticalAlignments();
    this.initHorizontalAlignment();
  }

  getTemplatesForDisplayType(displayType:DisplayType):DropDownElement[]{
    let result = new Array<DropDownElement>();
    switch(displayType){
      case DisplayType.Text:
        result.push(new DropDownElement(VisualTemplate.SingleLineText,"Single line text"));
        result.push(new DropDownElement(VisualTemplate.MultiLineText,"Multi line text"));
        break;
      case DisplayType.CheckBox:
        result.push(new DropDownElement(VisualTemplate.CheckBox,"Checkbox"));
        result.push(new DropDownElement(VisualTemplate.SwitchButton,"Switch button"));
        break;
      case DisplayType.Link:
        result.push(new DropDownElement(VisualTemplate.LinkText,"Link text"));
        result.push(new DropDownElement(VisualTemplate.LinkButton,"Link button"));
        break;
      case DisplayType.DateTime:
        result.push(new DropDownElement(VisualTemplate.DateBox,"Datebox"));
        result.push(new DropDownElement(VisualTemplate.DatePicker,"Date picker"));
        result.push(new DropDownElement(VisualTemplate.DateTimeBox,"Datetimebox"));
        result.push(new DropDownElement(VisualTemplate.DateTimePicker,"Datetime picker"));
        result.push(new DropDownElement(VisualTemplate.TimeBox,"Time box"));
        result.push(new DropDownElement(VisualTemplate.TimePicker,"Datetime picker"));
        break;
      default:
        break;
    }
    return result;
  }
  
  initFormTypes() {
    this.formTypes = new Array<FormType>();
    this.formTypes.push(FormType.Edit);
    this.formTypes.push(FormType.View);
    this.formTypes.push(FormType.List);
  }

  initDisplayTypes() {
    this.displayTypes = new Array<DisplayType>();
    this.displayTypes.push(DisplayType.AutoCompleteBox);
    this.displayTypes.push(DisplayType.Button);
    this.displayTypes.push(DisplayType.Breadcrumb);
    this.displayTypes.push(DisplayType.CascadeComboBox);
    this.displayTypes.push(DisplayType.CheckBox);
    this.displayTypes.push(DisplayType.ComboBox);
    this.displayTypes.push(DisplayType.DataGrid);
    this.displayTypes.push(DisplayType.DateTime);
    this.displayTypes.push(DisplayType.DocumentDownload);
    this.displayTypes.push(DisplayType.DocumentUploader);
    this.displayTypes.push(DisplayType.DropDown);
    this.displayTypes.push(DisplayType.ExpressionEditor);
    this.displayTypes.push(DisplayType.Hidden);
    this.displayTypes.push(DisplayType.Icon);
    this.displayTypes.push(DisplayType.Label);
    this.displayTypes.push(DisplayType.Link);
    this.displayTypes.push(DisplayType.CheckBoxGroup);
    this.displayTypes.push(DisplayType.ListBox);
    this.displayTypes.push(DisplayType.Money);
    this.displayTypes.push(DisplayType.Decimal);
    this.displayTypes.push(DisplayType.RadioButton);
    this.displayTypes.push(DisplayType.RichText);
    this.displayTypes.push(DisplayType.Text);
    this.displayTypes.push(DisplayType.Tree);
    this.displayTypes.push(DisplayType.Image);
    this.displayTypes.push(DisplayType.Form);
    this.displayTypes.push(DisplayType.Panel);
  }

  initNonBindings() {
    this.nonBindings = new Array<NonBinding>();
    this.nonBindings.push(NonBinding.Panel);
    this.nonBindings.push(NonBinding.Icon);
    this.nonBindings.push(NonBinding.Link);
    this.nonBindings.push(NonBinding.Button);
    this.nonBindings.push(NonBinding.Label);
    this.nonBindings.push(NonBinding.Breadcrumb);
  }

  initFieldTypes() {
    this.fieldTypes = new Array<FieldType>();
    this.fieldTypes.push(FieldType.Identity);
    this.fieldTypes.push(FieldType.Int);
    this.fieldTypes.push(FieldType.Double);
    this.fieldTypes.push(FieldType.Decimal);
    this.fieldTypes.push(FieldType.Text);
    this.fieldTypes.push(FieldType.DateTime);
    this.fieldTypes.push(FieldType.OuterId);
    this.fieldTypes.push(FieldType.Calculated);
    this.fieldTypes.push(FieldType.Boolean);
    this.fieldTypes.push(FieldType.EntityReference);
    this.fieldTypes.push(FieldType.EntityCollection);
    this.fieldTypes.push(FieldType.Collection);
    this.fieldTypes.push(FieldType.Association);
  }

  getFormTypes():FormType[]{
    return this.formTypes;
  }
  getHorizontalAlignments():HorizontalAlignment[]{
    return this.horizontalAlignments;
  }
  getVerticalAlignments():VerticalAlignment[]{
    return this.verticalAlignments;
  }
  getHorizontalAlignmentName(horizontalAlignment: HorizontalAlignment): string {
    switch(horizontalAlignment){
      case HorizontalAlignment.Left: return "Left";
      case HorizontalAlignment.Center: return "Center";
      case HorizontalAlignment.Right: return "Right";
      default:
        throw("HorizontalAlignment not exist: "+horizontalAlignment);
    }
  }
  getVerticalAlignmentName(verticalAlignment: VerticalAlignment): string {
    switch(verticalAlignment){
      case VerticalAlignment.Top: return "Top";
      case VerticalAlignment.Middle: return "Middle";
      case VerticalAlignment.Buttom: return "Buttom";
      default:
        throw("VerticalAlignment not exist: "+verticalAlignment);
    }
  }
  getFormTypeName(formType: FormType): string {
    switch(formType){
      case FormType.Edit: return "Edit";
      case FormType.View: return "View";
      case FormType.List: return "List";
      default:
        throw("formtype not exist: "+formType);
    }
  }

  getDefaultDisplayType(fieldType: FieldType):DisplayType{
    let displayTypes = this.fieldTypeDisplayTypeCompatibilityService.getDisplayType(fieldType);
    if(displayTypes.length == 0){
      throw("no displaytype for fieldType: " + fieldType);
    }else{
      return displayTypes[0];
    }    
  }

  getNonBindings():Array<NonBinding>{
    return this.nonBindings;
  }

  public getNonBindingUiFields():NonBindingUiField[]{
    let sf = new Array<NonBindingUiField>();
    sf.push(new NonBindingUiField(this.getNonBindingName(NonBinding.Panel),NonBinding.Panel,this.getNonBindingColor(NonBinding.Panel)));
    sf.push(new NonBindingUiField(this.getNonBindingName(NonBinding.Icon),NonBinding.Icon,this.getNonBindingColor(NonBinding.Icon)));
    sf.push(new NonBindingUiField(this.getNonBindingName(NonBinding.Link),NonBinding.Link,this.getNonBindingColor(NonBinding.Link)));
    sf.push(new NonBindingUiField(this.getNonBindingName(NonBinding.Button),NonBinding.Button,this.getNonBindingColor(NonBinding.Button)));
    sf.push(new NonBindingUiField(this.getNonBindingName(NonBinding.Label),NonBinding.Label,this.getNonBindingColor(NonBinding.Label)));
    sf.push(new NonBindingUiField(this.getNonBindingName(NonBinding.Breadcrumb),NonBinding.Breadcrumb,this.getNonBindingColor(NonBinding.Breadcrumb)));
    return sf;
  }
  getNonBindingColor(nonBinding: NonBinding): string {
    switch(nonBinding){
      case NonBinding.Panel: return "#abc2e8";
      case NonBinding.Icon: return "#abc2e8";
      case NonBinding.Link: return "#abc2e8";
      case NonBinding.Button: return "#abc2e8";
      case NonBinding.Label: return "#abc2e8";
      case NonBinding.Breadcrumb: return "#abc2e8";
      default:
        throw("non binding color not exist"+nonBinding);
    }
  }
  getDisplayTypeName(displayType: DisplayType): string {
    switch(displayType){
      case DisplayType.AutoCompleteBox: return "Autocompletebox";
      case DisplayType.Button: return "Button";
      case DisplayType.Breadcrumb: return "Breadcrumb";
      case DisplayType.CascadeComboBox: return "Cascade combobox";
      case DisplayType.CheckBox: return "Checkbox";
      case DisplayType.ComboBox: return "Combobox";
      case DisplayType.DataGrid: return "Datagrid";
      case DisplayType.DateTime: return "DateTime";
      case DisplayType.DocumentDownload: return "Document download";
      case DisplayType.DocumentUploader: return "Document uploader";
      case DisplayType.DropDown: return "Dropdown";
      case DisplayType.ExpressionEditor: return "Expression editor";
      case DisplayType.Hidden: return "Hidden";
      case DisplayType.Icon: return "Icon";
      case DisplayType.Label: return "Label";
      case DisplayType.Link: return "Link";
      case DisplayType.CheckBoxGroup: return "Checkbox group";
      case DisplayType.ListBox: return "Listbox";
      case DisplayType.Money: return "Money";
      case DisplayType.Decimal: return "Decimal";
      case DisplayType.RadioButton: return "Radiobutton";
      case DisplayType.RichText: return "Richtext";
      case DisplayType.Text: return "Text";
      case DisplayType.Tree: return "Tree";
      case DisplayType.Image: return "Image";
      case DisplayType.Form: return "Form";
      case DisplayType.Panel: return "Panel";
      default:
        throw("displayType name not exist"+displayType);
    }
  }
  getNonBindingName(nonBinding: NonBinding): string {
    switch(nonBinding){
      case NonBinding.Panel: return "Panel";
      case NonBinding.Icon: return "Icon";
      case NonBinding.Link: return "Link";
      case NonBinding.Button: return "Button";
      case NonBinding.Label: return "Label";
      case NonBinding.Breadcrumb: return "Breadcrumb";
      default:
        throw("non binding name not exist"+nonBinding);
    }
  }

  getFieldTypes():Array<FieldType>{
    return this.fieldTypes;
  }

  getSimples():Array<FieldType>{
   return this.getFieldTypes().filter(t => this.isSimpleFieldType(t)); 
  }

  isSimpleFieldType(fieldType: FieldType):boolean{
    switch(fieldType){
      case(FieldType.Identity):
      case(FieldType.Int):
      case(FieldType.Double):
      case(FieldType.Decimal):
      case(FieldType.Text):
      case(FieldType.DateTime):
      case(FieldType.OuterId):
      case(FieldType.Calculated):
      case(FieldType.Boolean):
        return true;
      default: return false;
    }
  }

  getComplexes():Array<FieldType>{
   return this.getFieldTypes().filter(t => this.isComplexFieldType(t)); 
  }
  
  isComplexFieldType(fieldType: FieldType):boolean{
    switch(fieldType){
      case(FieldType.Association):
      case(FieldType.Collection):
      case(FieldType.EntityCollection):
      case(FieldType.EntityReference):
        return true;
      default: return false;
    }
  }

  isCollectionFieldType(fieldType: FieldType):boolean{
    switch(fieldType){
      case(FieldType.Collection):
      case(FieldType.EntityCollection):
      case(FieldType.EntityReference):
        return true;
      default: return false;
    }
  }

  public getSimpleFields():SimpleUiField[]{
    let sf = new Array<SimpleUiField>();
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.Int),FieldType.Int,this.getFieldTypeColor(FieldType.Int)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.Double),FieldType.Double,this.getFieldTypeColor(FieldType.Double)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.Decimal),FieldType.Decimal,this.getFieldTypeColor(FieldType.Decimal)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.Text),FieldType.Text,this.getFieldTypeColor(FieldType.Text)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.DateTime),FieldType.DateTime, this.getFieldTypeColor(FieldType.DateTime)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.OuterId),FieldType.OuterId,this.getFieldTypeColor(FieldType.OuterId)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.Calculated),FieldType.Calculated,this.getFieldTypeColor(FieldType.Calculated)));
    sf.push(new SimpleUiField(this.getFieldTypeName(FieldType.Boolean),FieldType.Boolean,this.getFieldTypeColor(FieldType.Boolean)));
    return sf;
  }
  public getFieldTypeColor(fieldType:FieldType):string{
    switch(fieldType){
      case FieldType.Identity : return "#FFFFFF";
      case FieldType.Int : return "#F5F5DC";
      case FieldType.Double : return "#FAEBD7";
      case FieldType.Decimal : return "#FFE4C4";
      case FieldType.Text : return "#BDB76B";
      case FieldType.DateTime : return "#00CED1";
      case FieldType.OuterId : return "#FFC0CB";
      case FieldType.Calculated : return "#B0C4DE";
      case FieldType.Boolean : return "#ff8080";
      case FieldType.EntityReference : return "#DCDCDC";
      case FieldType.EntityCollection : return "#DCDCDC";
      case FieldType.Collection : return "#DCDCDC";
      case FieldType.Association : return "#DCDCDC";
      default: return "";
    }
  }

  public getFieldTypeName(fieldType:FieldType):string{
    switch(fieldType){
      case FieldType.Identity : return "Identity";
      case FieldType.Int : return "Int";
      case FieldType.Double : return "Double";
      case FieldType.Decimal : return "Decimal";
      case FieldType.Text : return "Text";
      case FieldType.DateTime : return "DateTime";
      case FieldType.EntityReference : return "EntityReference";
      case FieldType.OuterId : return "OuterId";
      case FieldType.EntityCollection : return "EntityCollection";
      case FieldType.Collection : return "Collection";
      case FieldType.Calculated : return "Calculated";
      case FieldType.Association : return "Association";
      case FieldType.Boolean : return "Boolean";
      default: return "";
    }
  }
}
