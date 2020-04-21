import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { EntityDefinitionService,ConstantsService,ConverterService, DynamicService, ErrorHandlerService, PropertiesService } from '../../../services';
import { FieldType, EntityDesignerMode } from '../../../models/enums';
import { BaseProperty } from '../../../models/properties';
import { EntityDefinition, EntityInstance, FieldDefinition, ItemSourceDefinition } from '../../../models/dtos';
import { CdkDragDrop, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { SimpleUiField,ComplexUiField } from '../../../models/ui';
import { GridOptions } from 'ag-grid-community';
import { AgGridOperationsHeaderComponent } from '../../common/ag-grid-operations-header/ag-grid-operations-header.component';
import { AgGridEntityPropertyCellRendererComponent } from '../../common/ag-grid-property-cell-renderer/ag-grid-entity-property-cell-renderer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertiesServiceFactory } from '../../../services/properties-factory.service';
import { MatDialog } from '@angular/material';
import { WarningDialogComponent } from '../../common/warning-dialog/warning-dialog.component';
import { PropertyNameConstants } from '../../../property-name-constants';
import { PropertyHandlerFactoryService } from '../../../services/property-handler-factory.service';

@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss']
})
export class EntityEditorComponent implements OnInit {
  
  isDirty:boolean;

  entityDesignerMode: EntityDesignerMode;
  entityDesignerModes = EntityDesignerMode;

  fieldTypes = FieldType;

  entityDefinition: EntityDefinition;

  index: number;
  
  simpleFields:SimpleUiField[];
  complexFields:ComplexUiField[];

  selectedFieldDefinition : FieldDefinition;

  simplePanelOpenState = false;
  complexPanelOpenState = false;

