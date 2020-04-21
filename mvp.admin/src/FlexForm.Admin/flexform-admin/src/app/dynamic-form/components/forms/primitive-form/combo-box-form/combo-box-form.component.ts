import {Component, Input, OnInit} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule} from '@angular/forms'
import { PrimitiveFormComponent } from '../primitive-form.component';
import { CollectionFormController } from '../../../../../dynamic-form/models/collection-form.controller';
import { CollectionFormModel } from '../../../../../dynamic-form/models/collection-form.model';
import { EntityInstance } from '../../../../../models/dtos/entity-instance.model';
import { BasePropertyConverterService } from '../../../../../services/property-handler/base-property-handler.service';
import { PropertyNameConstants } from '../../../../../property-name-constants';
import { EntityDefinitionService } from '../../../../../services/entity-definition.service';
import { CollectionFormComponent } from '../collection-form.component';


export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  TAB_KEY = 9,
  ENTER = 13
}

@Component({
  selector: 'app-combo-box-form',
  templateUrl: './combo-box-form.component.html',
  styleUrls: ['./combo-box-form.component.css']
})
export class ComboBoxFormComponent extends CollectionFormComponent implements OnInit {

  constructor(protected basePropertyConverterService:BasePropertyConverterService,
    protected entityDefinitionService:EntityDefinitionService) {
    super(basePropertyConverterService,entityDefinitionService);
  }

  // async ngOnInit() {
  //   (<CollectionFormModel>this.model).items = await (<CollectionFormController>this.controller).itemSourceService.itemSource(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition);
  //   let fieldDefinitionId = this.basePropertyConverterService.getValue(this.view.viewDefinition.uiProperties,PropertyNameConstants.PROPERTIES);
  //   let ed = await this.entityDefinitionService.get(this.view.viewDefinition.formControlBinding.fieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId);
  //   let fieldDefinitionIndex = ed.fieldDefinitions.findIndex(fd => fd.id == fieldDefinitionId);
  //   if(fieldDefinitionIndex >= 0){
  //     this.columnName = ed.fieldDefinitions[fieldDefinitionIndex].name;
  //   }      
  //   this.textValue = this.model.value[this.columnName];
  //   this.reset();
  // }

  postNgOnInit(): Promise<void> {
    this.textValue = "";
    this.reset();
    return Promise.resolve();
  }

  textValue:any;

  get dataList(){
    return (<CollectionFormModel>this.model).items;
  }
  
  columnName: string;

  dummyDataList: EntityInstance[];
  showDropDown: boolean;
  counter:number;

  onFocusEventAction():void {
    this.counter = -1;
  }
  onBlurEventAction(): void{
    this.showDropDown = false;
  }

  onKeyDownAction(event: KeyboardEvent):void {
    this.showDropDown = true;
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.counter = (this.counter === 0)?this.counter:--this.counter;
      this.checkHighlight(this.counter);
      this.textValue = this.getDisplayText( this.dataList[this.counter]);
      //this.dataList[this.counter][this.columnName];
    }
    else if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.counter = (this.counter === this.dataList.length-1)?this.counter:++this.counter;
      this.checkHighlight(this.counter);
      this.textValue = this.getDisplayText( this.dataList[this.counter]);
    }
    else if (event.keyCode === KEY_CODE.ENTER) {
      this.textValue = this.getDisplayText( this.dataList[this.counter]);
      this.showDropDown = false;
    }
  }

  checkHighlight(currentItem):boolean{
    if(this.counter === currentItem) return true;
    else return false;
  }
  
  toogleDropDown():void {
    this.showDropDown = !this.showDropDown;
  }

  reset(): void{
    this.showDropDown = false;
    this.dummyDataList = this.dataList;
  }

  textChange(value){
    if(value.length >0){
      if(this.dummyDataList)
      {
        this.showDropDown = true;
      }
    } else {
      this.reset();
    }
  }

  updateTextBox(valueSelected){
    this.textValue = this.getDisplayText(valueSelected);
    this.showDropDown = false;
  }
}