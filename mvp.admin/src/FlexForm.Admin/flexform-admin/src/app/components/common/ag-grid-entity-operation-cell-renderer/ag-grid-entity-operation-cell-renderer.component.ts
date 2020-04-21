import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { Component } from "@angular/core";
import { AgGridEntityButtonOperation } from "./ag-grid-entity-button-operation";

@Component({
  selector: 'app-ag-grid-entity-operation-cell-renderer',
  templateUrl: './ag-grid-entity-operation-cell-renderer.component.html',
  styleUrls: ['./ag-grid-entity-operation-cell-renderer.component.css']
})
export class AgGridEntityOperationCellRendererComponent implements AgRendererComponent {
    
  public params: ICellRendererParams;
  cssClass: string;
  content: string;

  refresh(params: any): boolean {
      return false;
  }
  
  agInit(params: ICellRendererParams): void {
      this.params = params;
      if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
          var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
          this.cssClass = typeof(operation.getCss) !== "undefined" ? operation.getCss() : "btn btn-sm btn-default";
          this.content = typeof(operation.getContent) !== "undefined" ? operation.getContent() : ">>";
      }
  }

  modifyEntity():void {
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            operation.modifyEntity(this.params.data);
        }
    }

    modifyEntityIsVisible():boolean{
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            return operation.modifyEntityIsVisible(this.params.data);
        }
        return false;
    }

    
    deleteEntity():void {
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            operation.deleteEntity(this.params.data);
        }
    }

    deleteEntityIsVisible():boolean{
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            return operation.deleteEntityIsVisible(this.params.data);
        }
        return false;
    }

    viewEntity():void {
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            operation.viewEntity(this.params.data);
        }
    }

    viewEntityIsVisible():boolean{
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            return operation.viewEntityIsVisible(this.params.data);
        }
        return false;
    }


    cloneEntity():void {
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            operation.cloneEntity(this.params.data);
        }
    }

    cloneEntityIsVisible():boolean{
        if (this.params.context.buttonOperation instanceof AgGridEntityButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridEntityButtonOperation;
            return operation.cloneEntityIsVisible(this.params.data);
        }
        return false;
    }
}