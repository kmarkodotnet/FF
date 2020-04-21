import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { Component } from "@angular/core";
import { AgGridUserButtonOperation } from "./ag-grid-button-operation";

@Component({
  selector: 'app-ag-grid-user-operation-cell-renderer',
  templateUrl: './ag-grid-user-operation-cell-renderer.component.html',
  styleUrls: ['./ag-grid-user-operation-cell-renderer.component.css']
})
export class AgGridUserOperationCellRendererComponent implements AgRendererComponent {
    
  public params: ICellRendererParams;
  cssClass: string;
  content: string;

  refresh(params: any): boolean {
      return false;
  }
  
  agInit(params: ICellRendererParams): void {
      this.params = params;
      if (this.params.context.buttonOperation instanceof AgGridUserButtonOperation) {
          var operation = this.params.context.buttonOperation as AgGridUserButtonOperation;
          this.cssClass = typeof(operation.getCss) !== "undefined" ? operation.getCss() : "btn btn-sm btn-default";
          this.content = typeof(operation.getContent) !== "undefined" ? operation.getContent() : ">>";
      }
  }

    modifyUser():void {
        if (this.params.context.buttonOperation instanceof AgGridUserButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridUserButtonOperation;
            operation.modifyUser(this.params.data);
        }
    }

    deleteUser():void {
        if (this.params.context.buttonOperation instanceof AgGridUserButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridUserButtonOperation;
            operation.deleteUser(this.params.data);
        }
    }

    modifyUserIsVisible():boolean{
        if (this.params.context.buttonOperation instanceof AgGridUserButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridUserButtonOperation;
            return operation.modifyUserIsVisible(this.params.data);
        }
        return false;
    }

    deleteUserIsVisible():boolean{
        if (this.params.context.buttonOperation instanceof AgGridUserButtonOperation) {
            var operation = this.params.context.buttonOperation as AgGridUserButtonOperation;
            return operation.deleteUserIsVisible(this.params.data);
        }
        return false;
    }
}