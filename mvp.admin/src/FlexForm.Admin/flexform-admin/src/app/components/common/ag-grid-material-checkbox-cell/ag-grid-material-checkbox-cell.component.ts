import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular/main';
import { ICellRendererParams } from 'ag-grid-community/main';

@Component({
    selector: 'app-ag-grid-material-checkbox-cell',
    templateUrl: 'ag-grid-material-checkbox-cell.component.html',
    styleUrls: ['./ag-grid-material-checkbox-cell.component.scss']
})
export class AgGridMaterialCheckboxCellComponent implements OnInit, AgRendererComponent {
    public params: ICellRendererParams;

    public value: boolean;

    public constructor() { 
        this.refresh = this.refresh.bind(this);
    }

    public refresh(params: any): boolean {
        this.value = this.params.getValue();
        return true;
    }

    public agInit(params: ICellRendererParams): void {
        this.params = params;
        this.value = this.params.getValue();
    }

    public ngOnInit() {
    }

    public onModelChanged(): void {
        this.params.setValue(this.value);
        this.params.api.stopEditing();

        if(this.params.context.onModelChanged){
            this.params.context.onModelChanged();
        }
    }
}
