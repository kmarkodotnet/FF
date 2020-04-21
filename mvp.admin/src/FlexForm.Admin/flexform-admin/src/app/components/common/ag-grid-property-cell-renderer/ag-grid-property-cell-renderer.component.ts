import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { AgGridPropertyType } from '../../../models/enums';
import { BaseProperty, BooleanProperty, NumberProperty, StringProperty, DropDownListProperty, ConstantProperty } from '../../../models/properties';
import { PropertyNameConstants } from '../../../property-name-constants';


// @Component({
//   selector: 'app-ag-grid-property-cell-renderer',
//   templateUrl: './ag-grid-property-cell-renderer.component.html',
//   styleUrls: ['./ag-grid-property-cell-renderer.component.css']
// })
export abstract class AgGridPropertyCellRendererComponent implements AgRendererComponent {
    
  isValid:boolean;
  agGridPropertyTypes = AgGridPropertyType;
  public params: ICellRendererParams;
  public context: BaseProperty<any>;
  agGridPropertyType: AgGridPropertyType;
  isCollection: boolean;
  propertyNameConstants=PropertyNameConstants;
  public constructor(
    //private constantsService: ConstantsService, private dynamicService: DynamicService
    ) { 
    this.refresh = this.refresh.bind(this);
    this.isValid = true;
  }

  ngOnInit() {

  }

  public refresh(params: any): boolean {
    this.context = params.data;
    this.params = params;
    this.init();
    return true;
  }

  public agInit(params: ICellRendererParams): void {
    this.context = params.data;
    this.params = params;
    this.init();
  }

  init():void{
    
    this.isCollection = false;
    if(this.context instanceof ConstantProperty){
      this.agGridPropertyType = AgGridPropertyType.Constant;
    }else if(this.context instanceof BooleanProperty){
      this.agGridPropertyType = AgGridPropertyType.CheckBox;
    }else if(this.context instanceof NumberProperty){
      this.agGridPropertyType = AgGridPropertyType.Number;
    }else if(this.context instanceof StringProperty){
      this.agGridPropertyType = AgGridPropertyType.Text;
    }else if(this.context instanceof DropDownListProperty){
      this.agGridPropertyType = AgGridPropertyType.DropDown;
      this.isCollection = true;
    }else {
      //throw "Unknown property data type"
    }
    this.validate();
  }

  valueChanged(){
    this.params.context.componentParent.makeDirty(this.context);
    if(this.context.emitIfChanged && this.params.context.componentParent){
      this.params.context.componentParent.gridValueChanged(this.context);
    }
  }

  onKey(event: any) { // without type info
    this.params.context.componentParent.makeDirty(this.context);
    if(this.context.isImmediateBind){
      if(this.params.context.componentParent && this.params.context.componentParent.immediateBind){
        this.params.context.componentParent.immediateBind();
        this.validate();
      }
    }
  }

  onDropdownChanged():void{
    this.valueChanged();
  }

  onCheckBoxChanged():void{
    this.valueChanged();
  }

  onNumberChanged():void{
    this.valueChanged();
  }

  onTextChange(){
    // this.validate();
    // this.valueChanged();
  }

  validate() {
    throw("validate() is not implemented");
    // if(this.dynamicService.isFieldNameUsed(this.context.value)){
    //   this.isValid = false;
    // }else{
    //   this.isValid = true;
    // }
  }
  abstract isReadonly():boolean;
}
