import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Router, ActivatedRoute } from '@angular/router';
import { FormDefinition, FieldDefinition, FormControl, EntityDefinition, EntityInstance } from '../../../models/dtos';
import { FormDesignerMode, EntityDesignerMode } from '../../../models/enums';
import { ConverterService, EntityDefinitionService, ErrorHandlerService, FormDefinitionService, ConstantsService, DynamicService } from '../../../services';
import { NonBindingUiField } from '../../../models/ui/non-binding-ui-field.model';
import { BaseProperty } from '../../../models/properties';
import { AgGridOperationsHeaderComponent } from '../../common/ag-grid-operations-header/ag-grid-operations-header.component';
import { AgGridFormPropertyCellRendererComponent } from '../../common/ag-grid-property-cell-renderer/ag-grid-form-property-cell-renderer.component';
import { CdkDragDrop, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { PropertyHandlerFactoryService } from '../../../services/property-handler-factory.service';
import { MatDialog } from '@angular/material';
import { WarningDialogComponent } from '../../common/warning-dialog/warning-dialog.component';
import { PropertyNameConstants } from '../../../property-name-constants';
import { DynamicFormHostComponent } from "../../../dynamic-form/components/dynamic-form-host/dynamic-form-host.component";
import { EditorDynamicFormHostComponent } from '../../../dynamic-form/components/editor-dynamic-form-host/editor-dynamic-form-host.component';
import { copyArrayItem } from '@angular/cdk/drag-drop';
import { TestDataService } from '../../../services/test-data.service';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {
  @ViewChild('host') host: EditorDynamicFormHostComponent;
  
  isDirty:boolean;

  isItemClicked: boolean;
  showFormDefinitionProperties:boolean;
  selectedFormControl: FormControl;

  formDefinition:FormDefinition;
  entityInstance:EntityInstance;

  formDesignerMode:FormDesignerMode;
  formDesignerModes=FormDesignerMode;

  nonBindingUiFields:NonBindingUiField[];
  fieldDefinitions: FieldDefinition[];
  index:number;

  public operationsHeaderComponent = AgGridOperationsHeaderComponent;
  public operationsCellComponent = AgGridFormPropertyCellRendererComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,  
    private route: ActivatedRoute,
    private converterService: ConverterService,
    private constantsService: ConstantsService,
    private dynamicService: DynamicService,
    private entityDefinitionService: EntityDefinitionService, 
    private formDefinitionService: FormDefinitionService,
    private errorHandlerService: ErrorHandlerService,
    private propertyHandlerFactoryService:PropertyHandlerFactoryService,
    private testDataService:TestDataService
    ) { 
      this.fieldDefinitions=new Array<FieldDefinition>();
      this.index = 0;
      this.isItemClicked = false;
      this.showFormDefinitionProperties=true;
      this.isDirty = false;
    }

  ngOnInit() {
    this.dynamicService.clearFormControls();
    let id = +this.route.snapshot.paramMap.get('id');
    this.formDesignerMode = this.route.snapshot.data.editorMode;
    this.dynamicService.setFormDesignerMode(this.formDesignerMode);
    this.dynamicService.setEntityDesignerMode(EntityDesignerMode.View);
    this.reloadNonBindingUiFields();
    if(this.formDesignerMode == FormDesignerMode.New){
      let that = this;
      this.entityDefinitionService.get(id).then((response) =>
        {   
          that.converterService.loadEntityDefinition(response).then(entityDefinition =>{
            that.fieldDefinitions = entityDefinition.fieldDefinitions;
            that.converterService.createFormDefinitionFromEntityDefinition(entityDefinition).then(resp =>{
              that.reload(resp);
            });         
          });
          
        }).catch((error) => {
          this.errorHandlerService.handle(error);
        });
    } else
    {
      let that = this;
      this.formDefinitionService.get(id).then((response) =>
        {
          this.entityDefinitionService.get(response.entityDefinitionId).then((entityDefinition) =>
          {
            response.entityDefinition = entityDefinition;
            that.fieldDefinitions = entityDefinition.fieldDefinitions;            
            that.converterService.loadFormDefinition(response).then(resp =>{
              that.reload(resp);
            });
          }).catch((error) => {
            that.errorHandlerService.handle(error);
          });
          
        }).catch((error) => {
          that.errorHandlerService.handle(error);
        });
    }
  }

  async reload(formDefinition):Promise<void>{
    this.formDefinition = formDefinition;
    if(!this.entityInstance){
      await this.testDataService.get(this.formDefinition.entityDefinitionId).then(entityInstance =>
        {
          this.entityInstance = entityInstance;
        }
      );
    }
    this.renderDynaForm(this.formDefinition,this.entityInstance).then(()=>{
      this.index= this.formDefinition.formControls.length;
      this.setSelectedFormControl();
    });    
  }

  itemSelected(event:FormControl):void{
    this.showItemProperties(event);
  }
  
  itemRemoved(event:FormControl):void{
    this.removeFormControl(event);
  }

  async renderDynaForm(formDefinition:FormDefinition,entityInstance:EntityInstance):Promise<void>{
    if(formDefinition)
    {
      await this.host.render(formDefinition,entityInstance);
    }
  }

  formNameChanged():void{
    let index = this.formDefinition.uiProperties.findIndex(u=>u.name==PropertyNameConstants.FORM_NAME);
    if(index>=0){
      this.isDirty = true;
      this.formDefinition.uiProperties[index].value = this.formDefinition.formName;
    }
  }

  makeDirty(property:BaseProperty<any>){
    this.isDirty = true;
  }

  gridValueChanged(property:BaseProperty<any>):void{
    if(this.selectedFormControl != null && this.selectedFormControl.displayType != null){
      this.converterService.reloadFormControl(this.selectedFormControl).then(newFormControl =>{
        this.dynamicService.updateFormControl(newFormControl);
        this.setSelectedFormControl(newFormControl);
        this.renderDynaForm(this.formDefinition,this.entityInstance);
      });
    }else{
      let that = this;
      this.converterService.reloadFormDefinition(this.formDefinition).then(formDefinition =>{
        this.formDefinition = formDefinition;
        this.renderDynaForm(this.formDefinition,this.entityInstance);
      })
    }    
  }

  immediateBind(){
    this.isDirty = true;
    if(this.selectedFormControl && this.selectedFormControl.displayType){
      this.propertyHandlerFactoryService.getPropertyHandlerService(this.selectedFormControl).convertUiProperties(this.selectedFormControl);
      this.dynamicService.updateFormControl(this.selectedFormControl);
      this.renderDynaForm(this.formDefinition,this.entityInstance);
    }else{
      this.propertyHandlerFactoryService.getPropertyHandlerService(this.formDefinition).convertUiProperties(this.formDefinition);
      this.renderDynaForm(this.formDefinition,this.entityInstance);
    }
  }

  isFormNameUsed():boolean{
    return this.dynamicService.isFormNameUsed(this.formDefinition);    
  }

  reloadNonBindingUiFields() {    
    this.nonBindingUiFields = this.constantsService.getNonBindingUiFields();
  }

  removeFormControl(data:FormControl){
    this.isDirty = true;
    this.setSelectedFormControl(data);
    const index = this.formDefinition.formControls.indexOf(data, 0);
    if (index > -1) {
      this.setSelectedFormControl();
      //this.dynamicService.removeField(data);
      this.dynamicService.removeFormControl(data);
      this.formDefinition.formControls.splice(index, 1);

      this.renderDynaForm(this.formDefinition,this.entityInstance);
    }
  }

  setSelectedFormControl(selectedFormControl: FormControl = null):void{
    if(selectedFormControl == null){
      this.selectedFormControl = new FormControl();
      this.selectedFormControl.uiProperties = new Array<BaseProperty<any>>();
      this.showFormDefinitionProperties=true;
    }else{
      this.selectedFormControl = selectedFormControl;
      this.showFormDefinitionProperties=false;
      this.host.setSelected(selectedFormControl);
    }    
    //this.selectedFormControl.typeChangedEvent.subscribe(event => this.onTypeChangedEvent(event));
  }

  addBindingFormControl(data:FieldDefinition,index:number):void{
    this.isDirty = true;
    this.index = this.index + 1;
    this.converterService.createFormControlFromFieldDefinition(data,this.index).then(formControl=>{
      if(index >= 0){
        this.formDefinition.formControls.splice(index,0,formControl);
      }else{
        this.formDefinition.formControls.push(formControl);
      }
      this.dynamicService.addFormControl(formControl);
  
      this.renderDynaForm(this.formDefinition,this.entityInstance).then(()=>{
        this.setSelectedFormControl(formControl);
      });
    });
  }

  addNonBindingFormControl(data:NonBindingUiField,index:number):void{
    this.isDirty = true;
    this.index = this.index + 1;
    this.converterService.createFormControlFromNonBindingUiField(data,this.index).then( formControl =>{
      if(index >= 0){
        this.formDefinition.formControls.splice(index,0,formControl);
      }else{
        this.formDefinition.formControls.push(formControl);
      }
      this.dynamicService.addFormControl(formControl);
      
      this.renderDynaForm(this.formDefinition,this.entityInstance).then(()=>{
        this.setSelectedFormControl(formControl);
      });
    });
  }

  public getDesignName(data:FieldDefinition):string{
    return data.name;
  }

  public getTooltip(data:FieldDefinition):string{
    return this.converterService.getDesignType(data) + " " +  this.converterService.getDesignName(data);
  }
  
  public showItemProperties(selectedFormControl:FormControl):void{
    this.isItemClicked = true;
    this.setSelectedFormControl(selectedFormControl);
  }

  onFormDefinitionClicked(event){
    if(!this.isItemClicked){
      this.setSelectedFormControl();
    }else{
    }
    this.isItemClicked = false;
  }

  preview():void{
    if(this.dynamicService.getFormDesignerMode() != FormDesignerMode.View){
      this.formDefinitionService.save(this.formDefinition).then((response) =>
      {
        this.dynamicService.clearFormControls();
        this.router.navigate(['preview/'+response.id]);
      }).catch((error) => {
        this.errorHandlerService.handle(error);
      });
    }
  }

  public async save():Promise<void> {
    let that = this;
    let formDefinitionId = this.formDefinition.id;
    this.formDefinitionService.save(this.formDefinition).then((response) =>
    {
      this.dynamicService.clearFormControls();
      if(formDefinitionId>0){
        this.entityDefinitionService.get(response.entityDefinitionId).then((res) =>
        {
          response.entityDefinition = res;
          that.converterService.loadFormDefinition(response).then(async resp =>{
            await that.reload(resp);
            that.index = that.formDefinition.formControls.length;
            this.setSelectedFormControl();
          });
          
        }).catch((error) => {
          this.errorHandlerService.handle(error);
        });
      }else{
        this.router.navigate(['form/editor/modify',response.id]);
      }
      
    }).catch((error) => {
      this.errorHandlerService.handle(error);
    });;
  }

  public done():void {
    if(this.dynamicService.getFormDesignerMode() != FormDesignerMode.View){
      this.formDefinitionService.save(this.formDefinition).then((response) =>
      {
        this.dynamicService.clearFormControls();
        this.router.navigate(['forms']);
      }).catch((error) => {
        this.errorHandlerService.handle(error);
      });
    }else{
      this.router.navigate(['forms']);
    }
  }
  
  public cancel():void {
    if(this.isDirty){
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        width: '400px',
        height: '250px',
        data: {title: "Warning", message: "The form has been modified. Are you sure to continue?"}
      }).afterClosed().subscribe(response => {
        if(response){
          this.formDefinition = null;
          this.router.navigate(['forms']);
        }
      });
    }else{      
      this.formDefinition = null;
      this.router.navigate(['forms']);
    }
  }

  isCancelVisible():boolean{
    return this.dynamicService.getFormDesignerMode() != FormDesignerMode.View;
  }
  isDoneVisible():boolean{
    return true;
  }
  isSaveVisible():boolean{
    return this.dynamicService.getFormDesignerMode() != FormDesignerMode.View;
  }
  isCancelDisabled():boolean{
    return false;
  }
  isDoneDisabled():boolean{
    return !this.formIsValid() || !this.isDirty;
  }
  isSaveDisabled():boolean{
    return !this.formIsValid() || !this.isDirty;
  }
  
  formIsValid(): boolean {
    return this.formDefinition && this.formDefinition.formName != null && this.formDefinition.formName.length >= 3 
    && !this.isFormNameUsed() 
    && this.allFormControlNameUnique()
    ;
  }

  allFormControlNameUnique():boolean{
    let names = Array<string>();
    this.formDefinition.formControls.forEach(c => {
      let index = c.uiProperties.findIndex(i => i.name == PropertyNameConstants.NAME);
      if(index >= 0){
        let name = c.uiProperties[index].value;
        names.push(name);
      }
    });

    const distinct = (value, index, self) => {return self.indexOf(value) === index};
    let distinctNames = names.filter(distinct);
    
    return distinctNames.length == names.length;
  }

  
  public drop(event: CdkDragDrop<string[]>):void {
    let oldIndex = event.previousIndex;
    let newIndex = event.currentIndex;
    if(event.previousContainer.id == "fieldDefinitions"){
      if(this.formDefinition.entityDefinition.fieldDefinitions.filter(i => i.id==event.item.data.id).length == 2){
        let index = this.formDefinition.entityDefinition.fieldDefinitions.findIndex(i => i.id==event.item.data.id);
        this.formDefinition.entityDefinition.fieldDefinitions.splice(index+1, 1);
      } 
      let element = this.fieldDefinitions[oldIndex];
      this.addBindingFormControl(element,newIndex);
    }else if(event.previousContainer.id == "nonBindingUiFields"){
      if(this.nonBindingUiFields.filter(i => i.type==event.item.data.type).length == 2){
        let index = this.nonBindingUiFields.findIndex(i => i.type==event.item.data.type);
        this.nonBindingUiFields.splice(index+1, 1);
      } 
      let element = this.nonBindingUiFields[oldIndex];
      this.addNonBindingFormControl(element,newIndex);
    }
  }
  
  dropListEntered(event: CdkDragEnter) {
    // let x = this.formDefinition.entityDefinition.fieldDefinitions;
    // this.formDefinition.entityDefinition.fieldDefinitions= []; 
    // setTimeout(() => { this.formDefinition.entityDefinition.fieldDefinitions = x; }, 0);
//console.log(this.fieldDefinitions);

    //copyArrayItem(this.fieldDefinitions,this.formDefinition.formControls, 0,1); 
    
    if(event.item.data instanceof FieldDefinition && this.formDefinition.entityDefinition.fieldDefinitions.filter(i => i.id==event.item.data.id).length == 1){
      let fdIndex = this.formDefinition.entityDefinition.fieldDefinitions.findIndex(i => i.id==event.item.data.id);
      setTimeout(() => { this.formDefinition.entityDefinition.fieldDefinitions.splice(fdIndex+1, 0, event.item.data); }, 0);
    }else if(event.item.data instanceof NonBindingUiField && this.nonBindingUiFields.filter(i => i.type==event.item.data.type).length == 1){
      let nbIndex = this.nonBindingUiFields.findIndex(i => i.type==event.item.data.type);
       this.nonBindingUiFields.splice(nbIndex+1, 0, event.item.data);
    }
  }
  dropListExited(event: CdkDragExit){
    // if(event.item.data instanceof FieldDefinition && this.formDefinition.entityDefinition.fieldDefinitions.filter(i => i.id==event.item.data.id).length > 1){
    //   let index = this.formDefinition.entityDefinition.fieldDefinitions.findIndex(i => i.id==event.item.data.id);
    //   this.formDefinition.entityDefinition.fieldDefinitions.splice(index+1, 1);
    // }else if(event.item.data instanceof NonBindingUiField && this.nonBindingUiFields.filter(i => i.type==event.item.data.type).length > 1){
    //   let index = this.nonBindingUiFields.findIndex(i => i.type==event.item.data.type);
    //   this.nonBindingUiFields.splice(index+1, 1);
    // } 
  }

  modifyEntityDefinition(entityDefinition:EntityDefinition):void{
    this.router.navigate(['entity/editor/modify', entityDefinition.id]);
  }
  protected gridOptions: GridOptions = {
    unSortIcon: false,
    suppressCellSelection: true,
    enableColResize: false,
    rowSelection: 'single',
    domLayout: 'normal',
    accentedSort: true,
    suppressHorizontalScroll: true,
    context: {
        itemOperations: {
        },
        componentParent: this
    },
};
}