  public operationsHeaderComponent = AgGridOperationsHeaderComponent;
  public operationsCellComponent = AgGridEntityPropertyCellRendererComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,  
    private route: ActivatedRoute, 
    private entityDefinitionService: EntityDefinitionService, 
    private converterService: ConverterService, 
    private constantsService: ConstantsService, 
    private dynamicService: DynamicService,
    private propertiesService: PropertiesService,
    private errorHandlerService: ErrorHandlerService,
    private propertiesServiceFactory: PropertiesServiceFactory,
    private propertyHandlerFactoryService:PropertyHandlerFactoryService
    ) 
    { 
      this.isDirty = false;
      this.simplePanelOpenState = true;
      this.complexPanelOpenState = true;
      
      this.simpleFields = new Array<SimpleUiField>();
      this.complexFields = new Array<ComplexUiField>();

      this.index = 0;

      this.setSelectedDesignerUiField();
    }

  ngOnInit() {  
    this.dynamicService.clearFields();
    let entityDefinitionId = +this.route.snapshot.paramMap.get('id');
    this.entityDesignerMode = this.route.snapshot.data.editorMode;
    this.dynamicService.setEntityDesignerMode(this.entityDesignerMode);
    
    if(entityDefinitionId > 0){
      let that = this;
      this.entityDefinitionService.get(entityDefinitionId).then((response) =>
        {   
          that.converterService.loadEntityDefinition(response).then(ed =>{
            that.entityDefinition = ed;
            that.index = that.entityDefinition.fieldDefinitions.length;
          });
          
        }).catch((error) => {
          this.errorHandlerService.handle(error);
        });
    }else{
      this.entityDefinition = new EntityDefinition();
      this.entityDefinition.name = "";
      this.entityDefinition.fieldDefinitions = new Array<FieldDefinition>();
      this.entityDefinition.entityInstances = new Array<EntityInstance>();
    }
    this.reloadSimpleFields();
    this.reloadComplexFields();
  }
  reloadSimpleFields() {    
    this.simpleFields = this.constantsService.getSimpleFields();
  }
  reloadComplexFields() {
    this.entityDefinitionService.getAll().then((response) =>
        {
          this.complexFields = new Array<ComplexUiField>();
          response.forEach(r => this.complexFields.push(new ComplexUiField(r)));
          this.changeDetectorRef.detectChanges();
        }).catch((error) => {
          this.errorHandlerService.handle(error);
        });
  }
  

  public showItemProperties(selectedDesignerUiField:FieldDefinition):void{
    this.setSelectedDesignerUiField(selectedDesignerUiField);
  }

  onTypeChangedEvent(event):void{
    this.isDirty = true;
    let fieldDefinitionService = this.propertiesServiceFactory.getFieldDefinitionServiceOfFieldType(this.selectedFieldDefinition.fieldType);
    fieldDefinitionService.loadProperties(this.selectedFieldDefinition,this.selectedFieldDefinition.properties);
    //this.propertiesService.reloadFieldDefinition(this.selectedFieldDefinition);
    
    this.gridOptions.api.setRowData(this.selectedFieldDefinition.properties);
    this.changeDetectorRef.detectChanges();
    //this.selectedFieldDefinition.typeChangedEvent.subscribe(event => this.onTypeChangedEvent(event));
  }

  public removeDesignerItem(data:FieldDefinition):void{
    this.isDirty = true;
    this.setSelectedDesignerUiField(data);
    const index = this.entityDefinition.fieldDefinitions.indexOf(data, 0);
    if (index > -1) {
      this.setSelectedDesignerUiField();
      this.dynamicService.removeField(data);
      this.entityDefinition.fieldDefinitions.splice(index, 1);
    }
  }  
  public getDesignType(data:FieldDefinition):string{
    //console.log(data);
    return this.converterService.getDesignType(data);
  }
  public getDesignName(data:FieldDefinition):string{
    return this.converterService.getDesignName(data);
  }

  makeDirty(property:BaseProperty<any>){
    this.isDirty = true;
  }

  async gridValueChanged(property:BaseProperty<any>):Promise<void>{
    
    let fieldDefinitionService = this.propertiesServiceFactory.getFieldDefinitionServiceOfFieldType(this.selectedFieldDefinition.fieldType);
    if(property.name == PropertyNameConstants.TYPE ){
      this.selectedFieldDefinition.fieldType = property.value;
      await fieldDefinitionService.loadProperties(this.selectedFieldDefinition,this.selectedFieldDefinition.properties);
    }else if(property.name == PropertyNameConstants.ITEM_SOURCE ){
      this.selectedFieldDefinition.itemSourceDefinition.itemSourceEntityDefinitionId = property.value;
      await fieldDefinitionService.loadProperties(this.selectedFieldDefinition,this.selectedFieldDefinition.properties);
      //this.selectedFieldDefinition.uiItemSourceEntityDefinitionId = property.value;
    }
    //console.log(this.selectedFieldDefinition.fieldType);
  }

  public addSimpleFieldToDesignerFields(data: SimpleUiField,insertIndex:number):void{
    this.isDirty = true;
    this.index = this.index + 1;
    let that = this;
    this.converterService.createFieldDefinition(data,this.index).then(fd =>{
      let fieldDefinition = fd;
      if(insertIndex >= 0){
        that.entityDefinition.fieldDefinitions.splice(insertIndex,0,fieldDefinition);
      }else{
        that.entityDefinition.fieldDefinitions.push(fieldDefinition);
      }
      that.dynamicService.addField(fieldDefinition);
      that.setSelectedDesignerUiField(fieldDefinition);
    });
  }

  public addComplexFieldToDesignerFields(data: ComplexUiField,insertIndex:number):void{
    this.isDirty = true;
    this.index = this.index + 1;
    let that = this;
    this.converterService.createFieldDefinition(data,this.index).then(fd =>{
      let fieldDefinition = fd;
      fieldDefinition.timestamp = data.timestamp;
      if(insertIndex >= 0){
        that.entityDefinition.fieldDefinitions.splice(insertIndex,0,fieldDefinition);
      }else{
        that.entityDefinition.fieldDefinitions.push(fieldDefinition);
      }
      that.dynamicService.addField(fieldDefinition);
      that.setSelectedDesignerUiField(fieldDefinition);

    });
  }

  public drop(event: CdkDragDrop<string[]>):void {
    this.isDirty = true;
    let oldIndex = event.previousIndex;
    let newIndex = event.currentIndex;
    if(event.previousContainer.id == "simpleFields"){
      if(this.simpleFields.filter(i => i.fieldType==event.item.data.type).length == 2){
        let index = this.simpleFields.findIndex(i => i.fieldType==event.item.data.type);
        this.simpleFields.splice(index+1, 1);
      } 
      let element = this.simpleFields[oldIndex];
      this.addSimpleFieldToDesignerFields(element,newIndex);
    }else if(event.previousContainer.id == "complexFields"){
      if(this.complexFields.filter(i => i.fieldType==event.item.data.type).length == 2){
        let index = this.complexFields.findIndex(i => i.fieldType==event.item.data.type);
        this.complexFields.splice(index+1, 1);
      } 
      let element = this.complexFields[oldIndex];
      this.addComplexFieldToDesignerFields(element,newIndex);
    }
  }
  
  dropListEntered(event: CdkDragEnter) {
    if(event.item.data instanceof SimpleUiField && this.simpleFields.filter(i => i.fieldType==event.item.data.type).length == 1){
      let index = this.simpleFields.findIndex(i => i.fieldType==event.item.data.type);
      this.simpleFields.splice(index, 0, event.item.data);
    }else if(event.item.data instanceof ComplexUiField && this.complexFields.filter(i => i.fieldType==event.item.data.type).length == 1){
      let index = this.complexFields.findIndex(i => i.fieldType==event.item.data.type);
      this.complexFields.splice(index, 0, event.item.data);
    }
  }
  dropListExited(event: CdkDragExit){
    if(event.item.data instanceof SimpleUiField && this.simpleFields.filter(i => i.fieldType==event.item.data.type).length == 2){
      let index = this.simpleFields.findIndex(i => i.fieldType==event.item.data.type);
      this.simpleFields.splice(index+1, 1);
    }else if(event.item.data instanceof ComplexUiField && this.complexFields.filter(i => i.fieldType==event.item.data.type).length == 2){
      let index = this.complexFields.findIndex(i => i.fieldType==event.item.data.type);
      this.complexFields.splice(index+1, 1);
    } 
  }

  immediateBind(){
    this.isDirty = true;
    // if(this.selectedFormControl && this.selectedFormControl.displayType){
    this.propertyHandlerFactoryService.getPropertyHandlerService(this.selectedFieldDefinition).convertUiProperties(this.selectedFieldDefinition);
    //   this.dynamicService.updateFormControl(this.selectedFormControl);
    //   this.renderDynaForm(this.formDefinition,this.entityInstance);
    // }else{
    //   this.propertyHandlerFactoryService.getPropertyHandlerService(this.formDefinition).convertUiProperties(this.formDefinition);
    // }
  }

  public save():void {
    let that = this;
    let entityDefinitionId = this.entityDefinition.id;
    this.entityDefinitionService.save(this.entityDefinition).then((response) =>
    {
      that.dynamicService.clearFields();
      if(entityDefinitionId>0){
        that.converterService.loadEntityDefinition(response).then(ed =>{
          that.isDirty = false;
          that.entityDefinition = ed;
          that.setSelectedDesignerUiField();
        });
      }else{
        this.router.navigate(['entity/editor/modify',response.id]);
      }
      
    }).catch((error) => {
      this.errorHandlerService.handle(error);
    });;
  }

  public done():void {
    if(this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.View){
      let that = this;
      this.entityDefinitionService.save(this.entityDefinition).then((response) =>
      {
        that.dynamicService.clearFields();
        this.router.navigate(['entities']);
      }).catch((error) => {
        this.errorHandlerService.handle(error);
      });
    }else{
      this.router.navigate(['entities']);
    }
  }
  
  isEntityNameUsed():boolean{
    return this.complexFields.filter(c => c.name == this.entityDefinition.name && (c.id != this.entityDefinition.id)).length > 0;
  }

  public cancel():void {
    if(this.isDirty){
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        width: '400px',
        height: '250px',
        data: {title: "Warning", message: "The form has been modified. Are you sure to continue?"}
      }).afterClosed().subscribe(response => {
        if(response){
          this.entityDefinition = null;
          this.router.navigate(['entities']);
        }
      });
    }else{      
      this.entityDefinition = null;
      this.setSelectedDesignerUiField();
      this.router.navigate(['entities']);
    }
  }

  isCancelVisible():boolean{
    return this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.View;
  }
  isDoneVisible():boolean{
    return true;
  }
  isSaveVisible():boolean{
    return this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.View;
  }
  isCancelDisabled():boolean{
    return false;
  }
  isDoneDisabled():boolean{
    return (!this.formIsValid() || !this.isDirty) && this.dynamicService.getEntityDesignerMode() != EntityDesignerMode.View;
  }
  isSaveDisabled():boolean{
    return !this.formIsValid() || !this.isDirty;
  }
  onEntityNameChanged($event):void{
    this.isDirty = true;
  }
  formIsValid(): boolean {
    return this.entityDefinition.name != null && this.entityDefinition.name.length >= 3 && !this.isEntityNameUsed() && this.dynamicService.allFieldNameUnique();
  }

  setSelectedDesignerUiField(selectedDesignerUiField: FieldDefinition = null):void{
    if(selectedDesignerUiField == null){
      this.selectedFieldDefinition = new FieldDefinition();
      this.selectedFieldDefinition.properties = new Array<BaseProperty<any>>();
    }else{
      this.selectedFieldDefinition = selectedDesignerUiField;
      // console.log(this.selectedFieldDefinition);
      // this.selectedFieldDefinition.typeChangedEvent.subscribe(event => this.onTypeChangedEvent(event));
    }
  }

  onCellValueChanged(event):void{

  }
  protected gridOptions: GridOptions = {
      // enableSorting: false,
      // enableFilter: false,
      unSortIcon: false,
      suppressCellSelection: true,
      enableColResize: false,
      rowSelection: 'single',
      domLayout: 'normal',
      accentedSort: true,
      suppressHorizontalScroll: true,
      onCellValueChanged: function(event) {
        this.onCellValueChanged(event);
      },
      context: {
        itemOperations: {
        },
        componentParent: this
      },
  };

}
