import { Component, OnInit } from '@angular/core';
import { GridOptions, RowDoubleClickedEvent } from 'ag-grid-community';
import { AgGridEntityOperationCellRendererComponent } from '../../common/ag-grid-entity-operation-cell-renderer/ag-grid-entity-operation-cell-renderer.component';
import { AgGridOperationsHeaderComponent } from '../../common/ag-grid-operations-header/ag-grid-operations-header.component';
import { AgGridEntityButtonOperation } from '../../common/ag-grid-entity-operation-cell-renderer/ag-grid-entity-button-operation';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EntityDefinitionService, DynamicService,ErrorHandlerService } from '../../../services';
import { FieldType } from '../../../models/enums';
import { EntityDefinition, FieldDefinition } from '../../../models/dtos';
@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  public operationsHeaderComponent = AgGridOperationsHeaderComponent;
  public operationsCellComponent = AgGridEntityOperationCellRendererComponent;
  
  public entityDefinitions: EntityDefinition[];

  constructor(private router: Router, private entityDefinitionService: EntityDefinitionService, private dynamicService: DynamicService, private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {  
    this.dynamicService.clearFields();
    this.gridOptions.context.buttonOperation = new AgGridEntityButtonOperation();

    this.gridOptions.context.buttonOperation.modifyEntity = (item: any) => this.onModifyEntityClick(item);
    this.gridOptions.context.buttonOperation.modifyEntityIsVisible = (item: any) => this.modifyEntityIsVisible(item);
    
    this.gridOptions.context.buttonOperation.deleteEntity = (item: any) => this.onDeleteEntityClick(item);
    this.gridOptions.context.buttonOperation.deleteEntityIsVisible = (item: any) => this.deleteEntityIsVisible(item);
    
    this.gridOptions.context.buttonOperation.cloneEntity = (item: any) => this.onCloneEntityClick(item);
    this.gridOptions.context.buttonOperation.cloneEntityIsVisible = (item: any) => this.cloneEntityIsVisible(item);
    
    this.gridOptions.context.buttonOperation.viewEntity = (item: any) => this.onViewEntityClick(item);
    this.gridOptions.context.buttonOperation.viewEntityIsVisible = (item: any) => this.viewEntityIsVisible(item);
    let that = this;
    this.entityDefinitionService.getAll().then((response) =>
        {
          that.entityDefinitions = response;
        }).catch((error) => {
          that.errorHandlerService.handle(error);
        });
  }
  
  onNewClicked():void{
    this.router.navigate(['entity/editor/new']);
  }

  onViewEntityClick(entityDefinition: EntityDefinition) : void {    
    if(!this.viewEntityIsVisible(entityDefinition)){
      return;
    }
    this.router.navigate(['entity/editor/view', entityDefinition.id]);
  }
  viewEntityIsVisible(entityDefinition: EntityDefinition):boolean {
    return true;
  }

  onCloneEntityClick(entityDefinition: EntityDefinition) : void {
    if(!this.cloneEntityIsVisible(entityDefinition)){
      return;
    }
    this.router.navigate(['entity/editor/clone', entityDefinition.id]);
    
  }
  cloneEntityIsVisible(entityDefinition: EntityDefinition):boolean {
    return true;
  }

  onDeleteEntityClick(entityDefinition: EntityDefinition) : void {
    if(!this.deleteEntityIsVisible(entityDefinition)){
      return;
    }
    let that = this;
    this.entityDefinitionService.delete(entityDefinition.id).then(() =>
    {
      that.entityDefinitionService.getAll().then((response) =>
        {
          that.entityDefinitions = response;
        }).catch((error) => {
          that.errorHandlerService.handle(error);
        });
    }).catch((error) => {
      that.errorHandlerService.handle(error);
    });
  }
  deleteEntityIsVisible(entityDefinition: EntityDefinition):boolean {
    return !entityDefinition.hasEntityInstances && !entityDefinition.hasFormDefinitions;
  }

  onModifyEntityClick(entityDefinition: EntityDefinition) : void {    
    if(!this.modifyEntityIsVisible(entityDefinition)){
      return;
    }
    this.router.navigate(['entity/editor/modify', entityDefinition.id]);
  }

  modifyEntityIsVisible(entityDefinition: EntityDefinition):boolean {
    return !entityDefinition.hasEntityInstances && !entityDefinition.hasFormDefinitions;
  }
  
  rowDoubleClicked(event:RowDoubleClickedEvent ):void{
    if(event.data){
      this.onModifyEntityClick(event.data as EntityDefinition);
    }
  }

  public gridOptions: GridOptions = {
    //enableSorting: true,
    //enableFilter: true,
    unSortIcon: true,
    suppressCellSelection: true,
    enableColResize: false,
    rowSelection: 'single',
    domLayout: 'normal',
    accentedSort: true,
    suppressHorizontalScroll: false,
    onRowDoubleClicked: (event) => this.rowDoubleClicked(event),
    context: {
        itemOperations: {
        }
    },
    // icons: {
    //     sortAscending: '<img src="./assets/sort-asc.png"/>',
    //     sortDescending: '<img src="./assets/sort-desc.png"/>',
    //     sortUnSort: '<img src="./assets/sort.png"/>',
    //     filter: '<img src="./assets/filter_green.png"/>',
    //     menu: '<img src="./assets/filter.png"/>'
    // }
};
}
