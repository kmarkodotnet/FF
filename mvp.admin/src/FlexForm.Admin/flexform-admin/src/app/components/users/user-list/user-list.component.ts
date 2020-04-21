import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AgGridMaterialCheckboxCellComponent } from '../../common/ag-grid-material-checkbox-cell/ag-grid-material-checkbox-cell.component';
import { AgGridOperationsHeaderComponent } from '../../common/ag-grid-operations-header/ag-grid-operations-header.component';
import { AgGridUserOperationCellRendererComponent } from '../../common/ag-grid-user-operation-cell-renderer/ag-grid-user-operation-cell-renderer.component';
import { AgGridUserButtonOperation } from '../../common/ag-grid-user-operation-cell-renderer/ag-grid-button-operation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

public checkboxCellComponent = AgGridMaterialCheckboxCellComponent;
public operationsHeaderComponent = AgGridOperationsHeaderComponent;
public operationsCellComponent = AgGridUserOperationCellRendererComponent;

rowData = [
    { name: 'Sandor Arany', email: 'sandor.arany@ff.com', phone: '0630321654', role: 'admin', active: true },
    { name: 'Matthew Harling', email: 'matthew.harling@ff.com', phone: '0620324564', role: 'guest', active: false },
    { name: 'Krisztian Marko', email: 'krisztian.marko@ff.com', phone: '0670321654', role: 'guest', active: true }
];

  constructor(private router: Router) { }

  ngOnInit() {
    this.gridOptions.context.buttonOperation = new AgGridUserButtonOperation();
    this.gridOptions.context.buttonOperation.modifyUser = (item: any) => this.onModifyUserClick(item);
    this.gridOptions.context.buttonOperation.deleteUser = (item: any) => this.onDeleteUserClick(item);
    this.gridOptions.context.buttonOperation.modifyUserIsVisible = (item: any) => this.modifyUserIsVisible(item);
    this.gridOptions.context.buttonOperation.deleteUserIsVisible = (item: any) => this.deleteUserIsVisible(item);
  }
  
  onModifyUserClick(item: any) : void {
    this.router.navigate(['user']);
    //this.router.navigate(['user', item.id]);
  }

  onDeleteUserClick(item: any) : void {
    
  }

  
  modifyUserIsVisible(item: any) : boolean {
      return true;
  }

  deleteUserIsVisible(item: any) : boolean {
      return true;
  }

  public gridOptions: GridOptions = {
    // enableSorting: true,
    // enableFilter: true,
    unSortIcon: true,
    suppressCellSelection: true,
    enableColResize: false,
    rowSelection: 'single',
    domLayout: 'normal',
    accentedSort: true,
    suppressHorizontalScroll: false,
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
