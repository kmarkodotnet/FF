import { Component } from '@angular/core';
import { ConstantsService, DynamicService } from '../../../services';
import { AgGridPropertyCellRendererComponent } from './ag-grid-property-cell-renderer.component';
import { EntityDesignerMode } from '../../../models/enums';
@Component({
  selector: 'app-ag-grid-entity-property-cell-renderer',
  templateUrl: './ag-grid-property-cell-renderer.component.html',
  styleUrls: ['./ag-grid-property-cell-renderer.component.css']
})
export class AgGridEntityPropertyCellRendererComponent extends AgGridPropertyCellRendererComponent {
  public constructor(private constantsService: ConstantsService, private dynamicService: DynamicService) {
    super();
  }
  ngOnInit() {
    
  }
  validate() {
    if(this.dynamicService.isFieldNameUsed(this.context.value)){
      this.isValid = false;
    }else{
      this.isValid = true;
    }
  }
  // afterGuiAttached?(params?: import("ag-grid-community").IAfterGuiAttachedParams): void {
  //   throw new Error("Method not implemented.");
  // }
  isReadonly(): boolean {
    return this.dynamicService.getEntityDesignerMode() == EntityDesignerMode.View;
  }
}
