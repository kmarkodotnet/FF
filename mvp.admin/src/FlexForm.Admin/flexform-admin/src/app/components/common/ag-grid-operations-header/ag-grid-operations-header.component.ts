import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
    templateUrl: 'ag-grid-operations-header.component.html',
    styleUrls: ['ag-grid-operations-header.component.css']
})
export class AgGridOperationsHeaderComponent implements IHeaderAngularComp {
    public params: IHeaderParams;
    public addFunction: () => void;

    agInit(params: IHeaderParams): void {
        this.params = params;
        this.addFunction = params.context.addFunction as () => void;
    }

    add(): void {
        this.addFunction();
    }
}
